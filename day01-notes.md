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

#### CSS 进阶补充（Day 02 复习时加深）

**`display` 的六种常用值**

| 值 | 特点 |
|---|---|
| `block` | 独占一行，可设宽高 |
| `inline` | 并排，宽高无效（尺寸由内容决定） |
| `inline-block` | 并排，且可设宽高 |
| `flex` | 一维布局（一行或一列） |
| `grid` | 二维布局（行 + 列） |
| `none` | 隐藏且不占位（`visibility: hidden` 会占位，`opacity: 0` 占位且仍可交互） |

```css
.box    { display: block; width: 240px; height: 60px; } /* 宽高生效 */
.inline { display: inline; width: 240px; }              /* 宽高无效 */
.grid   { display: grid; grid-template-columns: 1fr 1fr; }
```

**盒模型与 `box-sizing`**
- 默认 `content-box`：`width` 只指内容区，实际占位 = 宽 + padding + border。
- `border-box`：`width` 包含 padding 和 border，设多宽就占多宽，更符合直觉。
```css
* { box-sizing: border-box; }
```

**尺寸函数**
- `calc()` 计算：`width: calc(100% - 40px);`
- `min()` / `max()` 取最小/最大：`width: min(1080px, calc(100% - 40px));`
- `clamp(小, 理想, 大)`：在区间内自适应。

**Grid 尺寸单位与写法**
- `fr`：剩余空间的一份。`1fr 1fr` = 两列等宽；`repeat(3, 1fr)` = 三列等宽。
- 不等宽：`grid-template-columns: 1fr 2fr;`（1:2）；固定 + 弹性：`200px 1fr`。
- 自适应列（不用媒体查询）：`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`

**伪类（描述元素状态 / 位置）**
- 交互状态：`:hover`（悬停）、`:active`（按下）、`:focus`（任何方式聚焦）、`:focus-visible`（仅键盘聚焦）。
- 结构位置：`:first-child`（第一个子元素）、`:nth-child(even)`（偶数项）、`:nth-child(3n)`（每 3 个一组）。
- 常见组合：`:focus { outline: none; }` 去掉默认框，`:focus-visible { outline: 3px solid; }` 只给键盘用户保留，兼顾美观与无障碍。

**`transform` 与 `transition`（一对好搭档）**
- `transform` 负责"变成什么样"：`translate(-3px, -3px)` 平移、`scale()` 缩放、`rotate()` 旋转。
- `transition` 负责"怎么平滑地变过去"：`transition: transform 160ms ease;`
- 关键：`transition` 要写在**常态**里（不是 `:hover` 里），进入和离开才都有过渡。
- CSS 坐标系：原点在（元素参考框的）左上角，**x 正向右、y 正向下**——和数学 y 轴相反。
- `transform` 不影响周围元素，是纯视觉移动，性能也好。

```css
.demo-btn {
    transition: transform 160ms ease, box-shadow 160ms ease;
}
.demo-btn:hover  { transform: translate(-3px, -3px); box-shadow: 5px 5px 0; }
.demo-btn:active { transform: translate(0, 0);       box-shadow: 1px 1px 0; }
```

**CSS 语言构成（结构记忆）**
- 组成：选择器（选谁）+ 声明块 `{ 属性: 值; }`（改什么、改成啥）+ 注释 `/* */`。
- 选择器：元素 / 类 `.x` / ID `#x` / 通配符 `*` / 后代（空格）/ 群组（逗号）/ 伪类 `:` / 伪元素 `::`。
- @ 规则：`@media`（响应式）、`@keyframes`（动画）、`@import`、`@supports`。
- 伪元素 `::before` / `::after` 是"虚拟小部件"，必须写 `content`。

**装饰技巧：用渐变铺点阵背景**
```css
body::before {
    position: fixed; inset: 0; z-index: -1; content: "";
    opacity: 0.45;
    background-image: radial-gradient(#b8c7bd 0.8px, transparent 0.8px);
    background-size: 18px 18px;
}
```
- 原理：`radial-gradient(色 0.8px, transparent 0.8px)` 两个色标位置相同 → 硬边 → 一个小圆点；再用 `background-size` 平铺成点阵。
- 同理两个 `linear-gradient`（横线 + `90deg` 竖线）叠加，可画出网格线。

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
