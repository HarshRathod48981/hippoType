const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill all fields!");
    return;
  }

  // Check if user exists in localStorage
  const storedUser = localStorage.getItem(username);
  if (!storedUser) {
    alert("User not found. Please sign up first.");
    return;
  }

  const userData = JSON.parse(storedUser);
  
  if (userData.password === password) {
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userRole", "user"); // ✅ Add this line
    alert("Login successful!");
    window.location.href = "../../userProfile/userProfile.html";
  } else {
    alert("Incorrect password!");
  }
});