// ===== Day 02：数据驱动 + 交互增强 =====

// --- 1. 用数据描述内容，而不是写死在 HTML 里 ---
// 每个对象代表一张卡片，数组的顺序决定卡片顺序。
const lessons = [
    {
        number: "01",
        title: "HTML",
        text: "用标签描述标题、段落、按钮和页面结构。",
        className: "html-card",
    },
    {
        number: "02",
        title: "CSS",
        text: "用选择器和属性控制颜色、间距、大小与布局。",
        className: "css-card",
    },
    {
        number: "03",
        title: "JavaScript",
        text: "监听用户操作，修改页面内容，让网页产生反馈。",
        className: "js-card",
    },
];

// --- 2. 根据数据生成 DOM，并挂到页面上 ---
const lessonGrid = document.querySelector("#lessonGrid");

function renderLessons() {
    // 先清空容器，避免重复渲染时叠加内容
    lessonGrid.innerHTML = "";

    lessons.forEach((lesson) => {
        const card = document.createElement("article");
        card.className = `lesson-card ${lesson.className}`;

        const number = document.createElement("span");
        number.className = "card-number";
        number.textContent = lesson.number;

        const title = document.createElement("h2");
        title.textContent = lesson.title;

        const text = document.createElement("p");
        text.textContent = lesson.text;

        card.append(number, title, text);
        lessonGrid.appendChild(card);
    });
}

renderLessons();

// --- 3. 打卡：localStorage 持久化（沿用 Day 01 思路）---
const checkInButton = document.querySelector("#checkInButton");
const statusText = document.querySelector("#statusText");

function showCheckedInState() {
    statusText.textContent = "已完成今天的学习，明天继续！";
    checkInButton.textContent = "已完成打卡";
    checkInButton.disabled = true;
}

if (localStorage.getItem("webStudyCheckedIn") === "true") {
    showCheckedInState();
}

checkInButton.addEventListener("click", () => {
    localStorage.setItem("webStudyCheckedIn", "true");
    showCheckedInState();
});

// --- 4. 深色模式切换 ---
const themeToggle = document.querySelector("#themeToggle");

function applyTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    themeToggle.textContent = isDark ? "切换到浅色模式" : "切换到深色模式";
    themeToggle.setAttribute("aria-pressed", String(isDark));
}

// 初始化：读取上次保存的主题
applyTheme(localStorage.getItem("webStudyTheme") === "dark");

themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");
    applyTheme(isDark);
    localStorage.setItem("webStudyTheme", isDark ? "dark" : "light");
});

// --- 5. 学习笔记：保存到数组并渲染列表 ---
const studyForm = document.querySelector("#studyForm");
const studyNote = document.querySelector("#studyNote");
const noteList = document.querySelector("#noteList");

// 从 localStorage 读取已保存的笔记（JSON 字符串 -> 数组）
let notes = [];

try {
    const saved = JSON.parse(localStorage.getItem("webStudyNotes"));
    if (Array.isArray(saved)) {
        notes = saved;
    }
} catch (error) {
    // 数据损坏时忽略，保持空数组
    notes = [];
}

function renderNotes() {
    if (!noteList) {
        return;
    }

    noteList.innerHTML = "";

    notes.forEach((note) => {
        const item = document.createElement("li");
        item.textContent = note;
        noteList.appendChild(item);
    });
}

renderNotes();

studyForm.addEventListener("submit", (event) => {
    // 阻止表单默认提交（刷新页面）
    event.preventDefault();

    const value = studyNote.value.trim();

    // 空输入不保存
    if (value === "") {
        studyNote.focus();
        return;
    }

    notes.push(value);
    localStorage.setItem("webStudyNotes", JSON.stringify(notes));
    renderNotes();

    // 清空输入框，方便继续写
    studyNote.value = "";
    studyNote.focus();
});
