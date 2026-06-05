import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics, isSupported as analyticsIsSupported } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const loginButton = document.querySelector("#loginButton");
const loginButtonText = document.querySelector("#loginButtonText");
const loginDialog = document.querySelector("#loginDialog");
const loginForm = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const loginError = document.querySelector("#loginError");
const cancelLogin = document.querySelector("#cancelLogin");
const sidebarUser = document.querySelector("#sidebarUser");
const sidebarUserName = document.querySelector("#sidebarUserName");
const userInitial = document.querySelector("#userInitial");
const logoutButton = document.querySelector("#logoutButton");
const pageLinks = document.querySelectorAll("[data-page-link]");
const pageButtons = document.querySelectorAll("[data-page-button]");
const printButtons = document.querySelectorAll("[data-print]");
const reportButtons = document.querySelectorAll("[data-report-type]");
const reportTitle = document.querySelector("#reportTitle");
const reportGeneratedAt = document.querySelector("#reportGeneratedAt");
const reportStats = document.querySelector("#reportStats");
const reportSections = document.querySelector("#reportSections");
const ideaSearches = document.querySelectorAll(".idea-search");
const ideaButtons = document.querySelectorAll(".idea-button");
const suggestionTriggers = document.querySelectorAll("[data-suggest-topic]");
const views = document.querySelectorAll("[data-page]");
const portfolioTabs = document.querySelectorAll("[data-portfolio-tab]");
const portfolioTitle = document.querySelector("#portfolioTitle");
const portfolioFields = document.querySelector("#portfolioFields");
const attachmentList = document.querySelector("#attachmentList");
const savedCount = document.querySelector("#savedCount");
const attachmentCount = document.querySelector("#attachmentCount");
const fieldCount = document.querySelector("#fieldCount");
const savedAchievements = document.querySelector("#savedAchievements");
const portfolioStatus = document.querySelector("#portfolioStatus");
const evidenceFiles = document.querySelector("#evidenceFiles");
const evidenceLink = document.querySelector("#evidenceLink");
const addEvidenceLink = document.querySelector("#addEvidenceLink");
const selectedEvidence = document.querySelector("#selectedEvidence");
const calendarCells = document.querySelector("#calendarCells");
const calendarMonthLabel = document.querySelector("#calendarMonthLabel");
const prevMonth = document.querySelector("#prevMonth");
const nextMonth = document.querySelector("#nextMonth");
const selectedDayTitle = document.querySelector("#selectedDayTitle");
const selectedDayEvents = document.querySelector("#selectedDayEvents");
const eventTitle = document.querySelector("#eventTitle");
const eventType = document.querySelector("#eventType");
const eventDate = document.querySelector("#eventDate");
const eventTime = document.querySelector("#eventTime");
const eventReminder = document.querySelector("#eventReminder");
const eventNotes = document.querySelector("#eventNotes");
const addCalendarEvent = document.querySelector("#addCalendarEvent");
const calendarStatus = document.querySelector("#calendarStatus");
const eventDialog = document.querySelector("#eventDialog");
const eventDialogType = document.querySelector("#eventDialogType");
const eventDialogTitle = document.querySelector("#eventDialogTitle");
const eventDialogDate = document.querySelector("#eventDialogDate");
const eventDialogTime = document.querySelector("#eventDialogTime");
const eventDialogReminder = document.querySelector("#eventDialogReminder");
const eventDialogNotes = document.querySelector("#eventDialogNotes");
const API_BASE = "";
const HAS_LOCAL_API = ["127.0.0.1", "localhost"].includes(window.location.hostname);

const firebaseConfig = {
  apiKey: "AIzaSyC4In4JAihjxdFU45actNZWuOJ9ZFuR2j4",
  authDomain: "monjazkw-c93a9.firebaseapp.com",
  projectId: "monjazkw-c93a9",
  storageBucket: "monjazkw-c93a9.firebasestorage.app",
  messagingSenderId: "321091535375",
  appId: "1:321091535375:web:403f4eeb0a155baea3597a",
  measurementId: "G-5LKMT3M826",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

analyticsIsSupported()
  .then((supported) => {
    if (supported) getAnalytics(firebaseApp);
  })
  .catch(() => {});

const portfolioConfig = {
  meetings: {
    title: "Ø§Ø¬ØªÙ…Ø§Ø¹ ÙÙ†ÙŠ",
    fields: ["Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹", "Ø§Ù„ØªØ§Ø±ÙŠØ®", "Ø§Ù„Ø¬Ù‡Ø© Ø£Ùˆ Ø§Ù„Ù‚Ø³Ù…", "Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹"],
    attachments: ["Ù…Ø­Ø¶Ø± Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ PDF", "ØµÙˆØ±Ø© Ø§Ù„ØªÙˆÙ‚ÙŠØ¹", "Ù…Ù„Ø§Ø­Ø¸Ø§Øª"],
  },
  lessons: {
    title: "Ø¯Ø±Ø³ Ø±ÙŠØ§Ø¯ÙŠ",
    fields: ["Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø¯Ø±Ø³", "Ø§Ù„Ù…Ø§Ø¯Ø©", "Ø§Ù„ØµÙ", "Ø§Ù„ØªØ§Ø±ÙŠØ®", "ØµÙˆØ±", "Ø´Ù‡Ø§Ø¯Ø©"],
    attachments: ["ØµÙˆØ± Ø§Ù„Ø¯Ø±Ø³", "Ø®Ø·Ø© Ø§Ù„Ø¯Ø±Ø³", "Ø§Ù„Ø´Ù‡Ø§Ø¯Ø©"],
  },
  development: {
    title: "ØªÙ†Ù…ÙŠØ© Ù…Ù‡Ù†ÙŠØ©",
    fields: ["Ø§Ø³Ù… Ø§Ù„ÙˆØ±Ø´Ø©", "Ø§Ù„Ù…Ø¯Ø±Ø¨ Ø£Ùˆ Ø§Ù„Ø¬Ù‡Ø©", "Ø§Ù„Ø³Ø§Ø¹Ø§Øª", "Ø§Ù„ØªØ§Ø±ÙŠØ®", "Ø§Ù„Ø´Ù‡Ø§Ø¯Ø©"],
    attachments: ["Ø´Ù‡Ø§Ø¯Ø© Ø§Ù„Ø­Ø¶ÙˆØ±", "Ø±Ø§Ø¨Ø· Ø§Ù„ÙˆØ±Ø´Ø©", "ØµÙˆØ±"],
  },
  workshops: {
    title: "ÙˆØ±Ø´Ø© Ù…Ù‚Ø¯Ù…Ø©",
    fields: ["Ø¹Ù†ÙˆØ§Ù† Ø§Ù„ÙˆØ±Ø´Ø©", "Ø§Ù„ÙØ¦Ø© Ø§Ù„Ù…Ø³ØªÙ‡Ø¯ÙØ©", "Ø¹Ø¯Ø¯ Ø§Ù„Ø­Ø¶ÙˆØ±", "Ø§Ù„ØªØ§Ø±ÙŠØ®", "ØµÙˆØ± Ø§Ù„ØªÙ†ÙÙŠØ°"],
    attachments: ["Ø§Ù„Ø´Ù‡Ø§Ø¯Ø©", "ØµÙˆØ± Ø§Ù„ØªÙ†ÙÙŠØ°", "ÙƒØ´Ù Ø§Ù„Ø­Ø¶ÙˆØ±"],
  },
  events: {
    title: "ÙØ¹Ø§Ù„ÙŠØ©",
    fields: ["Ø§Ø³Ù… Ø§Ù„ÙØ¹Ø§Ù„ÙŠØ©", "Ù†ÙˆØ¹ Ø§Ù„Ù…Ø´Ø§Ø±ÙƒØ©", "Ø§Ù„ØªØ§Ø±ÙŠØ®", "Ø§Ù„Ø£Ø«Ø±", "Ø§Ù„Ø´ÙˆØ§Ù‡Ø¯"],
    attachments: ["ØµÙˆØ±", "Ø´Ù‡Ø§Ø¯Ø§Øª", "ØªÙ‚Ø±ÙŠØ± Ø§Ù„ÙØ¹Ø§Ù„ÙŠØ©"],
  },
  radio: {
    title: "Ø¨Ø±Ù†Ø§Ù…Ø¬ Ø¥Ø°Ø§Ø¹ÙŠ",
    fields: ["Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø¨Ø±Ù†Ø§Ù…Ø¬", "Ø§Ù„ØªØ§Ø±ÙŠØ®", "Ø±Ø§Ø¨Ø· Ø§Ù„ØªØ³Ø¬ÙŠÙ„", "Ø§Ù„Ù…Ø´Ø§Ø±ÙƒÙˆÙ†"],
    attachments: ["ØµÙˆØ±", "Ø±Ø§Ø¨Ø· Ø§Ù„ØªØ³Ø¬ÙŠÙ„", "Ø§Ù„Ù†Øµ Ø§Ù„Ø¥Ø°Ø§Ø¹ÙŠ"],
  },
  activities: {
    title: "Ù†Ø´Ø§Ø· Ù…Ø¯Ø±Ø³ÙŠ",
    fields: ["Ø§Ù„Ù†Ø´Ø§Ø·", "Ø§Ù„Ù‡Ø¯Ù", "Ø§Ù„ÙØ¦Ø© Ø§Ù„Ù…Ø³ØªÙ‡Ø¯ÙØ©", "Ø§Ù„Ù…Ø±ÙÙ‚Ø§Øª"],
    attachments: ["ØµÙˆØ± Ø§Ù„Ù†Ø´Ø§Ø·", "Ø®Ø·Ø© Ø§Ù„Ù†Ø´Ø§Ø·", "ØªÙ‚Ø±ÙŠØ± Ù…Ø®ØªØµØ±"],
  },
  values: {
    title: "Ù‚ÙŠÙ…Ø© ØªØ±Ø¨ÙˆÙŠØ©",
    fields: ["Ø§Ù„Ù‚ÙŠÙ…Ø©", "Ø¢Ù„ÙŠØ© Ø§Ù„ØªÙØ¹ÙŠÙ„", "Ø§Ù„ØªØ§Ø±ÙŠØ®", "Ø§Ù„Ø£Ø¯Ù„Ø©"],
    attachments: ["ØµÙˆØ±", "Ø£Ø¯Ù„Ø©", "ØªÙ‚Ø±ÙŠØ± Ø§Ù„ØªÙØ¹ÙŠÙ„"],
  },
  tasks: {
    title: "ØªÙƒÙ„ÙŠÙ",
    fields: ["Ø§Ù„ØªÙƒÙ„ÙŠÙ", "Ø§Ù„Ø¬Ù‡Ø©", "Ø§Ù„Ù…Ø¯Ø©", "Ø§Ù„Ù…Ø±ÙÙ‚Ø§Øª"],
    attachments: ["Ø®Ø·Ø§Ø¨ Ø§Ù„ØªÙƒÙ„ÙŠÙ", "Ø§Ù„Ø´ÙˆØ§Ù‡Ø¯", "Ø§Ù„ØªÙ‚Ø±ÙŠØ±"],
  },
  visits: {
    title: "ØªØ¨Ø§Ø¯Ù„ Ø²ÙŠØ§Ø±Ø©",
    fields: ["Ø§Ø³Ù… Ø§Ù„Ù…Ø¹Ù„Ù… Ø§Ù„Ø²Ø§Ø¦Ø±", "Ø§Ù„Ù…Ø§Ø¯Ø©", "Ø§Ù„ØªØ§Ø±ÙŠØ®", "Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø²ÙŠØ§Ø±Ø©"],
    attachments: ["Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø²ÙŠØ§Ø±Ø©", "ØªÙˆÙ‚ÙŠØ¹ Ø§Ù„Ø­Ø¶ÙˆØ±", "Ù…Ù„Ø§Ø­Ø¸Ø§Øª"],
  },
  competitions: {
    title: "Ù…Ø³Ø§Ø¨Ù‚Ø©",
    fields: ["Ø§Ø³Ù… Ø§Ù„Ù…Ø³Ø§Ø¨Ù‚Ø©", "Ø§Ù„Ù…Ø³ØªÙˆÙ‰", "Ø§Ù„Ù†ØªÙŠØ¬Ø©", "Ø§Ù„Ø´Ù‡Ø§Ø¯Ø©"],
    attachments: ["Ø§Ù„Ø´Ù‡Ø§Ø¯Ø©", "ØµÙˆØ± Ø§Ù„Ù…Ø´Ø§Ø±ÙƒØ©", "Ù†ØªÙŠØ¬Ø© Ø§Ù„Ù…Ø³Ø§Ø¨Ù‚Ø©"],
  },
};

let activePortfolio = "meetings";
let activeReport = "monthly";
let achievements = JSON.parse(localStorage.getItem("munjaz.achievements") || "[]");
let currentUser = JSON.parse(localStorage.getItem("munjaz.user") || "null");
let currentEvidence = [];
let calendarDate = new Date(2026, 9, 1);
let selectedCalendarDate = "2026-10-04";
let calendarEvents = JSON.parse(
  localStorage.getItem("munjaz.calendarEvents") ||
    JSON.stringify([
      { id: "e1", title: "Ø§Ø¬ØªÙ…Ø§Ø¹ ÙÙ†ÙŠ", type: "meeting", date: "2026-10-04", time: "10:00", reminder: "3", notes: "Ù…Ø­Ø¶Ø± Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ ÙˆØ´ÙˆØ§Ù‡Ø¯ Ø§Ù„Ø­Ø¶ÙˆØ±" },
      { id: "e2", title: "Ø¯Ø±Ø³ Ø±ÙŠØ§Ø¯ÙŠ", type: "lesson", date: "2026-10-09", time: "11:00", reminder: "7", notes: "Ø®Ø·Ø© Ø§Ù„Ø¯Ø±Ø³ ÙˆØ§Ù„ØµÙˆØ±" },
      { id: "e3", title: "ÙØ¹Ø§Ù„ÙŠØ© Ù…Ø¯Ø±Ø³ÙŠØ©", type: "event", date: "2026-10-12", time: "09:00", reminder: "3", notes: "ØªÙ‚Ø±ÙŠØ± Ø§Ù„ÙØ¹Ø§Ù„ÙŠØ©" },
      { id: "e4", title: "Ø¥Ø°Ø§Ø¹Ø© Ù…Ø¯Ø±Ø³ÙŠØ©", type: "radio", date: "2026-10-16", time: "08:40", reminder: "1", notes: "Ø±Ø§Ø¨Ø· Ø§Ù„ØªØ³Ø¬ÙŠÙ„" },
      { id: "e5", title: "ØªØ³Ù„ÙŠÙ… Ø®Ø·Ø© Ø¹Ù„Ø§Ø¬ÙŠØ©", type: "plan", date: "2026-10-18", time: "12:00", reminder: "1", notes: "Ø®Ø·Ø© Ø§Ù„Ù…ØªØ¹Ù„Ù… Ø§Ù„Ù…ØªØ¹Ø«Ø±" },
      { id: "e6", title: "Ù…Ø³Ø§Ø¨Ù‚Ø© Ø«Ù‚Ø§ÙÙŠØ©", type: "competition", date: "2026-10-24", time: "10:00", reminder: "7", notes: "Ø§Ù„Ø´Ù‡Ø§Ø¯Ø© ÙˆØ§Ù„Ù†ØªÙŠØ¬Ø©" },
    ]),
);

const calendarTypeLabels = {
  meeting: "Ø§Ø¬ØªÙ…Ø§Ø¹ ÙÙ†ÙŠ",
  lesson: "Ø¯Ø±Ø³ Ø±ÙŠØ§Ø¯ÙŠ",
  event: "ÙØ¹Ø§Ù„ÙŠØ© Ù…Ø¯Ø±Ø³ÙŠØ©",
  radio: "Ø¥Ø°Ø§Ø¹Ø© Ù…Ø¯Ø±Ø³ÙŠØ©",
  plan: "Ø®Ø·Ø© Ø¹Ù„Ø§Ø¬ÙŠØ©",
  competition: "Ù…Ø³Ø§Ø¨Ù‚Ø©",
};

const reportLabels = {
  monthly: "ØªÙ‚Ø±ÙŠØ± Ø´Ù‡Ø±ÙŠ",
  term: "ØªÙ‚Ø±ÙŠØ± ÙØµÙ„ Ø¯Ø±Ø§Ø³ÙŠ",
  annual: "ØªÙ‚Ø±ÙŠØ± Ø³Ù†ÙˆÙŠ",
  full: "Ù…Ù„Ù Ø¥Ù†Ø¬Ø§Ø² ÙƒØ§Ù…Ù„",
};

const reportDescriptions = {
  monthly: "ÙŠØ¹Ø±Ø¶ Ù…Ø§ ØªÙ… ØªÙˆØ«ÙŠÙ‚Ù‡ Ø®Ù„Ø§Ù„ Ø§Ù„Ø´Ù‡Ø± Ø§Ù„Ù…Ø®ØªØ§Ø± Ù…Ù† Ø¥Ù†Ø¬Ø§Ø²Ø§Øª ÙˆÙ…ÙˆØ§Ø¹ÙŠØ¯ ÙˆØ´ÙˆØ§Ù‡Ø¯.",
  term: "ÙŠÙ„Ø®Øµ Ø¥Ù†Ø¬Ø§Ø²Ø§Øª Ø§Ù„ÙØµÙ„ Ø§Ù„Ø¯Ø±Ø§Ø³ÙŠ ÙˆÙŠØ¨Ø±Ø² Ø§Ù„Ù…Ø¬Ø§Ù„Ø§Øª Ø§Ù„Ø£Ù‚ÙˆÙ‰ ÙˆÙ†Ù‚Ø§Ø· Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©.",
  annual: "ÙŠØ¹Ø·ÙŠ ØµÙˆØ±Ø© Ø³Ù†ÙˆÙŠØ© Ø±Ø³Ù…ÙŠØ© Ø¹Ù† Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù…Ù‡Ù†ÙŠ ÙˆØ§Ù„Ø£Ù†Ø´Ø·Ø© ÙˆØ§Ù„Ø´ÙˆØ§Ù‡Ø¯.",
  full: "ÙŠØ¬Ù…Ø¹ Ù…Ù„Ù Ø§Ù„Ø¥Ù†Ø¬Ø§Ø² ÙƒØ§Ù…Ù„Ø§ Ù…Ø¹ Ø§Ù„Ø±Ø²Ù†Ø§Ù…Ø© ÙˆØ§Ù„Ù…Ø¤Ø´Ø±Ø§Øª ÙÙŠ Ù†Ø³Ø®Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ù†Ø¸Ù…Ø©.",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "ØªØ¹Ø°Ø± Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù….");
    error.status = response.status;
    throw error;
  }
  return data;
}

function createLocalSession(name) {
  return {
    id: `local-${Date.now()}`,
    name,
    loginAt: new Date().toISOString(),
    mode: "local",
  };
}

function loginNameToEmail(name) {
  if (name.includes("@")) return name;
  const encodedName = Array.from(name.trim() || "teacher")
    .map((letter) => letter.charCodeAt(0).toString(36))
    .join("")
    .slice(0, 48);
  return `${encodedName}@monjazkw.local`;
}

function firebaseStateRef() {
  if (!currentUser?.id || currentUser.mode === "local") return null;
  return doc(db, "users", currentUser.id, "private", "state");
}

async function saveRemoteState() {
  const stateRef = firebaseStateRef();
  if (!stateRef) return;
  await setDoc(
    stateRef,
    {
      achievements,
      calendarEvents,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

function persistAchievements() {
  localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
  saveRemoteState().catch(() => {});
  if (HAS_LOCAL_API) {
    apiRequest("/api/achievements", {
      method: "PUT",
      body: JSON.stringify({ achievements }),
    }).catch(() => {});
  }
}

async function loadRemoteState() {
  try {
    const stateRef = firebaseStateRef();
    if (stateRef) {
      const snapshot = await getDoc(stateRef);
      if (snapshot.exists()) {
        const state = snapshot.data();
        achievements = Array.isArray(state.achievements) ? state.achievements : [];
        calendarEvents = Array.isArray(state.calendarEvents) ? state.calendarEvents : calendarEvents;
        localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
        localStorage.setItem("munjaz.calendarEvents", JSON.stringify(calendarEvents));
      } else {
        await saveRemoteState();
      }
      renderPortfolio(activePortfolio);
      renderCalendar();
      renderReport(activeReport);
      return;
    }

    if (!HAS_LOCAL_API) {
      renderPortfolio(activePortfolio);
      renderCalendar();
      renderReport(activeReport);
      return;
    }

    const state = await apiRequest("/api/state");
    if (Array.isArray(state.achievements) && state.achievements.length) {
      achievements = state.achievements;
      localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
    }
    if (Array.isArray(state.calendarEvents) && state.calendarEvents.length) {
      calendarEvents = state.calendarEvents;
      localStorage.setItem("munjaz.calendarEvents", JSON.stringify(calendarEvents));
    } else if (calendarEvents.length) {
      saveCalendarEvents();
    }
    renderPortfolio(activePortfolio);
    renderCalendar();
    renderReport(activeReport);
  } catch {
    renderPortfolio(activePortfolio);
    renderCalendar();
    renderReport(activeReport);
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    if (file.size > 1800000) {
      resolve({
        kind: "file",
        name: file.name,
        size: file.size,
        type: file.type,
        stored: false,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        kind: "file",
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: reader.result,
        stored: true,
      });
    };
    reader.onerror = () => {
      resolve({
        kind: "file",
        name: file.name,
        size: file.size,
        type: file.type,
        stored: false,
      });
    };
    reader.readAsDataURL(file);
  });
}

const ideaBank = {
  struggling: {
    plan: {
      default: ["Ø®Ø·Ø© 3 Ø£Ø³Ø§Ø¨ÙŠØ¹ Ø¨Ù…Ù‡Ø§Ø±Ø© ÙˆØ§Ø­Ø¯Ø©", "Ù‡Ø¯Ù Ù‚ØµÙŠØ± + Ù†Ø´Ø§Ø· + Ù‚ÙŠØ§Ø³ Ø£Ø³Ø¨ÙˆØ¹ÙŠ"],
      reading: ["Ø®Ø·Ø© Ø·Ù„Ø§Ù‚Ø© Ù‚Ø±Ø§Ø¦ÙŠØ© ÙŠÙˆÙ…ÙŠØ©", "Ù‡Ø¯Ù ÙÙ‡Ù… Ù…Ù‚Ø±ÙˆØ¡ Ù…Ø¹ Ù†ØµÙˆØµ Ù‚ØµÙŠØ±Ø©"],
      writing: ["Ø®Ø·Ø© Ø¥Ù…Ù„Ø§Ø¡ Ù…Ù† Ù‚Ø§Ø¹Ø¯Ø© ÙˆØ§Ø­Ø¯Ø©", "Ù‡Ø¯Ù ÙƒØªØ§Ø¨Ø© Ø¬Ù…Ù„Ø© ØµØ­ÙŠØ­Ø© ÙŠÙˆÙ…ÙŠÙ‹Ø§"],
      math: ["Ø®Ø·Ø© Ø­Ù„ Ù…Ø³Ø§Ø¦Ù„ Ø¨Ø®Ø·ÙˆØ§Øª Ø«Ø§Ø¨ØªØ©", "Ù‡Ø¯Ù Ø¥ØªÙ‚Ø§Ù† Ù…Ù‡Ø§Ø±Ø© Ø­Ø³Ø§Ø¨ÙŠØ© ÙˆØ§Ø­Ø¯Ø©"],
    },
    activities: {
      default: ["Ø¨Ø·Ø§Ù‚Ø§Øª ØªØ¯Ø±ÙŠØ¨ 10 Ø¯Ù‚Ø§Ø¦Ù‚", "Ù†Ø´Ø§Ø· ØªØµØ­ÙŠØ­ Ø®Ø·Ø£ Ù…Ø¹ Ø²Ù…ÙŠÙ„"],
      reading: ["Ù‚Ø±Ø§Ø¡Ø© Ø«Ù†Ø§Ø¦ÙŠØ© Ù…Ø¹ Ø¨Ø·Ø§Ù‚Ø© Ù…Ù„Ø§Ø­Ø¸Ø©", "ØªÙ„Ø®ÙŠØµ Ø´ÙÙ‡ÙŠ Ø¨Ø¹Ø¯ ÙÙ‚Ø±Ø© Ù‚ØµÙŠØ±Ø©"],
      writing: ["Ø¥Ù…Ù„Ø§Ø¡ Ù…Ù†Ø¸ÙˆØ± Ø«Ù… ØªØµØ­ÙŠØ­ Ø°Ø§ØªÙŠ", "ØªØ±ØªÙŠØ¨ ÙƒÙ„Ù…Ø§Øª Ù„ØªÙƒÙˆÙŠÙ† Ø¬Ù…Ù„Ø©"],
      math: ["Ù„Ø¹Ø¨Ø© Ø®Ø·ÙˆØ§Øª Ø§Ù„Ø­Ù„", "Ù…Ø³Ø§Ø¦Ù„ Ù…ØµÙˆØ±Ø© Ù…Ù† Ø§Ù„Ø­ÙŠØ§Ø© Ø§Ù„ÙŠÙˆÙ…ÙŠØ©"],
    },
    worksheets: {
      default: ["ÙˆØ±Ù‚Ø© ØªØ¯Ø±Ø¬ Ù…Ù† Ø§Ù„Ø³Ù‡Ù„ Ù„Ù„ØµØ¹Ø¨", "ÙˆØ±Ù‚Ø© Ù…Ù‚Ø§Ø±Ù†Ø© Ù‚Ø¨Ù„/Ø¨Ø¹Ø¯ Ø§Ù„ØªØ¹Ù„Ù…"],
      reading: ["ÙˆØ±Ù‚Ø© Ø§Ø³ØªØ®Ø±Ø§Ø¬ ÙÙƒØ±Ø© Ø±Ø¦ÙŠØ³ÙŠØ©", "ÙˆØ±Ù‚Ø© Ù…ÙØ±Ø¯Ø§Øª ÙˆÙ…Ø¹Ø§Ù†ÙŠ"],
      writing: ["ÙˆØ±Ù‚Ø© ØªØµÙ†ÙŠÙ Ø§Ù„Ø£Ø®Ø·Ø§Ø¡ Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©", "ÙˆØ±Ù‚Ø© ØªØ¯Ø±ÙŠØ¨ Ø¹Ù„Ù‰ Ù‚Ø§Ø¹Ø¯Ø© ÙˆØ§Ø­Ø¯Ø©"],
      math: ["ÙˆØ±Ù‚Ø© Ù…Ø³Ø§Ø¦Ù„ Ø¨Ø«Ù„Ø§Ø« Ù…Ø³ØªÙˆÙŠØ§Øª", "ÙˆØ±Ù‚Ø© Ø¥ÙƒÙ…Ø§Ù„ Ø®Ø·ÙˆØ§Øª Ø§Ù„Ø­Ù„"],
    },
    assessment: {
      default: ["Ù‚Ø§Ø¦Ù…Ø© Ø±ØµØ¯ Ø£Ø¯Ø§Ø¡", "Ø§Ø®ØªØ¨Ø§Ø± Ù‚ØµÙŠØ± Ù‚Ø¨Ù„/Ø¨Ø¹Ø¯ Ø§Ù„Ø®Ø·Ø©"],
      reading: ["Ø³Ù„Ù… Ø·Ù„Ø§Ù‚Ø© Ù‚Ø±Ø§Ø¦ÙŠØ©", "Ø¨Ø·Ø§Ù‚Ø© ÙÙ‡Ù… Ù…Ù‚Ø±ÙˆØ¡ Ù…Ù† 5 Ø£Ø³Ø¦Ù„Ø©"],
      writing: ["Rubric Ø¥Ù…Ù„Ø§Ø¡ Ù…Ø¨Ø³Ø·", "Ø³Ø¬Ù„ Ø£Ø®Ø·Ø§Ø¡ Ù…ØªÙƒØ±Ø±Ø©"],
      math: ["Ø§Ø®ØªØ¨Ø§Ø± Ù…Ù‡Ø§Ø±Ø© Ù…Ù† 6 Ù…Ø³Ø§Ø¦Ù„", "Ø¨Ø·Ø§Ù‚Ø© ØªØ­Ù‚Ù‚ Ù…Ù† Ø®Ø·ÙˆØ§Øª Ø§Ù„Ø­Ù„"],
    },
    followup: {
      default: ["Ø¬Ø¯ÙˆÙ„ Ù…ØªØ§Ø¨Ø¹Ø© Ø£Ø³Ø¨ÙˆØ¹ÙŠ", "Ù…Ù„Ø§Ø­Ø¸Ø© Ù…Ø®ØªØµØ±Ø© Ù„ÙˆÙ„ÙŠ Ø§Ù„Ø£Ù…Ø±"],
      reading: ["Ø³Ø¬Ù„ Ù‚Ø±Ø§Ø¡Ø© Ù…Ù†Ø²Ù„ÙŠØ©", "Ù…ØªØ§Ø¨Ø¹Ø© Ø¹Ø¯Ø¯ Ø§Ù„ÙƒÙ„Ù…Ø§Øª Ø§Ù„ØµØ­ÙŠØ­Ø©"],
      writing: ["Ø³Ø¬Ù„ Ø£Ø®Ø·Ø§Ø¡ Ø¥Ù…Ù„Ø§Ø¦ÙŠØ© Ù…ØªÙƒØ±Ø±Ø©", "Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ø¬Ø¨ Ù‚ØµÙŠØ± Ø£Ø³Ø¨ÙˆØ¹ÙŠ"],
      math: ["Ù…ØªØ§Ø¨Ø¹Ø© Ø¥ØªÙ‚Ø§Ù† ÙƒÙ„ Ø®Ø·ÙˆØ©", "Ø±Ø³Ù… Ø¨ÙŠØ§Ù†ÙŠ Ù„Ù„ØªØ­Ø³Ù†"],
    },
  },
  gifted: {
    plan: {
      default: ["Ø®Ø·Ø© Ø¥Ø«Ø±Ø§Ø¦ÙŠØ© Ø¨Ù…Ø®Ø±Ø¬Ø§Øª ÙˆØ§Ø¶Ø­Ø©", "Ù…Ø³Ø§Ø± ØªØ¹Ù„Ù… Ø°Ø§ØªÙŠ Ø£Ø³Ø¨ÙˆØ¹ÙŠ"],
      research: ["Ø®Ø·Ø© Ø¨Ø­Ø« Ø¨Ø³Ø¤Ø§Ù„ Ù…Ø±ÙƒØ²ÙŠ", "Ù…Ø³Ø§Ø± Ù‚Ø±Ø§Ø¡Ø© Ù…ØµØ§Ø¯Ø± ÙˆØªØ­Ù„ÙŠÙ„Ù‡Ø§"],
      writing: ["Ø®Ø·Ø© ÙƒØªØ§Ø¨Ø© Ø¥Ø¨Ø¯Ø§Ø¹ÙŠØ© Ù…ØªØ¯Ø±Ø¬Ø©", "Ù…Ù„Ù Ù†ØµÙˆØµ Ù‚ØµÙŠØ±Ø© Ù…Ø¹ ØªØºØ°ÙŠØ© Ø±Ø§Ø¬Ø¹Ø©"],
      thinking: ["Ø®Ø·Ø© ØªØ­Ø¯ÙŠØ§Øª ØªÙÙƒÙŠØ± Ø¹Ù„ÙŠØ§", "Ù…Ø³Ø§Ø± Ø­Ù„ Ù…Ø´ÙƒÙ„Ø§Øª Ù…ÙØªÙˆØ­Ø©"],
    },
    project: {
      default: ["Ø³Ø¤Ø§Ù„ Ø¨Ø­Ø«ÙŠ + Ù…ØµØ§Ø¯Ø± Ù…ÙˆØ«ÙˆÙ‚Ø©", "Ø¹Ø±Ø¶ Ù†ØªØ§Ø¦Ø¬ Ø¨Ø¥Ù†ÙÙˆØ¬Ø±Ø§ÙÙŠÙƒ"],
      research: ["Ù…Ù‚Ø§Ø¨Ù„Ø© Ù‚ØµÙŠØ±Ø© ÙˆØ¬Ù…Ø¹ Ø¨ÙŠØ§Ù†Ø§Øª", "Ù…Ù„Ø®Øµ Ø¨Ø­Ø« Ù…Ù† ØµÙØ­Ø© ÙˆØ§Ø­Ø¯Ø©"],
      writing: ["Ù…Ø¬Ù„Ø© ØµÙÙŠØ© Ù…ØµØºØ±Ø©", "Ù…Ù‚Ø§Ù„ Ø±Ø£ÙŠ Ù…Ø¯Ø¹ÙˆÙ… Ø¨Ø£Ø¯Ù„Ø©"],
      thinking: ["Ù…Ø´Ø±ÙˆØ¹ Ø­Ù„ Ù…Ø´ÙƒÙ„Ø© Ù…Ø¯Ø±Ø³ÙŠØ©", "Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ Ù„ÙÙƒØ±Ø© Ù…Ø¨ØªÙƒØ±Ø©"],
    },
    thinking: {
      default: ["Ø³Ø¤Ø§Ù„ Ù…ÙØªÙˆØ­ Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„Ø­Ù„ÙˆÙ„", "ØªØµÙ…ÙŠÙ… Ø­Ù„ Ù…Ø¨ØªÙƒØ± Ù„Ù…Ø´ÙƒÙ„Ø©"],
      research: ["ØªØ­Ù„ÙŠÙ„ Ù…ØµØ¯Ø±ÙŠÙ† ÙˆÙ…Ù‚Ø§Ø±Ù†Ø© Ø§Ù„Ù†ØªØ§Ø¦Ø¬", "Ø¨Ù†Ø§Ø¡ ÙØ±Ø¶ÙŠØ© ÙˆØ§Ø®ØªØ¨Ø§Ø±Ù‡Ø§"],
      writing: ["Ù†Ù‚Ø¯ Ù†Øµ ÙˆØ¥Ø¹Ø§Ø¯Ø© Ø¨Ù†Ø§Ø¦Ù‡", "ÙƒØªØ§Ø¨Ø© Ù†Ù‡Ø§ÙŠØ© Ø¨Ø¯ÙŠÙ„Ø© Ù…Ø¨Ø±Ø±Ø©"],
      thinking: ["Ù…Ù‚Ø§Ø±Ù†Ø© ÙˆØªØ­Ù„ÙŠÙ„ Ù…ÙˆÙ‚Ù", "ØªØµÙ…ÙŠÙ… Ù‚Ø±Ø§Ø± Ù…Ø¹ ØªØ¨Ø±ÙŠØ± Ø§Ù„Ø£Ø¯Ù„Ø©"],
    },
    competitions: {
      default: ["ØªØ­Ø¯ÙŠ Ù‚Ø±Ø§Ø¡Ø© Ø£Ùˆ Ø¨Ø­Ø« Ù…ØµØºØ±", "Ù…Ø³Ø§Ø¨Ù‚Ø© Ø¹Ø±Ø¶ Ø´ÙÙ‡ÙŠ Ù‚ØµÙŠØ±"],
      research: ["Ù…Ø³Ø§Ø¨Ù‚Ø© Ù…Ù„ØµÙ‚ Ø¹Ù„Ù…ÙŠ", "ØªØ­Ø¯ÙŠ Ø¹Ø±Ø¶ Ù†ØªØ§Ø¦Ø¬ Ø§Ù„Ø¨Ø­Ø«"],
      writing: ["Ù…Ø³Ø§Ø¨Ù‚Ø© Ù‚ØµØ© Ù‚ØµÙŠØ±Ø©", "ØªØ­Ø¯ÙŠ Ù…Ù‚Ø§Ù„ Ø±Ø£ÙŠ"],
      thinking: ["Ù…Ø³Ø§Ø¨Ù‚Ø© Ø­Ù„ Ù…Ø´ÙƒÙ„Ø§Øª", "ØªØ­Ø¯ÙŠ Ù…Ù†Ø§Ø¸Ø±Ø© Ù…ØµØºØ±Ø©"],
    },
    creative: {
      default: ["Ø¥Ù†ØªØ§Ø¬ Ù‚ØµØ© Ø£Ùˆ Ø¨ÙˆØ¯ÙƒØ§Ø³Øª Ù‚ØµÙŠØ±", "ØªØµÙ…ÙŠÙ… Ù„ÙˆØ­Ø© Ù…Ø¹Ø±ÙØ© Ù„Ù„Ø¯Ø±Ø³"],
      research: ["ÙÙŠØ¯ÙŠÙˆ Ø¯Ù‚ÙŠÙ‚Ø© ÙŠÙ„Ø®Øµ Ù†ØªÙŠØ¬Ø©", "Ø®Ø±ÙŠØ·Ø© Ù…ÙØ§Ù‡ÙŠÙ… ØªÙØ§Ø¹Ù„ÙŠØ©"],
      writing: ["Ù†Ø´Ø±Ø© Ø£Ø¯Ø¨ÙŠØ© Ù…ØµØºØ±Ø©", "Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆ ØªÙ…Ø«ÙŠÙ„ÙŠ Ù„Ù„Ù…ÙÙ‡ÙˆÙ…"],
      thinking: ["ØªØµÙ…ÙŠÙ… Ù„Ø¹Ø¨Ø© ØªØ¹Ù„ÙŠÙ…ÙŠØ©", "Ø§Ø¨ØªÙƒØ§Ø± Ø£Ø¯Ø§Ø© Ø´Ø±Ø­ Ù„Ù„Ø²Ù…Ù„Ø§Ø¡"],
    },
  },
};

const suggestionBank = {
  struggling: {
    plan: {
      title: "Ø®Ø·Ø© Ø¹Ù„Ø§Ø¬ÙŠØ© Ø¬Ø§Ù‡Ø²Ø©",
      ideas: ["Ø§Ø®ØªÙŠØ§Ø± Ù…Ù‡Ø§Ø±Ø© ÙˆØ§Ø­Ø¯Ø© ÙÙ‚Ø· Ù„Ù…Ø¯Ø© 3 Ø£Ø³Ø§Ø¨ÙŠØ¹ Ù…Ø¹ Ù‡Ø¯Ù Ù‚Ø§Ø¨Ù„ Ù„Ù„Ù‚ÙŠØ§Ø³.", "ØªÙ‚Ø³ÙŠÙ… Ø§Ù„Ø®Ø·Ø© Ø¥Ù„Ù‰: ØªÙ…Ù‡ÙŠØ¯ Ù‚ØµÙŠØ±ØŒ ØªØ¯Ø±ÙŠØ¨ Ù…ÙˆØ¬Ù‡ØŒ ØªØ·Ø¨ÙŠÙ‚ ÙØ±Ø¯ÙŠØŒ Ù‚ÙŠØ§Ø³ Ø£Ø³Ø¨ÙˆØ¹ÙŠ."],
    },
    activities: {
      title: "Ø£Ù†Ø´Ø·Ø© Ù‚ØµÙŠØ±Ø©",
      ideas: ["Ù†Ø´Ø§Ø· Ø¨Ø·Ø§Ù‚Ø§Øª Ø³Ø±ÙŠØ¹: ÙŠØ®ØªØ§Ø± Ø§Ù„Ù…ØªØ¹Ù„Ù… Ø¨Ø·Ø§Ù‚Ø© ÙˆÙŠØ·Ø¨Ù‚ Ø§Ù„Ù…Ù‡Ø§Ø±Ø© ÙÙŠ 5 Ø¯Ù‚Ø§Ø¦Ù‚.", "Ù†Ø´Ø§Ø· Ø²Ù…ÙŠÙ„ Ø¯Ø§Ø¹Ù…: Ø­Ù„ Ø³Ø¤Ø§Ù„ Ù‚ØµÙŠØ± Ø«Ù… Ù…Ù‚Ø§Ø±Ù†Ø© Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø© ÙˆØªØµØ­ÙŠØ­ Ø§Ù„Ø®Ø·Ø£."],
    },
    worksheets: {
      title: "Ø£ÙˆØ±Ø§Ù‚ Ø¹Ù…Ù„",
      ideas: ["ÙˆØ±Ù‚Ø© Ø¹Ù…Ù„ Ù…ØªØ¯Ø±Ø¬Ø©: Ø³Ø¤Ø§Ù„ Ø³Ù‡Ù„ØŒ Ù…ØªÙˆØ³Ø·ØŒ Ø«Ù… Ø³Ø¤Ø§Ù„ ØªØ·Ø¨ÙŠÙ‚ÙŠ.", "ÙˆØ±Ù‚Ø© Ø£Ø®Ø·Ø§Ø¡ Ø´Ø§Ø¦Ø¹Ø© ÙŠØ­Ø¯Ø¯ ÙÙŠÙ‡Ø§ Ø§Ù„Ù…ØªØ¹Ù„Ù… Ø§Ù„Ø®Ø·Ø£ ÙˆÙŠÙƒØªØ¨ Ø§Ù„ØªØµØ­ÙŠØ­."],
    },
    assessment: {
      title: "Ø£Ø¯ÙˆØ§Øª ØªÙ‚ÙŠÙŠÙ…",
      ideas: ["Ù‚Ø§Ø¦Ù…Ø© Ø±ØµØ¯ Ù…Ù† 4 Ù…Ø¤Ø´Ø±Ø§Øª: ÙŠÙÙ‡Ù…ØŒ ÙŠØ·Ø¨Ù‚ØŒ ÙŠØµØ­Ø­ØŒ ÙŠÙ†Ø¬Ø² Ø¨Ø§Ø³ØªÙ‚Ù„Ø§Ù„ÙŠØ©.", "Ø§Ø®ØªØ¨Ø§Ø± Ù‚Ø¨Ù„ÙŠ ÙˆØ¨Ø¹Ø¯ÙŠ Ù…Ù† 5 Ø£Ø³Ø¦Ù„Ø© Ù„Ù‚ÙŠØ§Ø³ Ø£Ø«Ø± Ø§Ù„Ø®Ø·Ø© Ø¨ÙˆØ¶ÙˆØ­."],
    },
    followup: {
      title: "Ù†Ù…ÙˆØ°Ø¬ Ù…ØªØ§Ø¨Ø¹Ø©",
      ideas: ["Ø¬Ø¯ÙˆÙ„ Ø£Ø³Ø¨ÙˆØ¹ÙŠ ÙŠØ³Ø¬Ù„ Ø§Ù„Ù…Ù‡Ø§Ø±Ø©ØŒ Ø§Ù„Ù†Ø´Ø§Ø·ØŒ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¥ØªÙ‚Ø§Ù†ØŒ ÙˆØ§Ù„Ø®Ø·ÙˆØ© Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©.", "Ù…Ù„Ø§Ø­Ø¸Ø© Ù…Ø®ØªØµØ±Ø© Ù„ÙˆÙ„ÙŠ Ø§Ù„Ø£Ù…Ø± ØªØªØ¶Ù…Ù† Ù…Ø§ ØªØ­Ø³Ù† ÙˆÙ…Ø§ ÙŠØ­ØªØ§Ø¬ ØªØ¯Ø±ÙŠØ¨Ù‹Ø§ Ù…Ù†Ø²Ù„ÙŠÙ‹Ø§."],
    },
  },
  gifted: {
    plan: {
      title: "Ø®Ø·Ø© Ø¥Ø«Ø±Ø§Ø¦ÙŠØ©",
      ideas: ["Ù…Ø³Ø§Ø± Ø¥Ø«Ø±Ø§Ø¦ÙŠ Ø£Ø³Ø¨ÙˆØ¹ÙŠ ÙŠÙ†ØªÙ‡ÙŠ Ø¨Ù…Ù†ØªØ¬ ÙˆØ§Ø¶Ø­: Ø¹Ø±Ø¶ØŒ Ù…Ù„ÙØŒ Ù†Ù…ÙˆØ°Ø¬ØŒ Ø£Ùˆ Ø­Ù„ Ù…Ø¨ØªÙƒØ±.", "Ø±Ø¨Ø· Ø§Ù„Ø®Ø·Ø© Ø¨Ù…Ø¹ÙŠØ§Ø± ØªÙ…ÙŠØ²: Ø¹Ù…Ù‚ Ø§Ù„ÙÙƒØ±Ø©ØŒ Ø¬ÙˆØ¯Ø© Ø§Ù„Ø¯Ù„ÙŠÙ„ØŒ ÙˆØ·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ø±Ø¶."],
    },
    project: {
      title: "Ù…Ø´Ø±ÙˆØ¹ Ø¨Ø­Ø«ÙŠ",
      ideas: ["Ø³Ø¤Ø§Ù„ Ø¨Ø­Ø«ÙŠ ØµØºÙŠØ± ÙŠØ¬Ù…Ø¹ ÙÙŠÙ‡ Ø§Ù„Ù…ØªØ¹Ù„Ù… Ù…ØµØ¯Ø±ÙŠÙ† ÙˆÙŠÙ‚Ø§Ø±Ù† Ø¨ÙŠÙ†Ù‡Ù…Ø§.", "Ø¹Ø±Ø¶ Ù†ØªÙŠØ¬Ø© Ø§Ù„Ø¨Ø­Ø« ÙÙŠ ØµÙØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ø£Ùˆ Ø¥Ù†ÙÙˆØ¬Ø±Ø§ÙÙŠÙƒ Ù…Ø®ØªØµØ±."],
    },
    thinking: {
      title: "Ù…Ù‡Ø§Ù… ØªÙÙƒÙŠØ± Ø¹Ù„ÙŠØ§",
      ideas: ["Ø³Ø¤Ø§Ù„ Ù…ÙØªÙˆØ­ Ù„Ù‡ Ø£ÙƒØ«Ø± Ù…Ù† Ø­Ù„ Ù…Ø¹ Ø·Ù„Ø¨ ØªØ¨Ø±ÙŠØ± Ø§Ù„Ø­Ù„ Ø§Ù„Ø£ÙØ¶Ù„.", "Ù…Ù‡Ù…Ø© ØªØ­Ù„ÙŠÙ„ Ù…ÙˆÙ‚Ù Ø«Ù… Ø§Ù‚ØªØ±Ø§Ø­ Ø­Ù„ Ù…Ø¨ØªÙƒØ± Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªØ·Ø¨ÙŠÙ‚."],
    },
    competitions: {
      title: "Ù…Ø³Ø§Ø¨Ù‚Ø§Øª Ù…Ù‚ØªØ±Ø­Ø©",
      ideas: ["ØªØ­Ø¯ÙŠ Ø¹Ø±Ø¶ Ø´ÙÙ‡ÙŠ Ù„Ù…Ø¯Ø© Ø¯Ù‚ÙŠÙ‚ØªÙŠÙ† Ø¹Ù† ÙÙƒØ±Ø© ØªØ¹Ù„Ù…Ù‡Ø§ Ø§Ù„Ù…ØªØ¹Ù„Ù… Ø¨Ø¹Ù…Ù‚.", "Ù…Ø³Ø§Ø¨Ù‚Ø© Ù…Ù†ØªØ¬ Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ: Ù‚ØµØ©ØŒ Ù†Ù…ÙˆØ°Ø¬ØŒ Ù…Ù„ØµÙ‚ Ø¹Ù„Ù…ÙŠØŒ Ø£Ùˆ Ø¹Ø±Ø¶ Ø±Ù‚Ù…ÙŠ."],
    },
    creative: {
      title: "Ø£Ù†Ø´Ø·Ø© Ø¥Ø¨Ø¯Ø§Ø¹ÙŠØ©",
      ideas: ["Ø¥Ù†ØªØ§Ø¬ Ù‚ØµØ© Ù‚ØµÙŠØ±Ø© Ø£Ùˆ Ø¨ÙˆØ¯ÙƒØ§Ø³Øª ÙŠØ´Ø±Ø­ Ù…ÙÙ‡ÙˆÙ…Ù‹Ø§ Ø¯Ø±Ø§Ø³ÙŠÙ‹Ø§.", "ØªØµÙ…ÙŠÙ… Ù„ÙˆØ­Ø© Ù…Ø¹Ø±ÙØ© Ø£Ùˆ Ù„Ø¹Ø¨Ø© ØªØ¹Ù„ÙŠÙ…ÙŠØ© ØªØ³Ø§Ø¹Ø¯ Ø§Ù„Ø²Ù…Ù„Ø§Ø¡ Ø¹Ù„Ù‰ ÙÙ‡Ù… Ø§Ù„Ø¯Ø±Ø³."],
    },
  },
};

function updateAuthUI() {
  const loggedIn = Boolean(currentUser);
  document.body.classList.toggle("is-logged-in", loggedIn);
  sidebarUser.hidden = !loggedIn;

  if (loggedIn) {
    const name = currentUser.name;
    loginButtonText.textContent = name;
    sidebarUserName.textContent = name;
    userInitial.textContent = name.trim().charAt(0) || "Ù…";
    loginButton.classList.add("logged");
    return;
  }

  loginButtonText.textContent = "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„";
  loginButton.classList.remove("logged");
}

function openLogin() {
  loginError.textContent = "";
  passwordInput.value = "";
  loginDialog.showModal();
  window.setTimeout(() => usernameInput.focus(), 80);
}

async function loginUser(name, password) {
  try {
    const email = loginNameToEmail(name);
    let credential;
    try {
      credential = await signInWithEmailAndPassword(auth, email, password);
    } catch {
      credential = await createUserWithEmailAndPassword(auth, email, password);
    }
    currentUser = {
      id: credential.user.uid,
      name,
      email,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem("munjaz.user", JSON.stringify(currentUser));
    updateAuthUI();
    loginDialog.close();
    await saveRemoteState();
    await loadRemoteState();
  } catch (error) {
    if (HAS_LOCAL_API) {
      try {
        const data = await apiRequest("/api/login", {
          method: "POST",
          body: JSON.stringify({ name, password }),
        });
        currentUser = data.user;
        localStorage.setItem("munjaz.user", JSON.stringify(currentUser));
        updateAuthUI();
        loginDialog.close();
        await loadRemoteState();
        return;
      } catch (apiError) {
        loginError.textContent = apiError.message || "تعذر تسجيل الدخول.";
        return;
      }
    }

    if (error.code === "auth/email-already-in-use" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
      loginError.textContent = "البيانات غير صحيحة أو الحساب موجود بكلمة مرور مختلفة.";
      return;
    }

    if (error.code === "auth/operation-not-allowed") {
      loginError.textContent = "فعلي Email/Password من Firebase Authentication أولاً.";
      return;
    }

    loginError.textContent = "تعذر الاتصال بفايربيس. تأكدي من تفعيل Authentication و Firestore.";
  }
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem("munjaz.user");
  updateAuthUI();
  signOut(auth).catch(() => {});
}
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatArabicDate(dateKey) {
  const date = new Date(`${dateKey}T12:00:00`);
  return date.toLocaleDateString("ar", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function saveCalendarEvents() {
  localStorage.setItem("munjaz.calendarEvents", JSON.stringify(calendarEvents));
  saveRemoteState().catch(() => {});
  if (HAS_LOCAL_API) {
    apiRequest("/api/calendar-events", {
      method: "PUT",
      body: JSON.stringify({ calendarEvents }),
    }).catch(() => {});
  }
}

function getEventsForDate(dateKey) {
  return calendarEvents
    .filter((event) => event.date === dateKey)
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
}

function renderSelectedDay() {
  selectedDayTitle.textContent = formatArabicDate(selectedCalendarDate);
  const dayEvents = getEventsForDate(selectedCalendarDate);

  if (!dayEvents.length) {
    selectedDayEvents.innerHTML = '<div class="empty-day">Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…ÙˆØ§Ø¹ÙŠØ¯ ÙÙŠ Ù‡Ø°Ø§ Ø§Ù„ÙŠÙˆÙ….</div>';
    return;
  }

  selectedDayEvents.innerHTML = dayEvents
    .map(
      (event) => `
        <article class="${event.type}">
          <div>
            <strong>${escapeHtml(event.title)}</strong>
            <span>${calendarTypeLabels[event.type]} â€¢ ${event.time || "Ø¨Ø¯ÙˆÙ† ÙˆÙ‚Øª"}</span>
          </div>
          <p>${escapeHtml(event.notes || "Ø¨Ø¯ÙˆÙ† Ù…Ù„Ø§Ø­Ø¸Ø§Øª")}</p>
          <small>ØªÙ†Ø¨ÙŠÙ‡: Ù‚Ø¨Ù„ ${event.reminder} ${event.reminder === "1" ? "ÙŠÙˆÙ…" : "Ø£ÙŠØ§Ù…"}</small>
          <button type="button" data-delete-event="${event.id}">Ø­Ø°Ù</button>
        </article>
      `,
    )
    .join("");
}

function openEventDialog(id) {
  const event = calendarEvents.find((item) => item.id === id);
  if (!event) return;

  eventDialogType.textContent = calendarTypeLabels[event.type] || "ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…ÙˆØ¹Ø¯";
  eventDialogTitle.textContent = event.title;
  eventDialogDate.textContent = formatArabicDate(event.date);
  eventDialogTime.textContent = event.time ? `Ø§Ù„ÙˆÙ‚Øª: ${event.time}` : "Ø¨Ø¯ÙˆÙ† ÙˆÙ‚Øª Ù…Ø­Ø¯Ø¯";
  eventDialogReminder.textContent = `ØªÙ†Ø¨ÙŠÙ‡ Ù‚Ø¨Ù„ ${event.reminder} ${event.reminder === "1" ? "ÙŠÙˆÙ…" : "Ø£ÙŠØ§Ù…"}`;
  eventDialogNotes.textContent = event.notes || "Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø£Ùˆ Ù…Ø±ÙÙ‚Ø§Øª.";
  eventDialog.showModal();
}

function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  calendarMonthLabel.textContent = calendarDate.toLocaleDateString("ar", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay.getDay();
  const todayKey = formatDateKey(new Date());
  const cells = [];

  for (let i = 0; i < startOffset; i += 1) {
    cells.push('<article class="muted"></article>');
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dateKey = formatDateKey(date);
    const dayEvents = getEventsForDate(dateKey);
    const eventsHtml = dayEvents
      .slice(0, 3)
      .map((event) => `<em class="${event.type}" data-event-id="${event.id}">${escapeHtml(event.title)}</em>`)
      .join("");

    cells.push(`
      <article class="${dateKey === selectedCalendarDate ? "selected" : ""} ${dateKey === todayKey ? "today" : ""}" data-calendar-day="${dateKey}">
        <b>${day}</b>
        ${eventsHtml}
        ${dayEvents.length > 3 ? `<small>+${dayEvents.length - 3}</small>` : ""}
      </article>
    `);
  }

  calendarCells.innerHTML = cells.join("");
  renderSelectedDay();
}

function addCalendarEventItem() {
  const title = eventTitle.value.trim();
  const date = eventDate.value || selectedCalendarDate;

  if (!title) {
    calendarStatus.textContent = "Ø§ÙƒØªØ¨ Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ù†Ø´Ø§Ø· Ø£ÙˆÙ„Ù‹Ø§.";
    calendarStatus.classList.add("error");
    eventTitle.focus();
    return;
  }

  calendarEvents.push({
    id: crypto.randomUUID(),
    title,
    type: eventType.value,
    date,
    time: eventTime.value,
    reminder: eventReminder.value,
    notes: eventNotes.value.trim(),
  });

  selectedCalendarDate = date;
  calendarDate = new Date(`${date}T12:00:00`);
  eventTitle.value = "";
  eventTime.value = "";
  eventNotes.value = "";
  calendarStatus.textContent = "ØªÙ…Øª Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…ÙˆØ¹Ø¯ Ø¥Ù„Ù‰ Ø§Ù„Ø±Ø²Ù†Ø§Ù…Ø©.";
  calendarStatus.classList.remove("error");
  saveCalendarEvents();
  renderCalendar();
  renderReport(activeReport);
}

function deleteCalendarEvent(id) {
  calendarEvents = calendarEvents.filter((event) => event.id !== id);
  saveCalendarEvents();
  renderCalendar();
  renderReport(activeReport);
}

loginButton.addEventListener("click", () => {
  if (currentUser) {
    showPage("profile");
    return;
  }
  openLogin();
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!name) {
    loginError.textContent = "Ø§ÙƒØªØ¨ Ø§Ø³Ù… Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø£ÙˆÙ„Ù‹Ø§.";
    usernameInput.focus();
    return;
  }

  if (password.length < 6) {
    loginError.textContent = "كلمة المرور يجب أن تكون 6 أحرف أو أكثر.";
    passwordInput.focus();
    return;
  }

  await loginUser(name, password);
});

cancelLogin.addEventListener("click", () => {
  loginDialog.close();
});

logoutButton.addEventListener("click", logoutUser);

function showPage(page) {
  views.forEach((view) => {
    view.classList.toggle("active", view.dataset.page === page);
  });
  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === page);
  });
  window.location.hash = page;
}

window.addEventListener("hashchange", () => {
  const page = window.location.hash.replace("#", "") || "home";
  if (document.querySelector(`[data-page="${page}"]`)) {
    showPage(page);
  }
});

function renderPortfolio(tabKey = activePortfolio) {
  activePortfolio = tabKey;
  const config = portfolioConfig[tabKey];
  portfolioTitle.textContent = config.title;

  portfolioTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.portfolioTab === tabKey);
  });

  portfolioFields.innerHTML = config.fields
    .map((field, index) => {
      const isLong = field.includes("Ù…Ù„Ø§Ø­Ø¸Ø§Øª") || field.includes("Ø§Ù„Ø£Ø«Ø±") || field.includes("Ø¢Ù„ÙŠØ©") || field.includes("Ø§Ù„Ù…Ø±ÙÙ‚Ø§Øª");
      const input = field.includes("Ø§Ù„ØªØ§Ø±ÙŠØ®")
        ? `<input id="field-${index}" type="date" />`
        : isLong
          ? `<textarea id="field-${index}" rows="5" placeholder="${field}"></textarea>`
          : `<input id="field-${index}" type="text" placeholder="${field}" />`;
      return `<label class="${isLong ? "wide" : ""}">${field}${input}</label>`;
    })
    .join("");

  attachmentList.innerHTML = config.attachments.map((item) => `<span>${item}</span>`).join("");
  fieldCount.textContent = config.fields.length;
  currentEvidence = [];
  renderSelectedEvidence();
  portfolioStatus.textContent = "";
  renderSavedAchievements();
}

function renderSelectedEvidence() {
  if (!selectedEvidence) return;
  attachmentCount.textContent = currentEvidence.length;

  if (!currentEvidence.length) {
    selectedEvidence.innerHTML = '<p>Ù„Ø§ ØªÙˆØ¬Ø¯ Ø´ÙˆØ§Ù‡Ø¯ Ù…Ø¶Ø§ÙØ© Ø¨Ø¹Ø¯.</p>';
    return;
  }

  selectedEvidence.innerHTML = currentEvidence
    .map(
      (item, index) => `
        <span>
          <b>${item.kind === "link" ? "Ø±Ø§Ø¨Ø·" : "Ù…Ù„Ù"}</b>
          ${escapeHtml(item.name)}
          <button type="button" data-remove-evidence="${index}">Ø­Ø°Ù</button>
        </span>
      `,
    )
    .join("");
}

function renderSavedAchievements() {
  const filtered = achievements.filter((item) => item.type === activePortfolio);
  savedCount.textContent = filtered.length;

  if (!filtered.length) {
    savedAchievements.innerHTML = '<div class="empty-saved">Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¥Ù†Ø¬Ø§Ø²Ø§Øª Ù…Ø­ÙÙˆØ¸Ø© ÙÙŠ Ù‡Ø°Ø§ Ø§Ù„Ù‚Ø³Ù… Ø¨Ø¹Ø¯.</div>';
    return;
  }

  savedAchievements.innerHTML = filtered
    .map(
      (item) => `
        <article>
          <div class="saved-achievement-head">
            <strong>${escapeHtml(item.title)}</strong>
            <button type="button" data-delete-achievement="${item.id}">Ø­Ø°Ù</button>
          </div>
          <span>${item.date || "Ø¨Ø¯ÙˆÙ† ØªØ§Ø±ÙŠØ®"} â€¢ ${portfolioConfig[item.type]?.title || "Ø¥Ù†Ø¬Ø§Ø²"}</span>
          <p>${escapeHtml(item.summary)}</p>
          <div class="saved-evidence">
            ${(item.evidence || []).map(renderEvidenceItem).join("") || "<em>Ø¨Ø¯ÙˆÙ† Ù…Ø±ÙÙ‚Ø§Øª</em>"}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderEvidenceItem(evidence) {
  const label = `${evidence.kind === "link" ? "Ø±Ø§Ø¨Ø·" : "Ù…Ù„Ù"}: ${escapeHtml(evidence.name)}`;
  if (evidence.kind === "link" && evidence.url) {
    return `<a href="${escapeHtml(evidence.url)}" target="_blank" rel="noopener">${label}</a>`;
  }
  if (evidence.dataUrl) {
    return `<a href="${evidence.dataUrl}" download="${escapeHtml(evidence.name)}">${label}</a>`;
  }
  return `<em>${label} - Ù…Ø­ÙÙˆØ¸ ÙƒØ§Ø³Ù… ÙÙ‚Ø·</em>`;
}

function saveAchievement() {
  const config = portfolioConfig[activePortfolio];
  const values = config.fields.map((_, index) => document.querySelector(`#field-${index}`)?.value.trim() || "");
  const title = values.find(Boolean) || config.title;
  const dateIndex = config.fields.findIndex((field) => field.includes("Ø§Ù„ØªØ§Ø±ÙŠØ®"));
  const date = dateIndex >= 0 ? values[dateIndex] : "";

  if (!values.some(Boolean) && !currentEvidence.length) {
    portfolioStatus.textContent = "Ø£Ø¶Ù Ø¨ÙŠØ§Ù†Ø§Øª Ø£Ùˆ Ø´ÙˆØ§Ù‡Ø¯ Ù‚Ø¨Ù„ Ø­ÙØ¸ Ø§Ù„Ø¥Ù†Ø¬Ø§Ø².";
    portfolioStatus.classList.add("error");
    return;
  }

  achievements.unshift({
    id: crypto.randomUUID(),
    type: activePortfolio,
    title,
    date,
    summary: values.filter(Boolean).slice(1, 4).join(" - ") || "ØªÙ… Ø­ÙØ¸ Ø¥Ù†Ø¬Ø§Ø² Ø¬Ø¯ÙŠØ¯.",
    evidence: currentEvidence,
    createdAt: new Date().toISOString(),
  });

  persistAchievements();
  currentEvidence = [];
  renderSelectedEvidence();
  portfolioStatus.textContent = "ØªÙ… Ø­ÙØ¸ Ø§Ù„Ø¥Ù†Ø¬Ø§Ø² ÙˆØ¥Ø¶Ø§ÙØªÙ‡ Ø¥Ù„Ù‰ Ù…Ù„Ù Ø§Ù„Ø¥Ù†Ø¬Ø§Ø².";
  portfolioStatus.classList.remove("error");
  config.fields.forEach((_, index) => {
    const field = document.querySelector(`#field-${index}`);
    if (field) field.value = "";
  });
  renderSavedAchievements();
  renderReport(activeReport);
}

function deleteAchievement(id) {
  achievements = achievements.filter((item) => item.id !== id);
  persistAchievements();
  renderSavedAchievements();
  renderReport(activeReport);
}

function getItemDate(item) {
  const value = item.date || item.createdAt || "";
  if (!value) return null;
  const date = new Date(value.includes("T") ? value : `${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isInReportRange(item, type) {
  if (type === "annual" || type === "full") return true;
  const itemDate = getItemDate(item);
  if (!itemDate) return true;
  const itemMonth = itemDate.getMonth();
  const itemYear = itemDate.getFullYear();
  const baseMonth = calendarDate.getMonth();
  const baseYear = calendarDate.getFullYear();

  if (type === "monthly") {
    return itemMonth === baseMonth && itemYear === baseYear;
  }

  const termMonths = baseMonth < 2 || baseMonth > 7 ? [8, 9, 10, 11, 0, 1] : [2, 3, 4, 5, 6, 7];
  return termMonths.includes(itemMonth);
}

function countBy(items, getKey) {
  return items.reduce((totals, item) => {
    const key = getKey(item);
    totals[key] = (totals[key] || 0) + 1;
    return totals;
  }, {});
}

function renderMiniList(items, emptyText, formatter) {
  if (!items.length) return `<p class="report-empty">${emptyText}</p>`;
  return `<ul>${items.map(formatter).join("")}</ul>`;
}

function renderReport(type = activeReport) {
  if (!reportTitle || !reportStats || !reportSections) return;
  activeReport = type;

  reportButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.reportType === type);
  });

  const filteredAchievements = achievements.filter((item) => isInReportRange(item, type));
  const filteredEvents = calendarEvents.filter((item) => isInReportRange(item, type));
  const evidenceCount = filteredAchievements.reduce((total, item) => total + (item.evidence?.length || 0), 0);
  const portfolioTotals = countBy(filteredAchievements, (item) => portfolioConfig[item.type]?.title || "Ø¥Ù†Ø¬Ø§Ø² Ø¢Ø®Ø±");
  const eventTotals = countBy(filteredEvents, (item) => calendarTypeLabels[item.type] || "Ù…ÙˆØ¹Ø¯");
  const strongestArea = Object.entries(portfolioTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "Ù„Ù… ÙŠØ­Ø¯Ø¯ Ø¨Ø¹Ø¯";
  const monthName = calendarDate.toLocaleDateString("ar", { month: "long", year: "numeric" });
  const generatedAt = new Date().toLocaleDateString("ar", { day: "numeric", month: "long", year: "numeric" });

  reportTitle.textContent = `${reportLabels[type]} - ${type === "monthly" ? monthName : "Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ø¯Ø±Ø§Ø³ÙŠ"}`;
  reportGeneratedAt.textContent = `Ø¢Ø®Ø± ØªØ­Ø¯ÙŠØ«: ${generatedAt}`;

  reportStats.innerHTML = [
    ["Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø¥Ù†Ø¬Ø§Ø²Ø§Øª", filteredAchievements.length, "Ø¥Ù†Ø¬Ø§Ø²"],
    ["Ø§Ù„Ø´ÙˆØ§Ù‡Ø¯ Ø§Ù„Ù…Ø±ÙÙˆØ¹Ø©", evidenceCount, "Ù…Ù„Ù / Ø±Ø§Ø¨Ø·"],
    ["Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø±Ø²Ù†Ø§Ù…Ø©", filteredEvents.length, "Ù…ÙˆØ¹Ø¯"],
    ["Ø£Ù‚ÙˆÙ‰ Ù…Ø¬Ø§Ù„", strongestArea, "Ø­Ø³Ø¨ Ø§Ù„ØªÙˆØ«ÙŠÙ‚"],
  ]
    .map(
      ([label, value, note]) => `
        <article>
          <span>${label}</span>
          <strong>${escapeHtml(value)}</strong>
          <small>${note}</small>
        </article>
      `,
    )
    .join("");

  const portfolioList = Object.entries(portfolioTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([label, total]) => `<li><span>${escapeHtml(label)}</span><b>${total}</b></li>`)
    .join("");

  const eventList = Object.entries(eventTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([label, total]) => `<li><span>${escapeHtml(label)}</span><b>${total}</b></li>`)
    .join("");

  reportSections.innerHTML = `
    <article class="report-summary">
      <h4>Ù…Ù„Ø®Øµ Ø§Ù„ØªÙ‚Ø±ÙŠØ±</h4>
      <p>${reportDescriptions[type]}</p>
      <p>ØªÙ… Ø±ØµØ¯ ${filteredAchievements.length} Ø¥Ù†Ø¬Ø§Ø²ØŒ Ùˆ${filteredEvents.length} Ù…ÙˆØ¹Ø¯ ÙÙŠ Ø§Ù„Ø±Ø²Ù†Ø§Ù…Ø©ØŒ Ù…Ø¹ ${evidenceCount} Ø´Ø§Ù‡Ø¯ Ù…Ø­ÙÙˆØ¸ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ù†ØµØ©.</p>
    </article>
    <article>
      <h4>ØªÙˆØ²ÙŠØ¹ Ù…Ù„Ù Ø§Ù„Ø¥Ù†Ø¬Ø§Ø²</h4>
      ${portfolioList ? `<ul class="report-bars">${portfolioList}</ul>` : '<p class="report-empty">Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¥Ù†Ø¬Ø§Ø²Ø§Øª Ù…Ø­ÙÙˆØ¸Ø© Ø¶Ù…Ù† Ù‡Ø°Ø§ Ø§Ù„Ù†Ø·Ø§Ù‚.</p>'}
    </article>
    <article>
      <h4>ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ø±Ø²Ù†Ø§Ù…Ø©</h4>
      ${eventList ? `<ul class="report-bars">${eventList}</ul>` : '<p class="report-empty">Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…ÙˆØ§Ø¹ÙŠØ¯ Ù…Ø³Ø¬Ù„Ø© Ø¶Ù…Ù† Ù‡Ø°Ø§ Ø§Ù„Ù†Ø·Ø§Ù‚.</p>'}
    </article>
    <article>
      <h4>Ø¢Ø®Ø± Ø§Ù„Ø¥Ù†Ø¬Ø§Ø²Ø§Øª</h4>
      ${renderMiniList(
        filteredAchievements.slice(0, 4),
        "Ø§Ø¨Ø¯Ø£ Ø¨Ø¥Ø¶Ø§ÙØ© Ø¥Ù†Ø¬Ø§Ø² Ù…Ù† ØµÙØ­Ø© Ù…Ù„Ù Ø§Ù„Ø¥Ù†Ø¬Ø§Ø² Ù„ÙŠØ¸Ù‡Ø± Ù‡Ù†Ø§.",
        (item) => `<li><span>${escapeHtml(item.title)}</span><small>${item.date || "Ø¨Ø¯ÙˆÙ† ØªØ§Ø±ÙŠØ®"} - ${portfolioConfig[item.type]?.title || "Ø¥Ù†Ø¬Ø§Ø²"}</small></li>`,
      )}
    </article>
    <article>
      <h4>Ø§Ù„Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©</h4>
      ${renderMiniList(
        filteredEvents.slice(0, 5),
        "Ø£Ø¶Ù Ù…ÙˆØ¹Ø¯Ø§ ÙÙŠ Ø§Ù„Ø±Ø²Ù†Ø§Ù…Ø© Ù„ÙŠØ¸Ù‡Ø± Ø¶Ù…Ù† Ø§Ù„ØªÙ‚Ø±ÙŠØ±.",
        (item) => `<li><span>${escapeHtml(item.title)}</span><small>${formatArabicDate(item.date)} - ${item.time || "Ø¨Ø¯ÙˆÙ† ÙˆÙ‚Øª"}</small></li>`,
      )}
    </article>
    <article class="report-summary">
      <h4>ØªÙˆØµÙŠØ© Ù…Ù‡Ù†ÙŠØ©</h4>
      <p>Ù„Ø¬Ø¹Ù„ Ø§Ù„Ù…Ù„Ù Ø£Ù‚ÙˆÙ‰ Ø¹Ù†Ø¯ Ø§Ù„ØªÙ‚Ø¯ÙŠÙ…ØŒ Ø£Ø±ÙÙ‚ Ø´Ø§Ù‡Ø¯Ø§ ÙˆØ§Ø­Ø¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ Ù„ÙƒÙ„ Ø¥Ù†Ø¬Ø§Ø²ØŒ ÙˆÙˆØ§Ø²Ù† Ø¨ÙŠÙ† Ø§Ù„ØªÙ†Ù…ÙŠØ© Ø§Ù„Ù…Ù‡Ù†ÙŠØ©ØŒ Ø§Ù„Ø¯Ø±ÙˆØ³ Ø§Ù„Ø±ÙŠØ§Ø¯ÙŠØ©ØŒ ÙˆØ§Ù„Ø£Ù†Ø´Ø·Ø© Ø§Ù„Ù…Ø¯Ø±Ø³ÙŠØ©.</p>
    </article>
  `;
}

async function addEvidenceFiles(files) {
  const evidence = await Promise.all([...files].map(readFileAsDataUrl));
  currentEvidence.push(...evidence);
  renderSelectedEvidence();
}

function addEvidenceUrl() {
  const url = evidenceLink.value.trim();
  if (!url) return;

  currentEvidence.push({
    kind: "link",
    name: url,
    url,
  });
  evidenceLink.value = "";
  renderSelectedEvidence();
}

function getIdeaKey(query) {
  if (query.includes("Ù‚Ø±Ø§Ø¡Ø©") || query.includes("ÙÙ‡Ù…") || query.includes("Ø·Ù„Ø§Ù‚Ø©")) return "reading";
  if (query.includes("ÙƒØªØ§Ø¨Ø©") || query.includes("Ø¥Ù…Ù„Ø§Ø¡") || query.includes("Ø¥Ø¨Ø¯Ø§Ø¹")) return "writing";
  if (query.includes("Ø±ÙŠØ§Ø¶") || query.includes("Ù…Ø³Ø§Ø¦Ù„") || query.includes("Ø­Ù„")) return "math";
  if (query.includes("ØªÙ‚ÙŠÙŠÙ…") || query.includes("Ù‚ÙŠØ§Ø³") || query.includes("Ø£Ø¯Ø§Ø©") || query.includes("Ø§Ø¯Ø§Ø©")) return "assessment";
  if (query.includes("ØªÙÙƒÙŠØ±") || query.includes("Ø¹Ù„ÙŠØ§") || query.includes("ØªØ­Ù„ÙŠÙ„") || query.includes("Ø§Ø¨ØªÙƒØ§Ø±")) return "thinking";
  if (query.includes("Ø¨Ø­Ø«") || query.includes("Ù…Ø´Ø±ÙˆØ¹") || query.includes("Ù…ØµØ§Ø¯Ø±")) return "research";
  return "default";
}

function renderIdeas(type, sourceEvent) {
  const topic = sourceEvent?.currentTarget?.dataset.ideaTopic || document.activeElement?.dataset.ideaTopic || "plan";
  const input = document.querySelector(`.idea-search[data-idea-type="${type}"][data-idea-topic="${topic}"]`);
  const output = document.querySelector(`[data-idea-results="${type}-${topic}"]`);
  if (!input || !output) return;

  const key = getIdeaKey(input.value.trim());
  const ideas = ideaBank[type]?.[topic]?.[key] || ideaBank[type]?.[topic]?.default || [];
  output.innerHTML = ideas.map((idea) => `<span>${idea}</span>`).join("");
}

function showSuggestion(type, topic, trigger) {
  const panel = document.querySelector(`[data-suggestion-panel="${type}"]`);
  const suggestion = suggestionBank[type]?.[topic];
  if (!panel || !suggestion) return;

  panel.querySelector("h4").textContent = suggestion.title;
  panel.querySelector("ul").innerHTML = suggestion.ideas.map((idea) => `<li>${idea}</li>`).join("");

  document.querySelectorAll(`[data-suggest-type="${type}"]`).forEach((button) => {
    button.classList.toggle("active", button === trigger);
  });
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
  });
});

pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.pageButton);
  });
});

printButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.dataset.print;
    if (page && document.querySelector(`[data-page="${page}"]`)) {
      showPage(page);
    }
    window.setTimeout(() => window.print(), 120);
  });
});

reportButtons.forEach((button) => {
  button.addEventListener("click", () => renderReport(button.dataset.reportType));
});

evidenceFiles.addEventListener("change", () => {
  addEvidenceFiles(evidenceFiles.files);
  evidenceFiles.value = "";
});

addEvidenceLink.addEventListener("click", addEvidenceUrl);

evidenceLink.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addEvidenceUrl();
  }
});

selectedEvidence.addEventListener("click", (event) => {
  const index = event.target.dataset.removeEvidence;
  if (index === undefined) return;
  currentEvidence.splice(Number(index), 1);
  renderSelectedEvidence();
});

savedAchievements.addEventListener("click", (event) => {
  const id = event.target.dataset.deleteAchievement;
  if (!id) return;
  deleteAchievement(id);
});

prevMonth.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  renderCalendar();
  renderReport(activeReport);
});

nextMonth.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  renderCalendar();
  renderReport(activeReport);
});

calendarCells.addEventListener("click", (event) => {
  const eventChip = event.target.closest("[data-event-id]");
  if (eventChip) {
    event.stopPropagation();
    openEventDialog(eventChip.dataset.eventId);
    return;
  }

  const cell = event.target.closest("[data-calendar-day]");
  if (!cell) return;
  selectedCalendarDate = cell.dataset.calendarDay;
  eventDate.value = selectedCalendarDate;
  document.querySelector(".day-details").open = true;
  renderCalendar();
});

selectedDayEvents.addEventListener("click", (event) => {
  const id = event.target.dataset.deleteEvent;
  if (!id) return;
  deleteCalendarEvent(id);
});

addCalendarEvent.addEventListener("click", addCalendarEventItem);

ideaSearches.forEach((input) => {
  input.addEventListener("input", (event) => renderIdeas(input.dataset.ideaType, event));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderIdeas(input.dataset.ideaType, event);
    }
  });
});

ideaButtons.forEach((button) => {
  button.addEventListener("click", (event) => renderIdeas(button.dataset.ideaType, event));
});

suggestionTriggers.forEach((button) => {
  button.addEventListener("click", () => {
    showSuggestion(button.dataset.suggestType, button.dataset.suggestTopic, button);
  });
});

portfolioTabs.forEach((tab) => {
  tab.addEventListener("click", () => renderPortfolio(tab.dataset.portfolioTab));
});

document.querySelector("#saveAchievement").addEventListener("click", saveAchievement);

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  const savedUser = JSON.parse(localStorage.getItem("munjaz.user") || "null");
  currentUser = {
    id: user.uid,
    name: savedUser?.id === user.uid ? savedUser.name : user.email,
    email: user.email,
    loginAt: new Date().toISOString(),
  };
  localStorage.setItem("munjaz.user", JSON.stringify(currentUser));
  updateAuthUI();
  await loadRemoteState();
});

const initialPage = window.location.hash.replace("#", "") || "home";
if (document.querySelector(`[data-page="${initialPage}"]`)) {
  showPage(initialPage);
}

updateAuthUI();
renderPortfolio();
eventDate.value = selectedCalendarDate;
renderCalendar();
renderReport();
loadRemoteState();

