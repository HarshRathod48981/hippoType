document.addEventListener("DOMContentLoaded", () => {
  const noticeElement = document.getElementById("noticeMessage");
  const goHomeBtn = document.getElementById("goHomeBtn");

  // Load custom message if admin set one
  const adminNotice = localStorage.getItem("siteNotice");
  if (adminNotice && adminNotice.trim() !== "") {
    noticeElement.textContent = adminNotice;
  }

  // Go Home (in case maintenance is turned off)
  goHomeBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});