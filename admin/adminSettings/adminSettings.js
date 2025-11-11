document.addEventListener("DOMContentLoaded", () => {
  const durationInput = document.getElementById("testDuration");
  const maintenanceToggle = document.getElementById("maintenanceToggle");
  const siteNotice = document.getElementById("siteNotice");

  // Load saved settings
  durationInput.value = localStorage.getItem("testDuration") || 30;
  maintenanceToggle.checked = localStorage.getItem("maintenanceMode") === "true";
  siteNotice.value = localStorage.getItem("siteNotice") || "";

  // Update password
  document.getElementById("updatePasswordBtn").addEventListener("click", () => {
    const newPass = document.getElementById("newPassword").value;
    const confirmPass = document.getElementById("confirmPassword").value;

    if (!newPass || !confirmPass) {
      alert("Please fill both password fields.");
      return;
    }
    if (newPass !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    // Update admin credentials in localStorage
    const adminData = { username: "admin", password: newPass };
    localStorage.setItem("adminCredentials", JSON.stringify(adminData));
    alert("Password updated successfully!");
  });

  // Save test duration
  document.getElementById("saveDurationBtn").addEventListener("click", () => {
    const duration = parseInt(durationInput.value);
    if (isNaN(duration) || duration <= 0) {
      alert("Please enter a valid number of seconds.");
      return;
    }
    localStorage.setItem("testDuration", duration);
    alert(`Typing test duration set to ${duration} seconds!`);
  });

  // Maintenance mode toggle
  maintenanceToggle.addEventListener("change", () => {
    localStorage.setItem("maintenanceMode", maintenanceToggle.checked);
    alert(`Maintenance mode ${maintenanceToggle.checked ? "enabled" : "disabled"}.`);
  });

  // Save notice
  document.getElementById("saveNoticeBtn").addEventListener("click", () => {
    localStorage.setItem("siteNotice", siteNotice.value);
    alert("Notice updated successfully!");
  });

  // Logout admin
  document.getElementById("adminLogoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
    alert("Logged out successfully!");
    window.location.href = "../../../auth/adminlogin/adminlogin.html";
  });
});