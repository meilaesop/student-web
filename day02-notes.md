# Day 02 学习笔记：让网页"活"起来

## 今天做了什么

在 Day 01 的静态页面上，加了三个真正的交互功能：

1. **深色模式切换**（按钮）
2. **数据驱动生成卡片**（不再写死在 HTML）
3. **学习笔记保存**（输入 → 存本地 → 显示列表）

## 核心知识点

### 1. CSS 变量 + 主题切换
- 把所有颜色写到 `:root` 里当作"变量"：`--green`、`--paper`……
- 深色主题只需在 `body.dark-theme` 里**重新赋值**这些变量。
- 因为其它样式都引用 `var(--xxx)`，所以改一处、全局生效。
- JS 只做一件事：给 `<body>` 加/去 `dark-theme` 这个 class。

```js
document.body.classList.toggle("dark-theme", isDark);
```

### 2. 数据驱动渲染（数组 + forEach）
- 过去：卡片直接写在 HTML 里，改内容要改 HTML。
- 现在：内容放在 JS 数组 `lessons` 里，用 `forEach` 循环生成 DOM。
- 好处：改数据就能改页面，将来还能从接口/文件读取数据。

```js
lessons.forEach((lesson) => {
    const card = document.createElement("article");
    // ... 组装后 appendChild
});
```

### 3. localStorage 存取复杂数据
- `localStorage` 只能存**字符串**。
- 存数组要先用 `JSON.stringify` 转成字符串；
- 读回来要用 `JSON.parse` 转回数组。
- 用 `try/catch` 防止数据损坏时页面崩溃。

```js
localStorage.setItem("webStudyNotes", JSON.stringify(notes));
notes = JSON.parse(localStorage.getItem("webStudyNotes"));
```

### 4. 表单事件
- 给 `<form>` 绑定 `submit` 事件，而不是按钮的 `click`。
- 用 `event.preventDefault()` 阻止页面刷新。
- 用 `.trim()` 去掉首尾空格，空内容不保存。

## 可以自己试着玩一玩

1. 在 `lessons` 数组里加第 4 张卡片，看页面会不会自动多一张。
2. 给每条笔记加一个"删除"按钮（提示：用 `notes.splice(index, 1)`）。
3. 把笔记列表用 `<time>` 标签显示保存时间。

## 下一步（Day 03 预告）
- `<input>` 的多种类型（日期、颜色、范围）
- 用对象数组存储"待办事项"，实现增 / 删 / 完成
- 了解 `fetch`，从公开 API 拿数据渲染到页面
