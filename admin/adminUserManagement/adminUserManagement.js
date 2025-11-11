document.addEventListener("DOMContentLoaded", () => {
  const userTableBody = document.querySelector("#userTable tbody");
  const searchInput = document.getElementById("searchUser");

  function loadUsers(filter = "") {
    userTableBody.innerHTML = "";

    const leaderboard = JSON.parse(localStorage.getItem("leaderboardData")) || [];

    // Loop through all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Skip non-user keys
      if (["loggedInUser", "userRole", "leaderboardData", "theme"].includes(key)) continue;

      try {
        const user = JSON.parse(localStorage.getItem(key));
        if (!user || !user.username) continue;

        // Filter users by search input
        if (filter && !user.username.toLowerCase().includes(filter.toLowerCase())) continue;

        // Count total tests taken by this user
        const totalTests = leaderboard.filter(e => e.username === user.username).length;

        // Create row
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${totalTests}</td>
          <td>
            <button class="action-btn edit">Edit</button>
            <button class="action-btn delete">Delete</button>
          </td>
        `;

        // Delete functionality
        row.querySelector(".delete").addEventListener("click", () => {
          if (confirm(`Are you sure you want to delete "${user.username}"?`)) {
            localStorage.removeItem(user.username);
            loadUsers();
          }
        });

        // Edit functionality (future use)
        row.querySelector(".edit").addEventListener("click", () => {
          alert("Edit feature not yet implemented.");
        });

        userTableBody.appendChild(row);
      } catch (error) {
        // Skip invalid or non-JSON keys
        continue;
      }
    }

    // Show "No users found" if empty
    if (!userTableBody.children.length) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan="4" style="text-align:center; color:#777; padding:15px;">
          No users found
        </td>
      `;
      userTableBody.appendChild(row);
    }
  }

  // Search bar functionality
  searchInput.addEventListener("input", (e) => {
    loadUsers(e.target.value);
  });

  // Initial load
  loadUsers();
});