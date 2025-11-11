# 🦛 HippoType  
A modern typing speed test web application built using **HTML, CSS, and JavaScript**, featuring user authentication, leaderboards, and an admin panel — all powered by localStorage.

---

## 🚀 Features

### 👤 User Features
- **Sign Up & Login System**
  - Local authentication using `localStorage`.
  - Prevents duplicate usernames.
  - Role-based access (User/Admin).

- **Typing Test**
  - Interactive typing test with randomized words.
  - Displays **WPM (Words Per Minute)** and **Accuracy (%)** after completion.
  - Option to start a new test instantly.
  - Stores test history per user.

- **User Profile**
  - Displays username and avatar placeholder.
  - Shows personal test history (date, WPM, accuracy).
  - Logout functionality.

- **Leaderboard**
  - Global leaderboard showing top typers.
  - Displays username, WPM, accuracy, and test date.
  - Automatically updates after each test.

---

### 🛠️ Admin Features
- **Admin Login**
  - Separate login system for admin access.

- **Admin Dashboard**
  - Sidebar-based navigation with:
    - **Analytics Page:** Graphs showing user performance and average WPM trends.
    - **Settings Page:** Admin controls test duration, site rules, and logout option.
    - **User Management Page:**  
      - View all registered users (username, email, total tests taken).  
      - Delete users directly from the panel.  
      - Search users dynamically.

---

## 🧩 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **HTML5** | Structure and layout |
| **CSS3 (Flexbox, Glassmorphism)** | Styling, responsiveness, UI consistency |
| **JavaScript (ES6)** | Core logic and interactivity |
| **LocalStorage API** | User authentication, data persistence |
| **Chart.js (Admin Analytics)** | Graphs and metrics visualization |
| **VS Code** | Development environment |

---

## 🧠 Project Structure
typingTestWT/
│
├── admin/
│   ├── admin.html
│   ├── admin.css
│   ├── adminAnalytics/
│   │   └── adminAnalytics.html
│   ├── adminSettings/
│   │   └── adminSettings.html
│   ├── adminUserManagement/
│   │   ├── adminUserManagement.html
│   │   └── adminUserManagement.js
│
├── auth/
│   ├── login/
│   │   ├── login.html
│   │   ├── login.css
│   │   └── login.js
│   ├── signup/
│   │   ├── signup.html
│   │   ├── signup.css
│   │   └── signup.js
│   ├── adminlogin/
│   │   ├── adminlogin.html
│   │   ├── adminlogin.css
│   │   └── adminlogin.js
│
├── leaderboard/
│   ├── leaderboard.html
│   ├── leaderboard.css
│   └── leaderboard.js
│
├── mainGame/
│   ├── typing.html
│   └── typing.js
│
├── userProfile/
│   ├── userProfile.html
│   ├── userProfile.css
│   └── userProfile.js
│
├── hippo.png
├── styles.css
└── index.html

Developed by Harsh Rathod
Project Goal: To build a full typing test platform with user management and analytics entirely in vanilla JS.
