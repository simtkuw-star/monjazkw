const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const port = Number(process.env.PORT || 5501);
const dataDir = path.join(root, "data");
const storePath = path.join(dataDir, "munjaz-store.json");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

const defaultStore = {
  achievements: [],
  calendarEvents: [],
  users: [],
};

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify(defaultStore, null, 2), "utf8");
  }
}

function readStore() {
  ensureStore();
  try {
    return { ...defaultStore, ...JSON.parse(fs.readFileSync(storePath, "utf8")) };
  } catch {
    return { ...defaultStore };
  }
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(storePath, JSON.stringify({ ...defaultStore, ...store }, null, 2), "utf8");
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function passwordHash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
}

async function handleApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/health") {
    sendJson(res, 200, { ok: true, name: "munjaz" });
    return;
  }

  if (req.method === "GET" && pathname === "/api/state") {
    const store = readStore();
    sendJson(res, 200, {
      achievements: store.achievements,
      calendarEvents: store.calendarEvents,
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/login") {
    const payload = await readBody(req);
    const name = String(payload.name || "").trim();
    const password = String(payload.password || "");

    if (!name || password.length < 4) {
      sendJson(res, 400, { error: "بيانات الدخول غير مكتملة." });
      return;
    }

    const store = readStore();
    let user = store.users.find((item) => item.name === name);

    if (!user) {
      const salt = crypto.randomBytes(16).toString("hex");
      user = {
        id: crypto.randomUUID(),
        name,
        salt,
        passwordHash: passwordHash(password, salt),
        createdAt: new Date().toISOString(),
      };
      store.users.push(user);
      writeStore(store);
    } else if (user.passwordHash !== passwordHash(password, user.salt)) {
      sendJson(res, 401, { error: "كلمة المرور غير صحيحة." });
      return;
    }

    sendJson(res, 200, {
      user: {
        id: user.id,
        name: user.name,
        loginAt: new Date().toISOString(),
      },
    });
    return;
  }

  if (req.method === "PUT" && pathname === "/api/achievements") {
    const payload = await readBody(req);
    const store = readStore();
    store.achievements = Array.isArray(payload.achievements) ? payload.achievements : [];
    writeStore(store);
    sendJson(res, 200, { ok: true, count: store.achievements.length });
    return;
  }

  if (req.method === "PUT" && pathname === "/api/calendar-events") {
    const payload = await readBody(req);
    const store = readStore();
    store.calendarEvents = Array.isArray(payload.calendarEvents) ? payload.calendarEvents : [];
    writeStore(store);
    sendJson(res, 200, { ok: true, count: store.calendarEvents.length });
    return;
  }

  sendJson(res, 404, { error: "API endpoint not found" });
}

function serveStatic(req, res, pathname) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(root, requested));

  if (!filePath.startsWith(root) || filePath.startsWith(dataDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "text/plain; charset=utf-8",
    });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${port}`);
    const pathname = decodeURIComponent(url.pathname);

    if (pathname.startsWith("/api/")) {
      await handleApi(req, res, pathname);
      return;
    }

    serveStatic(req, res, pathname);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
});

server.on("error", (error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

server.listen(port, "127.0.0.1", () => {
  ensureStore();
  console.log(`Munjaz running at http://127.0.0.1:${port}`);
});
