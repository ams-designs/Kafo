"use strict";

/* =========================================================
   KAFO — FRONT-END APPLICATION
   Replace the ENTIRE contents of app.js with this file.

   Demo only:
   - Data is stored in this browser.
   - No real payments are processed.
   - No real authentication or server permissions exist.
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

const STORAGE = {
  groups: "kafoGroups",
  profile: "kafoProfile",
  settings: "kafoSettings"
};

const DEFAULT_PROFILE = {
  name: "Amie Manneh",
  email: "amie@example.com",
  phone: "+220 700 0000",
  language: "English"
};

const SEED_GROUPS = [
  {
    id: "g1",
    name: "Fatou’s Medical Support",
    purpose: "Health",
    description:
      "Helping Fatou and her family with medical expenses and recovery support.",
    target: 15000,
    raised: 9850,
    spent: 2300,
    visibility: "link",
    status: "active",
    members: 28,
    created: "12 Oct 2026",
    organiser: "Amie Manneh",
    contributions: [
      {
        name: "Binta Jallow",
        amount: 500,
        date: "Today",
        status: "Confirmed",
        method: "Manual record"
      },
      {
        name: "Lamin Sanyang",
        amount: 250,
        date: "Yesterday",
        status: "Confirmed",
        method: "Manual record"
      },
      {
        name: "Anonymous supporter",
        amount: 100,
        date: "Yesterday",
        status: "Awaiting confirmation",
        method: "Manual record"
      }
    ],
    expenses: [
      {
        title: "Clinic consultation",
        category: "Medical",
        amount: 1500,
        date: "12 Oct 2026",
        note: ""
      },
      {
        title: "Transport to clinic",
        category: "Transport",
        amount: 800,
        date: "11 Oct 2026",
        note: ""
      }
    ],
    updates: [
      {
        title: "A note from the family",
        date: "Today",
        text:
          "Thank you for standing with Fatou. We will keep sharing updates as we go."
      }
    ]
  },
  {
    id: "g2",
    name: "Manneh Family Fund",
    purpose: "Family",
    description:
      "Our family’s shared support fund for important moments and unexpected needs.",
    target: 20000,
    raised: 6200,
    spent: 0,
    visibility: "private",
    status: "active",
    members: 16,
    created: "5 Oct 2026",
    organiser: "Amie Manneh",
    contributions: [
      {
        name: "Amie Manneh",
        amount: 1000,
        date: "Yesterday",
        status: "Confirmed",
        method: "Manual record"
      }
    ],
    expenses: [],
    updates: []
  },
  {
    id: "g3",
    name: "Bakau School Supplies",
    purpose: "Education",
    description:
      "Helping local students start the school term with the books and supplies they need.",
    target: 12000,
    raised: 8400,
    spent: 4200,
    visibility: "public",
    status: "active",
    members: 42,
    created: "1 Oct 2026",
    organiser: "Bakau Community Team",
    contributions: [
      {
        name: "Ebrima Touray",
        amount: 500,
        date: "Today",
        status: "Confirmed",
        method: "Manual record"
      }
    ],
    expenses: [
      {
        title: "Exercise books and pens",
        category: "Supplies",
        amount: 4200,
        date: "10 Oct 2026",
        note: ""
      }
    ],
    updates: [
      {
        title: "First batch purchased",
        date: "10 Oct 2026",
        text: "We purchased the first batch of exercise books and pens."
      }
    ]
  },
  {
    id: "g4",
    name: "Kotu Neighbourhood Clean-up",
    purpose: "Community",
    description:
      "A community effort to make our shared streets cleaner, safer and more welcoming.",
    target: 8000,
    raised: 5600,
    spent: 1200,
    visibility: "public",
    status: "active",
    members: 34,
    created: "28 Sep 2026",
    organiser: "Kotu Community Circle",
    contributions: [
      {
        name: "Musa Bah",
        amount: 250,
        date: "Today",
        status: "Confirmed",
        method: "Manual record"
      }
    ],
    expenses: [
      {
        title: "Cleaning supplies",
        category: "Supplies",
        amount: 1200,
        date: "8 Oct 2026",
        note: ""
      }
    ],
    updates: [
      {
        title: "Clean-up day announced",
        date: "8 Oct 2026",
        text: "Our next clean-up is planned for Saturday."
      }
    ]
  }
];

const PUBLIC_SEED = [
  {
    id: "p1",
    name: "Aisha’s Recovery Journey",
    purpose: "Health",
    description:
      "Help Aisha access the treatment and recovery support she needs after a difficult few months.",
    target: 25000,
    raised: 17400,
    spent: 0,
    visibility: "public",
    status: "active",
    members: 64,
    created: "Recently",
    organiser: "Aisha’s Family",
    contributions: [],
    expenses: [],
    updates: []
  },
  {
    id: "p2",
    name: "Books for Brikama Learners",
    purpose: "Education",
    description:
      "Getting essential learning materials into the hands of children who need them most.",
    target: 18000,
    raised: 11250,
    spent: 0,
    visibility: "public",
    status: "active",
    members: 91,
    created: "Recently",
    organiser: "Brikama Learning Circle",
    contributions: [],
    expenses: [],
    updates: []
  },
  {
    id: "p3",
    name: "A Fresh Start for Our Street",
    purpose: "Community",
    description:
      "Neighbours working together to improve drainage, cleanliness and shared spaces.",
    target: 10000,
    raised: 4600,
    spent: 0,
    visibility: "public",
    status: "active",
    members: 38,
    created: "Recently",
    organiser: "Serekunda Neighbours",
    contributions: [],
    expenses: [],
    updates: []
  },
  {
    id: "p4",
    name: "Support for the Jallow Family",
    purpose: "Family",
    description:
      "Helping a local family with essential costs after an unexpected loss.",
    target: 16000,
    raised: 13200,
    spent: 0,
    visibility: "public",
    status: "active",
    members: 72,
    created: "Recently",
    organiser: "Friends of the Jallow Family",
    contributions: [],
    expenses: [],
    updates: []
  },
  {
    id: "p5",
    name: "Girls’ School Essentials",
    purpose: "Education",
    description:
      "School bags, stationery and learning essentials for girls returning to class.",
    target: 14000,
    raised: 7300,
    spent: 0,
    visibility: "public",
    status: "active",
    members: 55,
    created: "Recently",
    organiser: "Future Steps Gambia",
    contributions: [],
    expenses: [],
    updates: []
  },
  {
    id: "p6",
    name: "Community Water Point",
    purpose: "Community",
    description:
      "A shared effort to repair a neighbourhood water point and make access more reliable.",
    target: 30000,
    raised: 20800,
    spent: 0,
    visibility: "public",
    status: "active",
    members: 103,
    created: "Recently",
    organiser: "Kerr Serign Community",
    contributions: [],
    expenses: [],
    updates: []
  }
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : clone(fallback);
  } catch (error) {
    console.warn("Kafo could not read local storage:", error);
    return clone(fallback);
  }
}

let groups = readStorage(STORAGE.groups, SEED_GROUPS);
let profile = readStorage(STORAGE.profile, DEFAULT_PROFILE);
let settings = readStorage(STORAGE.settings, {
  showFinance: true,
  notifications: true
});

let publicCampaigns = clone(PUBLIC_SEED);
let currentId = null;
let detailTab = "overview";
let createStep = 1;
let category = "All";
let activity = [
  {
    type: "money",
    text:
      "<b>Binta Jallow</b> contributed to <b>Fatou’s Medical Support</b>.",
    detail: "Today",
    amount: "+ D 500"
  },
  {
    type: "receipt",
    text:
      "An expense was recorded in <b>Bakau School Supplies</b>.",
    detail: "Yesterday",
    amount: "D 4,200"
  },
  {
    type: "update",
    text:
      "<b>Kotu Neighbourhood Clean-up</b> posted a new update.",
    detail: "12 Oct 2026",
    amount: ""
  }
];

function saveGroups() {
  try {
    localStorage.setItem(STORAGE.groups, JSON.stringify(groups));
  } catch (error) {
    toast("Your browser could not save these changes.");
    console.error(error);
  }
}

function saveProfile() {
  try {
    localStorage.setItem(STORAGE.profile, JSON.stringify(profile));
  } catch (error) {
    toast("Your browser could not save your profile.");
    console.error(error);
  }
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE.settings, JSON.stringify(settings));
  } catch (error) {
    console.error("Kafo could not save settings.", error);
  }
}

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function cash(value) {
  return "D " + new Intl.NumberFormat("en-GM", {
    maximumFractionDigits: 2
  }).format(Number(value) || 0);
}

function pct(group) {
  if (!Number(group.target)) return 0;
  return Math.min(
    100,
    Math.round((Number(group.raised || 0) / Number(group.target)) * 100)
  );
}

function balance(group) {
  return Number(group.raised || 0) - Number(group.spent || 0);
}

function label(purpose) {
  return ({
    Health: "Medical support",
    Family: "Family support",
    Community: "Community project",
    Education: "Education",
    Celebration: "Celebration",
    Other: "Other"
  })[purpose] || purpose || "Community";
}

function art(purpose) {
  return "art-" + ({
    Health: "health",
    Family: "family",
    Community: "community",
    Education: "education",
    Celebration: "celebration",
    Other: "community"
  })[purpose] || "health";
}

function icon(purpose) {
  return ({
    Health: "＋",
    Family: "⌂",
    Community: "◎",
    Education: "▤",
    Celebration: "✳",
    Other: "＋"
  })[purpose] || "＋";
}

function visibilityLabel(value) {
  return ({
    public: "Public",
    link: "Link-only",
    private: "Private"
  })[value] || "Private";
}

function findGroup(id) {
  return groups.find(group => group.id === id) ||
    publicCampaigns.find(group => group.id === id) ||
    null;
}

function isMyGroup(id) {
  return groups.some(group => group.id === id);
}

function empty(title, message) {
  return `
    <div class="empty">
      <b>${esc(title)}</b>
      <p>${esc(message)}</p>
    </div>
  `;
}

function progressBar(group) {
  return `
    <div class="progress"
         role="progressbar"
         aria-label="Fundraising progress"
         aria-valuemin="0"
         aria-valuemax="100"
         aria-valuenow="${pct(group)}">
      <span style="width:${pct(group)}%"></span>
    </div>
  `;
}

function card(group, isPublic = false) {
  return `
    <article
      class="group-card"
      data-open="${esc(group.id)}"
      tabindex="0"
      role="button"
      aria-label="View ${esc(group.name)}"
    >
      <div class="card-art ${art(group.purpose)}">
        <span class="tag">${esc(label(group.purpose))}</span>
        <span class="vis">${esc(visibilityLabel(group.visibility))}</span>
      </div>

      <div class="card-content">
        <h3>${esc(group.name)}</h3>
        <p class="desc">${esc(
          group.description || "A community coming together around a shared goal."
        )}</p>

        <div class="card-progress">
          <b>${cash(group.raised)} <span>raised</span></b>
          <span>${group.target ? pct(group) + "% of goal" : "No target"}</span>
        </div>

        ${progressBar(group)}

        <div class="card-bottom">
          <span class="members">${Number(group.members || 0)} supporters</span>
          <span class="card-action">
            ${isPublic ? "View fundraiser" : "View group"} →
          </span>
        </div>
      </div>
    </article>
  `;
}

function groupRow(group) {
  return `
    <div class="group-row"
         data-open="${esc(group.id)}"
         tabindex="0"
         role="button"
         aria-label="Open ${esc(group.name)}">
      <span class="group-symbol">${icon(group.purpose)}</span>

      <span class="group-copy">
        <b>${esc(group.name)}</b>
        <small>${Number(group.members || 0)} members · ${pct(group)}% of target</small>
        ${progressBar(group)}
      </span>

      <span class="group-money">
        <b>${cash(group.raised)}</b>
        <small>of ${group.target ? cash(group.target) : "no target"}</small>
      </span>
    </div>
  `;
}

function toast(message) {
  const container = $("#toasts");
  if (!container) {
    console.info("Kafo:", message);
    return;
  }

  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  item.setAttribute("role", "status");
  container.appendChild(item);

  window.setTimeout(() => item.remove(), 3200);
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function setPage(page, options = {}) {
  const validPages = [
    "home",
    "discover",
    "groups",
    "activity",
    "profile",
    "detail",
    "create"
  ];

  if (!validPages.includes(page)) {
    console.error("Kafo: Unknown page:", page);
    return;
  }

  const section = $("#view-" + page);
  if (!section) {
    console.error("Kafo: Missing HTML section #view-" + page);
    toast("This page is missing from index.html.");
    return;
  }

  $$(".view").forEach(viewElement => {
    viewElement.classList.toggle("active", viewElement === section);
  });

  $$("[data-view]").forEach(button => {
    const active = button.dataset.view === page;
    button.classList.toggle("active", active);

    if (active) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  const crumb = $("#crumb");
  if (crumb) {
    crumb.textContent = ({
      home: "Home",
      discover: "Discover",
      groups: "My Groups",
      activity: "Activity",
      profile: "Profile",
      detail: "Group Details",
      create: "Create a group"
    })[page] || "Kafo";
  }

  $("#sidebar")?.classList.remove("open");

  if (options.updateHash !== false) {
    history.replaceState(null, "", "#" + page);
  }

  try {
    if (page === "home") renderHome();
    if (page === "discover") renderDiscover();
    if (page === "groups") renderGroups();
    if (page === "activity") renderActivity();
    if (page === "profile") renderProfile();
    if (page === "detail") renderDetail();
    if (page === "create") renderCreate();
  } catch (error) {
    console.error("Kafo page rendering error:", error);
    toast("This page encountered an error. Check the browser console.");
  }

  if (options.scroll !== false) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function renderCreate() {
  updateCreateStep(createStep);
  updateCreatePreview();
}

function openGroup(id) {
  const group = findGroup(id);
  if (!group) {
    toast("That group could not be found.");
    return;
  }

  currentId = id;
  detailTab = "overview";
  setPage("detail");
}

function goBackFromDetail() {
  setPage(isMyGroup(currentId) ? "groups" : "discover");
}

/* =========================================================
   HOME
   ========================================================= */

function renderHome() {
  const homeGroups = $("#homeGroups");
  const homeActivity = $("#homeActivity");

  if (homeGroups) {
    const activeGroups = groups
      .filter(group => group.status !== "completed")
      .slice(0, 3);

    homeGroups.innerHTML = activeGroups.length
      ? activeGroups.map(groupRow).join("")
      : empty("No groups yet", "Create your first group to get started.");
  }

  if (homeActivity) {
    homeActivity.innerHTML = activity.slice(0, 4).map(activityRow).join("");
  }

  const totalRaised = groups.reduce(
    (sum, group) => sum + Number(group.raised || 0),
    0
  );

  const activeCount = groups.filter(group => group.status !== "completed").length;

  const confirmedPending = groups.reduce((sum, group) => {
    return sum + (group.contributions || [])
      .filter(item => item.status === "Awaiting confirmation")
      .reduce((subtotal, item) => subtotal + Number(item.amount || 0), 0);
  }, 0);

  const stats = $$(".stat > strong");
  if (stats[0]) stats[0].textContent = cash(totalRaised);
  if (stats[1]) stats[1].textContent = String(activeCount);
  if (stats[2]) stats[2].textContent = cash(confirmedPending);

  applyFinancePreference();
  renderAccountSummary();
}

/* =========================================================
   DISCOVER
   ========================================================= */

function renderDiscover() {
  const container = $("#discoverGrid");
  if (!container) return;

  const query = ($("#discoverSearch")?.value || "").trim().toLowerCase();

  const matches = publicCampaigns.filter(group => {
    if (group.visibility !== "public") return false;

    const text = [
      group.name,
      group.description,
      group.purpose,
      group.organiser
    ].filter(Boolean).join(" ").toLowerCase();

    return text.includes(query) &&
      (category === "All" || group.purpose === category);
  });

  container.innerHTML = matches.length
    ? matches.map(group => card(group, true)).join("")
    : empty(
        "No public fundraisers found",
        "Try another search or select a different cause."
      );

  $$("[data-cat]").forEach(button => {
    const active = button.dataset.cat === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

/* =========================================================
   MY GROUPS
   ========================================================= */

function renderGroups() {
  const container = $("#allGroups");
  if (!container) return;

  const query = ($("#groupSearch")?.value || "").trim().toLowerCase();
  const status = $("#groupFilter")?.value || "all";

  const matches = groups.filter(group => {
    const text = [
      group.name,
      group.description,
      group.purpose,
      group.organiser
    ].filter(Boolean).join(" ").toLowerCase();

    const matchesText = text.includes(query);
    const matchesStatus = status === "all" || group.status === status;

    return matchesText && matchesStatus;
  });

  container.innerHTML = matches.length
    ? matches.map(group => card(group)).join("")
    : empty(
        "No groups found",
        "Try another search or create a group to get started."
      );

  renderAccountSummary();
}

/* =========================================================
   GROUP DETAILS
   ========================================================= */

function renderDetail() {
  const container = $("#detail");
  if (!container) return;

  const group = findGroup(currentId);

  if (!group) {
    container.innerHTML = empty("Group not found", "Return to your groups and try again.");
    return;
  }

  const ownGroup = isMyGroup(group.id);

  const contributions = (group.contributions || []).map(item => `
    <div class="record">
      <span class="record-icon">＋</span>
      <span class="record-copy">
        <b>${esc(item.name)}</b>
        <small>${esc(item.date)} · ${esc(item.method || "Manual record")}</small>
      </span>
      <span class="record-value">${cash(item.amount)}</span>
      <span class="pill ${item.status === "Confirmed" ? "green" : "pending"}">
        ${esc(item.status)}
      </span>
    </div>
  `).join("");

  const expenses = (group.expenses || []).map(item => `
    <div class="record">
      <span class="record-icon">▤</span>
      <span class="record-copy">
        <b>${esc(item.title)}</b>
        <small>${esc(item.date)} · ${esc(item.category || "Other")}</small>
        ${item.note ? `<small>${esc(item.note)}</small>` : ""}
      </span>
      <span class="record-value">− ${cash(item.amount)}</span>
    </div>
  `).join("");

  const updates = (group.updates || []).map(item => `
    <div class="record">
      <span class="record-icon">◌</span>
      <span class="record-copy">
        <b>${esc(item.title)}</b>
        <small>${esc(item.date)}</small>
        <small>${esc(item.text)}</small>
      </span>
    </div>
  `).join("");

  const currentContent = {
    overview: `
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>Group progress</h3>
            <p>How far your community has come.</p>
          </div>
          <span class="pill green">${pct(group)}% reached</span>
        </div>

        <div class="card-progress">
          <b>${cash(group.raised)} raised</b>
          <span>${group.target
            ? cash(Math.max(0, group.target - group.raised)) + " to go"
            : "No target set"}</span>
        </div>

        ${progressBar(group)}

        <div class="panel-head" style="margin-top:22px">
          <div>
            <h3>Recent contributions</h3>
            <p>Recorded support for this group.</p>
          </div>
          <button class="text" data-tab="contributions">View all →</button>
        </div>

        ${contributions || "<p class='sub'>No contributions recorded yet.</p>"}
      </div>
    `,
    contributions: `
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>Contributions</h3>
            <p>Pending contributions are not included in the raised total.</p>
          </div>
          ${ownGroup ? '<button class="primary" data-modal="contribution">＋ Record</button>' : ""}
        </div>
        ${contributions || "<p class='sub'>No contributions recorded yet.</p>"}
      </div>
    `,
    expenses: `
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>Expenses</h3>
            <p>Recorded spending for this group.</p>
          </div>
          ${ownGroup ? '<button class="primary" data-modal="expense">＋ Record</button>' : ""}
        </div>
        ${expenses || "<p class='sub'>No expenses recorded yet.</p>"}
      </div>
    `,
    updates: `
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>Group updates</h3>
            <p>Notes and news about this fundraiser.</p>
          </div>
          ${ownGroup ? '<button class="primary" data-modal="update">＋ Update</button>' : ""}
        </div>
        ${updates || "<p class='sub'>No updates posted yet.</p>"}
      </div>
    `
  };

  container.innerHTML = `
    <div class="detail-cover ${art(group.purpose)}">
      <div>
        <span class="tag">${esc(label(group.purpose))}</span>
        <h1>${esc(group.name)}</h1>
        <p>${esc(group.description || "A community coming together around a shared goal.")}</p>
      </div>

      <div class="detail-actions">
        ${ownGroup
          ? '<button class="primary" data-modal="contribution">＋ Record contribution</button><button class="secondary" data-modal="expense">Record expense</button>'
          : '<button class="primary" data-modal="support">Support this cause</button>'}
        <button class="secondary" data-action="share">Share group</button>
      </div>
    </div>

    <div class="metrics">
      <div class="metric">
        <span>Recorded contributions</span>
        <b>${cash(group.raised)}</b>
        <small>Group total supplied by the demo data</small>
      </div>
      <div class="metric">
        <span>Total expenses</span>
        <b>${cash(group.spent || 0)}</b>
        <small>Expenses recorded</small>
      </div>
      <div class="metric">
        <span>Available balance</span>
        <b>${cash(balance(group))}</b>
        <small>Raised minus expenses</small>
      </div>
    </div>

    <div class="tabs" role="tablist" aria-label="Group sections">
      ${["overview", "contributions", "expenses", "updates"].map(tab => `
        <button
          class="tab ${detailTab === tab ? "active" : ""}"
          data-tab="${tab}"
          role="tab"
          aria-selected="${detailTab === tab}"
        >${tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
      `).join("")}
    </div>

    <div class="detail-grid">
      <div>${currentContent[detailTab] || currentContent.overview}</div>

      <aside>
        <div class="panel side-card">
          <h3>About this group</h3>
          <div class="info-row"><span>Organiser</span><b>${esc(group.organiser || "Group organiser")}</b></div>
          <div class="info-row"><span>Members</span><b>${Number(group.members || 1)} people</b></div>
          <div class="info-row"><span>Visibility</span><b>${visibilityLabel(group.visibility)}</b></div>
          <div class="info-row"><span>Created</span><b>${esc(group.created || "Recently")}</b></div>
          <div class="info-row"><span>Target</span><b>${group.target ? cash(group.target) : "Not set"}</b></div>
          ${ownGroup ? '<button class="secondary" style="width:100%;margin-top:10px" data-action="share">Invite or share group</button>' : ""}
        </div>

        <div class="panel side-card">
          <h3>Keeping things transparent</h3>
          <p>Contributions and expenses are shown separately. This is sample data; a live app would need verified records, permissions, and an audit trail.</p>
          <button class="text" data-action="transparency">How records work →</button>
        </div>
      </aside>
    </div>
  `;
}

/* =========================================================
   ACTIVITY
   ========================================================= */

function activityRow(item) {
  return `
    <div class="activity-row">
      <span class="activity-icon">${
        item.type === "money" ? "＋" :
        item.type === "receipt" ? "▤" : "◌"
      }</span>
      <span class="activity-copy">
        <p>${item.text}</p>
        <small>${esc(item.detail)}</small>
      </span>
      ${item.amount
        ? `<span class="activity-amount">${esc(item.amount)}</span>`
        : ""}
    </div>
  `;
}

function renderActivity() {
  const container = $("#allActivity");
  if (!container) return;

  container.innerHTML = activity.length
    ? activity.map(activityRow).join("")
    : empty("No activity yet", "Updates will appear here as your groups grow.");
}

/* =========================================================
   CREATE GROUP WIZARD
   ========================================================= */

function updateCreateStep(stepNumber) {
  createStep = Math.max(1, Math.min(3, Number(stepNumber) || 1));

  $$(".form-step").forEach(section => {
    section.classList.toggle("active", Number(section.dataset.step) === createStep);
  });

  $$("[data-step-label]").forEach(step => {
    const number = Number(step.dataset.stepLabel);
    step.classList.toggle("active", number === createStep);
    step.classList.toggle("done", number < createStep);

    const numberElement = $("b", step);
    if (numberElement) numberElement.textContent = number < createStep ? "✓" : String(number);
  });

  updateCreatePreview();
}

function updateCreatePreview() {
  const form = $("#createForm");
  if (!form) return;

  const purpose = form.querySelector('[name="purpose"]:checked')?.value;
  const name = form.elements.name?.value.trim();
  const target = form.elements.target?.value;
  const visibility = form.querySelector('[name="visibility"]:checked')?.value || "public";

  if ($("#previewName")) {
    $("#previewName").textContent = name || "Your group name";
  }

  if ($("#previewPurpose")) {
    $("#previewPurpose").textContent = purpose ? label(purpose) : "Your shared purpose";
  }

  if ($("#previewTarget")) {
    $("#previewTarget").textContent = target ? cash(target) : "Not set";
  }

  if ($("#previewVisibility")) {
    $("#previewVisibility").textContent = visibilityLabel(visibility);
  }
}

function handleCreateSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const selectedPurpose = form.querySelector('[name="purpose"]:checked');
  const name = form.elements.name.value.trim();

  if (!selectedPurpose) {
    updateCreateStep(1);
    toast("Choose a purpose first.");
    return;
  }

  if (!name) {
    updateCreateStep(2);
    form.elements.name.focus();
    toast("Enter a name for your group.");
    return;
  }

  const target = Number(form.elements.target.value) || 0;
  if (target < 0) {
    updateCreateStep(2);
    toast("The target cannot be negative.");
    return;
  }

  const newGroup = {
    id: "g" + Date.now(),
    name,
    purpose: selectedPurpose.value,
    description: form.elements.description.value.trim(),
    target,
    raised: 0,
    spent: 0,
    visibility: form.querySelector('[name="visibility"]:checked')?.value || "public",
    status: "active",
    members: 1,
    created: new Date().toLocaleDateString("en-GB"),
    deadline: form.elements.deadline.value,
    organiser: profile.name,
    contributions: [],
    expenses: [],
    updates: []
  };

  groups.unshift(newGroup);
  saveGroups();

  form.reset();
  updateCreateStep(1);
  toast("Your group has been created.");
  renderGroups();
  renderHome();
  openGroup(newGroup.id);
}

/* =========================================================
   PROFILE & ACCOUNT
   ========================================================= */

function initials(name) {
  return String(name || "Kafo Member")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase();
}

function renderProfile() {
  const name = profile.name || "Kafo Member";
  const email = profile.email || "Not added";
  const phone = profile.phone || "Not added";
  const language = profile.language || "English";

  const setText = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };

  setText("#profileHeading", name);
  setText("#profileName", name);
  setText("#profileEmail", email);
  setText("#profilePhone", phone);
  setText("#profilePhoneCard", phone);
  setText("#profileLanguage", language);

  $$(".user-row b").forEach(element => {
    element.textContent = name;
  });

  $$(".user-top").forEach(element => {
    const nameSpan = $("span:not(.avatar)", element);
    if (nameSpan) nameSpan.textContent = name;
  });

  $$(".avatar").forEach(element => {
    element.textContent = initials(name);
  });

  const financeToggle = $("#financeToggle");
  if (financeToggle) financeToggle.checked = Boolean(settings.showFinance);

  const notifyToggle = $("#notifyToggle");
  if (notifyToggle) notifyToggle.checked = Boolean(settings.notifications);

  renderAccountSummary();
}

function renderAccountSummary() {
  const count = $("#accountGroupCount");
  const total = $("#accountContributionTotal");

  if (count) count.textContent = String(groups.length);

  if (total) {
    const raised = groups.reduce(
      (sum, group) => sum + Number(group.raised || 0),
      0
    );
    total.textContent = cash(raised);
  }
}

function openProfileEditor() {
  modal(`
    <h2 id="modalTitle">Edit your account</h2>
    <p>Changes are saved in this browser for this demo.</p>

    <form class="modal-form" id="profileForm">
      <label class="field">
        Full name
        <input class="input" name="name" required maxlength="80"
          autocomplete="name" value="${esc(profile.name)}">
      </label>

      <label class="field">
        Email address
        <input class="input" name="email" type="email" maxlength="120"
          autocomplete="email" value="${esc(profile.email)}">
      </label>

      <label class="field">
        Phone number
        <input class="input" name="phone" type="tel" maxlength="30"
          autocomplete="tel" value="${esc(profile.phone)}">
      </label>

      <label class="field">
        Preferred language
        <select class="input" name="language">
          ${["English", "Wolof", "Mandinka", "Fula", "Jola", "Serer"].map(language => `
            <option value="${language}" ${profile.language === language ? "selected" : ""}>
              ${language}
            </option>
          `).join("")}
        </select>
        <small class="field-help">Choosing a language does not translate the app yet.</small>
      </label>

      <button class="primary" type="submit">Save changes</button>
    </form>
  `);

  $("#profileForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();

    if (!name) {
      toast("Please enter your name.");
      return;
    }

    profile = {
      name,
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      language: String(data.get("language") || "English")
    };

    saveProfile();
    renderProfile();
    closeModal();
    toast("Your profile has been saved.");
  });
}

/* =========================================================
   MODALS & GROUP RECORDS
   ========================================================= */

function modal(html) {
  const backdrop = $("#backdrop");
  const content = $("#modalContent");

  if (!backdrop || !content) {
    toast("The dialog could not open. Check the modal HTML.");
    return;
  }

  content.innerHTML = html;
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";

  window.setTimeout(() => {
    $("input, textarea, select, button", content)?.focus();
  }, 40);
}

function closeModal() {
  $("#backdrop")?.classList.remove("open");
  document.body.style.overflow = "";
}

function openRecordModal(type) {
  const group = findGroup(currentId);

  if (!group || !isMyGroup(currentId)) {
    toast("You can only record items for your own demo groups.");
    return;
  }

  let formFields = "";

  if (type === "contribution") {
    formFields = `
      <h2 id="modalTitle">Record a contribution</h2>
      <p>This records a payment already received. It does not process a payment.</p>

      <label class="field">Contributor name *
        <input class="input" name="name" required maxlength="100" placeholder="Name or Anonymous">
      </label>

      <label class="field">Amount (GMD) *
        <input class="input" name="amount" type="number" min="1" step="0.01" required>
      </label>

      <label class="field">Method
        <select class="input" name="method">
          <option>Manual record</option>
          <option>Cash</option>
          <option>Wave (record only)</option>
          <option>QMoney (record only)</option>
          <option>Other</option>
        </select>
      </label>

      <label class="field">Status
        <select class="input" name="status">
          <option>Confirmed</option>
          <option>Awaiting confirmation</option>
        </select>
      </label>

      <div class="notice">Only confirmed records affect the raised total. This demo does not verify payments.</div>
      <button class="primary" type="submit">Save contribution</button>
    `;
  } else if (type === "expense") {
    formFields = `
      <h2 id="modalTitle">Record an expense</h2>
      <p>Record how group funds were used.</p>

      <label class="field">Expense description *
        <input class="input" name="name" required maxlength="100" placeholder="e.g. Transport">
      </label>

      <label class="field">Amount (GMD) *
        <input class="input" name="amount" type="number" min="0.01" step="0.01" required>
      </label>

      <label class="field">Category
        <select class="input" name="category">
          <option>Medical</option>
          <option>Transport</option>
          <option>Supplies</option>
          <option>Food</option>
          <option>Venue</option>
          <option>Education</option>
          <option>Other</option>
        </select>
      </label>

      <label class="field">Date
        <input class="input" name="date" type="date" value="${new Date().toISOString().slice(0, 10)}">
      </label>

      <label class="field">Note
        <textarea class="input" name="note" rows="2" maxlength="500"></textarea>
      </label>

      <button class="primary" type="submit">Save expense</button>
    `;
  } else {
    formFields = `
      <h2 id="modalTitle">Post a group update</h2>

      <label class="field">Update title *
        <input class="input" name="name" required maxlength="100">
      </label>

      <label class="field">Message *
        <textarea class="input" name="note" rows="4" required maxlength="500"></textarea>
      </label>

      <button class="primary" type="submit">Post update</button>
    `;
  }

  modal(`<form class="modal-form" id="recordForm">${formFields}</form>`);

  $("#recordForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const amount = Number(data.get("amount") || 0);

    if (!name) {
      toast("Please enter a name or description.");
      return;
    }

    if (type !== "update" && (!Number.isFinite(amount) || amount <= 0)) {
      toast("Enter an amount greater than zero.");
      return;
    }

    if (type === "contribution") {
      const status = String(data.get("status") || "Awaiting confirmation");

      group.contributions ||= [];
      group.contributions.unshift({
        name,
        amount,
        date: "Just now",
        status,
        method: String(data.get("method") || "Manual record")
      });

      if (status === "Confirmed") {
        group.raised = Number(group.raised || 0) + amount;
      }

      activity.unshift({
        type: "money",
        text: `<b>${esc(name)}</b> recorded a contribution to <b>${esc(group.name)}</b>.`,
        detail: "Just now",
        amount: status === "Confirmed" ? "+ " + cash(amount) : "Awaiting confirmation"
      });
    }

    if (type === "expense") {
      group.expenses ||= [];
      group.expenses.unshift({
        title: name,
        amount,
        category: String(data.get("category") || "Other"),
        date: String(data.get("date") || "Today"),
        note: String(data.get("note") || "").trim()
      });

      group.spent = Number(group.spent || 0) + amount;

      activity.unshift({
        type: "receipt",
        text: `An expense was recorded in <b>${esc(group.name)}</b>.`,
        detail: "Just now",
        amount: "− " + cash(amount)
      });
    }

    if (type === "update") {
      group.updates ||= [];
      group.updates.unshift({
        title: name,
        date: "Just now",
        text: String(data.get("note") || "").trim()
      });

      activity.unshift({
        type: "update",
        text: `A new update was posted in <b>${esc(group.name)}</b>.`,
        detail: "Just now",
        amount: ""
      });
    }

    saveGroups();
    closeModal();
    renderDetail();
    renderHome();
    renderGroups();
    renderActivity();

    toast(type === "update" ? "Update posted." : "Record saved.");
  });
}

function showSupportDialog() {
  modal(`
    <h2 id="modalTitle">Support this cause</h2>
    <p>This is a prototype. No payment will be taken and no money will be transferred.</p>
    <div class="notice">
      A live version would use a verified payment provider and show a clear payment confirmation.
    </div>
    <button class="primary" id="supportUnderstood" type="button">Understood</button>
  `);

  $("#supportUnderstood")?.addEventListener("click", () => {
    closeModal();
    toast("No payment was made.");
  });
}

/* =========================================================
   SHARE, HELP & SETTINGS
   ========================================================= */

async function shareCurrentGroup() {
  const group = findGroup(currentId);
  if (!group) {
    toast("Open a group before sharing it.");
    return;
  }

  const url = location.href.split("#")[0] + "#group-" + encodeURIComponent(group.id);

  if (navigator.share) {
    try {
      await navigator.share({
        title: group.name,
        text: "View this Kafo group: " + group.name,
        url
      });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    toast("Demo group link copied.");
  } catch (error) {
    modal(`
      <h2 id="modalTitle">Share this group</h2>
      <p>Copy this demo link manually.</p>
      <textarea class="input" rows="3" readonly>${esc(url)}</textarea>
      <button class="primary" id="selectShareLink" type="button">Select link</button>
    `);

    $("#selectShareLink")?.addEventListener("click", () => {
      const field = $("#modalContent textarea");
      field?.select();
      toast("Link selected. Copy it using your device's copy command.");
    });
  }
}

function showInfo(title, message) {
  modal(`
    <h2 id="modalTitle">${esc(title)}</h2>
    <p>${esc(message)}</p>
    <button class="primary" id="infoClose" type="button">Understood</button>
  `);

  $("#infoClose")?.addEventListener("click", closeModal);
}

function resetDemo() {
  modal(`
    <h2 id="modalTitle">Reset demo data?</h2>
    <p>This removes saved group, profile, and preference changes from this browser.</p>
    <div class="modal-actions">
      <button class="secondary" id="cancelReset" type="button">Cancel</button>
      <button class="primary" id="confirmReset" type="button">Reset demo</button>
    </div>
  `);

  $("#cancelReset")?.addEventListener("click", closeModal);

  $("#confirmReset")?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE.groups);
    localStorage.removeItem(STORAGE.profile);
    localStorage.removeItem(STORAGE.settings);
    localStorage.removeItem("kafoActivity");
    localStorage.removeItem("kafoPreferences");

    groups = clone(SEED_GROUPS);
    profile = clone(DEFAULT_PROFILE);
    settings = {
      showFinance: true,
      notifications: true
    };
    publicCampaigns = clone(PUBLIC_SEED);
    activity = [];
    currentId = null;

    saveGroups();
    saveProfile();
    saveSettings();
    closeModal();

    renderProfile();
    renderDiscover();
    renderGroups();
    renderActivity();
    renderHome();
    setPage("home");

    toast("Demo data reset.");
  });
}

function applyFinancePreference() {
  const toggle = $("#financeToggle");
  if (toggle) {
    settings.showFinance = toggle.checked;
    saveSettings();
  }

  const stats = $$(".stat > strong");
  stats.forEach(element => {
    if (!settings.showFinance) {
      if (!element.dataset.originalValue) {
        element.dataset.originalValue = element.textContent;
      }
      element.textContent = "••••••";
    } else if (element.dataset.originalValue) {
      element.textContent = element.dataset.originalValue;
      delete element.dataset.originalValue;
    }
  });
}

/* =========================================================
   EVENT HANDLERS
   One delegated click handler prevents duplicate handlers.
   ========================================================= */

function handleClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const navButton = target.closest("[data-view]");
  if (navButton) {
    event.preventDefault();
    setPage(navButton.dataset.view);
    return;
  }

  const actionButton = target.closest("[data-action]");
  if (actionButton) {
    event.preventDefault();

    const action = actionButton.dataset.action;

    if (action === "create") {
      setPage("create");
    } else if (action === "share") {
      shareCurrentGroup();
    } else if (action === "transparency") {
      showInfo(
        "How records work",
        "Confirmed contributions, pending records, and expenses should be tracked separately. A production app must retain a history of changes."
      );
    }

    return;
  }

  const groupCard = target.closest("[data-open]");
  if (groupCard) {
    event.preventDefault();
    openGroup(groupCard.dataset.open);
    return;
  }

  const modalButton = target.closest("[data-modal]");
  if (modalButton) {
    event.preventDefault();

    const type = modalButton.dataset.modal;

    if (["contribution", "expense", "update"].includes(type)) {
      openRecordModal(type);
    } else if (type === "support") {
      showSupportDialog();
    }

    return;
  }

  const tabButton = target.closest("[data-tab]");
  if (tabButton) {
    event.preventDefault();
    detailTab = tabButton.dataset.tab;
    renderDetail();
    return;
  }

  const nextButton = target.closest("[data-next]");
  if (nextButton) {
    const next = Number(nextButton.dataset.next);

    if (next === 2 && !$("#createForm [name='purpose']:checked")) {
      toast("Choose a purpose first.");
      return;
    }

    if (next === 3) {
      const nameInput = $("#newName");
      if (!nameInput?.value.trim()) {
        updateCreateStep(2);
        nameInput?.focus();
        toast("Enter a group name.");
        return;
      }
    }

    updateCreateStep(next);
    return;
  }

  const previousButton = target.closest("[data-prev]");
  if (previousButton) {
    updateCreateStep(Number(previousButton.dataset.prev));
    return;
  }

  const categoryButton = target.closest("[data-cat]");
  if (categoryButton) {
    category = categoryButton.dataset.cat || "All";
    renderDiscover();
    return;
  }
}

function attachListeners() {
  document.addEventListener("click", handleClick);

  document.addEventListener("keydown", event => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      event.target instanceof Element &&
      event.target.matches("[data-open]")
    ) {
      event.preventDefault();
      openGroup(event.target.dataset.open);
    }

    if (event.key === "Escape") {
      closeModal();
    }
  });

  $("#createForm")?.addEventListener("submit", handleCreateSubmit);
  $("#createForm")?.addEventListener("input", updateCreatePreview);
  $("#createForm")?.addEventListener("change", updateCreatePreview);

  $("#groupSearch")?.addEventListener("input", renderGroups);
  $("#groupFilter")?.addEventListener("change", renderGroups);
  $("#discoverSearch")?.addEventListener("input", renderDiscover);

  $("#editProfile")?.addEventListener("click", openProfileEditor);
  $("#editAccountDetails")?.addEventListener("click", openProfileEditor);

  $("#closeModal")?.addEventListener("click", closeModal);

  $("#backdrop")?.addEventListener("click", event => {
    if (event.target === $("#backdrop")) closeModal();
  });

  $("#menu")?.addEventListener("click", () => {
    $("#sidebar")?.classList.toggle("open");
  });

  $("#back")?.addEventListener("click", goBackFromDetail);

  $("#notifications")?.addEventListener("click", () => {
    showInfo(
      "Notifications",
      "In the live Kafo app, contribution confirmations, group updates and invitations would appear here."
    );
  });

  $("#discoverInfo")?.addEventListener("click", () => {
    showInfo(
      "How discovery works",
      "Discover lists public fundraisers only. Link-only and private groups are not listed here. This demo uses sample fundraisers."
    );
  });

  $("#help")?.addEventListener("click", () => {
    showInfo(
      "Kafo help",
      "Create a group for a shared goal, invite people, and keep contributions and expenses recorded clearly. This prototype does not process payments."
    );
  });

  $("#about")?.addEventListener("click", event => {
    event.preventDefault();
    showInfo(
      "About Kafo",
      "Kafo helps communities organise contributions and keep clearer records of shared funds."
    );
  });

  $("#footerPrivacy")?.addEventListener("click", event => {
    event.preventDefault();
    showInfo(
      "Privacy in this prototype",
      "This demo stores sample changes in your browser. It does not provide production accounts or server-side privacy controls."
    );
  });

  $("#privacy")?.addEventListener("click", () => {
    showInfo(
      "Group visibility",
      "Public groups may appear in Discover. Link-only groups are not listed publicly, but links can be forwarded. Private-group access requires real server-side permissions in a production app."
    );
  });

  $("#reset")?.addEventListener("click", resetDemo);

  $("#financeToggle")?.addEventListener("change", () => {
    settings.showFinance = $("#financeToggle").checked;
    saveSettings();
    renderHome();
  });

  $("#notifyToggle")?.addEventListener("change", () => {
    settings.notifications = $("#notifyToggle").checked;
    saveSettings();
    toast("Notification preference saved for this demo.");
  });

  // Prevent placeholder footer links from jumping to the top.
  $$('a[href="#"]').forEach(link => {
    link.addEventListener("click", event => event.preventDefault());
  });
}

/* =========================================================
   STARTUP
   ========================================================= */

function initialiseKafo() {
  // Check required page sections and report missing HTML.
  [
    "home",
    "discover",
    "groups",
    "detail",
    "create",
    "activity",
    "profile"
  ].forEach(page => {
    if (!$("#view-" + page)) {
      console.error("Kafo: Missing page section #view-" + page);
    }
  });

  attachListeners();

  renderProfile();
  renderHome();
  renderDiscover();
  renderGroups();
  renderActivity();
  renderCreate();

  const hash = location.hash.replace(/^#/, "");
  const initialPage = [
    "home",
    "discover",
    "groups",
    "activity",
    "profile"
  ].includes(hash) ? hash : "home";

  setPage(initialPage, { updateHash: false, scroll: false });


}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialiseKafo, { once: true });
} else {
  initialiseKafo();
}