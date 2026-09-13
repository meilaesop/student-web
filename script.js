const checkInButton = document.querySelector("#checkInButton");
const statusText = document.querySelector("#statusText");

checkInButton.addEventListener("click", () => {
    statusText.textContent = "已完成今天的学习，明天继续！";
    checkInButton.textContent = "已完成打卡";
    checkInButton.disabled = true;
});
