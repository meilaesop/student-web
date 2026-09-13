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
