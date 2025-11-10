document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelector(".nav-links");
  if (!navLinks) return;

  const loggedInUser = localStorage.getItem("loggedInUser");
  const userRole = localStorage.getItem("userRole");

  // detect folder depth for relative links
  const depth = window.location.pathname.split("/").length - 2;
  const prefix = depth === 0 ? "" : "../";

  // get the current page name (like "index.html" or "leaderboard.html")
  const currentPage = window.location.pathname.split("/").pop();

  let html = "";

  if (loggedInUser && userRole === "user") {
    html = `
      <li><a href="${prefix}index.html" ${currentPage === "index.html" ? 'class="active"' : ""}>Home</a></li>
      <li><a href="${prefix}leaderboard/leaderboard.html" ${currentPage === "leaderboard.html" ? 'class="active"' : ""}>Leaderboard</a></li>
      <li><a href="${prefix}userProfile/userProfile.html" ${currentPage === "userProfile.html" ? 'class="active"' : ""}>${loggedInUser}</a></li>
    `;
  } 
  else if (loggedInUser && userRole === "admin") {
    html = `
      <li><a href="${prefix}index.html" ${currentPage === "index.html" ? 'class="active"' : ""}>Home</a></li>
      <li><a href="${prefix}leaderboard/leaderboard.html" ${currentPage === "leaderboard.html" ? 'class="active"' : ""}>Leaderboard</a></li>
      <li><a href="${prefix}admin/admin.html" ${currentPage === "admin.html" ? 'class="active"' : ""}>🛠️ Admin Panel</a></li>
    `;
  } 
  else {
    html = `
      <li><a href="${prefix}index.html" ${currentPage === "index.html" ? 'class="active"' : ""}>Home</a></li>
      <li><a href="${prefix}leaderboard/leaderboard.html" ${currentPage === "leaderboard.html" ? 'class="active"' : ""}>Leaderboard</a></li>
      <li><a href="${prefix}auth/signup/signup.html" ${currentPage === "signup.html" ? 'class="active"' : ""}>Login/Signup</a></li>
    `;
  }

  navLinks.innerHTML = html;
});