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
const loginTriggers = document.querySelectorAll("[data-login-trigger]");
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
const shareView = {
  name: document.querySelector("#shareName"),
  meta: document.querySelector("#shareMeta"),
  updated: document.querySelector("#shareUpdated"),
  readinessRing: document.querySelector("#shareReadinessRing"),
  readiness: document.querySelector("#shareReadiness"),
  readinessTitle: document.querySelector("#shareReadinessTitle"),
  readinessText: document.querySelector("#shareReadinessText"),
  total: document.querySelector("#shareTotal"),
  evidence: document.querySelector("#shareEvidence"),
  awards: document.querySelector("#shareAwards"),
  days: document.querySelector("#shareDays"),
  strongest: document.querySelector("#shareStrongest"),
  highlights: document.querySelector("#shareHighlights"),
  coverage: document.querySelector("#shareCoverage"),
  awardsList: document.querySelector("#shareAwardsList"),
};
const reportButtons = document.querySelectorAll("[data-report-type]");
const reportTitle = document.querySelector("#reportTitle");
const reportGeneratedAt = document.querySelector("#reportGeneratedAt");
const reportStats = document.querySelector("#reportStats");
const reportSections = document.querySelector("#reportSections");
const archiveYear = document.querySelector("#archiveYear");
const archiveTerm = document.querySelector("#archiveTerm");
const createArchiveButton = document.querySelector("#createArchive");
const archiveStatus = document.querySelector("#archiveStatus");
const archiveCount = document.querySelector("#archiveCount");
const archiveLastYear = document.querySelector("#archiveLastYear");
const archiveHealth = document.querySelector("#archiveHealth");
const archiveList = document.querySelector("#archiveList");
const archivePreview = document.querySelector("#archivePreview");
const settingsInputs = {
  schoolYear: document.querySelector("#settingsSchoolYear"),
  term: document.querySelector("#settingsTerm"),
  defaultReminder: document.querySelector("#settingsDefaultReminder"),
  printMode: document.querySelector("#settingsPrintMode"),
  publicShare: document.querySelector("#settingsPublicShare"),
  autoArchive: document.querySelector("#settingsAutoArchive"),
};
const settingsView = {
  dataHealth: document.querySelector("#settingsDataHealth"),
  userName: document.querySelector("#settingsUserName"),
  email: document.querySelector("#settingsEmail"),
  firebaseStatus: document.querySelector("#settingsFirebaseStatus"),
  recordsCount: document.querySelector("#settingsRecordsCount"),
  lastSync: document.querySelector("#settingsLastSync"),
  scope: document.querySelector("#settingsScope"),
  saveStatus: document.querySelector("#settingsSaveStatus"),
};
const saveSystemSettingsButton = document.querySelector("#saveSystemSettings");
const exportBackupButton = document.querySelector("#exportBackup");
const developmentPlanInputs = {
  focus: document.querySelector("#developmentFocus"),
  priority: document.querySelector("#developmentPriority"),
  goal: document.querySelector("#developmentGoal"),
  action: document.querySelector("#developmentAction"),
  evidence: document.querySelector("#developmentEvidence"),
  dueDate: document.querySelector("#developmentDueDate"),
  status: document.querySelector("#developmentStatus"),
};
const developmentPlanView = {
  completion: document.querySelector("#developmentPlanCompletion"),
  total: document.querySelector("#developmentPlanTotal"),
  done: document.querySelector("#developmentPlanDone"),
  active: document.querySelector("#developmentPlanActive"),
  next: document.querySelector("#developmentPlanNext"),
  status: document.querySelector("#developmentPlanStatus"),
  suggestions: document.querySelector("#developmentSuggestions"),
  list: document.querySelector("#developmentPlanList"),
};
const addDevelopmentGoalButton = document.querySelector("#addDevelopmentGoal");
const selfAssessmentView = {
  average: document.querySelector("#selfAssessmentAverage"),
  completed: document.querySelector("#selfAssessmentCompleted"),
  strongest: document.querySelector("#selfAssessmentStrongest"),
  priority: document.querySelector("#selfAssessmentPriority"),
  grid: document.querySelector("#selfAssessmentGrid"),
  reflection: document.querySelector("#selfAssessmentReflection"),
  status: document.querySelector("#selfAssessmentStatus"),
};
const saveSelfAssessmentButton = document.querySelector("#saveSelfAssessment");
const templatesView = {
  count: document.querySelector("#templateCount"),
  list: document.querySelector("#templateList"),
  category: document.querySelector("#templateCategory"),
  title: document.querySelector("#templateTitle"),
  fields: document.querySelector("#templateFields"),
  preview: document.querySelector("#templatePreview"),
  status: document.querySelector("#templateStatus"),
  settingsStatus: document.querySelector("#templateSettingsStatus"),
  arrange: document.querySelector("#templateArrange"),
};
const copyTemplateTextButton = document.querySelector("#copyTemplateText");
const saveTemplateSettingsButton = document.querySelector("#saveTemplateSettings");
const templateSettingsInputs = {
  schoolName: document.querySelector("#templateSchoolName"),
  teacherName: document.querySelector("#templateTeacherName"),
  headName: document.querySelector("#templateHeadName"),
  principalName: document.querySelector("#templatePrincipalName"),
  borderStyle: document.querySelector("#templateBorderStyle"),
  schoolLogo: document.querySelector("#templateSchoolLogo"),
  extraLogo: document.querySelector("#templateExtraLogo"),
  frameImage: document.querySelector("#templateFrameImage"),
};
const homeMetrics = {
  total: document.querySelector("#metricTotalAchievements"),
  development: document.querySelector("#metricDevelopment"),
  competitions: document.querySelector("#metricCompetitions"),
  lessons: document.querySelector("#metricLessons"),
  radio: document.querySelector("#metricRadio"),
  visits: document.querySelector("#metricVisits"),
  progress: document.querySelector("#metricProgress"),
  readinessLabel: document.querySelector("#readinessLabel"),
  readinessRing: document.querySelector("#readinessRing"),
  readinessScore: document.querySelector("#readinessScore"),
  readinessTitle: document.querySelector("#readinessTitle"),
  readinessText: document.querySelector("#readinessText"),
  insightStrip: document.querySelector("#insightStrip"),
  smartAlerts: document.querySelector("#smartAlerts"),
  coverageBars: document.querySelector("#coverageBars"),
  executiveStatusTitle: document.querySelector("#executiveStatusTitle"),
  executiveStatusText: document.querySelector("#executiveStatusText"),
  executiveNextAction: document.querySelector("#executiveNextAction"),
  executiveNextEvent: document.querySelector("#executiveNextEvent"),
  executiveNextEventDate: document.querySelector("#executiveNextEventDate"),
  executiveEvidenceGap: document.querySelector("#executiveEvidenceGap"),
  executiveExcellentRemaining: document.querySelector("#executiveExcellentRemaining"),
  onboardingProgress: document.querySelector("#onboardingProgress"),
  onboardingSteps: document.querySelector("#onboardingSteps"),
  badgesProgress: document.querySelector("#badgesProgress"),
  achievementBadges: document.querySelector("#achievementBadges"),
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
const reminderButtons = document.querySelectorAll("[data-reminder-value]");
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
const PUBLIC_SHARE_ID = new URLSearchParams(window.location.search).get("share") || "";
const IS_PUBLIC_SHARE_VIEW = Boolean(PUBLIC_SHARE_ID);

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
let activeTemplate = "remedial-plan";
let templateSettings = JSON.parse(localStorage.getItem("munjaz.templateSettings") || "{}");
let achievements = JSON.parse(localStorage.getItem("munjaz.achievements") || "[]");
let awards = JSON.parse(localStorage.getItem("munjaz.awards") || "[]");
let archives = JSON.parse(localStorage.getItem("munjaz.archives") || "[]");
let currentUser = JSON.parse(localStorage.getItem("munjaz.user") || "null");
let profileDetails = JSON.parse(localStorage.getItem("munjaz.profileDetails") || "{}");
let appSettings = JSON.parse(localStorage.getItem("munjaz.appSettings") || "{}");
let developmentPlan = JSON.parse(localStorage.getItem("munjaz.developmentPlan") || "[]");
let selfAssessment = JSON.parse(localStorage.getItem("munjaz.selfAssessment") || "{}");
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
let publicShareData = null;

achievements = cleanStoredData(achievements);
awards = cleanStoredData(awards);
archives = cleanStoredData(archives);
profileDetails = normalizeProfileDetails(cleanStoredData(profileDetails));
appSettings = normalizeAppSettings(cleanStoredData(appSettings));
developmentPlan = normalizeDevelopmentPlan(cleanStoredData(developmentPlan));
selfAssessment = normalizeSelfAssessment(cleanStoredData(selfAssessment));
templateSettings = normalizeTemplateSettings(cleanStoredData(templateSettings));
calendarEvents = cleanStoredData(calendarEvents);
excellentDays = cleanStoredData(excellentDays).map(Number).filter((day) => day >= 1 && day <= 140);
leaveStats = normalizeLeaveStats(cleanStoredData(leaveStats));
localStorage.setItem("munjaz.achievements", JSON.stringify(achievements));
localStorage.setItem("munjaz.awards", JSON.stringify(awards));
localStorage.setItem("munjaz.archives", JSON.stringify(archives));
localStorage.setItem("munjaz.profileDetails", JSON.stringify(profileDetails));
localStorage.setItem("munjaz.appSettings", JSON.stringify(appSettings));
localStorage.setItem("munjaz.developmentPlan", JSON.stringify(developmentPlan));
localStorage.setItem("munjaz.selfAssessment", JSON.stringify(selfAssessment));
localStorage.setItem("munjaz.templateSettings", JSON.stringify(templateSettings));
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

const developmentPlanSuggestions = [
  {
    focus: "استراتيجيات التدريس",
    priority: "high",
    goal: "تطوير توظيف استراتيجيات التعلم النشط داخل الحصة لرفع مشاركة المتعلمين.",
    action: "تطبيق استراتيجيتين خلال شهر، وتوثيق أثرهما في تفاعل المتعلمين ومخرجات الدرس.",
    evidence: "خطة درس، صور تطبيق، نموذج قياس أثر",
    dueDate: "2026-10-30",
  },
  {
    focus: "التقويم وأدوات القياس",
    priority: "medium",
    goal: "تحسين أدوات التقويم البنائي وربطها بمستوى تحقق نواتج التعلم.",
    action: "إعداد بطاقة ملاحظة قصيرة وتذكرة خروج، ثم تحليل النتائج بعد حصتين.",
    evidence: "أداة تقييم، عينة نتائج، تقرير مختصر",
    dueDate: "2026-11-15",
  },
  {
    focus: "التقنيات التعليمية",
    priority: "medium",
    goal: "استخدام أداة رقمية واحدة لدعم التعلم ومتابعة أثرها على أداء المتعلمين.",
    action: "اختيار أداة مناسبة، تنفيذ نشاط رقمي، ومقارنة نتائج المتعلمين قبل وبعد التطبيق.",
    evidence: "رابط النشاط، صور، تحليل نتائج",
    dueDate: "2026-12-05",
  },
];

const selfAssessmentCriteria = [
  {
    id: "teaching",
    title: "الأداء التدريسي",
    description: "تخطيط الدروس، تنويع الاستراتيجيات، وإدارة وقت الحصة.",
  },
  {
    id: "assessment",
    title: "التقويم وأدوات القياس",
    description: "استخدام تقويم بنائي وختامي وتحليل نتائج المتعلمين.",
  },
  {
    id: "classroom",
    title: "إدارة الصف",
    description: "تهيئة بيئة تعلم منظمة ومحفزة وداعمة.",
  },
  {
    id: "development",
    title: "التنمية المهنية",
    description: "حضور ورش ودورات وتطبيق أثرها داخل العمل.",
  },
  {
    id: "initiative",
    title: "المبادرات والابتكار",
    description: "تقديم أفكار أو مشاريع أو فعاليات ذات أثر واضح.",
  },
  {
    id: "documentation",
    title: "التوثيق المهني",
    description: "تنظيم الشواهد والتقارير وربطها بالإنجازات.",
  },
];

const readyTemplates = [
  {
    id: "remedial-plan",
    category: "خطة علاجية",
    title: "نموذج خطة علاجية",
    description: "للمتعلم المتعثر في مهارة محددة.",
    fields: [
      ["student", "اسم المتعلم"],
      ["grade", "الصف"],
      ["subject", "المادة"],
      ["skill", "المهارة الضعيفة"],
      ["period", "مدة التنفيذ"],
      ["evidence", "أداة القياس"],
    ],
    body: ({ student, grade, subject, skill, period, evidence }) => `
خطة علاجية للمتعلمين

اسم المتعلم: ${student || "................"}
الصف: ${grade || "................"}
المادة: ${subject || "................"}
المهارة المستهدفة: ${skill || "................"}
مدة التنفيذ: ${period || "................"}

الهدف:
رفع مستوى المتعلم في المهارة المستهدفة من خلال أنشطة علاجية قصيرة ومتدرجة.

الإجراءات:
1. تشخيص مستوى المتعلم في المهارة المحددة.
2. تقديم أنشطة علاجية فردية أو جماعية قصيرة.
3. استخدام أمثلة تطبيقية وتغذية راجعة مباشرة.
4. متابعة التحسن أسبوعيا وتوثيق النتائج.

أداة القياس:
${evidence || "اختبار قصير / بطاقة ملاحظة / ورقة عمل"}

ملاحظات المتابعة:
....................................................................
    `,
  },
  {
    id: "enrichment-plan",
    category: "خطة إثرائية",
    title: "نموذج خطة إثرائية",
    description: "للمتعلم الموهوب أو المتفوق.",
    fields: [
      ["student", "اسم المتعلم"],
      ["grade", "الصف"],
      ["subject", "المادة"],
      ["talent", "مجال التميز"],
      ["task", "المهمة الإثرائية"],
      ["output", "الناتج المتوقع"],
    ],
    body: ({ student, grade, subject, talent, task, output }) => `
خطة إثرائية للمتعلمين

اسم المتعلم: ${student || "................"}
الصف: ${grade || "................"}
المادة: ${subject || "................"}
مجال التميز: ${talent || "................"}

الهدف:
تنمية قدرات المتعلم الموهوب من خلال مهام تفكير عليا ومشروعات قصيرة.

المهمة الإثرائية:
${task || "إعداد مشروع بحثي أو منتج إبداعي مرتبط بموضوع الدرس."}

الناتج المتوقع:
${output || "عرض شفهي / مشروع مصغر / ملف إنجاز للطالب / مشاركة في مسابقة"}

آلية المتابعة:
متابعة مراحل التنفيذ، تقديم تغذية راجعة، وتوثيق الناتج النهائي.
    `,
  },
  {
    id: "meeting-minutes",
    category: "اجتماع فني",
    title: "محضر اجتماع فني",
    description: "لتوثيق اجتماعات القسم أو الفريق.",
    fields: [
      ["title", "عنوان الاجتماع"],
      ["date", "التاريخ"],
      ["attendees", "الحضور"],
      ["agenda", "محاور الاجتماع"],
      ["decisions", "التوصيات"],
    ],
    body: ({ title, date, attendees, agenda, decisions }) => `
محضر اجتماع فني

عنوان الاجتماع: ${title || "................"}
التاريخ: ${date || "................"}
الحضور: ${attendees || "................"}

محاور الاجتماع:
${agenda || "1. ................................\n2. ................................"}

التوصيات والقرارات:
${decisions || "1. ................................\n2. ................................"}

توقيع الحضور:
....................................................................
    `,
  },
  {
    id: "class-visit",
    category: "زيارة صفية",
    title: "نموذج زيارة صفية",
    description: "لتبادل الزيارات وملاحظات الحصة.",
    fields: [
      ["teacher", "اسم المعلم/المعلمة"],
      ["subject", "المادة"],
      ["lesson", "عنوان الدرس"],
      ["date", "التاريخ"],
      ["strength", "نقطة قوة"],
      ["recommendation", "توصية"],
    ],
    body: ({ teacher, subject, lesson, date, strength, recommendation }) => `
نموذج زيارة صفية

اسم المعلم/المعلمة: ${teacher || "................"}
المادة: ${subject || "................"}
عنوان الدرس: ${lesson || "................"}
التاريخ: ${date || "................"}

نقطة قوة ملحوظة:
${strength || "................................"}

توصية تطويرية:
${recommendation || "................................"}

ملاحظات عامة:
....................................................................
    `,
  },
  {
    id: "pioneer-lesson",
    category: "درس ريادي",
    title: "نموذج درس ريادي",
    description: "لتوثيق الدرس الريادي وأثره.",
    fields: [
      ["lesson", "عنوان الدرس"],
      ["subject", "المادة"],
      ["grade", "الصف"],
      ["strategy", "الاستراتيجية"],
      ["impact", "الأثر"],
    ],
    body: ({ lesson, subject, grade, strategy, impact }) => `
نموذج درس ريادي

عنوان الدرس: ${lesson || "................"}
المادة: ${subject || "................"}
الصف: ${grade || "................"}
الاستراتيجية المستخدمة: ${strategy || "................"}

وصف مختصر للدرس:
تم تنفيذ درس ريادي يهدف إلى رفع تفاعل المتعلمين وتطبيق مهارات التفكير.

الأثر المتوقع أو الملحوظ:
${impact || "زيادة المشاركة، تحسين الفهم، وتوثيق نواتج التعلم."}

الشواهد:
صور الدرس / خطة الدرس / بطاقة ملاحظة / نتائج المتعلمين.
    `,
  },
  {
    id: "school-activity",
    category: "نشاط مدرسي",
    title: "نموذج نشاط مدرسي",
    description: "لتوثيق الأنشطة المدرسية.",
    fields: [
      ["name", "اسم النشاط"],
      ["goal", "الهدف"],
      ["target", "الفئة المستهدفة"],
      ["date", "التاريخ"],
      ["evidence", "الشواهد"],
    ],
    body: ({ name, goal, target, date, evidence }) => `
نموذج نشاط مدرسي

اسم النشاط: ${name || "................"}
الهدف: ${goal || "................"}
الفئة المستهدفة: ${target || "................"}
التاريخ: ${date || "................"}

وصف التنفيذ:
تم تنفيذ النشاط وفق خطة منظمة وبمشاركة الفئة المستهدفة.

الشواهد:
${evidence || "صور / تقرير مختصر / كشوف مشاركة"}
    `,
  },
  {
    id: "event-report",
    category: "فعالية",
    title: "نموذج تقرير فعالية",
    description: "لإعداد تقرير مختصر عن فعالية.",
    fields: [
      ["name", "اسم الفعالية"],
      ["role", "نوع المشاركة"],
      ["date", "التاريخ"],
      ["summary", "ملخص التنفيذ"],
      ["impact", "الأثر"],
    ],
    body: ({ name, role, date, summary, impact }) => `
تقرير فعالية

اسم الفعالية: ${name || "................"}
نوع المشاركة: ${role || "تنظيم / تنفيذ / حضور / إشراف"}
التاريخ: ${date || "................"}

ملخص التنفيذ:
${summary || "................................"}

الأثر:
${impact || "تعزيز المشاركة، دعم القيم التربوية، وإثراء البيئة المدرسية."}

الشواهد:
صور / شهادات / تقرير مختصر.
    `,
  },
  {
    id: "radio-program",
    category: "إذاعة مدرسية",
    title: "نموذج برنامج إذاعي",
    description: "لتوثيق برنامج إذاعي مدرسي.",
    fields: [
      ["title", "عنوان البرنامج"],
      ["date", "التاريخ"],
      ["value", "القيمة أو الموضوع"],
      ["participants", "المشاركون"],
      ["link", "رابط التسجيل أو الشاهد"],
    ],
    body: ({ title, date, value, participants, link }) => `
نموذج برنامج إذاعي

عنوان البرنامج: ${title || "................"}
التاريخ: ${date || "................"}
القيمة أو الموضوع: ${value || "................"}
المشاركون: ${participants || "................"}

وصف البرنامج:
تم تقديم برنامج إذاعي يهدف إلى تعزيز الوعي بالقيمة أو الموضوع المحدد.

رابط التسجيل أو الشاهد:
${link || "................................"}
    `,
  },
];

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

function normalizeAppSettings(raw = {}) {
  return {
    schoolYear: String(raw.schoolYear || "2026 / 2027"),
    term: ["term1", "term2", "annual"].includes(raw.term) ? raw.term : "term1",
    defaultReminder: ["7", "3", "1", "0"].includes(String(raw.defaultReminder)) ? String(raw.defaultReminder) : "3",
    printMode: ["official", "detailed", "presentation"].includes(raw.printMode) ? raw.printMode : "official",
    publicShare: raw.publicShare !== false,
    autoArchive: raw.autoArchive !== false,
    lastSavedAt: raw.lastSavedAt || "",
  };
}

function normalizeDevelopmentPlan(raw = []) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item) => item && typeof item === "object")
    .map((item, index) => ({
      id: String(item.id || `dev-${Date.now()}-${index}`),
      focus: String(item.focus || "الأداء التدريسي"),
      priority: ["high", "medium", "low"].includes(item.priority) ? item.priority : "medium",
      goal: String(item.goal || ""),
      action: String(item.action || ""),
      evidence: String(item.evidence || ""),
      dueDate: String(item.dueDate || ""),
      status: ["planned", "active", "completed"].includes(item.status) ? item.status : "planned",
      createdAt: String(item.createdAt || new Date().toISOString()),
    }))
    .filter((item) => item.goal.trim() || item.action.trim());
}

function normalizeSelfAssessment(raw = {}) {
  const scores = raw && typeof raw.scores === "object" && !Array.isArray(raw.scores) ? raw.scores : {};
  return {
    scores: Object.fromEntries(
      Object.entries(scores).map(([key, value]) => [key, Math.min(5, Math.max(0, Number(value) || 0))]),
    ),
    reflection: String(raw.reflection || ""),
    updatedAt: String(raw.updatedAt || ""),
  };
}

function normalizeTemplateSettings(raw = {}) {
  const sectionOrder = Array.isArray(raw.sectionOrder)
    ? raw.sectionOrder.filter((item) => ["head", "body", "signatures"].includes(item))
    : [];
  return {
    schoolName: String(raw.schoolName || ""),
    teacherName: String(raw.teacherName || ""),
    headName: String(raw.headName || ""),
    principalName: String(raw.principalName || ""),
    borderStyle: ["classic", "gold", "teal", "none"].includes(raw.borderStyle) ? raw.borderStyle : "classic",
    schoolLogo: typeof raw.schoolLogo === "string" ? raw.schoolLogo : "",
    extraLogo: typeof raw.extraLogo === "string" ? raw.extraLogo : "",
    frameImage: typeof raw.frameImage === "string" ? raw.frameImage : "",
    sectionOrder: [...sectionOrder, ...["head", "body", "signatures"].filter((item) => !sectionOrder.includes(item))],
  };
}

function getPublicProfileName(fallback = "ملف الإنجاز المهني") {
  return profileDetails.fullName?.trim() || fallback;
}

function getPublicShareUrl(userId = currentUser?.id) {
  const baseUrl = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? `${window.location.origin}${window.location.pathname}`
    : "https://monjazkw.com/";
  return userId ? `${baseUrl}?share=${encodeURIComponent(userId)}#share` : "https://monjazkw.com/#share";
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

function buildPublicShareSnapshot() {
  const readiness = getReadinessData();
  const publicAchievements = achievements.slice(0, 30).map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date || "",
    type: item.type,
    category: portfolioConfig[item.type]?.title || "إنجاز",
    summary: item.summary || "",
    evidenceCount: item.evidence?.length || 0,
  }));
  const publicAwards = awards.slice(0, 12).map((award) => ({
    title: award.title,
    level: award.level || "",
    date: award.date || "",
    issuer: award.issuer || "",
  }));

  return {
    active: appSettings.publicShare !== false,
    ownerId: currentUser?.id || "",
    publishedAt: new Date().toISOString(),
    profile: {
      name: getPublicProfileName(),
      school: profileDetails.school || "",
      stage: profileDetails.stage || "",
      district: profileDetails.district || "",
      specialty: profileDetails.specialty || "",
    },
    summary: {
      readinessScore: readiness.score,
      readinessTitle: readiness.score >= 80 ? "ملف جاهز للعرض" : readiness.score >= 45 ? "ملف متقدم" : "ملف قيد البناء",
      readinessText:
        readiness.score >= 80
          ? "الملف يحتوي على توثيق جيد ويمكن مشاركته للزيارة أو العرض."
          : "كلما زادت الشواهد وتنوعت المجالات ظهرت صفحة المشاركة بصورة أقوى.",
      total: achievements.length,
      evidenceCount: readiness.evidenceCount,
      awardsCount: awards.length,
      excellentDaysCount: excellentDays.length,
      strongestArea: readiness.strongestArea,
    },
    achievements: publicAchievements,
    awards: publicAwards,
  };
}

async function publishPublicShare() {
  if (!currentUser?.id) return;
  const publicRef = doc(db, "publicShares", currentUser.id);
  if (appSettings.publicShare === false) {
    await setDoc(
      publicRef,
      {
        active: false,
        ownerId: currentUser.id,
        publishedAt: new Date().toISOString(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return;
  }

  await setDoc(
    publicRef,
    {
      ...buildPublicShareSnapshot(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

async function loadPublicShare() {
  if (!PUBLIC_SHARE_ID) return false;
  try {
    const snapshot = await getDoc(doc(db, "publicShares", PUBLIC_SHARE_ID));
    publicShareData = snapshot.exists() ? cleanStoredData(snapshot.data()) : { active: false };
    showPage("share");
    renderSharePage();
    return true;
  } catch {
    publicShareData = { active: false };
    showPage("share");
    renderSharePage();
    return false;
  }
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
      appSettings,
      developmentPlan,
      selfAssessment,
      awards,
      archives,
      excellentDays,
      leaveStats,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  achievements = await syncRemoteCollection(batch, refs.achievements, achievements);
  calendarEvents = await syncRemoteCollection(batch, refs.calendarEvents, calendarEvents);
  await batch.commit();
  await publishPublicShare();
  renderPortfolioQr();
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
        if (profile.appSettings && typeof profile.appSettings === "object") {
          appSettings = normalizeAppSettings(profile.appSettings);
          localStorage.setItem("munjaz.appSettings", JSON.stringify(appSettings));
          renderSystemSettings();
        }
        if (Array.isArray(profile.developmentPlan)) {
          developmentPlan = normalizeDevelopmentPlan(cleanStoredData(profile.developmentPlan));
          localStorage.setItem("munjaz.developmentPlan", JSON.stringify(developmentPlan));
          renderDevelopmentPlan();
        }
        if (profile.selfAssessment && typeof profile.selfAssessment === "object") {
          selfAssessment = normalizeSelfAssessment(cleanStoredData(profile.selfAssessment));
          localStorage.setItem("munjaz.selfAssessment", JSON.stringify(selfAssessment));
          renderSelfAssessment();
        }
        if (Array.isArray(profile.awards)) {
          awards = cleanStoredData(profile.awards);
          localStorage.setItem("munjaz.awards", JSON.stringify(awards));
          renderAwards();
        }
        if (Array.isArray(profile.archives)) {
          archives = cleanStoredData(profile.archives);
          localStorage.setItem("munjaz.archives", JSON.stringify(archives));
          renderArchives();
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
    renderDevelopmentPlan();
    renderSelfAssessment();
    return;
  }

  if (!HAS_LOCAL_API) {
    renderPortfolio(activePortfolio);
    renderHomeMetrics();
    renderCalendar();
    renderExcellentDays();
    renderReport(activeReport);
    renderDevelopmentPlan();
    renderSelfAssessment();
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
    renderDevelopmentPlan();
    renderSelfAssessment();
  } catch {
    renderPortfolio(activePortfolio);
    renderHomeMetrics();
    renderCalendar();
    renderExcellentDays();
    renderReport(activeReport);
    renderDevelopmentPlan();
    renderSelfAssessment();
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

function formatSettingsDate(value) {
  if (!value) return "محلي";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "محلي";
  return date.toLocaleDateString("ar", { day: "numeric", month: "short", year: "numeric" });
}

function getTotalRecordCount() {
  const hasSelfAssessment = Object.values(selfAssessment.scores || {}).some((value) => Number(value) > 0);
  return achievements.length + calendarEvents.length + awards.length + archives.length + developmentPlan.length + (hasSelfAssessment ? 1 : 0);
}

function renderSystemSettings() {
  if (!settingsView.dataHealth) return;

  settingsInputs.schoolYear.value = appSettings.schoolYear;
  settingsInputs.term.value = appSettings.term;
  settingsInputs.defaultReminder.value = appSettings.defaultReminder;
  settingsInputs.printMode.value = appSettings.printMode;
  settingsInputs.publicShare.checked = appSettings.publicShare;
  settingsInputs.autoArchive.checked = appSettings.autoArchive;

  const totalRecords = getTotalRecordCount();
  const hasProfileName = Boolean(profileDetails.fullName?.trim());
  settingsView.userName.textContent = getPublicProfileName("غير محدد");
  settingsView.email.textContent = currentUser?.email || "لم يتم تسجيل الدخول";
  settingsView.firebaseStatus.textContent = currentUser?.mode === "local" || !currentUser ? "محلي" : "متصل";
  settingsView.recordsCount.textContent = totalRecords;
  settingsView.lastSync.textContent = formatSettingsDate(appSettings.lastSavedAt);
  settingsView.scope.textContent = appSettings.schoolYear;
  settingsView.dataHealth.textContent = hasProfileName && totalRecords ? "مكتمل" : totalRecords ? "جيد" : "جديد";
}

async function saveSystemSettings() {
  appSettings = normalizeAppSettings({
    schoolYear: settingsInputs.schoolYear?.value.trim(),
    term: settingsInputs.term?.value,
    defaultReminder: settingsInputs.defaultReminder?.value,
    printMode: settingsInputs.printMode?.value,
    publicShare: settingsInputs.publicShare?.checked,
    autoArchive: settingsInputs.autoArchive?.checked,
    lastSavedAt: new Date().toISOString(),
  });
  localStorage.setItem("munjaz.appSettings", JSON.stringify(appSettings));
  renderSystemSettings();
  if (settingsView.saveStatus) settingsView.saveStatus.textContent = currentUser ? "جاري الحفظ..." : "تم حفظ الإعدادات محليا.";

  try {
    await saveRemoteState();
    if (settingsView.saveStatus) settingsView.saveStatus.textContent = currentUser ? "تم حفظ الإعدادات في فايربيز." : "تم حفظ الإعدادات محليا.";
  } catch {
    if (settingsView.saveStatus) settingsView.saveStatus.textContent = "تم حفظ الإعدادات محليا، وتعذر الحفظ في فايربيز حاليا.";
  }
}

function getDevelopmentPriorityLabel(priority) {
  return { high: "عالية", medium: "متوسطة", low: "منخفضة" }[priority] || "متوسطة";
}

function getDevelopmentStatusLabel(status) {
  return { planned: "مخطط", active: "قيد التنفيذ", completed: "منجز" }[status] || "مخطط";
}

function formatDevelopmentDate(dateKey) {
  if (!dateKey) return "-";
  const date = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateKey;
  return date.toLocaleDateString("ar", { day: "numeric", month: "short", year: "numeric" });
}

function persistDevelopmentPlan(message = "تم حفظ خطة التطوير المهني.") {
  developmentPlan = normalizeDevelopmentPlan(developmentPlan);
  localStorage.setItem("munjaz.developmentPlan", JSON.stringify(developmentPlan));
  renderDevelopmentPlan();
  if (developmentPlanView.status) developmentPlanView.status.textContent = message;
  saveRemoteState().catch(() => {
    if (developmentPlanView.status) developmentPlanView.status.textContent = "تم الحفظ محليا، وتعذر الحفظ في فايربيز حاليا.";
  });
}

function addDevelopmentPlanItem(item = null) {
  const nextItem = item || {
    focus: developmentPlanInputs.focus?.value || "الأداء التدريسي",
    priority: developmentPlanInputs.priority?.value || "medium",
    goal: developmentPlanInputs.goal?.value.trim() || "",
    action: developmentPlanInputs.action?.value.trim() || "",
    evidence: developmentPlanInputs.evidence?.value.trim() || "",
    dueDate: developmentPlanInputs.dueDate?.value || "",
    status: developmentPlanInputs.status?.value || "planned",
  };

  if (!nextItem.goal.trim() && !nextItem.action.trim()) {
    if (developmentPlanView.status) developmentPlanView.status.textContent = "اكتب الهدف أو الإجراء قبل الإضافة.";
    return;
  }

  developmentPlan = [
    {
      id: `dev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "planned",
      ...nextItem,
    },
    ...developmentPlan,
  ];

  if (!item) {
    if (developmentPlanInputs.goal) developmentPlanInputs.goal.value = "";
    if (developmentPlanInputs.action) developmentPlanInputs.action.value = "";
    if (developmentPlanInputs.evidence) developmentPlanInputs.evidence.value = "";
    if (developmentPlanInputs.dueDate) developmentPlanInputs.dueDate.value = "";
  }

  persistDevelopmentPlan("تمت إضافة هدف تطويري للخطة.");
}

function renderDevelopmentPlan() {
  if (!developmentPlanView.list) return;

  const total = developmentPlan.length;
  const done = developmentPlan.filter((item) => item.status === "completed").length;
  const active = developmentPlan.filter((item) => item.status === "active" || item.status === "planned").length;
  const completion = total ? Math.round((done / total) * 100) : 0;
  const nextDue = [...developmentPlan]
    .filter((item) => item.status !== "completed" && item.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.dueDate;

  if (developmentPlanView.completion) developmentPlanView.completion.textContent = `${completion}%`;
  if (developmentPlanView.total) developmentPlanView.total.textContent = total;
  if (developmentPlanView.done) developmentPlanView.done.textContent = done;
  if (developmentPlanView.active) developmentPlanView.active.textContent = active;
  if (developmentPlanView.next) developmentPlanView.next.textContent = formatDevelopmentDate(nextDue);

  if (developmentPlanView.suggestions) {
    developmentPlanView.suggestions.innerHTML = developmentPlanSuggestions
      .map(
        (item, index) => `
          <button type="button" data-add-development-suggestion="${index}">
            <strong>${escapeHtml(item.focus)}</strong>
            <span>${escapeHtml(item.goal)}</span>
          </button>
        `,
      )
      .join("");
  }

  developmentPlanView.list.innerHTML = total
    ? developmentPlan
        .map(
          (item) => `
            <article class="development-plan-item ${item.status}">
              <div class="development-plan-item-head">
                <span>${escapeHtml(item.focus)}</span>
                <b>${getDevelopmentPriorityLabel(item.priority)}</b>
              </div>
              <h3>${escapeHtml(item.goal || "هدف تطويري")}</h3>
              <p>${escapeHtml(item.action || "لم يتم تحديد إجراء بعد.")}</p>
              <div class="development-plan-evidence">
                <small>الشاهد</small>
                <strong>${escapeHtml(item.evidence || "يحدد لاحقا")}</strong>
              </div>
              <div class="development-plan-footer">
                <label>
                  <span>الحالة</span>
                  <select data-development-status="${item.id}">
                    <option value="planned" ${item.status === "planned" ? "selected" : ""}>مخطط</option>
                    <option value="active" ${item.status === "active" ? "selected" : ""}>قيد التنفيذ</option>
                    <option value="completed" ${item.status === "completed" ? "selected" : ""}>منجز</option>
                  </select>
                </label>
                <div><span>المتابعة</span><strong>${formatDevelopmentDate(item.dueDate)}</strong></div>
                <button type="button" data-delete-development="${item.id}">حذف</button>
              </div>
            </article>
          `,
        )
        .join("")
    : `
      <div class="development-plan-empty">
        <strong>لا توجد أهداف تطويرية بعد</strong>
        <span>أضف هدفا من النموذج أو اختر اقتراحا جاهزا كبداية.</span>
      </div>
    `;
}

function getSelfAssessmentSummary() {
  const scored = selfAssessmentCriteria
    .map((criterion) => ({
      ...criterion,
      score: Number(selfAssessment.scores?.[criterion.id]) || 0,
    }))
    .filter((criterion) => criterion.score > 0);
  const average = scored.length ? scored.reduce((sum, item) => sum + item.score, 0) / scored.length : 0;
  const strongest = scored.length ? [...scored].sort((a, b) => b.score - a.score)[0] : null;
  const priority = scored.length ? [...scored].sort((a, b) => a.score - b.score)[0] : null;

  return { scored, average, strongest, priority };
}

function renderSelfAssessment() {
  if (!selfAssessmentView.grid) return;
  const summary = getSelfAssessmentSummary();

  if (selfAssessmentView.average) selfAssessmentView.average.textContent = summary.average.toFixed(1);
  if (selfAssessmentView.completed) selfAssessmentView.completed.textContent = summary.scored.length;
  if (selfAssessmentView.strongest) selfAssessmentView.strongest.textContent = summary.strongest?.title || "-";
  if (selfAssessmentView.priority) selfAssessmentView.priority.textContent = summary.priority?.title || "-";
  if (selfAssessmentView.reflection) selfAssessmentView.reflection.value = selfAssessment.reflection || "";

  selfAssessmentView.grid.innerHTML = selfAssessmentCriteria
    .map((criterion) => {
      const score = Number(selfAssessment.scores?.[criterion.id]) || 0;
      return `
        <article class="self-assessment-item" style="--score:${score}">
          <div>
            <span>${escapeHtml(criterion.title)}</span>
            <strong>${score || "-"}</strong>
          </div>
          <p>${escapeHtml(criterion.description)}</p>
          <div class="self-rating" data-self-criterion="${criterion.id}">
            ${[1, 2, 3, 4, 5]
              .map(
                (value) => `
                  <button class="${score === value ? "active" : ""}" type="button" data-self-score="${value}">
                    ${value}
                  </button>
                `,
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function persistSelfAssessment(message = "تم حفظ التقييم الذاتي.") {
  selfAssessment = normalizeSelfAssessment({
    ...selfAssessment,
    reflection: selfAssessmentView.reflection?.value.trim() || "",
    updatedAt: new Date().toISOString(),
  });
  localStorage.setItem("munjaz.selfAssessment", JSON.stringify(selfAssessment));
  renderSelfAssessment();
  renderSystemSettings();
  if (selfAssessmentView.status) selfAssessmentView.status.textContent = message;
  saveRemoteState().catch(() => {
    if (selfAssessmentView.status) selfAssessmentView.status.textContent = "تم الحفظ محليا، وتعذر الحفظ في فايربيز حاليا.";
  });
}

function getTemplateValues() {
  return Object.fromEntries(
    Array.from(templatesView.fields?.querySelectorAll("[data-template-field]") || []).map((input) => [
      input.dataset.templateField,
      input.value.trim(),
    ]),
  );
}

function getActiveTemplate() {
  return readyTemplates.find((template) => template.id === activeTemplate) || readyTemplates[0];
}

function getTemplatePlainText() {
  const template = getActiveTemplate();
  if (!template) return "";
  return template.body(getTemplateValues()).trim();
}

function renderTemplateSettings() {
  if (templateSettingsInputs.schoolName) templateSettingsInputs.schoolName.value = templateSettings.schoolName;
  if (templateSettingsInputs.teacherName) templateSettingsInputs.teacherName.value = templateSettings.teacherName;
  if (templateSettingsInputs.headName) templateSettingsInputs.headName.value = templateSettings.headName;
  if (templateSettingsInputs.principalName) templateSettingsInputs.principalName.value = templateSettings.principalName;
  if (templateSettingsInputs.borderStyle) templateSettingsInputs.borderStyle.value = templateSettings.borderStyle;
}

function getTemplateSectionLabel(section) {
  return {
    head: "رأس الورقة والشعارات",
    body: "محتوى النموذج القابل للتعديل",
    signatures: "تواقيع المعلم ورئيس القسم والمدير",
  }[section] || section;
}

function renderTemplateArrange() {
  if (!templatesView.arrange) return;
  const order = templateSettings.sectionOrder || ["head", "body", "signatures"];
  templatesView.arrange.innerHTML = order
    .map(
      (section, index) => `
        <article>
          <strong>${escapeHtml(getTemplateSectionLabel(section))}</strong>
          <div>
            <button type="button" data-template-move="${section}" data-direction="-1" ${index === 0 ? "disabled" : ""}>فوق</button>
            <button type="button" data-template-move="${section}" data-direction="1" ${index === order.length - 1 ? "disabled" : ""}>تحت</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderTemplateLogo(src, label) {
  if (src) return `<img src="${src}" alt="${escapeHtml(label)}" />`;
  return `<span>${escapeHtml(label)}</span>`;
}

function getTemplateEditedText() {
  return templatesView.preview?.querySelector(".template-paper-body")?.innerText.trim() || getTemplatePlainText();
}

function renderTemplatePreview() {
  const template = getActiveTemplate();
  if (!template || !templatesView.preview) return "";
  const text = getTemplatePlainText();
  const lines = text
    .split("\n")
    .map((line) => (line.trim() ? `<p>${escapeHtml(line)}</p>` : "<br />"))
    .join("");
  const schoolLogo = templateSettings.schoolLogo
    ? `<img src="${templateSettings.schoolLogo}" alt="لوقو المدرسة" />`
    : `<span>لوقو المدرسة</span>`;
  const extraLogo = templateSettings.extraLogo
    ? `<img src="${templateSettings.extraLogo}" alt="لوقو إضافي" />`
    : `<span>لوقو إضافي</span>`;
  const frameStyle = templateSettings.frameImage ? ` style="--template-frame:url('${templateSettings.frameImage}')"` : "";

  templatesView.preview.className = `template-preview template-border-${templateSettings.borderStyle}`;
  templatesView.preview.innerHTML = `
    <div class="template-paper"${frameStyle}>
      <header class="template-paper-head">
        <div class="template-paper-logo">${schoolLogo}</div>
        <div>
          <span>${escapeHtml(template.category)}</span>
          <h3>${escapeHtml(templateSettings.schoolName || "اسم المدرسة")}</h3>
          <p>${escapeHtml(template.title)}</p>
        </div>
        <div class="template-paper-logo">${extraLogo}</div>
      </header>
      <section class="template-paper-body" contenteditable="true" spellcheck="true">
        ${lines}
      </section>
      <footer class="template-paper-signatures">
        <div><span>اسم المعلم/المعلمة</span><strong>${escapeHtml(templateSettings.teacherName || "................")}</strong></div>
        <div><span>رئيس القسم</span><strong>${escapeHtml(templateSettings.headName || "................")}</strong></div>
        <div><span>مدير المدرسة</span><strong>${escapeHtml(templateSettings.principalName || "................")}</strong></div>
      </footer>
    </div>
  `;
  return [
    templateSettings.schoolName,
    template.title,
    text,
    `اسم المعلم/المعلمة: ${templateSettings.teacherName || ""}`,
    `رئيس القسم: ${templateSettings.headName || ""}`,
    `مدير المدرسة: ${templateSettings.principalName || ""}`,
  ].filter(Boolean).join("\n\n");
}

function renderTemplates() {
  if (!templatesView.list || !templatesView.fields) return;
  const template = getActiveTemplate();
  if (!template) return;

  if (templatesView.count) templatesView.count.textContent = readyTemplates.length;
  templatesView.list.innerHTML = readyTemplates
    .map(
      (item) => `
        <button class="${item.id === template.id ? "active" : ""}" type="button" data-template-id="${item.id}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.description)}</span>
        </button>
      `,
    )
    .join("");

  if (templatesView.category) templatesView.category.textContent = template.category;
  if (templatesView.title) templatesView.title.textContent = template.title;
  templatesView.fields.innerHTML = template.fields
    .map(
      ([key, label]) => `
        <label>
          <span>${escapeHtml(label)}</span>
          <input type="text" data-template-field="${key}" placeholder="${escapeHtml(label)}" />
        </label>
      `,
    )
    .join("");
  if (templatesView.status) templatesView.status.textContent = "";
  renderTemplatePreview();
}

async function copyCurrentTemplate() {
  const text = renderTemplatePreview();
  try {
    await navigator.clipboard.writeText(text);
    if (templatesView.status) templatesView.status.textContent = "تم نسخ النموذج.";
  } catch {
    if (templatesView.status) templatesView.status.textContent = "تعذر النسخ التلقائي، يمكن تحديد النص من المعاينة.";
  }
}

function getTemplateCopyText() {
  const template = getActiveTemplate();
  if (!template) return "";
  return [
    templateSettings.schoolName,
    template.title,
    getTemplateEditedText(),
    `اسم المعلم/المعلمة: ${templateSettings.teacherName || ""}`,
    `رئيس القسم: ${templateSettings.headName || ""}`,
    `مدير المدرسة: ${templateSettings.principalName || ""}`,
  ].filter(Boolean).join("\n\n");
}

function renderTemplatePreview() {
  const template = getActiveTemplate();
  if (!template || !templatesView.preview) return "";
  const text = getTemplatePlainText();
  const lines = text
    .split("\n")
    .map((line) => (line.trim() ? `<p>${escapeHtml(line)}</p>` : "<br />"))
    .join("");
  const frameStyle = templateSettings.frameImage ? ` style="--template-frame:url('${templateSettings.frameImage}')"` : "";
  const sections = {
    head: `
      <header class="template-paper-head" data-paper-section="head">
        <div class="template-paper-logo">${renderTemplateLogo(templateSettings.schoolLogo, "لوقو المدرسة")}</div>
        <div>
          <span>${escapeHtml(template.category)}</span>
          <h3>${escapeHtml(templateSettings.schoolName || "اسم المدرسة")}</h3>
          <p>${escapeHtml(template.title)}</p>
        </div>
        <div class="template-paper-logo">${renderTemplateLogo(templateSettings.extraLogo, "لوقو إضافي")}</div>
      </header>
    `,
    body: `
      <section class="template-paper-body" data-paper-section="body" contenteditable="true" spellcheck="true">
        ${lines}
      </section>
    `,
    signatures: `
      <footer class="template-paper-signatures" data-paper-section="signatures">
        <div><span>اسم المعلم/المعلمة</span><strong>${escapeHtml(templateSettings.teacherName || "................")}</strong></div>
        <div><span>رئيس القسم</span><strong>${escapeHtml(templateSettings.headName || "................")}</strong></div>
        <div><span>مدير المدرسة</span><strong>${escapeHtml(templateSettings.principalName || "................")}</strong></div>
      </footer>
    `,
  };
  const orderedSections = (templateSettings.sectionOrder || ["head", "body", "signatures"])
    .map((section) => sections[section])
    .filter(Boolean)
    .join("");

  templatesView.preview.className = `template-preview template-border-${templateSettings.borderStyle || "classic"}`;
  templatesView.preview.innerHTML = `
    <div class="template-paper"${frameStyle}>
      ${orderedSections}
    </div>
  `;
  renderTemplateArrange();
  return getTemplateCopyText();
}

async function copyCurrentTemplate() {
  const text = getTemplateCopyText();
  try {
    await navigator.clipboard.writeText(text);
    if (templatesView.status) templatesView.status.textContent = "تم نسخ النموذج.";
  } catch {
    if (templatesView.status) templatesView.status.textContent = "تعذر النسخ التلقائي، يمكن تحديد النص من المعاينة.";
  }
}

function readTemplateImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    if (file.size > 1200000) {
      reject(new Error("large-file"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("read-failed"));
    reader.readAsDataURL(file);
  });
}

async function previewTemplateImageInput(key, input) {
  const file = input?.files?.[0];
  if (!file) return;
  try {
    templateSettings[key] = await readTemplateImage(file);
    templateSettings = normalizeTemplateSettings(templateSettings);
    renderTemplatePreview();
    if (templatesView.settingsStatus) templatesView.settingsStatus.textContent = "تم تحديث المعاينة. اضغط حفظ الإعدادات إذا الشكل مناسب.";
  } catch {
    if (templatesView.settingsStatus) templatesView.settingsStatus.textContent = "حجم الصورة كبير. اختاري صورة أصغر حتى تظهر في المعاينة.";
  }
}

function syncTemplateSettingsFromInputs() {
  templateSettings = normalizeTemplateSettings({
    ...templateSettings,
    schoolName: templateSettingsInputs.schoolName?.value.trim() || "",
    teacherName: templateSettingsInputs.teacherName?.value.trim() || "",
    headName: templateSettingsInputs.headName?.value.trim() || "",
    principalName: templateSettingsInputs.principalName?.value.trim() || "",
    borderStyle: templateSettingsInputs.borderStyle?.value || "classic",
  });
}

async function saveTemplateSettings() {
  syncTemplateSettingsFromInputs();
  try {
    const uploads = [
      ["schoolLogo", templateSettingsInputs.schoolLogo?.files?.[0]],
      ["extraLogo", templateSettingsInputs.extraLogo?.files?.[0]],
      ["frameImage", templateSettingsInputs.frameImage?.files?.[0]],
    ];
    for (const [key, file] of uploads) {
      if (file) templateSettings[key] = await readTemplateImage(file);
    }
    templateSettings = normalizeTemplateSettings(templateSettings);
    localStorage.setItem("munjaz.templateSettings", JSON.stringify(templateSettings));
    renderTemplateSettings();
    renderTemplatePreview();
    if (templatesView.settingsStatus) templatesView.settingsStatus.textContent = "تم حفظ إعدادات الورقة على هذا الجهاز.";
  } catch {
    if (templatesView.settingsStatus) templatesView.settingsStatus.textContent = "حجم الصورة كبير. اختاري صورة أصغر أو قصيها ثم ارفعيها.";
  }
}

function exportBackup() {
  const backup = {
    exportedAt: new Date().toISOString(),
    app: "منجز",
    user: currentUser ? { email: currentUser.email, name: getPublicProfileName("غير محدد") } : null,
    profileDetails,
    appSettings,
    developmentPlan,
    selfAssessment,
    templateSettings,
    achievements,
    calendarEvents,
    awards,
    archives,
    excellentDays,
    leaveStats,
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `munjaz-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  if (settingsView.saveStatus) settingsView.saveStatus.textContent = "تم تنزيل النسخة الاحتياطية.";
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
  renderHomeMetrics();
  renderSharePage();

  if (profileSaveStatus) profileSaveStatus.textContent = currentUser ? "جاري الحفظ..." : "تم الحفظ على هذا الجهاز.";
  try {
    await saveRemoteState();
    if (profileSaveStatus) profileSaveStatus.textContent = currentUser ? "تم حفظ البيانات في فايربيز." : "تم الحفظ على هذا الجهاز.";
  } catch {
    if (profileSaveStatus) profileSaveStatus.textContent = "تم الحفظ محلياً، وتعذر الحفظ في فايربيز حالياً.";
  }
}

const SHARE_URL = "https://monjazkw.com/#share";
const STATIC_QR_SRC = "assets/share-qr.png";

function createQrDataUrl(text, size = 260) {
  if (!window.QRCode) return STATIC_QR_SRC;
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
    element.innerHTML = `<img src="${STATIC_QR_SRC}" alt="رمز QR لملف الإنجاز" />`;
    return STATIC_QR_SRC;
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
  const qrTarget = getPublicShareUrl();
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

function getReminderLabel(value) {
  const days = String(value || "7");
  if (days === "1") return "قبل يوم";
  if (days === "3") return "قبل 3 أيام";
  return "قبل أسبوع";
}

function getReminderNote(value) {
  const days = String(value || "7");
  if (days === "1") return "تأكيد نهائي قبل التنفيذ";
  if (days === "3") return "وقت مناسب لمراجعة الشواهد";
  return "تنبيه مبكر للتجهيز والتنسيق";
}

function syncReminderPills() {
  const selected = eventReminder?.value || "7";
  reminderButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.reminderValue === selected);
  });
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
          <small class="reminder-chip"><b>${getReminderLabel(event.reminder)}</b><span>${getReminderNote(event.reminder)}</span></small>
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
  eventDialogReminder.textContent = `${getReminderLabel(event.reminder)} - ${getReminderNote(event.reminder)}`;
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

loginButton?.addEventListener("click", () => {
  if (currentUser) {
    showPage("profile");
    return;
  }
  openLogin();
});

loginTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (currentUser) {
      showPage("portfolio");
      return;
    }
    openLogin();
  });
});

loginForm?.addEventListener("submit", async (event) => {
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

cancelLogin?.addEventListener("click", () => {
  loginDialog.close();
});

logoutButton?.addEventListener("click", logoutUser);

function showPage(page) {
  if (!document.querySelector(`[data-page="${page}"]`)) return;
  views.forEach((view) => {
    view.classList.toggle("active", view.dataset.page === page);
  });
  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === page);
  });
  if (window.location.hash !== `#${page}`) window.location.hash = page;
}

function bindPageNavigation() {
  pageLinks.forEach((link) => {
    if (link.dataset.navBound === "true") return;
    link.dataset.navBound = "true";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPage(link.dataset.pageLink);
    });
  });

  pageButtons.forEach((button) => {
    if (button.dataset.navBound === "true") return;
    button.dataset.navBound = "true";
    button.addEventListener("click", () => {
      showPage(button.dataset.pageButton);
    });
  });
}

bindPageNavigation();

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

function getAchievementEvidenceCount() {
  return achievements.reduce((total, item) => total + (item.evidence?.length || 0), 0);
}

function getReadinessData() {
  const total = achievements.length;
  const evidenceCount = getAchievementEvidenceCount();
  const documentedCount = achievements.filter((item) => item.evidence?.length).length;
  const uniqueTypes = new Set(achievements.map((item) => item.type)).size;
  const profileFields = Object.values(profileDetails || {}).filter((value) => String(value || "").trim()).length;
  const profileScore = Math.min(1, profileFields / 7);
  const achievementScore = Math.min(1, total / 30);
  const evidenceScore = total ? documentedCount / total : 0;
  const diversityScore = Math.min(1, uniqueTypes / 7);
  const calendarScore = Math.min(1, calendarEvents.length / 8);
  const excellentScore = Math.min(1, excellentDays.length / 140);
  const awardScore = Math.min(1, awards.length / 2);
  const score = Math.round(
    achievementScore * 30 +
      evidenceScore * 22 +
      diversityScore * 14 +
      profileScore * 12 +
      calendarScore * 10 +
      excellentScore * 8 +
      awardScore * 4,
  );
  const missingEvidence = Math.max(0, total - documentedCount);
  const strongestArea = Object.entries(countBy(achievements, (item) => portfolioConfig[item.type]?.title || "إنجاز آخر"))
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "لم يحدد بعد";

  return {
    score,
    total,
    evidenceCount,
    documentedCount,
    missingEvidence,
    uniqueTypes,
    profileFields,
    strongestArea,
  };
}

function renderSmartInsights(readiness) {
  if (!homeMetrics.insightStrip || !homeMetrics.smartAlerts || !homeMetrics.coverageBars) return;

  homeMetrics.insightStrip.innerHTML = [
    ["أقوى مجال", readiness.strongestArea],
    ["إنجازات موثقة", readiness.documentedCount],
    ["شواهد محفوظة", readiness.evidenceCount],
    ["تنوع المجالات", readiness.uniqueTypes],
  ]
    .map(([label, value]) => `<article><span>${label}</span><strong>${escapeHtml(value)}</strong></article>`)
    .join("");

  const alerts = [];
  if (!currentUser) alerts.push(["سجل الدخول", "حتى تحفظ بياناتك في فايربيز وتنتقل معك بين الأجهزة."]);
  if (readiness.profileFields < 7) alerts.push(["أكمل بياناتي", "البيانات المهنية تظهر في ملف الإنجاز الكامل."]);
  if (readiness.missingEvidence) alerts.push(["أضف شواهد", `يوجد ${readiness.missingEvidence} إنجاز بدون مرفق أو رابط.`]);
  if (readiness.uniqueTypes < 5) alerts.push(["وازن الملف", "نوّع بين الدروس، الورش، الفعاليات، الزيارات، والبرامج."]);
  if (excellentDays.length < 140) alerts.push(["تابع الأيام الفعلية", `المتبقي ${140 - excellentDays.length} يوم للوصول إلى 140 يوم.`]);
  if (!awards.length) alerts.push(["أضف الجوائز", "حتى تظهر الإنجازات النوعية في الملف الكامل."]);
  if (!alerts.length) alerts.push(["الملف متوازن", "استمر بتحديث الشواهد والرزنامة أولاً بأول."]);

  homeMetrics.smartAlerts.innerHTML = alerts
    .slice(0, 4)
    .map(([title, text]) => `<li><strong>${title}</strong><span>${text}</span></li>`)
    .join("");

  const coverageItems = [
    ["الدورات والورش", countAchievementsByType("development", "workshops")],
    ["الدروس الريادية", countAchievementsByType("lessons")],
    ["المسابقات", countAchievementsByType("competitions")],
    ["الفعاليات", countAchievementsByType("events")],
    ["البرامج الإذاعية", countAchievementsByType("radio")],
    ["تبادل الزيارات", countAchievementsByType("visits")],
  ];
  const maxCoverage = Math.max(1, ...coverageItems.map(([, value]) => value));
  homeMetrics.coverageBars.innerHTML = coverageItems
    .map(([label, value]) => {
      const width = Math.max(8, Math.round((value / maxCoverage) * 100));
      return `<article style="--w:${width}%"><div><span>${label}</span><b>${value}</b></div><em></em></article>`;
    })
    .join("");
}

function getNextUpcomingEvent() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return calendarEvents
    .map((event) => ({ ...event, parsedDate: getItemDate(event) }))
    .filter((event) => event.parsedDate && event.parsedDate >= today)
    .sort((a, b) => a.parsedDate - b.parsedDate)[0];
}

function getNextDashboardAction(readiness) {
  if (!currentUser) return ["سجل الدخول لحفظ بياناتك", "login"];
  if (readiness.profileFields < 7) return ["أكمل بياناتي", "profile"];
  if (!readiness.total) return ["إضافة أول إنجاز", "portfolio"];
  if (readiness.missingEvidence) return ["إضافة شواهد", "portfolio"];
  if (excellentDays.length < 140) return ["تحديث الأيام الفعلية", "calendar"];
  if (!awards.length) return ["إضافة جائزة", "awards"];
  return ["فتح صفحة المشاركة", "share"];
}

function renderExecutiveDashboard(readiness) {
  if (!homeMetrics.executiveStatusTitle) return;
  const nextEvent = getNextUpcomingEvent();
  const [actionLabel, page] = getNextDashboardAction(readiness);
  const remainingExcellentDays = Math.max(0, 140 - excellentDays.length);

  homeMetrics.executiveStatusTitle.textContent =
    readiness.score >= 80 ? "ملفك جاهز للعرض بثقة" : readiness.score >= 45 ? "ملفك يتقدم بشكل واضح" : "ملفك يحتاج بداية منظمة";
  homeMetrics.executiveStatusText.textContent =
    readiness.score >= 80
      ? "راجع التقرير الكامل وصفحة المشاركة قبل التقديم النهائي."
      : readiness.score >= 45
        ? "ركز الآن على الشواهد الناقصة وتنويع مجالات الإنجاز."
        : "ابدأ بالبيانات المهنية، ثم أضف إنجازًا واحدًا موثقًا على الأقل.";
  homeMetrics.executiveNextAction.textContent = actionLabel;
  homeMetrics.executiveNextAction.dataset.pageButton = page;
  homeMetrics.executiveNextEvent.textContent = nextEvent?.title || "لا يوجد موعد قريب";
  homeMetrics.executiveNextEventDate.textContent = nextEvent ? `${formatArabicDate(nextEvent.date)} - ${nextEvent.time || "بدون وقت"}` : "أضف موعدًا من الرزنامة";
  homeMetrics.executiveEvidenceGap.textContent = readiness.missingEvidence;
  homeMetrics.executiveExcellentRemaining.textContent = remainingExcellentDays;
}

function renderOnboardingSteps(readiness) {
  if (!homeMetrics.onboardingSteps || !homeMetrics.onboardingProgress) return;
  const steps = [
    {
      number: "01",
      title: "أكمل بياناتي",
      text: "الاسم الثلاثي، المدرسة، المرحلة، المنطقة التعليمية، والتخصص.",
      page: "profile",
      done: readiness.profileFields >= 7,
    },
    {
      number: "02",
      title: "حدد السنة الدراسية",
      text: "اضبط السنة والكورس الحالي من صفحة الإعدادات.",
      page: "settings",
      done: Boolean(appSettings.schoolYear),
    },
    {
      number: "03",
      title: "أضف أول إنجاز",
      text: "ابدأ بإنجاز واحد موثق حتى تظهر مؤشرات الأداء.",
      page: "portfolio",
      done: achievements.length > 0,
    },
    {
      number: "04",
      title: "أضف موعدًا في الرزنامة",
      text: "سجل اجتماعًا، درسًا رياديًا، فعالية، أو موعد تسليم.",
      page: "calendar",
      done: calendarEvents.length > 0,
    },
    {
      number: "05",
      title: "جهز رابط المشاركة",
      text: "استخدم صفحة المشاركة و QR للعرض السريع والزيارات.",
      page: "share",
      done: readiness.score >= 45 || achievements.length > 0,
    },
  ];
  const doneCount = steps.filter((step) => step.done).length;
  homeMetrics.onboardingProgress.textContent = `${doneCount} / ${steps.length}`;
  homeMetrics.onboardingSteps.innerHTML = steps
    .map(
      (step) => `
        <article class="${step.done ? "done" : ""}">
          <b>${step.done ? "✓" : step.number}</b>
          <div>
            <h4>${step.title}</h4>
            <p>${step.text}</p>
          </div>
          <button type="button" data-onboarding-page="${step.page}">${step.done ? "مراجعة" : "ابدأ"}</button>
        </article>
      `,
    )
    .join("");
}

function getAchievementBadges(readiness) {
  return [
    {
      title: "بداية موثقة",
      text: "تمت إضافة أول إنجاز في ملفك.",
      hint: "أضف أول إنجاز من ملف الإنجاز.",
      mark: "01",
      unlocked: achievements.length >= 1,
    },
    {
      title: "موثق بالشواهد",
      text: "لديك شواهد محفوظة تدعم إنجازاتك.",
      hint: "أرفق ملفًا أو رابطًا مع إنجاز واحد على الأقل.",
      mark: "02",
      unlocked: readiness.evidenceCount >= 1,
    },
    {
      title: "ملف نشط",
      text: "وصلت إلى 5 إنجازات محفوظة.",
      hint: "أضف 5 إنجازات متنوعة.",
      mark: "03",
      unlocked: achievements.length >= 5,
    },
    {
      title: "تنوع مهني",
      text: "وثقت إنجازات في 4 مجالات أو أكثر.",
      hint: "نوّع بين الورش، الدروس، الفعاليات، الزيارات والبرامج.",
      mark: "04",
      unlocked: readiness.uniqueTypes >= 4,
    },
    {
      title: "منظم رزنامة",
      text: "الرزنامة تحتوي على مواعيد مهنية.",
      hint: "أضف موعدًا واحدًا على الأقل في الرزنامة.",
      mark: "05",
      unlocked: calendarEvents.length >= 1,
    },
    {
      title: "متابع الأعمال الممتازة",
      text: "بدأت متابعة الأيام الفعلية.",
      hint: "علّم أول يوم في متابعة 140 يوم.",
      mark: "06",
      unlocked: excellentDays.length >= 1,
    },
    {
      title: "إنجاز نوعي",
      text: "تم حفظ جائزة أو إنجاز نوعي.",
      hint: "أضف جائزة أو تكريم من صفحة الجوائز.",
      mark: "07",
      unlocked: awards.length >= 1,
    },
    {
      title: "جاهز للطباعة",
      text: "وصل ملفك إلى جاهزية عالية للعرض.",
      hint: "ارفع جاهزية الملف إلى 80% أو أكثر.",
      mark: "08",
      unlocked: readiness.score >= 80,
    },
  ];
}

function renderAchievementBadges(readiness) {
  if (!homeMetrics.achievementBadges || !homeMetrics.badgesProgress) return;
  const badges = getAchievementBadges(readiness);
  const unlockedCount = badges.filter((badge) => badge.unlocked).length;
  homeMetrics.badgesProgress.textContent = `${unlockedCount} / ${badges.length}`;
  homeMetrics.achievementBadges.innerHTML = badges
    .map(
      (badge) => `
        <article class="${badge.unlocked ? "unlocked" : "locked"}">
          <b>${badge.unlocked ? "✓" : badge.mark}</b>
          <div>
            <h4>${badge.title}</h4>
            <p>${badge.unlocked ? badge.text : badge.hint}</p>
          </div>
          <span>${badge.unlocked ? "مفتوحة" : "قيد الإنجاز"}</span>
        </article>
      `,
    )
    .join("");
}

function renderSharePage() {
  if (!shareView.name) return;
  if (publicShareData) {
    if (publicShareData.active === false) {
      shareView.name.textContent = "رابط المشاركة غير متاح";
      shareView.meta.textContent = "قد يكون الرابط غير منشور أو تم إيقاف المشاركة من إعدادات الحساب.";
      shareView.updated.textContent = "منجز - ملف الإنجاز المهني الذكي";
      shareView.readinessRing?.style.setProperty("--score", 0);
      shareView.readiness.textContent = "0%";
      shareView.readinessTitle.textContent = "الرابط غير منشور";
      shareView.readinessText.textContent = "اطلب من صاحب الملف تفعيل صفحة المشاركة من إعدادات منجز.";
      shareView.total.textContent = "0";
      shareView.evidence.textContent = "0";
      shareView.awards.textContent = "0";
      shareView.days.textContent = "0";
      shareView.strongest.textContent = "غير متاح";
      shareView.highlights.innerHTML = '<li><span>لا توجد بيانات عامة متاحة.</span><small>المشاركة غير مفعلة حاليا.</small></li>';
      shareView.coverage.innerHTML = '<p>لا يوجد توزيع متاح.</p>';
      shareView.awardsList.innerHTML = '<li><span>لا توجد جوائز عامة متاحة.</span><small>المشاركة غير مفعلة حاليا.</small></li>';
      return;
    }

    const publicProfile = publicShareData.profile || {};
    const publicSummary = publicShareData.summary || {};
    const publicAchievements = Array.isArray(publicShareData.achievements) ? publicShareData.achievements : [];
    const publicAwards = Array.isArray(publicShareData.awards) ? publicShareData.awards : [];
    const metaParts = [publicProfile.school, publicProfile.stage, publicProfile.district].filter(Boolean);
    const publishedAt = publicShareData.publishedAt
      ? new Date(publicShareData.publishedAt).toLocaleDateString("ar", { day: "numeric", month: "long", year: "numeric" })
      : "اليوم";
    const coverageItems = Object.entries(countBy(publicAchievements, (item) => item.category || "إنجاز")).sort((a, b) => b[1] - a[1]);
    const maxCoverage = Math.max(1, ...coverageItems.map(([, value]) => value));

    shareView.name.textContent = publicProfile.name || "ملف الإنجاز المهني";
    shareView.meta.textContent = metaParts.length ? metaParts.join(" - ") : "ملف إنجاز مهني منشور";
    shareView.updated.textContent = `آخر نشر: ${publishedAt}`;
    shareView.readinessRing?.style.setProperty("--score", publicSummary.readinessScore || 0);
    shareView.readiness.textContent = `${publicSummary.readinessScore || 0}%`;
    shareView.readinessTitle.textContent = publicSummary.readinessTitle || "ملف منشور";
    shareView.readinessText.textContent = publicSummary.readinessText || "نسخة عامة آمنة من ملف الإنجاز.";
    shareView.total.textContent = publicSummary.total || publicAchievements.length;
    shareView.evidence.textContent = publicSummary.evidenceCount || 0;
    shareView.awards.textContent = publicSummary.awardsCount || publicAwards.length;
    shareView.days.textContent = publicSummary.excellentDaysCount || 0;
    shareView.strongest.textContent = publicSummary.strongestArea || "لم يحدد بعد";
    shareView.highlights.innerHTML = publicAchievements.length
      ? publicAchievements
          .slice(0, 5)
          .map((item) => `<li><span>${escapeHtml(item.title)}</span><small>${escapeHtml(item.category || "إنجاز")} - ${item.date || "بدون تاريخ"}</small></li>`)
          .join("")
      : '<li><span>لا توجد إنجازات عامة منشورة بعد.</span><small>ستظهر هنا عند نشر ملف الإنجاز.</small></li>';
    shareView.coverage.innerHTML = coverageItems.length
      ? coverageItems
          .map(([label, value]) => `<article style="--w:${Math.max(8, Math.round((value / maxCoverage) * 100))}%"><div><span>${escapeHtml(label)}</span><b>${value}</b></div><em></em></article>`)
          .join("")
      : '<p>لا يوجد توزيع بعد.</p>';
    shareView.awardsList.innerHTML = publicAwards.length
      ? publicAwards
          .slice(0, 4)
          .map((award) => `<li><span>${escapeHtml(award.title)}</span><small>${escapeHtml(award.level || "جائزة")} - ${award.date || "بدون تاريخ"}</small></li>`)
          .join("")
      : '<li><span>لا توجد جوائز منشورة بعد.</span><small>يمكن إضافتها من صفحة الجوائز.</small></li>';
    return;
  }

  const readiness = getReadinessData();
  const profileName = getPublicProfileName();
  const metaParts = [profileDetails.school, profileDetails.stage, profileDetails.district].filter(Boolean);
  const updatedAt = new Date().toLocaleDateString("ar", { day: "numeric", month: "long", year: "numeric" });
  const coverageItems = Object.entries(countBy(achievements, (item) => portfolioConfig[item.type]?.title || "إنجاز آخر"))
    .sort((a, b) => b[1] - a[1]);
  const maxCoverage = Math.max(1, ...coverageItems.map(([, value]) => value));
  const highlights = achievements.slice(0, 5);
  const visibleAwards = awards.slice(0, 4);

  shareView.name.textContent = profileName;
  shareView.meta.textContent = metaParts.length ? metaParts.join(" - ") : "أكمل بياناتي لعرض المدرسة والمرحلة والمنطقة";
  shareView.updated.textContent = `آخر تحديث: ${updatedAt}`;
  shareView.readinessRing?.style.setProperty("--score", readiness.score);
  shareView.readiness.textContent = `${readiness.score}%`;
  shareView.readinessTitle.textContent = readiness.score >= 80 ? "ملف جاهز للعرض" : readiness.score >= 45 ? "ملف متقدم" : "ملف قيد البناء";
  shareView.readinessText.textContent =
    readiness.score >= 80
      ? "الملف يحتوي على توثيق جيد ويمكن مشاركته للزيارة أو العرض."
      : "كلما زادت الشواهد وتنوعت المجالات ظهرت صفحة المشاركة بصورة أقوى.";
  shareView.total.textContent = achievements.length;
  shareView.evidence.textContent = readiness.evidenceCount;
  shareView.awards.textContent = awards.length;
  shareView.days.textContent = excellentDays.length;
  shareView.strongest.textContent = readiness.strongestArea;

  shareView.highlights.innerHTML = highlights.length
    ? highlights
        .map(
          (item) => `<li><span>${escapeHtml(item.title)}</span><small>${portfolioConfig[item.type]?.title || "إنجاز"} - ${item.date || "بدون تاريخ"}</small></li>`,
        )
        .join("")
    : '<li><span>لا توجد إنجازات معروضة بعد.</span><small>ابدأ بإضافة إنجاز من ملف الإنجاز.</small></li>';

  shareView.coverage.innerHTML = coverageItems.length
    ? coverageItems
        .map(([label, value]) => `<article style="--w:${Math.max(8, Math.round((value / maxCoverage) * 100))}%"><div><span>${escapeHtml(label)}</span><b>${value}</b></div><em></em></article>`)
        .join("")
    : '<p>لا يوجد توزيع بعد.</p>';

  shareView.awardsList.innerHTML = visibleAwards.length
    ? visibleAwards
        .map((award) => `<li><span>${escapeHtml(award.title)}</span><small>${escapeHtml(award.level || "جائزة")} - ${award.date || "بدون تاريخ"}</small></li>`)
        .join("")
    : '<li><span>لا توجد جوائز محفوظة بعد.</span><small>يمكن إضافتها من صفحة الجوائز.</small></li>';
}

function renderHomeMetrics() {
  const total = achievements.length;
  const yearlyTarget = 30;
  const progress = Math.min(100, Math.round((total / yearlyTarget) * 100));
  const readiness = getReadinessData();

  if (homeMetrics.total) homeMetrics.total.textContent = total;
  if (homeMetrics.development) homeMetrics.development.textContent = countAchievementsByType("development", "workshops");
  if (homeMetrics.competitions) homeMetrics.competitions.textContent = countAchievementsByType("competitions");
  if (homeMetrics.lessons) homeMetrics.lessons.textContent = countAchievementsByType("lessons");
  if (homeMetrics.radio) homeMetrics.radio.textContent = countAchievementsByType("radio");
  if (homeMetrics.visits) homeMetrics.visits.textContent = countAchievementsByType("visits");
  if (homeMetrics.progress) homeMetrics.progress.textContent = `${progress}%`;
  if (homeMetrics.readinessLabel) homeMetrics.readinessLabel.textContent = `${readiness.score}%`;
  if (homeMetrics.readinessRing) homeMetrics.readinessRing.style.setProperty("--score", readiness.score);
  if (homeMetrics.readinessScore) homeMetrics.readinessScore.textContent = `${readiness.score}%`;
  if (homeMetrics.readinessTitle) {
    homeMetrics.readinessTitle.textContent =
      readiness.score >= 80 ? "ملفك قريب من الجاهزية" : readiness.score >= 45 ? "ملفك يتقدم بثبات" : "ابدأ ببناء ملف الإنجاز";
  }
  if (homeMetrics.readinessText) {
    homeMetrics.readinessText.textContent =
      readiness.score >= 80
        ? "راجع الشواهد والتقارير النهائية قبل الطباعة أو المشاركة."
        : readiness.score >= 45
          ? "أضف شواهد أكثر ونوّع المجالات لرفع جاهزية الملف."
          : "كل إنجاز موثق ومرفق يقرب الملف من النسخة الجاهزة للتقديم.";
  }
  renderSmartInsights(readiness);
  renderExecutiveDashboard(readiness);
  renderOnboardingSteps(readiness);
  renderAchievementBadges(readiness);
  renderSharePage();
  renderSystemSettings();
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

function getReportReadinessNote(achievementCount, evidenceCount) {
  if (achievementCount >= 12 && evidenceCount >= achievementCount) {
    return "التقرير جاهز للعرض، وفيه توازن جيد بين عدد الإنجازات والشواهد.";
  }
  if (achievementCount >= 6) {
    return "التقرير جيد، ويحتاج زيادة الشواهد المرفقة حتى يظهر بصورة أقوى عند الطباعة.";
  }
  return "التقرير في مرحلة البناء، ابدأ بإضافة إنجازات موثقة من ملف الإنجاز.";
}

function getReportScopeLabel(type, monthName) {
  if (type === "monthly") return monthName;
  if (type === "term") return "الفصل الدراسي";
  if (type === "annual") return "العام الدراسي";
  return "ملف الإنجاز الكامل";
}

function renderReportIdentityCard(type, monthName, generatedAt, achievementCount, evidenceCount) {
  const identity = [
    ["اسم المعلم/ـة", getPublicProfileName("غير محدد")],
    ["المدرسة", profileDetails.school || "غير محدد"],
    ["المرحلة", profileDetails.stage || "غير محدد"],
    ["المنطقة التعليمية", profileDetails.district || "غير محدد"],
    ["نطاق التقرير", getReportScopeLabel(type, monthName)],
    ["تاريخ الإصدار", generatedAt],
  ];

  return `
    <article class="report-official-card">
      <div class="report-official-title">
        <span>نسخة للطباعة</span>
        <h4>بيانات التقرير</h4>
        <p>${getReportReadinessNote(achievementCount, evidenceCount)}</p>
      </div>
      <div class="report-identity-grid">
        ${identity.map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
      </div>
    </article>
  `;
}

function formatTermName(term) {
  return term === "term2" ? "الكورس الثاني" : "الكورس الأول";
}

function renderFullPortfolioReport(filteredAchievements, filteredEvents, evidenceCount) {
  const safeProfile = profileDetails || {};
  const profileRows = [
    ["اسم المعلم/ـة", getPublicProfileName("غير محدد")],
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
      ${qrImage ? `<img src="${qrImage}" alt="QR ملف الإنجاز" />` : `<img src="${STATIC_QR_SRC}" alt="QR ملف الإنجاز" />`}
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

function renderOfficialFullPdfReport(filteredAchievements, filteredEvents, evidenceCount, generatedAt) {
  const groupedAchievements = Object.entries(
    countBy(filteredAchievements, (item) => portfolioConfig[item.type]?.title || "إنجاز آخر"),
  ).sort((a, b) => b[1] - a[1]);
  const evidenceAchievements = filteredAchievements.filter((item) => item.evidence?.length);
  const sickRecords = normalizeLeaveStats(leaveStats).sickRecords;
  const profileRows = [
    ["اسم المعلم/ـة", getPublicProfileName("غير محدد")],
    ["الرقم الوظيفي", profileDetails.employeeId || "غير محدد"],
    ["التخصص", profileDetails.specialty || "غير محدد"],
    ["المرحلة", profileDetails.stage || "غير محدد"],
    ["المنطقة التعليمية", profileDetails.district || "غير محدد"],
    ["المدرسة", profileDetails.school || "غير محدد"],
    ["القسم", profileDetails.department || "غير محدد"],
    ["البريد الإلكتروني", profileDetails.email || currentUser?.email || "غير محدد"],
  ];
  const tocItems = [
    ["01", "الغلاف وبيانات الإصدار"],
    ["02", "بيانات المعلم/المعلمة"],
    ["03", "ملخص مؤشرات الأداء"],
    ["04", "فهرس مجالات الإنجاز"],
    ["05", "سجل الإنجازات"],
    ["06", "الرزنامة والأعمال الممتازة"],
    ["07", "الشواهد والجوائز"],
    ["08", "التوصيات والتواقيع"],
  ];
  const metrics = [
    ["إجمالي الإنجازات", filteredAchievements.length, "إنجاز موثق"],
    ["الشواهد", evidenceCount, "ملف / رابط"],
    ["مواعيد الرزنامة", filteredEvents.length, "موعد"],
    ["الأيام الفعلية", `${excellentDays.length}/140`, "للأعمال الممتازة"],
    ["الإجازات الطبية", `${sickRecords.length}/15`, "خلال السنة الدراسية"],
    ["الجوائز", awards.length, "جائزة / تكريم"],
  ];
  const profileHtml = profileRows
    .map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  const tocHtml = tocItems
    .map(([number, title]) => `<li><b>${number}</b><span>${title}</span></li>`)
    .join("");
  const metricsHtml = metrics
    .map(([label, value, note]) => `<article><span>${label}</span><strong>${escapeHtml(value)}</strong><small>${note}</small></article>`)
    .join("");
  const groupsHtml = groupedAchievements.length
    ? groupedAchievements.map(([label, total]) => `<li><span>${escapeHtml(label)}</span><b>${total}</b></li>`).join("")
    : `<p class="report-empty">لا توجد إنجازات محفوظة حتى الآن.</p>`;
  const achievementRows = filteredAchievements.length
    ? filteredAchievements
        .slice(0, 18)
        .map(
          (item, index) => `
            <tr>
              <td>${String(index + 1).padStart(2, "0")}</td>
              <td>${escapeHtml(item.title || "إنجاز مهني")}</td>
              <td>${escapeHtml(portfolioConfig[item.type]?.title || "إنجاز")}</td>
              <td>${item.date || "غير محدد"}</td>
              <td>${item.evidence?.length || 0}</td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="5">لا توجد إنجازات محفوظة حتى الآن.</td></tr>`;
  const eventRows = filteredEvents.length
    ? filteredEvents
        .slice(0, 12)
        .map(
          (item, index) => `
            <tr>
              <td>${String(index + 1).padStart(2, "0")}</td>
              <td>${escapeHtml(item.title || "موعد")}</td>
              <td>${formatArabicDate(item.date)}</td>
              <td>${item.time || "غير محدد"}</td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="4">لا توجد مواعيد محفوظة حتى الآن.</td></tr>`;
  const evidenceRows = evidenceAchievements.length
    ? evidenceAchievements
        .slice(0, 10)
        .map((item) => `<li><span>${escapeHtml(item.title)}</span><small>${item.evidence.length} شاهد</small></li>`)
        .join("")
    : `<p class="report-empty">لا توجد شواهد مرتبطة بالإنجازات حتى الآن.</p>`;
  const awardRows = awards.length
    ? awards
        .slice(0, 8)
        .map((award) => `<li><span>${escapeHtml(award.title)}</span><small>${escapeHtml(award.level || "غير محدد")} - ${award.date || "بدون تاريخ"}</small></li>`)
        .join("")
    : `<p class="report-empty">لا توجد جوائز محفوظة حتى الآن.</p>`;

  return `
    <section class="official-pdf-document">
      <article class="official-pdf-page official-cover">
        <div class="official-cover-mark">
          <img src="assets/munjaz-logo-cropped.png" onerror="this.onerror=null;this.src='assets/munjaz-logo.png';" alt="شعار منجز" />
        </div>
        <span>منصة منجز</span>
        <h1>ملف الإنجاز المهني الكامل</h1>
        <p>نسخة رسمية منظمة للتقديم والطباعة بصيغة PDF</p>
        <div class="official-cover-meta">
          <strong>${escapeHtml(getPublicProfileName("اسم المعلم/المعلمة"))}</strong>
          <small>${escapeHtml(profileDetails.school || "اسم المدرسة")} - ${escapeHtml(appSettings.schoolYear || "السنة الدراسية")}</small>
          <small>تاريخ الإصدار: ${generatedAt}</small>
        </div>
      </article>

      <article class="official-pdf-page">
        <header class="official-page-head"><span>01</span><h2>الفهرس</h2></header>
        <ol class="official-toc">${tocHtml}</ol>
      </article>

      <article class="official-pdf-page">
        <header class="official-page-head"><span>02</span><h2>بيانات المعلم/المعلمة</h2></header>
        <div class="official-profile-grid">${profileHtml}</div>
        <div class="official-note">تعتمد هذه البيانات على صفحة بياناتي داخل منصة منجز، ويمكن تعديلها قبل الطباعة.</div>
      </article>

      <article class="official-pdf-page">
        <header class="official-page-head"><span>03</span><h2>ملخص مؤشرات الأداء</h2></header>
        <div class="official-metrics">${metricsHtml}</div>
        <section class="official-two-col">
          <div><h3>توزيع مجالات الإنجاز</h3><ul class="report-bars">${groupsHtml}</ul></div>
          <div><h3>قراءة مختصرة</h3><p>${getReportReadinessNote(filteredAchievements.length, evidenceCount)}</p></div>
        </section>
      </article>

      <article class="official-pdf-page">
        <header class="official-page-head"><span>04</span><h2>سجل الإنجازات</h2></header>
        <table class="official-table">
          <thead><tr><th>#</th><th>عنوان الإنجاز</th><th>المجال</th><th>التاريخ</th><th>الشواهد</th></tr></thead>
          <tbody>${achievementRows}</tbody>
        </table>
      </article>

      <article class="official-pdf-page">
        <header class="official-page-head"><span>05</span><h2>الرزنامة والأعمال الممتازة</h2></header>
        <table class="official-table">
          <thead><tr><th>#</th><th>الموعد</th><th>التاريخ</th><th>الوقت</th></tr></thead>
          <tbody>${eventRows}</tbody>
        </table>
        <div class="official-progress">
          <span>الأيام الفعلية المنجزة</span>
          <strong>${excellentDays.length} من 140</strong>
          <i style="--progress:${Math.min(100, (excellentDays.length / 140) * 100)}%"></i>
        </div>
      </article>

      <article class="official-pdf-page">
        <header class="official-page-head"><span>06</span><h2>الشواهد والجوائز</h2></header>
        <section class="official-two-col">
          <div><h3>إنجازات لها شواهد</h3><ul>${evidenceRows}</ul></div>
          <div><h3>الجوائز والتكريم</h3><ul>${awardRows}</ul></div>
        </section>
      </article>

      <article class="official-pdf-page official-signature-page">
        <header class="official-page-head"><span>07</span><h2>اعتماد الملف</h2></header>
        <p>تم إعداد هذا الملف إلكترونيًا عبر منصة منجز ليكون مرجعًا منظمًا لإنجازات المعلم/المعلمة وشواهد الأداء المهني خلال السنة الدراسية.</p>
        <div class="official-signatures">
          <div><span>اسم المعلم/المعلمة</span><strong>${escapeHtml(getPublicProfileName("................"))}</strong></div>
          <div><span>رئيس القسم</span><strong>................</strong></div>
          <div><span>مدير المدرسة</span><strong>................</strong></div>
        </div>
      </article>
    </section>
  `;
}

function renderReport(type = activeReport) {
  if (!reportTitle || !reportStats || !reportSections) return;
  activeReport = type;
  document.querySelector("#reportPreview")?.classList.toggle("official-pdf-report", type === "full");

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
  const readinessNote = getReportReadinessNote(filteredAchievements.length, evidenceCount);

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

  if (type === "full") {
    reportSections.innerHTML = renderOfficialFullPdfReport(filteredAchievements, filteredEvents, evidenceCount, generatedAt);
    return;
  }

  reportSections.innerHTML = `
    ${renderReportIdentityCard(type, monthName, generatedAt, filteredAchievements.length, evidenceCount)}
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
      <p>${readinessNote}</p>
      <p>لجعل الملف أقوى عند التقديم، أرفق شاهدا واحدا على الأقل لكل إنجاز، ووازن بين التنمية المهنية، الدروس الريادية، والأنشطة المدرسية.</p>
    </article>
    <article class="report-print-notes">
      <h4>ملاحظات قبل الطباعة</h4>
      <ul>
        <li><span>راجع الاسم الثلاثي وبيانات المدرسة من صفحة بياناتي.</span><small>تظهر في رأس التقرير</small></li>
        <li><span>تأكد من وجود شاهد واحد على الأقل لكل إنجاز مهم.</span><small>يقوي الملف عند التقييم</small></li>
        <li><span>استخدم تقرير ملف الإنجاز الكامل عند التسليم النهائي.</span><small>الأكثر شمولية</small></li>
      </ul>
    </article>
  `;
}

function getArchiveTermLabel(value) {
  if (value === "term1") return "الكورس الأول";
  if (value === "term2") return "الكورس الثاني";
  return "السنة كاملة";
}

function buildArchiveSnapshot() {
  const year = archiveYear?.value.trim() || "السنة الدراسية الحالية";
  const term = archiveTerm?.value || "annual";
  const evidenceCount = getAchievementEvidenceCount();
  const sickRecords = normalizeLeaveStats(leaveStats).sickRecords;
  const casualTotal = normalizeLeaveStats(leaveStats).casualTermOne + normalizeLeaveStats(leaveStats).casualTermTwo;
  const totalsByType = countBy(achievements, (item) => portfolioConfig[item.type]?.title || "إنجاز آخر");

  return {
    id: crypto.randomUUID(),
    year,
    term,
    createdAt: new Date().toISOString(),
    profileName: getPublicProfileName("غير محدد"),
    school: profileDetails.school || "غير محدد",
    stage: profileDetails.stage || "غير محدد",
    achievementsCount: achievements.length,
    evidenceCount,
    calendarCount: calendarEvents.length,
    awardsCount: awards.length,
    excellentDaysCount: excellentDays.length,
    sickLeaveCount: sickRecords.length,
    casualLeaveCount: casualTotal,
    strongestArea: Object.entries(totalsByType).sort((a, b) => b[1] - a[1])[0]?.[0] || "لم يحدد بعد",
    totalsByType,
  };
}

function persistArchives() {
  archives = cleanStoredData(archives);
  localStorage.setItem("munjaz.archives", JSON.stringify(archives));
  saveRemoteState().catch(() => {});
}

function renderArchivePreview(archive = archives[0]) {
  if (!archivePreview) return;
  if (!archive) {
    archivePreview.innerHTML = `
      <div class="archive-empty">
        <strong>لا توجد نسخة مؤرشفة بعد</strong>
        <span>احفظ نسخة من ملف الإنجاز لتظهر المعاينة هنا.</span>
      </div>
    `;
    return;
  }

  const distribution = Object.entries(archive.totalsByType || {})
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => `<li><span>${escapeHtml(label)}</span><b>${value}</b></li>`)
    .join("");

  archivePreview.innerHTML = `
    <article>
      <div>
        <span>${getArchiveTermLabel(archive.term)}</span>
        <h3>${escapeHtml(archive.year)}</h3>
        <p>${escapeHtml(archive.profileName)} - ${escapeHtml(archive.school)} - ${escapeHtml(archive.stage)}</p>
      </div>
      <b>${archive.achievementsCount}</b>
    </article>
    <div class="archive-preview-grid">
      <section><span>الشواهد</span><strong>${archive.evidenceCount}</strong></section>
      <section><span>المواعيد</span><strong>${archive.calendarCount}</strong></section>
      <section><span>الجوائز</span><strong>${archive.awardsCount}</strong></section>
      <section><span>الأيام الفعلية</span><strong>${archive.excellentDaysCount}</strong></section>
      <section><span>الطبيات</span><strong>${archive.sickLeaveCount}</strong></section>
      <section><span>العرضي</span><strong>${archive.casualLeaveCount}</strong></section>
    </div>
    <div class="archive-distribution">
      <h4>توزيع الإنجازات</h4>
      ${distribution ? `<ul>${distribution}</ul>` : '<p>لا توجد إنجازات في هذه النسخة.</p>'}
    </div>
  `;
}

function renderArchives() {
  if (!archiveList || !archiveCount || !archiveLastYear || !archiveHealth) return;
  const sorted = [...archives].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  archiveCount.textContent = sorted.length;
  archiveLastYear.textContent = sorted[0]?.year || "-";
  archiveHealth.textContent = sorted.length ? "محفوظ" : "جديد";

  archiveList.innerHTML = sorted.length
    ? sorted
        .map(
          (archive) => `
            <article data-archive-id="${archive.id}">
              <div>
                <span>${getArchiveTermLabel(archive.term)}</span>
                <strong>${escapeHtml(archive.year)}</strong>
                <small>${new Date(archive.createdAt).toLocaleDateString("ar", { day: "numeric", month: "long", year: "numeric" })}</small>
              </div>
              <b>${archive.achievementsCount}</b>
              <button type="button" data-view-archive="${archive.id}">استعراض</button>
            </article>
          `,
        )
        .join("")
    : '<div class="archive-empty"><strong>لا يوجد أرشيف محفوظ</strong><span>احفظ نسخة نهاية الكورس أو نهاية السنة.</span></div>';

  renderArchivePreview(sorted[0]);
}

function createArchiveSnapshot() {
  const snapshot = buildArchiveSnapshot();
  archives = [snapshot, ...archives.filter((archive) => !(archive.year === snapshot.year && archive.term === snapshot.term))];
  persistArchives();
  renderArchives();
  if (archiveStatus) archiveStatus.textContent = "تم حفظ النسخة في الأرشيف.";
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

bindPageNavigation();

homeMetrics.executiveNextAction?.addEventListener("click", () => {
  const page = homeMetrics.executiveNextAction.dataset.pageButton;
  if (page === "login") {
    openLogin();
    return;
  }
  showPage(page || "portfolio");
});

homeMetrics.onboardingSteps?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-onboarding-page]");
  if (!button) return;
  showPage(button.dataset.onboardingPage);
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
  const value = portfolioQrLink?.value || getPublicShareUrl();
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
saveSystemSettingsButton?.addEventListener("click", saveSystemSettings);
exportBackupButton?.addEventListener("click", exportBackup);
addDevelopmentGoalButton?.addEventListener("click", () => addDevelopmentPlanItem());
saveSelfAssessmentButton?.addEventListener("click", () => persistSelfAssessment());
copyTemplateTextButton?.addEventListener("click", copyCurrentTemplate);
saveTemplateSettingsButton?.addEventListener("click", saveTemplateSettings);
templatesView.list?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-template-id]");
  if (!button) return;
  activeTemplate = button.dataset.templateId;
  renderTemplates();
});
templatesView.fields?.addEventListener("input", renderTemplatePreview);
["schoolName", "teacherName", "headName", "principalName", "borderStyle"].forEach((key) => {
  templateSettingsInputs[key]?.addEventListener("input", () => {
    syncTemplateSettingsFromInputs();
    renderTemplatePreview();
  });
});
[
  ["schoolLogo", templateSettingsInputs.schoolLogo],
  ["extraLogo", templateSettingsInputs.extraLogo],
  ["frameImage", templateSettingsInputs.frameImage],
].forEach(([key, input]) => {
  input?.addEventListener("change", () => previewTemplateImageInput(key, input));
});
templatesView.arrange?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-template-move]");
  if (!button) return;
  const section = button.dataset.templateMove;
  const direction = Number(button.dataset.direction);
  const order = [...(templateSettings.sectionOrder || ["head", "body", "signatures"])];
  const index = order.indexOf(section);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return;
  [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
  templateSettings = normalizeTemplateSettings({ ...templateSettings, sectionOrder: order });
  renderTemplatePreview();
});
selfAssessmentView.grid?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-self-score]");
  const rating = event.target.closest("[data-self-criterion]");
  if (!button || !rating) return;
  selfAssessment = normalizeSelfAssessment({
    ...selfAssessment,
    reflection: selfAssessmentView.reflection?.value || selfAssessment.reflection || "",
    scores: {
      ...(selfAssessment.scores || {}),
      [rating.dataset.selfCriterion]: Number(button.dataset.selfScore),
    },
  });
  localStorage.setItem("munjaz.selfAssessment", JSON.stringify(selfAssessment));
  renderSelfAssessment();
});
developmentPlanView.suggestions?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-development-suggestion]");
  if (!button) return;
  const item = developmentPlanSuggestions[Number(button.dataset.addDevelopmentSuggestion)];
  if (item) addDevelopmentPlanItem(item);
});
developmentPlanView.list?.addEventListener("change", (event) => {
  const select = event.target.closest("[data-development-status]");
  if (!select) return;
  developmentPlan = developmentPlan.map((item) =>
    item.id === select.dataset.developmentStatus ? { ...item, status: select.value } : item,
  );
  persistDevelopmentPlan(`تم تحديث الحالة إلى ${getDevelopmentStatusLabel(select.value)}.`);
});
developmentPlanView.list?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-development]");
  if (!button) return;
  developmentPlan = developmentPlan.filter((item) => item.id !== button.dataset.deleteDevelopment);
  persistDevelopmentPlan("تم حذف الهدف من خطة التطوير.");
});
saveAwardButton?.addEventListener("click", saveAward);
awardList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-award]");
  if (!button) return;
  deleteAward(button.dataset.deleteAward);
});

createArchiveButton?.addEventListener("click", createArchiveSnapshot);

archiveList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view-archive]");
  if (!button) return;
  const archive = archives.find((item) => item.id === button.dataset.viewArchive);
  renderArchivePreview(archive);
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

reminderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    eventReminder.value = button.dataset.reminderValue;
    syncReminderPills();
  });
});

eventReminder?.addEventListener("change", syncReminderPills);

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

document.querySelector("#saveAchievement")?.addEventListener("click", saveAchievement);

const initialPage = window.location.hash.replace("#", "") || "home";
if (document.querySelector(`[data-page="${initialPage}"]`)) {
  showPage(initialPage);
}

updateAuthUI();
renderProfileDetails();
renderSystemSettings();
renderDevelopmentPlan();
renderSelfAssessment();
renderTemplateSettings();
renderTemplates();
renderPortfolioQr();
renderHomeMetrics();
renderAwards();
renderArchives();
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
  renderSystemSettings();
  await loadRemoteState();
});
renderPortfolio();
eventDate.value = selectedCalendarDate;
syncReminderPills();
renderCalendar();
renderExcellentDays();
renderReport();
if (IS_PUBLIC_SHARE_VIEW) {
  loadPublicShare();
} else {
  loadRemoteState();
}
