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
const passwordLabel = passwordInput.closest("label");
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
    title: "اجتماع فني",
    fields: ["عنوان الاجتماع", "التاريخ", "الجهة أو القسم", "ملاحظات الاجتماع"],
    attachments: ["محضر الاجتماع PDF", "صورة التوقيع", "ملاحظات"],
  },
  lessons: {
    title: "درس ريادي",
    fields: ["عنوان الدرس", "المادة", "الصف", "التاريخ", "صور", "شهادة"],
    attachments: ["صور الدرس", "خطة الدرس", "الشهادة"],
  },
  development: {
    title: "تنمية مهنية",
    fields: ["اسم الورشة", "المدرب أو الجهة", "الساعات", "التاريخ", "الشهادة"],
    attachments: ["شهادة الحضور", "رابط الورشة", "صور"],
  },
  workshops: {
    title: "ورشة مقدمة",
    fields: ["عنوان الورشة", "الفئة المستهدفة", "عدد الحضور", "التاريخ", "صور التنفيذ"],
    attachments: ["الشهادة", "صور التنفيذ", "كشف الحضور"],
  },
  events: {
    title: "فعالية",
    fields: ["اسم الفعالية", "نوع المشاركة", "التاريخ", "الأثر", "الشواهد"],
    attachments: ["صور", "شهادات", "تقرير الفعالية"],
  },
  radio: {
    title: "برنامج إذاعي",
    fields: ["عنوان البرنامج", "التاريخ", "رابط التسجيل", "المشاركون"],
    attachments: ["صور", "رابط التسجيل", "النص الإذاعي"],
  },
  activities: {
    title: "نشاط مدرسي",
    fields: ["النشاط", "الهدف", "الفئة المستهدفة", "المرفقات"],
    attachments: ["صور النشاط", "خطة النشاط", "تقرير مختصر"],
  },
  values: {
    title: "قيمة تربوية",
    fields: ["القيمة", "آلية التفعيل", "التاريخ", "الأدلة"],
    attachments: ["صور", "أدلة", "تقرير التفعيل"],
  },
  tasks: {
    title: "تكليف",
    fields: ["التكليف", "الجهة", "المدة", "المرفقات"],
    attachments: ["خطاب التكليف", "الشواهد", "التقرير"],
  },
  visits: {
    title: "تبادل زيارة",
    fields: ["اسم المعلم الزائر", "المادة", "التاريخ", "نموذج الزيارة"],
    attachments: ["نموذج الزيارة", "توقيع الحضور", "ملاحظات"],
  },
  competitions: {
    title: "مسابقة",
    fields: ["اسم المسابقة", "المستوى", "النتيجة", "الشهادة"],
    attachments: ["الشهادة", "صور المشاركة", "نتيجة المسابقة"],
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
      { id: "e1", title: "اجتماع فني", type: "meeting", date: "2026-10-04", time: "10:00", reminder: "3", notes: "محضر الاجتماع وشواهد الحضور" },
      { id: "e2", title: "درس ريادي", type: "lesson", date: "2026-10-09", time: "11:00", reminder: "7", notes: "خطة الدرس والصور" },
      { id: "e3", title: "فعالية مدرسية", type: "event", date: "2026-10-12", time: "09:00", reminder: "3", notes: "تقرير الفعالية" },
      { id: "e4", title: "إذاعة مدرسية", type: "radio", date: "2026-10-16", time: "08:40", reminder: "1", notes: "رابط التسجيل" },
      { id: "e5", title: "تسليم خطة علاجية", type: "plan", date: "2026-10-18", time: "12:00", reminder: "1", notes: "خطة المتعلم المتعثر" },
      { id: "e6", title: "مسابقة ثقافية", type: "competition", date: "2026-10-24", time: "10:00", reminder: "7", notes: "الشهادة والنتيجة" },
    ]),
);

achievements = cleanStoredData(achievements);
calendarEvents = cleanStoredData(calendarEvents);
localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
localStorage.setItem("munjaz.calendarEvents", JSON.stringify(calendarEvents));

const calendarTypeLabels = {
  meeting: "اجتماع فني",
  lesson: "درس ريادي",
  event: "فعالية مدرسية",
  radio: "إذاعة مدرسية",
  plan: "خطة علاجية",
  competition: "مسابقة",
};

const reportLabels = {
  monthly: "تقرير شهري",
  term: "تقرير فصل دراسي",
  annual: "تقرير سنوي",
  full: "ملف إنجاز كامل",
};

const reportDescriptions = {
  monthly: "يعرض ما تم توثيقه خلال الشهر المختار من إنجازات ومواعيد وشواهد.",
  term: "يلخص إنجازات الفصل الدراسي ويبرز المجالات الأقوى ونقاط المتابعة.",
  annual: "يعطي صورة سنوية رسمية عن الأداء المهني والأنشطة والشواهد.",
  full: "يجمع ملف الإنجاز كاملا مع الرزنامة والمؤشرات في نسخة واحدة منظمة.",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function repairMojibake(value) {
  if (typeof value !== "string" || !/[ØÙÃÂâ]/.test(value)) return value;

  const cp1252Bytes = {
    "€": 0x80,
    "‚": 0x82,
    "ƒ": 0x83,
    "„": 0x84,
    "…": 0x85,
    "†": 0x86,
    "‡": 0x87,
    "ˆ": 0x88,
    "‰": 0x89,
    "Š": 0x8a,
    "‹": 0x8b,
    "Œ": 0x8c,
    "Ž": 0x8e,
    "‘": 0x91,
    "’": 0x92,
    "“": 0x93,
    "”": 0x94,
    "•": 0x95,
    "–": 0x96,
    "—": 0x97,
    "˜": 0x98,
    "™": 0x99,
    "š": 0x9a,
    "›": 0x9b,
    "œ": 0x9c,
    "ž": 0x9e,
    "Ÿ": 0x9f,
  };

  try {
    const bytes = Uint8Array.from(Array.from(value), (letter) => cp1252Bytes[letter] ?? (letter.charCodeAt(0) & 255));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replaceAll("•", " - ");
  } catch {
    return value.replaceAll("â€¢", " - ");
  }
}

function cleanStoredData(value) {
  if (Array.isArray(value)) return value.map(cleanStoredData);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cleanStoredData(item)]));
  }
  return repairMojibake(value);
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
    const error = new Error(data.error || "تعذر الاتصال بالخادم.");
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
      profile: {
        name: currentUser.name,
        email: currentUser.email,
      },
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
  const stateRef = firebaseStateRef();
  if (stateRef) {
    try {
      const snapshot = await getDoc(stateRef);
      if (snapshot.exists()) {
        const state = cleanStoredData(snapshot.data());
        if (Array.isArray(state.achievements)) {
          achievements = state.achievements;
          localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
        }
        if (Array.isArray(state.calendarEvents)) {
          calendarEvents = state.calendarEvents;
          localStorage.setItem("munjaz.calendarEvents", JSON.stringify(calendarEvents));
        }
        await saveRemoteState();
      } else {
        await saveRemoteState();
      }
    } catch {}
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

  try {
    const state = await apiRequest("/api/state");
    if (Array.isArray(state.achievements) && state.achievements.length) {
      achievements = cleanStoredData(state.achievements);
      localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
    }
    if (Array.isArray(state.calendarEvents) && state.calendarEvents.length) {
      calendarEvents = cleanStoredData(state.calendarEvents);
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
      default: ["خطة 3 أسابيع بمهارة واحدة", "هدف قصير + نشاط + قياس أسبوعي"],
      reading: ["خطة طلاقة قرائية يومية", "هدف فهم مقروء مع نصوص قصيرة"],
      writing: ["خطة إملاء من قاعدة واحدة", "هدف كتابة جملة صحيحة يوميًا"],
      math: ["خطة حل مسائل بخطوات ثابتة", "هدف إتقان مهارة حسابية واحدة"],
    },
    activities: {
      default: ["بطاقات تدريب 10 دقائق", "نشاط تصحيح خطأ مع زميل"],
      reading: ["قراءة ثنائية مع بطاقة ملاحظة", "تلخيص شفهي بعد فقرة قصيرة"],
      writing: ["إملاء منظور ثم تصحيح ذاتي", "ترتيب كلمات لتكوين جملة"],
      math: ["لعبة خطوات الحل", "مسائل مصورة من الحياة اليومية"],
    },
    worksheets: {
      default: ["ورقة تدرج من السهل للصعب", "ورقة مقارنة قبل/بعد التعلم"],
      reading: ["ورقة استخراج فكرة رئيسية", "ورقة مفردات ومعاني"],
      writing: ["ورقة تصنيف الأخطاء الشائعة", "ورقة تدريب على قاعدة واحدة"],
      math: ["ورقة مسائل بثلاث مستويات", "ورقة إكمال خطوات الحل"],
    },
    assessment: {
      default: ["قائمة رصد أداء", "اختبار قصير قبل/بعد الخطة"],
      reading: ["سلم طلاقة قرائية", "بطاقة فهم مقروء من 5 أسئلة"],
      writing: ["Rubric إملاء مبسط", "سجل أخطاء متكررة"],
      math: ["اختبار مهارة من 6 مسائل", "بطاقة تحقق من خطوات الحل"],
    },
    followup: {
      default: ["جدول متابعة أسبوعي", "ملاحظة مختصرة لولي الأمر"],
      reading: ["سجل قراءة منزلية", "متابعة عدد الكلمات الصحيحة"],
      writing: ["سجل أخطاء إملائية متكررة", "متابعة واجب قصير أسبوعي"],
      math: ["متابعة إتقان كل خطوة", "رسم بياني للتحسن"],
    },
  },
  gifted: {
    plan: {
      default: ["خطة إثرائية بمخرجات واضحة", "مسار تعلم ذاتي أسبوعي"],
      research: ["خطة بحث بسؤال مركزي", "مسار قراءة مصادر وتحليلها"],
      writing: ["خطة كتابة إبداعية متدرجة", "ملف نصوص قصيرة مع تغذية راجعة"],
      thinking: ["خطة تحديات تفكير عليا", "مسار حل مشكلات مفتوحة"],
    },
    project: {
      default: ["سؤال بحثي + مصادر موثوقة", "عرض نتائج بإنفوجرافيك"],
      research: ["مقابلة قصيرة وجمع بيانات", "ملخص بحث من صفحة واحدة"],
      writing: ["مجلة صفية مصغرة", "مقال رأي مدعوم بأدلة"],
      thinking: ["مشروع حل مشكلة مدرسية", "نموذج أولي لفكرة مبتكرة"],
    },
    thinking: {
      default: ["سؤال مفتوح متعدد الحلول", "تصميم حل مبتكر لمشكلة"],
      research: ["تحليل مصدرين ومقارنة النتائج", "بناء فرضية واختبارها"],
      writing: ["نقد نص وإعادة بنائه", "كتابة نهاية بديلة مبررة"],
      thinking: ["مقارنة وتحليل موقف", "تصميم قرار مع تبرير الأدلة"],
    },
    competitions: {
      default: ["تحدي قراءة أو بحث مصغر", "مسابقة عرض شفهي قصير"],
      research: ["مسابقة ملصق علمي", "تحدي عرض نتائج البحث"],
      writing: ["مسابقة قصة قصيرة", "تحدي مقال رأي"],
      thinking: ["مسابقة حل مشكلات", "تحدي مناظرة مصغرة"],
    },
    creative: {
      default: ["إنتاج قصة أو بودكاست قصير", "تصميم لوحة معرفة للدرس"],
      research: ["فيديو دقيقة يلخص نتيجة", "خريطة مفاهيم تفاعلية"],
      writing: ["نشرة أدبية مصغرة", "سيناريو تمثيلي للمفهوم"],
      thinking: ["تصميم لعبة تعليمية", "ابتكار أداة شرح للزملاء"],
    },
  },
};

const suggestionBank = {
  struggling: {
    plan: {
      title: "خطة علاجية جاهزة",
      ideas: ["اختيار مهارة واحدة فقط لمدة 3 أسابيع مع هدف قابل للقياس.", "تقسيم الخطة إلى: تمهيد قصير، تدريب موجه، تطبيق فردي، قياس أسبوعي."],
    },
    activities: {
      title: "أنشطة قصيرة",
      ideas: ["نشاط بطاقات سريع: يختار المتعلم بطاقة ويطبق المهارة في 5 دقائق.", "نشاط زميل داعم: حل سؤال قصير ثم مقارنة الإجابة وتصحيح الخطأ."],
    },
    worksheets: {
      title: "أوراق عمل",
      ideas: ["ورقة عمل متدرجة: سؤال سهل، متوسط، ثم سؤال تطبيقي.", "ورقة أخطاء شائعة يحدد فيها المتعلم الخطأ ويكتب التصحيح."],
    },
    assessment: {
      title: "أدوات تقييم",
      ideas: ["قائمة رصد من 4 مؤشرات: يفهم، يطبق، يصحح، ينجز باستقلالية.", "اختبار قبلي وبعدي من 5 أسئلة لقياس أثر الخطة بوضوح."],
    },
    followup: {
      title: "نموذج متابعة",
      ideas: ["جدول أسبوعي يسجل المهارة، النشاط، مستوى الإتقان، والخطوة القادمة.", "ملاحظة مختصرة لولي الأمر تتضمن ما تحسن وما يحتاج تدريبًا منزليًا."],
    },
  },
  gifted: {
    plan: {
      title: "خطة إثرائية",
      ideas: ["مسار إثرائي أسبوعي ينتهي بمنتج واضح: عرض، ملف، نموذج، أو حل مبتكر.", "ربط الخطة بمعيار تميز: عمق الفكرة، جودة الدليل، وطريقة العرض."],
    },
    project: {
      title: "مشروع بحثي",
      ideas: ["سؤال بحثي صغير يجمع فيه المتعلم مصدرين ويقارن بينهما.", "عرض نتيجة البحث في صفحة واحدة أو إنفوجرافيك مختصر."],
    },
    thinking: {
      title: "مهام تفكير عليا",
      ideas: ["سؤال مفتوح له أكثر من حل مع طلب تبرير الحل الأفضل.", "مهمة تحليل موقف ثم اقتراح حل مبتكر قابل للتطبيق."],
    },
    competitions: {
      title: "مسابقات مقترحة",
      ideas: ["تحدي عرض شفهي لمدة دقيقتين عن فكرة تعلمها المتعلم بعمق.", "مسابقة منتج إبداعي: قصة، نموذج، ملصق علمي، أو عرض رقمي."],
    },
    creative: {
      title: "أنشطة إبداعية",
      ideas: ["إنتاج قصة قصيرة أو بودكاست يشرح مفهومًا دراسيًا.", "تصميم لوحة معرفة أو لعبة تعليمية تساعد الزملاء على فهم الدرس."],
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
    userInitial.textContent = name.trim().charAt(0) || "م";
    loginButton.classList.add("logged");
    return;
  }

  loginButtonText.textContent = "تسجيل الدخول";
  loginButton.classList.remove("logged");
}

function openLogin() {
  const emailLabel = usernameInput.closest("label");
  if (emailLabel?.firstChild) {
    emailLabel.firstChild.nodeValue = "البريد الإلكتروني";
  }
  usernameInput.type = "email";
  usernameInput.autocomplete = "email";
  usernameInput.placeholder = "example@moe.edu.kw";
  if (passwordLabel?.firstChild) {
    passwordLabel.firstChild.nodeValue = "الرقم السري";
  }
  passwordInput.placeholder = "6 أحرف أو أرقام أو أكثر";
  loginError.textContent = "";
  passwordInput.value = "";
  loginDialog.showModal();
  window.setTimeout(() => usernameInput.focus(), 80);
}

async function loginUser(email, password) {
  try {
    let credential;

    try {
      credential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (["auth/user-not-found", "auth/invalid-credential"].includes(error.code)) {
        credential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        throw error;
      }
    }

    currentUser = {
      id: credential.user.uid,
      name: email,
      email,
      loginAt: new Date().toISOString(),
    };
  } catch (error) {
    if (["auth/email-already-in-use", "auth/wrong-password"].includes(error.code)) {
      loginError.textContent = "البيانات غير صحيحة أو الحساب موجود بكلمة مرور مختلفة.";
      return;
    }

    if (error.code === "auth/operation-not-allowed") {
      loginError.textContent = "فعلي Email/Password من Firebase Authentication أولاً.";
      return;
    }

    if (HAS_LOCAL_API) {
      try {
        const data = await apiRequest("/api/login", {
          method: "POST",
          body: JSON.stringify({ name: email, password }),
        });
        currentUser = data.user;
      } catch {
        currentUser = createLocalSession(name);
      }
    } else {
      loginError.textContent = "تعذر الاتصال بفايربيس. تأكدي من تفعيل Authentication و Firestore.";
      return;
    }
  }

  localStorage.setItem("munjaz.user", JSON.stringify(currentUser));
  updateAuthUI();
  loginDialog.close();
  await saveRemoteState().catch(() => {});
  await loadRemoteState();
}

function logoutUser() {
  signOut(auth).catch(() => {});
  currentUser = null;
  localStorage.removeItem("munjaz.user");
  updateAuthUI();
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
    selectedDayEvents.innerHTML = '<div class="empty-day">لا توجد مواعيد في هذا اليوم.</div>';
    return;
  }

  selectedDayEvents.innerHTML = dayEvents
    .map(
      (event) => `
        <article class="${event.type}">
          <div>
            <strong>${escapeHtml(event.title)}</strong>
            <span>${calendarTypeLabels[event.type]} • ${event.time || "بدون وقت"}</span>
          </div>
          <p>${escapeHtml(event.notes || "بدون ملاحظات")}</p>
          <small>تنبيه: قبل ${event.reminder} ${event.reminder === "1" ? "يوم" : "أيام"}</small>
          <button type="button" data-delete-event="${event.id}">حذف</button>
        </article>
      `,
    )
    .join("");
}

function openEventDialog(id) {
  const event = calendarEvents.find((item) => item.id === id);
  if (!event) return;

  eventDialogType.textContent = calendarTypeLabels[event.type] || "تفاصيل الموعد";
  eventDialogTitle.textContent = event.title;
  eventDialogDate.textContent = formatArabicDate(event.date);
  eventDialogTime.textContent = event.time ? `الوقت: ${event.time}` : "بدون وقت محدد";
  eventDialogReminder.textContent = `تنبيه قبل ${event.reminder} ${event.reminder === "1" ? "يوم" : "أيام"}`;
  eventDialogNotes.textContent = event.notes || "لا توجد ملاحظات أو مرفقات.";
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
    calendarStatus.textContent = "اكتب عنوان النشاط أولًا.";
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
  calendarStatus.textContent = "تمت إضافة الموعد إلى الرزنامة.";
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
  const email = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !email.includes("@")) {
    loginError.textContent = "اكتب البريد الإلكتروني بشكل صحيح.";
    usernameInput.focus();
    return;
  }

  if (password.length < 6) {
    loginError.textContent = "الرقم السري يجب أن يكون 6 أحرف أو أرقام أو أكثر.";
    passwordInput.focus();
    return;
  }

  await loginUser(email, password);
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
      const isLong = field.includes("ملاحظات") || field.includes("الأثر") || field.includes("آلية") || field.includes("المرفقات");
      const input = field.includes("التاريخ")
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
    selectedEvidence.innerHTML = '<p>لا توجد شواهد مضافة بعد.</p>';
    return;
  }

  selectedEvidence.innerHTML = currentEvidence
    .map(
      (item, index) => `
        <span>
          <b>${item.kind === "link" ? "رابط" : "ملف"}</b>
          ${escapeHtml(item.name)}
          <button type="button" data-remove-evidence="${index}">حذف</button>
        </span>
      `,
    )
    .join("");
}

function renderSavedAchievements() {
  const filtered = achievements.filter((item) => item.type === activePortfolio);
  savedCount.textContent = filtered.length;

  if (!filtered.length) {
    savedAchievements.innerHTML = '<div class="empty-saved">لا توجد إنجازات محفوظة في هذا القسم بعد.</div>';
    return;
  }

  savedAchievements.innerHTML = filtered
    .map(
      (item) => `
        <article>
          <div class="saved-achievement-head">
            <strong>${escapeHtml(item.title)}</strong>
            <button type="button" data-delete-achievement="${item.id}">حذف</button>
          </div>
          <span>${item.date || "بدون تاريخ"} • ${portfolioConfig[item.type]?.title || "إنجاز"}</span>
          <p>${escapeHtml(item.summary)}</p>
          <div class="saved-evidence">
            ${(item.evidence || []).map(renderEvidenceItem).join("") || "<em>بدون مرفقات</em>"}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderEvidenceItem(evidence) {
  const label = `${evidence.kind === "link" ? "رابط" : "ملف"}: ${escapeHtml(evidence.name)}`;
  if (evidence.kind === "link" && evidence.url) {
    return `<a href="${escapeHtml(evidence.url)}" target="_blank" rel="noopener">${label}</a>`;
  }
  if (evidence.dataUrl) {
    return `<a href="${evidence.dataUrl}" download="${escapeHtml(evidence.name)}">${label}</a>`;
  }
  return `<em>${label} - محفوظ كاسم فقط</em>`;
}

function saveAchievement() {
  const config = portfolioConfig[activePortfolio];
  const values = config.fields.map((_, index) => document.querySelector(`#field-${index}`)?.value.trim() || "");
  const title = values.find(Boolean) || config.title;
  const dateIndex = config.fields.findIndex((field) => field.includes("التاريخ"));
  const date = dateIndex >= 0 ? values[dateIndex] : "";

  if (!values.some(Boolean) && !currentEvidence.length) {
    portfolioStatus.textContent = "أضف بيانات أو شواهد قبل حفظ الإنجاز.";
    portfolioStatus.classList.add("error");
    return;
  }

  achievements.unshift({
    id: crypto.randomUUID(),
    type: activePortfolio,
    title,
    date,
    summary: values.filter(Boolean).slice(1, 4).join(" - ") || "تم حفظ إنجاز جديد.",
    evidence: currentEvidence,
    createdAt: new Date().toISOString(),
  });

  persistAchievements();
  currentEvidence = [];
  renderSelectedEvidence();
  portfolioStatus.textContent = "تم حفظ الإنجاز وإضافته إلى ملف الإنجاز.";
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
  const portfolioTotals = countBy(filteredAchievements, (item) => portfolioConfig[item.type]?.title || "إنجاز آخر");
  const eventTotals = countBy(filteredEvents, (item) => calendarTypeLabels[item.type] || "موعد");
  const strongestArea = Object.entries(portfolioTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "لم يحدد بعد";
  const monthName = calendarDate.toLocaleDateString("ar", { month: "long", year: "numeric" });
  const generatedAt = new Date().toLocaleDateString("ar", { day: "numeric", month: "long", year: "numeric" });

  reportTitle.textContent = `${reportLabels[type]} - ${type === "monthly" ? monthName : "العام الدراسي"}`;
  reportGeneratedAt.textContent = `آخر تحديث: ${generatedAt}`;

  reportStats.innerHTML = [
    ["إجمالي الإنجازات", filteredAchievements.length, "إنجاز"],
    ["الشواهد المرفوعة", evidenceCount, "ملف / رابط"],
    ["مواعيد الرزنامة", filteredEvents.length, "موعد"],
    ["أقوى مجال", strongestArea, "حسب التوثيق"],
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
      <h4>ملخص التقرير</h4>
      <p>${reportDescriptions[type]}</p>
      <p>تم رصد ${filteredAchievements.length} إنجاز، و${filteredEvents.length} موعد في الرزنامة، مع ${evidenceCount} شاهد محفوظ داخل المنصة.</p>
    </article>
    <article>
      <h4>توزيع ملف الإنجاز</h4>
      ${portfolioList ? `<ul class="report-bars">${portfolioList}</ul>` : '<p class="report-empty">لا توجد إنجازات محفوظة ضمن هذا النطاق.</p>'}
    </article>
    <article>
      <h4>توزيع الرزنامة</h4>
      ${eventList ? `<ul class="report-bars">${eventList}</ul>` : '<p class="report-empty">لا توجد مواعيد مسجلة ضمن هذا النطاق.</p>'}
    </article>
    <article>
      <h4>آخر الإنجازات</h4>
      ${renderMiniList(
        filteredAchievements.slice(0, 4),
        "ابدأ بإضافة إنجاز من صفحة ملف الإنجاز ليظهر هنا.",
        (item) => `<li><span>${escapeHtml(item.title)}</span><small>${item.date || "بدون تاريخ"} - ${portfolioConfig[item.type]?.title || "إنجاز"}</small></li>`,
      )}
    </article>
    <article>
      <h4>المواعيد القادمة</h4>
      ${renderMiniList(
        filteredEvents.slice(0, 5),
        "أضف موعدا في الرزنامة ليظهر ضمن التقرير.",
        (item) => `<li><span>${escapeHtml(item.title)}</span><small>${formatArabicDate(item.date)} - ${item.time || "بدون وقت"}</small></li>`,
      )}
    </article>
    <article class="report-summary">
      <h4>توصية مهنية</h4>
      <p>لجعل الملف أقوى عند التقديم، أرفق شاهدا واحدا على الأقل لكل إنجاز، ووازن بين التنمية المهنية، الدروس الريادية، والأنشطة المدرسية.</p>
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
  if (query.includes("قراءة") || query.includes("فهم") || query.includes("طلاقة")) return "reading";
  if (query.includes("كتابة") || query.includes("إملاء") || query.includes("إبداع")) return "writing";
  if (query.includes("رياض") || query.includes("مسائل") || query.includes("حل")) return "math";
  if (query.includes("تقييم") || query.includes("قياس") || query.includes("أداة") || query.includes("اداة")) return "assessment";
  if (query.includes("تفكير") || query.includes("عليا") || query.includes("تحليل") || query.includes("ابتكار")) return "thinking";
  if (query.includes("بحث") || query.includes("مشروع") || query.includes("مصادر")) return "research";
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

const initialPage = window.location.hash.replace("#", "") || "home";
if (document.querySelector(`[data-page="${initialPage}"]`)) {
  showPage(initialPage);
}

updateAuthUI();
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const storedUser = JSON.parse(localStorage.getItem("munjaz.user") || "null");
  currentUser = {
    id: user.uid,
    name: storedUser?.name || user.displayName || user.email?.split("@")[0] || "معلم",
    email: user.email,
    loginAt: storedUser?.loginAt || new Date().toISOString(),
  };
  localStorage.setItem("munjaz.user", JSON.stringify(currentUser));
  updateAuthUI();
  await loadRemoteState();
});
renderPortfolio();
eventDate.value = selectedCalendarDate;
renderCalendar();
renderReport();
loadRemoteState();
