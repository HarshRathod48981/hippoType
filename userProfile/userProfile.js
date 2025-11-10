/* ================================
   USER PROFILE PAGE JAVASCRIPT
   ================================
   Handles:
   - Checking if a user is logged in
   - Displaying username
   - Logging out
   - Redirecting unauthorized users
*/

// 1️⃣ Get references to elements on the page
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");

// 2️⃣ Check if user is logged in
const loggedInUser = localStorage.getItem("loggedInUser");
const userRole = localStorage.getItem("userRole");

// If no user is logged in, redirect to signup page
if (!loggedInUser || userRole !== "user") {
  window.location.href = "../auth/signup/signup.html";
} else {
  // Show the username in the profile header
  usernameDisplay.textContent = loggedInUser;
}

/* ================================
   LOGOUT FUNCTIONALITY
   ================================ */

logoutBtn.addEventListener("click", () => {
  // Clear user info from localStorage
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("userRole");

  // Optional alert for clarity
  alert("You have been logged out.");

  // Redirect to signup page
  window.location.href = "../auth/signup/signup.html";
});

/* ================================
   PAGE SHOW EVENT (prevents 'Back' after logout)
   ================================ */

// When the user tries to go back using browser navigation,
// this ensures the profile page doesn’t reappear.
window.addEventListener("pageshow", (event) => {
  if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "../auth/signup/signup.html";
  }
});

/* ================================
   FUTURE IMPROVEMENTS (optional)
   ================================
   // - Display test history dynamically from localStorage
   // - Add edit profile feature (change username/email)
   // - Save typing test results per user and show them here
*/