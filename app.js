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
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  writeBatch,
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
const profileInputs = {
  fullName: document.querySelector("#profileFullName"),
  employeeId: document.querySelector("#profileEmployeeId"),
  specialty: document.querySelector("#profileSpecialty"),
  stage: document.querySelector("#profileStage"),
  school: document.querySelector("#profileSchool"),
  department: document.querySelector("#profileDepartment"),
  district: document.querySelector("#profileDistrict"),
  email: document.querySelector("#profileEmail"),
  bio: document.querySelector("#profileBio"),
};
const saveProfileDetailsButton = document.querySelector("#saveProfileDetails");
const profileSaveStatus = document.querySelector("#profileSaveStatus");
const portfolioQr = document.querySelector("#portfolioQr");
const portfolioQrLink = document.querySelector("#portfolioQrLink");
const copyQrLink = document.querySelector("#copyQrLink");
const downloadQrLink = document.querySelector("#downloadQrLink");
const qrStatus = document.querySelector("#qrStatus");
const reportButtons = document.querySelectorAll("[data-report-type]");
const reportTitle = document.querySelector("#reportTitle");
const reportGeneratedAt = document.querySelector("#reportGeneratedAt");
const reportStats = document.querySelector("#reportStats");
const reportSections = document.querySelector("#reportSections");
const homeMetrics = {
  total: document.querySelector("#metricTotalAchievements"),
  development: document.querySelector("#metricDevelopment"),
  competitions: document.querySelector("#metricCompetitions"),
  lessons: document.querySelector("#metricLessons"),
  radio: document.querySelector("#metricRadio"),
  visits: document.querySelector("#metricVisits"),
  progress: document.querySelector("#metricProgress"),
};
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
const excellentDaysGrid = document.querySelector("#excellentDaysGrid");
const excellentDaysCount = document.querySelector("#excellentDaysCount");
const excellentDaysProgress = document.querySelector("#excellentDaysProgress");
const markNextExcellentDay = document.querySelector("#markNextExcellentDay");
const clearExcellentDays = document.querySelector("#clearExcellentDays");
const sickLeaveTerm = document.querySelector("#sickLeaveTerm");
const sickLeaveDate = document.querySelector("#sickLeaveDate");
const addSickLeaveDay = document.querySelector("#addSickLeaveDay");
const sickLeaveList = document.querySelector("#sickLeaveList");
const sickLeaveUsed = document.querySelector("#sickLeaveUsed");
const sickLeaveRemaining = document.querySelector("#sickLeaveRemaining");
const casualLeaveTerm = document.querySelector("#casualLeaveTerm");
const casualLeaveTermDays = document.querySelector("#casualLeaveTermDays");
const casualSelectedLabel = document.querySelector("#casualSelectedLabel");
const casualSelectedRemaining = document.querySelector("#casualSelectedRemaining");
const casualTermOneCount = document.querySelector("#casualTermOneCount");
const casualTermTwoCount = document.querySelector("#casualTermTwoCount");
const totalLeaveDays = document.querySelector("#totalLeaveDays");
const awardTitle = document.querySelector("#awardTitle");
const awardLevel = document.querySelector("#awardLevel");
const awardDate = document.querySelector("#awardDate");
const awardIssuer = document.querySelector("#awardIssuer");
const awardEvidence = document.querySelector("#awardEvidence");
const awardNotes = document.querySelector("#awardNotes");
const saveAwardButton = document.querySelector("#saveAward");
const awardStatus = document.querySelector("#awardStatus");
const awardCount = document.querySelector("#awardCount");
const awardList = document.querySelector("#awardList");
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
let awards = JSON.parse(localStorage.getItem("munjaz.awards") || "[]");
let currentUser = JSON.parse(localStorage.getItem("munjaz.user") || "null");
let profileDetails = JSON.parse(localStorage.getItem("munjaz.profileDetails") || "{}");
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
let excellentDays = JSON.parse(localStorage.getItem("munjaz.excellentDays") || "[]");
const SICK_LEAVE_LIMIT = 15;
const CASUAL_LEAVE_TERM_LIMIT = 2;
let leaveStats = JSON.parse(localStorage.getItem("munjaz.leaveStats") || '{"sickRecords":[],"casual":0}');

achievements = cleanStoredData(achievements);
awards = cleanStoredData(awards);
profileDetails = normalizeProfileDetails(cleanStoredData(profileDetails));
calendarEvents = cleanStoredData(calendarEvents);
excellentDays = cleanStoredData(excellentDays).map(Number).filter((day) => day >= 1 && day <= 140);
leaveStats = normalizeLeaveStats(cleanStoredData(leaveStats));
localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
localStorage.setItem("munjaz.awards", JSON.stringify(awards));
localStorage.setItem("munjaz.profileDetails", JSON.stringify(profileDetails));
localStorage.setItem("munjaz.calendarEvents", JSON.stringify(calendarEvents));
localStorage.setItem("munjaz.excellentDays", JSON.stringify(excellentDays));
localStorage.setItem("munjaz.leaveStats", JSON.stringify(leaveStats));

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

function normalizeProfileDetails(raw = {}) {
  return {
    fullName: String(raw.fullName || ""),
    employeeId: String(raw.employeeId || ""),
    specialty: String(raw.specialty || ""),
    stage: String(raw.stage || ""),
    school: String(raw.school || ""),
    department: String(raw.department || ""),
    district: String(raw.district || ""),
    email: String(raw.email || ""),
    bio: String(raw.bio || ""),
  };
}

function getArabicWeekday(dateKey) {
  if (!dateKey) return "";
  const date = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ar", { weekday: "long" });
}

function formatLeaveDate(dateKey) {
  if (!dateKey) return "بدون تاريخ";
  const date = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateKey;
  return date.toLocaleDateString("ar", { day: "numeric", month: "long", year: "numeric" });
}

function normalizeLeaveStats(raw = {}) {
  const legacySickCount = Math.min(SICK_LEAVE_LIMIT, Math.max(0, Number(raw.sick) || 0));
  const legacyCasual = Math.max(0, Number(raw.casual) || 0);
  const legacyRecords = Array.from({ length: legacySickCount }, (_, index) => ({
    id: `legacy-${index + 1}`,
    date: "",
    dayName: "",
  }));
  const records = Array.isArray(raw.sickRecords) ? raw.sickRecords : legacyRecords;
  const uniqueRecords = [];
  const seen = new Set();

  records.forEach((record, index) => {
    const date = typeof record?.date === "string" ? record.date : "";
    const key = date || `legacy-${index + 1}`;
    if (seen.has(key) || uniqueRecords.length >= SICK_LEAVE_LIMIT) return;
    seen.add(key);
    uniqueRecords.push({
      id: record?.id || `sick-${Date.now()}-${index}`,
      date,
      dayName: record?.dayName || getArabicWeekday(date),
      term: record?.term === "term2" ? "term2" : "term1",
    });
  });

  return {
    sickRecords: uniqueRecords,
    casualTermOne: Math.min(CASUAL_LEAVE_TERM_LIMIT, Math.max(0, Number(raw.casualTermOne ?? Math.min(legacyCasual, 2)) || 0)),
    casualTermTwo: Math.min(
      CASUAL_LEAVE_TERM_LIMIT,
      Math.max(0, Number(raw.casualTermTwo ?? Math.max(0, legacyCasual - 2)) || 0),
    ),
  };
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

function getRemoteRefs() {
  if (!currentUser?.id || currentUser.mode === "local") return null;
  return {
    profile: doc(db, "users", currentUser.id, "profile", "main"),
    achievements: collection(db, "users", currentUser.id, "achievements"),
    calendarEvents: collection(db, "users", currentUser.id, "calendarEvents"),
    legacyState: doc(db, "users", currentUser.id, "private", "state"),
  };
}

async function syncRemoteCollection(batch, collectionRef, items) {
  const cleanItems = cleanStoredData(items).map((item) => ({
    ...item,
    id: String(item.id || crypto.randomUUID()),
  }));
  const nextIds = new Set(cleanItems.map((item) => item.id));
  const existingDocs = await getDocs(collectionRef);

  existingDocs.forEach((snapshot) => {
    if (!nextIds.has(snapshot.id)) {
      batch.delete(snapshot.ref);
    }
  });

  cleanItems.forEach((item) => {
    batch.set(
      doc(collectionRef, item.id),
      {
        ...item,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  });

  return cleanItems;
}

async function saveRemoteState() {
  const refs = getRemoteRefs();
  if (!refs) return;

  const batch = writeBatch(db);
  batch.set(
    refs.profile,
    {
      email: currentUser.email,
      name: currentUser.name,
      profileDetails,
      awards,
      excellentDays,
      leaveStats,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  achievements = await syncRemoteCollection(batch, refs.achievements, achievements);
  calendarEvents = await syncRemoteCollection(batch, refs.calendarEvents, calendarEvents);
  await batch.commit();
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
  const refs = getRemoteRefs();
  if (refs) {
    try {
      const [profileSnapshot, achievementsSnapshot, calendarSnapshot] = await Promise.all([
        getDoc(refs.profile),
        getDocs(refs.achievements),
        getDocs(refs.calendarEvents),
      ]);
      const remoteAchievements = achievementsSnapshot.docs.map((snapshot) => cleanStoredData(snapshot.data()));
      const remoteCalendarEvents = calendarSnapshot.docs.map((snapshot) => cleanStoredData(snapshot.data()));

      if (profileSnapshot.exists()) {
        const profile = cleanStoredData(profileSnapshot.data());
        currentUser = {
          ...currentUser,
          name: profile.name || currentUser.name,
          email: profile.email || currentUser.email,
        };
        if (Array.isArray(profile.excellentDays)) {
          excellentDays = profile.excellentDays.map(Number).filter((day) => day >= 1 && day <= 140);
          localStorage.setItem("munjaz.excellentDays", JSON.stringify(excellentDays));
        }
        if (profile.leaveStats && typeof profile.leaveStats === "object") {
          leaveStats = normalizeLeaveStats(profile.leaveStats);
          localStorage.setItem("munjaz.leaveStats", JSON.stringify(leaveStats));
        }
        if (profile.profileDetails && typeof profile.profileDetails === "object") {
          profileDetails = normalizeProfileDetails(profile.profileDetails);
          localStorage.setItem("munjaz.profileDetails", JSON.stringify(profileDetails));
          renderProfileDetails();
        }
        if (Array.isArray(profile.awards)) {
          awards = cleanStoredData(profile.awards);
          localStorage.setItem("munjaz.awards", JSON.stringify(awards));
          renderAwards();
        }
        localStorage.setItem("munjaz.user", JSON.stringify(currentUser));
        updateAuthUI();
      }

      if (remoteAchievements.length || remoteCalendarEvents.length) {
        let legacyState = null;
        if (!remoteAchievements.length || !remoteCalendarEvents.length) {
          const legacySnapshot = await getDoc(refs.legacyState);
          legacyState = legacySnapshot.exists() ? cleanStoredData(legacySnapshot.data()) : null;
        }
        achievements = remoteAchievements.length ? remoteAchievements : legacyState?.achievements || achievements;
        calendarEvents = remoteCalendarEvents.length ? remoteCalendarEvents : legacyState?.calendarEvents || calendarEvents;
        await saveRemoteState();
      } else {
        const legacySnapshot = await getDoc(refs.legacyState);
        if (legacySnapshot.exists()) {
          const legacyState = cleanStoredData(legacySnapshot.data());
          if (Array.isArray(legacyState.achievements)) achievements = legacyState.achievements;
          if (Array.isArray(legacyState.calendarEvents)) calendarEvents = legacyState.calendarEvents;
        }
        await saveRemoteState();
      }

      localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
      localStorage.setItem("munjaz.calendarEvents", JSON.stringify(calendarEvents));
    } catch {}
    renderPortfolio(activePortfolio);
    renderHomeMetrics();
    renderCalendar();
    renderExcellentDays();
    renderReport(activeReport);
    return;
  }

  if (!HAS_LOCAL_API) {
    renderPortfolio(activePortfolio);
    renderHomeMetrics();
    renderCalendar();
    renderExcellentDays();
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
    renderHomeMetrics();
    renderCalendar();
    renderExcellentDays();
    renderReport(activeReport);
  } catch {
    renderPortfolio(activePortfolio);
    renderHomeMetrics();
    renderCalendar();
    renderExcellentDays();
    renderReport(activeReport);
  }
}

function readEvidenceFile(file) {
  return new Promise((resolve) => {
    if (file.size > 900000) {
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

function renderProfileDetails() {
  Object.entries(profileInputs).forEach(([key, input]) => {
    if (input) input.value = profileDetails[key] || (key === "email" ? currentUser?.email || "" : "");
  });
}

async function saveProfileDetails() {
  profileDetails = normalizeProfileDetails(
    Object.fromEntries(Object.entries(profileInputs).map(([key, input]) => [key, input?.value?.trim() || ""])),
  );
  localStorage.setItem("munjaz.profileDetails", JSON.stringify(profileDetails));

  if (profileDetails.fullName && currentUser) {
    currentUser = {
      ...currentUser,
      name: profileDetails.fullName,
      email: profileDetails.email || currentUser.email,
    };
    localStorage.setItem("munjaz.user", JSON.stringify(currentUser));
    updateAuthUI();
  }

  if (profileSaveStatus) profileSaveStatus.textContent = currentUser ? "جاري الحفظ..." : "تم الحفظ على هذا الجهاز.";
  try {
    await saveRemoteState();
    if (profileSaveStatus) profileSaveStatus.textContent = currentUser ? "تم حفظ البيانات في فايربيز." : "تم الحفظ على هذا الجهاز.";
  } catch {
    if (profileSaveStatus) profileSaveStatus.textContent = "تم الحفظ محلياً، وتعذر الحفظ في فايربيز حالياً.";
  }
}

function createQrDataUrl(text, size = 260) {
  if (!window.QRCode) return "";
  const holder = document.createElement("div");
  new window.QRCode(holder, {
    text,
    width: size,
    height: size,
    colorDark: "#1e2a44",
    colorLight: "#ffffff",
    correctLevel: window.QRCode.CorrectLevel.M,
  });
  const canvas = holder.querySelector("canvas");
  if (canvas) return canvas.toDataURL("image/png");
  return holder.querySelector("img")?.src || "";
}

function renderQrCode(element, text, size = 260) {
  if (!element) return "";
  element.innerHTML = "";
  if (!window.QRCode) {
    element.textContent = "QR";
    return "";
  }
  new window.QRCode(element, {
    text,
    width: size,
    height: size,
    colorDark: "#1e2a44",
    colorLight: "#ffffff",
    correctLevel: window.QRCode.CorrectLevel.M,
  });
  return createQrDataUrl(text, size);
}

function renderPortfolioQr() {
  if (!portfolioQr || !portfolioQrLink || !downloadQrLink) return;
  const qrTarget = "https://monjazkw.com/#portfolio";
  const qrImage = renderQrCode(portfolioQr, qrTarget, 260);
  portfolioQrLink.value = qrTarget;
  downloadQrLink.href = qrImage || "#";
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
        currentUser = createLocalSession(email);
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

function saveExcellentDays() {
  excellentDays = [...new Set(excellentDays.map(Number))]
    .filter((day) => day >= 1 && day <= 140)
    .sort((a, b) => a - b);
  localStorage.setItem("munjaz.excellentDays", JSON.stringify(excellentDays));
  saveRemoteState().catch(() => {});
}

function saveLeaveStats() {
  const selectedCasualTerm = casualLeaveTerm?.value === "term2" ? "term2" : "term1";
  const selectedCasualDays = Math.min(CASUAL_LEAVE_TERM_LIMIT, Math.max(0, Number(casualLeaveTermDays?.value) || 0));
  leaveStats = normalizeLeaveStats({
    ...leaveStats,
    casualTermOne: selectedCasualTerm === "term1" ? selectedCasualDays : leaveStats.casualTermOne,
    casualTermTwo: selectedCasualTerm === "term2" ? selectedCasualDays : leaveStats.casualTermTwo,
  });
  localStorage.setItem("munjaz.leaveStats", JSON.stringify(leaveStats));
  saveRemoteState().catch(() => {});
  renderLeaveStats();
}

function addSickLeaveRecord() {
  const date = sickLeaveDate?.value || "";
  if (!date) {
    if (calendarStatus) calendarStatus.textContent = "اختر تاريخ الطبية أولاً.";
    return;
  }
  leaveStats = normalizeLeaveStats(leaveStats);
  if (leaveStats.sickRecords.some((record) => record.date === date)) {
    if (calendarStatus) calendarStatus.textContent = "هذا اليوم مسجل مسبقاً في الطبيات.";
    return;
  }
  if (leaveStats.sickRecords.length >= SICK_LEAVE_LIMIT) {
    if (calendarStatus) calendarStatus.textContent = "تم الوصول للحد السنوي للطبيات: 15 يوم.";
    return;
  }

  leaveStats.sickRecords.push({
    id: crypto.randomUUID(),
    date,
    dayName: getArabicWeekday(date),
    term: sickLeaveTerm?.value === "term2" ? "term2" : "term1",
  });
  if (sickLeaveDate) sickLeaveDate.value = "";
  if (calendarStatus) calendarStatus.textContent = "تمت إضافة يوم طبي.";
  saveLeaveStats();
}

function removeSickLeaveRecord(recordId) {
  leaveStats.sickRecords = leaveStats.sickRecords.filter((record) => record.id !== recordId);
  saveLeaveStats();
}

function renderLeaveStats() {
  if (!casualLeaveTermDays || !totalLeaveDays) return;
  leaveStats = normalizeLeaveStats(leaveStats);
  const sickCount = leaveStats.sickRecords.length;
  const casualTotal = leaveStats.casualTermOne + leaveStats.casualTermTwo;
  const selectedSickTerm = sickLeaveTerm?.value === "term2" ? "term2" : "term1";
  const selectedCasualTerm = casualLeaveTerm?.value === "term2" ? "term2" : "term1";
  const selectedCasualValue = selectedCasualTerm === "term1" ? leaveStats.casualTermOne : leaveStats.casualTermTwo;
  if (sickLeaveUsed) sickLeaveUsed.textContent = sickCount;
  if (sickLeaveRemaining) sickLeaveRemaining.textContent = Math.max(0, SICK_LEAVE_LIMIT - sickCount);
  if (casualSelectedLabel) casualSelectedLabel.textContent = selectedCasualTerm === "term1" ? "أيام الكورس الأول" : "أيام الكورس الثاني";
  if (casualLeaveTermDays) casualLeaveTermDays.value = selectedCasualValue;
  if (casualSelectedRemaining) casualSelectedRemaining.textContent = Math.max(0, CASUAL_LEAVE_TERM_LIMIT - selectedCasualValue);
  if (casualTermOneCount) casualTermOneCount.textContent = leaveStats.casualTermOne;
  if (casualTermTwoCount) casualTermTwoCount.textContent = leaveStats.casualTermTwo;
  totalLeaveDays.textContent = sickCount + casualTotal;
  if (sickLeaveList) {
    const visibleSickRecords = leaveStats.sickRecords.filter((record) => (record.term === "term2" ? "term2" : "term1") === selectedSickTerm);
    sickLeaveList.innerHTML = visibleSickRecords.length
      ? visibleSickRecords
          .map(
            (record) => `
              <article>
                <div>
                  <strong>${escapeHtml(record.dayName || getArabicWeekday(record.date) || "يوم طبي")}</strong>
                  <span>${escapeHtml(formatLeaveDate(record.date))} - ${record.term === "term2" ? "الكورس الثاني" : "الكورس الأول"}</span>
                </div>
                <button type="button" data-remove-sick-leave="${escapeHtml(record.id)}">حذف</button>
              </article>
            `,
          )
          .join("")
      : `<p>لا توجد طبيات مسجلة في ${selectedSickTerm === "term2" ? "الكورس الثاني" : "الكورس الأول"}.</p>`;
  }
}

function renderExcellentDays() {
  if (!excellentDaysGrid) return;

  const selected = new Set(excellentDays);
  excellentDaysCount.textContent = selected.size;
  excellentDaysProgress.style.width = `${Math.min(100, (selected.size / 140) * 100)}%`;
  renderLeaveStats();

  excellentDaysGrid.innerHTML = Array.from({ length: 140 }, (_, index) => {
    const day = index + 1;
    return `<button class="${selected.has(day) ? "active" : ""}" type="button" data-excellent-day="${day}" aria-pressed="${selected.has(day)}">${day}</button>`;
  }).join("");
}

function toggleExcellentDay(day) {
  if (excellentDays.includes(day)) {
    excellentDays = excellentDays.filter((item) => item !== day);
  } else {
    excellentDays.push(day);
  }
  saveExcellentDays();
  renderExcellentDays();
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

function countAchievementsByType(...types) {
  const wanted = new Set(types);
  return achievements.filter((item) => wanted.has(item.type)).length;
}

function renderHomeMetrics() {
  const total = achievements.length;
  const yearlyTarget = 30;
  const progress = Math.min(100, Math.round((total / yearlyTarget) * 100));

  if (homeMetrics.total) homeMetrics.total.textContent = total;
  if (homeMetrics.development) homeMetrics.development.textContent = countAchievementsByType("development", "workshops");
  if (homeMetrics.competitions) homeMetrics.competitions.textContent = countAchievementsByType("competitions");
  if (homeMetrics.lessons) homeMetrics.lessons.textContent = countAchievementsByType("lessons");
  if (homeMetrics.radio) homeMetrics.radio.textContent = countAchievementsByType("radio");
  if (homeMetrics.visits) homeMetrics.visits.textContent = countAchievementsByType("visits");
  if (homeMetrics.progress) homeMetrics.progress.textContent = `${progress}%`;
}

function persistAwards() {
  awards = cleanStoredData(awards);
  localStorage.setItem("munjaz.awards", JSON.stringify(awards));
  saveRemoteState().catch(() => {});
}

function renderAwards() {
  if (!awardList || !awardCount) return;
  awardCount.textContent = awards.length;

  if (!awards.length) {
    awardList.innerHTML = '<div class="empty-saved">لا توجد جوائز محفوظة بعد.</div>';
    return;
  }

  awardList.innerHTML = awards
    .map(
      (award) => `
        <article>
          <div>
            <strong>${escapeHtml(award.title)}</strong>
            <span>${escapeHtml(award.level || "بدون مستوى")} - ${escapeHtml(award.date || "بدون تاريخ")}</span>
          </div>
          <p>${escapeHtml(award.issuer || "بدون جهة مانحة")}</p>
          ${award.evidence ? `<a href="${escapeHtml(award.evidence)}" target="_blank" rel="noopener">${escapeHtml(award.evidence)}</a>` : ""}
          ${award.notes ? `<small>${escapeHtml(award.notes)}</small>` : ""}
          <button type="button" data-delete-award="${escapeHtml(award.id)}">حذف</button>
        </article>
      `,
    )
    .join("");
}

function saveAward() {
  const title = awardTitle?.value.trim() || "";
  if (!title) {
    if (awardStatus) {
      awardStatus.textContent = "اكتب اسم الجائزة أولاً.";
      awardStatus.classList.add("error");
    }
    return;
  }

  awards.unshift({
    id: crypto.randomUUID(),
    title,
    level: awardLevel?.value || "",
    date: awardDate?.value || "",
    issuer: awardIssuer?.value.trim() || "",
    evidence: awardEvidence?.value.trim() || "",
    notes: awardNotes?.value.trim() || "",
    createdAt: new Date().toISOString(),
  });

  persistAwards();
  renderAwards();
  [awardTitle, awardDate, awardIssuer, awardEvidence, awardNotes].forEach((input) => {
    if (input) input.value = "";
  });
  if (awardStatus) {
    awardStatus.textContent = "تم حفظ الجائزة.";
    awardStatus.classList.remove("error");
  }
}

function deleteAward(id) {
  awards = awards.filter((award) => award.id !== id);
  persistAwards();
  renderAwards();
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
  if (evidence.url) {
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
  renderHomeMetrics();
  renderReport(activeReport);
}

function deleteAchievement(id) {
  achievements = achievements.filter((item) => item.id !== id);
  persistAchievements();
  renderSavedAchievements();
  renderHomeMetrics();
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

function formatTermName(term) {
  return term === "term2" ? "الكورس الثاني" : "الكورس الأول";
}

function renderFullPortfolioReport(filteredAchievements, filteredEvents, evidenceCount) {
  const safeProfile = profileDetails || {};
  const profileRows = [
    ["اسم المعلم/ـة", safeProfile.fullName || currentUser?.email || "غير محدد"],
    ["الرقم الوظيفي", safeProfile.employeeId || "غير محدد"],
    ["التخصص", safeProfile.specialty || "غير محدد"],
    ["المرحلة", safeProfile.stage || "غير محدد"],
    ["المنطقة التعليمية", safeProfile.district || "غير محدد"],
    ["المدرسة", safeProfile.school || "غير محدد"],
  ];
  const sickRecords = normalizeLeaveStats(leaveStats).sickRecords;
  const casualTermOne = normalizeLeaveStats(leaveStats).casualTermOne;
  const casualTermTwo = normalizeLeaveStats(leaveStats).casualTermTwo;
  const sickByTerm = countBy(sickRecords, (record) => formatTermName(record.term));
  const qrTarget = "https://monjazkw.com/#portfolio";
  const qrImage = createQrDataUrl(qrTarget, 180);

  const profileBlock = profileRows
    .map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");

  const leaveBlock = [
    ["الأيام الفعلية", excellentDays.length, "من 140 يوم"],
    ["الإجازات الطبية", sickRecords.length, `${Math.max(0, SICK_LEAVE_LIMIT - sickRecords.length)} يوم متاح`],
    ["عرضي الكورس الأول", casualTermOne, "من 2 يوم"],
    ["عرضي الكورس الثاني", casualTermTwo, "من 2 يوم"],
  ]
    .map(
      ([label, value, note]) => `
        <div>
          <span>${label}</span>
          <strong>${escapeHtml(value)}</strong>
          <small>${note}</small>
        </div>
      `,
    )
    .join("");

  const sickList = renderMiniList(
    sickRecords,
    "لا توجد إجازات طبية مسجلة.",
    (record) => `<li><span>${formatArabicDate(record.date)}</span><small>${formatTermName(record.term)}</small></li>`,
  );

  const awardItems = renderMiniList(
    awards,
    "لا توجد جوائز محفوظة حتى الآن.",
    (award) => `<li><span>${escapeHtml(award.title)}</span><small>${escapeHtml(award.level || "بدون مستوى")} - ${award.date || "بدون تاريخ"}</small></li>`,
  );

  return `
    <article class="full-report-cover">
      <div>
        <span>ملف الإنجاز الكامل</span>
        <h4>نسخة منظمة للتقديم والطباعة</h4>
        <p>تجمع هذه النسخة بيانات المعلم، الإنجازات، الشواهد، الرزنامة، الأيام الفعلية، الإجازات، والجوائز في ملف واحد مرتب.</p>
      </div>
      <b>${filteredAchievements.length}</b>
    </article>
    <article class="full-profile-card">
      <h4>بيانات المعلم</h4>
      <div class="full-profile-grid">${profileBlock}</div>
    </article>
    <article class="full-leave-card">
      <h4>الأيام الفعلية والإجازات</h4>
      <div class="full-mini-metrics">${leaveBlock}</div>
      <div class="full-sick-list">
        <strong>سجل الإجازات الطبية</strong>
        ${sickList}
      </div>
    </article>
    <article class="full-evidence-card">
      <h4>الشواهد والروابط</h4>
      <div class="full-mini-metrics">
        <div><span>الشواهد</span><strong>${evidenceCount}</strong><small>ملف / رابط</small></div>
        <div><span>الجوائز</span><strong>${awards.length}</strong><small>جائزة محفوظة</small></div>
        <div><span>مواعيد الرزنامة</span><strong>${filteredEvents.length}</strong><small>موعد</small></div>
      </div>
    </article>
    <article class="full-awards-card">
      <h4>الجوائز والإنجازات النوعية</h4>
      ${awardItems}
    </article>
    <article class="full-qr-card">
      <div>
        <h4>QR ملف الإنجاز</h4>
        <p>امسح الرمز للوصول إلى ملف الإنجاز الإلكتروني مباشرة.</p>
        <small>${qrTarget}</small>
      </div>
      ${qrImage ? `<img src="${qrImage}" alt="QR ملف الإنجاز" />` : '<b class="full-qr-fallback">QR</b>'}
    </article>
    <article class="full-term-card">
      <h4>توزيع الإجازات الطبية</h4>
      <ul class="report-bars">
        <li><span>الكورس الأول</span><b>${sickByTerm["الكورس الأول"] || 0}</b></li>
        <li><span>الكورس الثاني</span><b>${sickByTerm["الكورس الثاني"] || 0}</b></li>
      </ul>
    </article>
  `;
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

  if (type === "full") {
    reportStats.innerHTML = [
      ["إجمالي الإنجازات", filteredAchievements.length, "إنجاز"],
      ["الشواهد", evidenceCount, "ملف / رابط"],
      ["الأيام الفعلية", excellentDays.length, "من 140"],
      ["الإجازات الطبية", normalizeLeaveStats(leaveStats).sickRecords.length, "من 15"],
      ["الجوائز", awards.length, "جائزة"],
      ["مواعيد الرزنامة", filteredEvents.length, "موعد"],
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
  }

  reportSections.innerHTML = `
    ${type === "full" ? renderFullPortfolioReport(filteredAchievements, filteredEvents, evidenceCount) : ""}
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
  if (!files.length) return;
  if (!currentUser) {
    portfolioStatus.textContent = "سجلي الدخول قبل رفع المرفقات.";
    portfolioStatus.classList.add("error");
    return;
  }

  portfolioStatus.textContent = "جاري تجهيز المرفقات...";
  portfolioStatus.classList.remove("error");

  try {
    const evidence = await Promise.all([...files].map(readEvidenceFile));
    currentEvidence.push(...evidence);
    const largeFiles = evidence.filter((item) => !item.stored).length;
    portfolioStatus.textContent = largeFiles
      ? "تمت إضافة المرفقات. الملفات الكبيرة تحفظ كاسم فقط بدون محتوى لتجنب الترقية المدفوعة."
      : "تمت إضافة المرفقات وربطها بالإنجاز.";
    renderSelectedEvidence();
  } catch (error) {
    portfolioStatus.textContent = "تعذر تجهيز المرفقات. جربي ملفاً أصغر أو أضيفي رابطاً.";
    portfolioStatus.classList.add("error");
  }
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

copyQrLink?.addEventListener("click", async () => {
  const value = portfolioQrLink?.value || "https://monjazkw.com/#portfolio";
  try {
    await navigator.clipboard.writeText(value);
    if (qrStatus) qrStatus.textContent = "تم نسخ الرابط.";
  } catch {
    portfolioQrLink?.select();
    document.execCommand("copy");
    if (qrStatus) qrStatus.textContent = "تم نسخ الرابط.";
  }
});

saveProfileDetailsButton?.addEventListener("click", saveProfileDetails);
saveAwardButton?.addEventListener("click", saveAward);
awardList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-award]");
  if (!button) return;
  deleteAward(button.dataset.deleteAward);
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

selectedEvidence.addEventListener("click", async (event) => {
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

excellentDaysGrid?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-excellent-day]");
  if (!button) return;
  toggleExcellentDay(Number(button.dataset.excellentDay));
});

markNextExcellentDay?.addEventListener("click", () => {
  const nextDay = Array.from({ length: 140 }, (_, index) => index + 1).find((day) => !excellentDays.includes(day));
  if (!nextDay) return;
  toggleExcellentDay(nextDay);
});

clearExcellentDays?.addEventListener("click", () => {
  excellentDays = [];
  saveExcellentDays();
  renderExcellentDays();
});

casualLeaveTerm?.addEventListener("change", renderLeaveStats);
casualLeaveTermDays?.addEventListener("input", saveLeaveStats);
sickLeaveTerm?.addEventListener("change", renderLeaveStats);
addSickLeaveDay?.addEventListener("click", addSickLeaveRecord);
sickLeaveList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-sick-leave]");
  if (!button) return;
  removeSickLeaveRecord(button.dataset.removeSickLeave);
});

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
renderProfileDetails();
renderPortfolioQr();
renderHomeMetrics();
renderAwards();
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
  renderProfileDetails();
  await loadRemoteState();
});
renderPortfolio();
eventDate.value = selectedCalendarDate;
renderCalendar();
renderExcellentDays();
renderReport();
loadRemoteState();
