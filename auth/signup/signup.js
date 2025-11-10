const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  // Check if user already exists
  if (localStorage.getItem(username)) {
    alert("Username already exists. Please log in instead.");
    return;
  }

  // Store user data locally
  const userData = { username, email, password };
  localStorage.setItem(username, JSON.stringify(userData));

  alert("Signup successful!");
  
  signupForm.reset();
});