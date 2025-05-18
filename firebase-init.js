// Import your Firebase config object
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Listen for form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
  
    // Clear previous errors
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
  
    // Login using Firebase Auth
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Success
        const user = userCredential.user;
        console.log('Logged in:', user.email);
  
        // Redirect to dashboard or show success toast
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        if (errorCode.includes("user")) {
          document.getElementById('email-error').textContent = "Invalid email or user not found.";
        } else if (errorCode.includes("password")) {
          document.getElementById('password-error').textContent = "Incorrect password.";
        } else {
          alert("Error: " + errorMessage);
        }
      });
  });
  