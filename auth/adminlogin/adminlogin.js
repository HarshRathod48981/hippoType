const adminLoginForm = document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  // Hardcoded admin credentials for now
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "admin123";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userRole", "admin");
    alert("Admin login successful!");
    window.location.href = "../../admin/admin/admin.html";
  }
});