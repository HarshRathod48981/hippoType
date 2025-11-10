// ===============================
// LEADERBOARD LOGIC - HippoType
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("leaderboardBody");

  // Fetch saved leaderboard data
  let leaderboard = JSON.parse(localStorage.getItem("leaderboardData")) || [];

  if (leaderboard.length === 0) {
    tableBody.innerHTML = `
      <tr><td colspan="5" style="padding: 20px;">No data available yet. Play a typing test to appear here!</td></tr>
    `;
    return;
  }

  // Sort by WPM (descending)
  leaderboard.sort((a, b) => b.wpm - a.wpm);

  // Render leaderboard
  leaderboard.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.username}</td>
      <td>${entry.wpm}</td>
      <td>${entry.accuracy}</td>
      <td>${entry.date}</td>
    `;
    tableBody.appendChild(row);
  });
});