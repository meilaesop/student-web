# Day 01 学习笔记：网页的三位搭档

## 今天做了什么

从零搭出一个"Web 学习打卡"页面，认识了三件事的分工：

- **HTML** 搭骨架（页面有哪些内容）
- **CSS** 做外观（内容长什么样）
- **JavaScript** 加交互（用户操作后有反应）

## 核心知识点

### 1. HTML：用标签表达"结构"
- 页面用语义化标签组织，而不是一堆无意义的 `div`：
  - `<main>` 主体内容
  - `<section>` 一个内容区块
  - `<article>` 独立的卡片/文章
  - `<header>` / `<footer>` 头尾
- 列表用 `<ul>` + `<li>`（无序列表），每个 `<li>` 是一条学习任务。
- 表单用 `<form>` + `<label>` + `<input>` + `<button>`：
  - `<label for="studyNote">` 的 `for` 要等于 `<input id="studyNote">` 的 `id`，点击文字也能聚焦输入框。
- 无障碍属性：`aria-live="polite"` 让屏幕阅读器在文字变化时朗读，`aria-pressed` 表示按钮开关状态。

```html
<button id="checkInButton" type="button">完成今天的学习</button>
<p id="statusText" class="status" aria-live="polite">今天还没有打卡</p>
```

> 小坑：`<button>` 在表单里默认是 `type="submit"`，会提交表单。不提交的按钮要写 `type="button"`。

### 2. CSS：选择器 + 变量 + 布局
- **通配符重置**：`* { box-sizing: border-box; }` 让 padding/border 算进宽度，布局更省心。
- **CSS 变量**：把所有颜色集中写在 `:root`，方便统一改。
```css
:root {
    --green: #1f6f5b;
    --paper: #f6f3ec;
    --line: #d9dfd7;
}
.eyebrow { color: var(--green); }
```
- **Grid 布局**：三张卡片一行排开。
```css
.lesson-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}
```
- **过渡动画**：`transition: transform 160ms ease;` 让悬停位移更顺滑。
- **伪类**：
  - `:hover` 鼠标悬停
  - `:focus-visible` 键盘聚焦（比 `:focus` 更精准，只在键盘操作时出现）
- **响应式**：`@media (max-width: 760px)` 在窄屏下把三列变一列。
- **`clamp()`**：字号自适应，`font-size: clamp(2.8rem, 7vw, 5.8rem)` 表示"不小于小值、不大于大值、中间随视口变"。

### 3. JavaScript：选取 → 监听 → 改变
三步走模式：
```js
// 1. 选取元素
const checkInButton = document.querySelector("#checkInButton");
const statusText = document.querySelector("#statusText");

// 2. 定义要发生的变化
function showCheckedInState() {
    statusText.textContent = "已完成今天的学习，明天继续！";
    checkInButton.disabled = true;
}

// 3. 监听事件
checkInButton.addEventListener("click", () => {
    showCheckedInState();
});
```
- `document.querySelector("#id")` 用 CSS 选择器语法选元素，`#` 表示 id。
- `element.textContent` 改文字内容。
- `element.disabled = true` 禁用按钮。
- `addEventListener("click", 函数)` 绑定点击事件。

### 4. localStorage：让状态"记得住"
- 刷新页面后打卡状态不该丢失，所以存到浏览器本地。
- `localStorage` 只能存字符串，键值成对：
```js
localStorage.setItem("webStudyCheckedIn", "true"); // 存
localStorage.getItem("webStudyCheckedIn");         // 取，返回 "true" 或 null
```
- 页面加载时先检查，如果之前打过卡就直接显示完成状态：
```js
if (localStorage.getItem("webStudyCheckedIn") === "true") {
    showCheckedInState();
}
```

## 容易混淆的点
- `=`（赋值）vs `===`（严格比较）。
- `#id` 选一个，`.class` 可能选多个；用 id 时页面里应保持唯一。
- HTML 负责"有什么"，CSS 负责"长啥样"，JS 负责"做什么"——尽量别越界（比如别用 JS 直接写死样式，优先切 class）。

## 下一步（Day 02 预告）
- 用 JS **数组 + 循环**动态生成卡片（数据驱动页面）
- **深色模式**切换（CSS 变量 + class）
- 用 `JSON.stringify` / `JSON.parse` 把**一组笔记**存进 localStorage
