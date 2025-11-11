document.addEventListener("DOMContentLoaded", () => {
  const leaderboardData = JSON.parse(localStorage.getItem("leaderboardData")) || [];

  if (leaderboardData.length === 0) {
    alert("No data available yet. Ask users to complete typing tests!");
    return;
  }

  // Group by username
  const userStats = {};
  leaderboardData.forEach(entry => {
    const { username, wpm, accuracy } = entry;
    if (!userStats[username]) {
      userStats[username] = { totalWpm: 0, totalAcc: 0, tests: 0 };
    }
    userStats[username].totalWpm += wpm;
    userStats[username].totalAcc += parseFloat(accuracy);
    userStats[username].tests++;
  });

  // Prepare chart data
  const usernames = Object.keys(userStats);
  const avgWpm = usernames.map(u => (userStats[u].totalWpm / userStats[u].tests).toFixed(1));
  const avgAcc = usernames.map(u => (userStats[u].totalAcc / userStats[u].tests).toFixed(1));
  const testCounts = usernames.map(u => userStats[u].tests);

  // Colors
  const colors = [
    "#ff6b6b", "#4ecdc4", "#ffe66d", "#1a535c", "#5a189a", "#f15bb5", "#00bbf9"
  ];

  // ===== WPM Chart (Bar) =====
  new Chart(document.getElementById("wpmChart"), {
    type: "bar",
    data: {
      labels: usernames,
      datasets: [{
        label: "Average WPM",
        data: avgWpm,
        backgroundColor: colors,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "WPM" } },
      },
    },
  });

  // ===== Accuracy Chart (Line) =====
  new Chart(document.getElementById("accuracyChart"), {
    type: "line",
    data: {
      labels: usernames,
      datasets: [{
        label: "Average Accuracy (%)",
        data: avgAcc,
        borderColor: "#1a535c",
        backgroundColor: "rgba(26, 83, 92, 0.2)",
        fill: true,
        tension: 0.3,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Accuracy (%)" } },
      },
    },
  });

  // ===== Test Distribution Chart (Pie) =====
  new Chart(document.getElementById("testDistributionChart"), {
    type: "pie",
    data: {
      labels: usernames,
      datasets: [{
        label: "Total Tests",
        data: testCounts,
        backgroundColor: colors,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
});