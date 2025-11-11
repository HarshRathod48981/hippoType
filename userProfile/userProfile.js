/* ================================
   USER PROFILE PAGE JAVASCRIPT
   ================================
   Handles:
   - Checking if a user is logged in
   - Displaying username
   - Displaying user's test history from localStorage
   - Logging out
   - Redirecting unauthorized users
*/

// ----------------------
// 1️⃣ DOM References
// ----------------------
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const testHistoryTable = document.getElementById("testHistoryTable");

// ----------------------
// 2️⃣ User Validation
// ----------------------
const loggedInUser = localStorage.getItem("loggedInUser");
const userRole = localStorage.getItem("userRole");

// Redirect if user not logged in
if (!loggedInUser || userRole !== "user") {
  window.location.href = "../auth/signup/signup.html";
} else {
  usernameDisplay.textContent = loggedInUser;
}

// ----------------------
// 3️⃣ Populate Test History
// ----------------------
function loadUserHistory() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboardData")) || [];
  const userTests = leaderboard.filter(entry => entry.username === loggedInUser);

  testHistoryTable.innerHTML = "";

  if (userTests.length === 0) {
    testHistoryTable.innerHTML = `
      <tr>
        <td colspan="3" style="text-align:center; color:#555;">
          No test history yet.
        </td>
      </tr>
    `;
    return;
  }

  // Make a reversed copy so latest appears first (don't mutate original array)
  const reversedTests = [...userTests].reverse();
  const total = reversedTests.length; // total number of tests

  reversedTests.forEach((test, index) => {
    // index = 0 -> newest -> label = total
    const labelNumber = total - index;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Typing Test ${labelNumber}</td>
      <td>${test.wpm} WPM (${test.accuracy}%)</td>
      <td>${test.date}</td>
    `;
    testHistoryTable.appendChild(row);
  });
}

loadUserHistory();

// ----------------------
// 4️⃣ Logout Functionality
// ----------------------
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("userRole");
  alert("You have been logged out.");
  window.location.href = "../auth/signup/signup.html";
});

// ----------------------
// 5️⃣ Prevent Back Navigation After Logout
// ----------------------
window.addEventListener("pageshow", (event) => {
  if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "../auth/signup/signup.html";
  }
});