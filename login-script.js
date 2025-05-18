// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== UI Elements =====
    
    // Forms
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const resetForm = document.getElementById('reset-form');
    
    // Login form elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const rememberMeCheckbox = document.getElementById('remember');
    
    // Signup form elements
    const nameInput = document.getElementById('signup-name');
    const signupEmailInput = document.getElementById('signup-email');
    const signupPasswordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm');
    const nameError = document.getElementById('name-error');
    const signupEmailError = document.getElementById('signup-email-error');
    const signupPasswordError = document.getElementById('signup-password-error');
    const confirmError = document.getElementById('confirm-error');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    // Reset form elements
    const resetEmailInput = document.getElementById('reset-email');
    const resetEmailError = document.getElementById('reset-email-error');
    
    // Buttons
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const resetButton = document.getElementById('reset-button');
    const googleLoginButton = document.getElementById('google-login');
    
    // Password toggle buttons
    const togglePasswordBtn = document.getElementById('toggle-password');
    const toggleSignupPasswordBtn = document.getElementById('toggle-signup-password');
    
    // Form navigation links
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const backToLoginLink = document.getElementById('back-to-login');
    
    // Other UI elements
    const loadingOverlay = document.getElementById('loading-overlay');
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    
    // ===== Firebase Authentication State =====
    
    // Listen for auth state changes
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            console.log('User is signed in:', user.email);
            
            // Redirect to dashboard after successful login
            // In a real app, you might want to check if the user has completed their profile
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to the main dashboard
            }, 1000);
        }
    });
    
    // ===== Form Navigation =====
    
    // Show signup form
    if (showSignupLink) {
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            resetForm.classList.add('hidden');
            clearFormErrors();
        });
    }
    
    // Show login form
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            resetForm.classList.add('hidden');
            clearFormErrors();
        });
    }
    
    // Show password reset form
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.add('hidden');
            resetForm.classList.remove('hidden');
            clearFormErrors();
        });
    }
    
    // Back to login from reset form
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            resetForm.classList.add('hidden');
            clearFormErrors();
        });
    }
    
    // ===== Password Visibility Toggle =====
    
    // Toggle password visibility in login form
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            togglePasswordVisibility(passwordInput, this);
        });
    }
    
    // Toggle password visibility in signup form
    if (toggleSignupPasswordBtn) {
        toggleSignupPasswordBtn.addEventListener('click', function() {
            togglePasswordVisibility(signupPasswordInput, this);
        });
    }
    
    function togglePasswordVisibility(inputElement, buttonElement) {
        const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
        inputElement.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = buttonElement.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    }
    
    // ===== Password Strength Meter =====
    
    if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Update strength bar
            strengthBar.className = 'strength-bar';
            
            if (password.length === 0) {
                strengthBar.style.width = '0';
                strengthText.textContent = 'Password strength';
            } else if (strength.score === 1) {
                strengthBar.classList.add('weak');
                strengthText.textContent = 'Weak';
            } else if (strength.score === 2) {
                strengthBar.classList.add('medium');
                strengthText.textContent = 'Medium';
            } else if (strength.score === 3) {
                strengthBar.classList.add('strong');
                strengthText.textContent = 'Strong';
            } else if (strength.score === 4) {
                strengthBar.classList.add('very-strong');
                strengthText.textContent = 'Very Strong';
            }
        });
    }
    
    function checkPasswordStrength(password) {
        // This is a simple password strength checker
        // In a real app, you might want to use a library like zxcvbn
        
        let score = 0;
        let feedback = '';
        
        if (password.length === 0) {
            return { score, feedback };
        }
        
        // Length check
        if (password.length < 6) {
            feedback = 'Password is too short';
        } else if (password.length >= 10) {
            score += 1;
        }
        
        // Complexity checks
        if (/[A-Z]/.test(password)) score += 1; // Has uppercase
        if (/[a-z]/.test(password)) score += 1; // Has lowercase
        if (/[0-9]/.test(password)) score += 1; // Has number
        if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char
        
        // Cap the score at 4
        score = Math.min(score, 4);
        
        return { score, feedback };
    }
    
    // ===== Form Validation =====
    
    // Login form validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            clearFormErrors();
            
            // Get form values
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            // Validate email
            if (!email) {
                emailError.textContent = 'Email is required';
                return;
            } else if (!isValidEmail(email)) {
                emailError.textContent = 'Please enter a valid email address';
                return;
            }
            
            // Validate password
            if (!password) {
                passwordError.textContent = 'Password is required';
                return;
            }
            
            // If validation passes, attempt login
            loginWithEmailPassword(email, password);
        });
    }
    
    // Signup form validation
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            clearFormErrors();
            
            // Get form values
            const name = nameInput.value.trim();
            const email = signupEmailInput.value.trim();
            const password = signupPasswordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();
            
            // Validate name
            if (!name) {
                nameError.textContent = 'Name is required';
                return;
            }
            
            // Validate email
            if (!email) {
                signupEmailError.textContent = 'Email is required';
                return;
            } else if (!isValidEmail(email)) {
                signupEmailError.textContent = 'Please enter a valid email address';
                return;
            }
            
            // Validate password
            if (!password) {
                signupPasswordError.textContent = 'Password is required';
                return;
            } else if (password.length < 6) {
                signupPasswordError.textContent = 'Password must be at least 6 characters';
                return;
            }
            
            // Validate confirm password
            if (!confirmPassword) {
                confirmError.textContent = 'Please confirm your password';
                return;
            } else if (password !== confirmPassword) {
                confirmError.textContent = 'Passwords do not match';
                return;
            }
            
            // If validation passes, attempt signup
            signupWithEmailPassword(name, email, password);
        });
    }
    
    // Password reset form validation
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            clearFormErrors();
            
            // Get form values
            const email = resetEmailInput.value.trim();
            
            // Validate email
            if (!email) {
                resetEmailError.textContent = 'Email is required';
                return;
            } else if (!isValidEmail(email)) {
                resetEmailError.textContent = 'Please enter a valid email address';
                return;
            }
            
            // If validation passes, attempt password reset
            resetPassword(email);
        });
    }
    
    // ===== Firebase Authentication Functions =====
    
    // Login with email and password
    function loginWithEmailPassword(email, password) {
        showLoading();
        
        // Set persistence based on remember me checkbox
        const persistence = rememberMeCheckbox.checked ? 
            firebase.auth.Auth.Persistence.LOCAL : 
            firebase.auth.Auth.Persistence.SESSION;
        
        auth.setPersistence(persistence)
            .then(() => {
                return auth.signInWithEmailAndPassword(email, password);
            })
            .then(userCredential => {
                // Login successful
                const user = userCredential.user;
                showToast('Login Successful', `Welcome back, ${user.displayName || user.email}!`, 'success');
                hideLoading();
            })
            .catch(error => {
                hideLoading();
                handleAuthError(error, emailError, passwordError);
            });
    }
    
    // Signup with email and password
    function signupWithEmailPassword(name, email, password) {
        showLoading();
        
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Signup successful
                const user = userCredential.user;
                
                // Update user profile with name
                return user.updateProfile({
                    displayName: name
                }).then(() => {
                    // Store additional user data in Firestore
                    return db.collection('users').doc(user.uid).set({
                        name: name,
                        email: email,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                });
            })
            .then(() => {
                showToast('Account Created', 'Your account has been created successfully!', 'success');
                hideLoading();
            })
            .catch(error => {
                hideLoading();
                handleAuthError(error, signupEmailError, signupPasswordError);
            });
    }
    
    // Reset password
    function resetPassword(email) {
        showLoading();
        
        auth.sendPasswordResetEmail(email)
            .then(() => {
                hideLoading();
                showToast('Password Reset Email Sent', 'Check your email for instructions to reset your password.', 'success');
                
                // Switch back to login form after a delay
                setTimeout(() => {
                    loginForm.classList.remove('hidden');
                    resetForm.classList.add('hidden');
                }, 3000);
            })
            .catch(error => {
                hideLoading();
                handleAuthError(error, resetEmailError);
            });
    }
    
    // Google Sign In
    if (googleLoginButton) {
        googleLoginButton.addEventListener('click', function() {
            showLoading();
            
            const provider = new firebase.auth.GoogleAuthProvider();
            
            auth.signInWithPopup(provider)
                .then(result => {
                    // Google login successful
                    const user = result.user;
                    
                    // Check if this is a new user
                    const isNewUser = result.additionalUserInfo.isNewUser;
                    
                    if (isNewUser) {
                        // Store user data in Firestore for new users
                        return db.collection('users').doc(user.uid).set({
                            name: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            showToast('Account Created', 'Your account has been created successfully with Google!', 'success');
                        });
                    } else {
                        showToast('Login Successful', `Welcome back, ${user.displayName}!`, 'success');
                    }
                    
                    hideLoading();
                })
                .catch(error => {
                    hideLoading();
                    console.error('Google sign in error:', error);
                    showToast('Login Failed', error.message, 'error');
                });
        });
    }
    
    // ===== Helper Functions =====
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Handle Firebase Auth errors
    function handleAuthError(error, ...errorElements) {
        console.error('Authentication error:', error);
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorElements[0].textContent = 'No account found with this email';
                break;
            case 'auth/wrong-password':
                errorElements[1].textContent = 'Incorrect password';
                break;
            case 'auth/email-already-in-use':
                errorElements[0].textContent = 'This email is already in use';
                break;
            case 'auth/weak-password':
                errorElements[1].textContent = 'Password is too weak';
                break;
            case 'auth/invalid-email':
                errorElements[0].textContent = 'Invalid email format';
                break;
            case 'auth/too-many-requests':
                showToast('Too Many Attempts', 'Too many unsuccessful login attempts. Please try again later.', 'error');
                break;
            case 'auth/network-request-failed':
                showToast('Network Error', 'Please check your internet connection and try again.', 'error');
                break;
            default:
                showToast('Error', error.message, 'error');
        }
    }
    
    // Clear all form error messages
    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    // Show loading overlay
    function showLoading() {
        loadingOverlay.classList.remove('hidden');
    }
    
    // Hide loading overlay
    function hideLoading() {
        loadingOverlay.classList.add('hidden');
    }
    
    // Show toast notification
    function showToast(title, message, type = 'success') {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        // Set toast type
        toast.className = 'toast';
        toast.classList.add(type);
        
        // Show the toast
        toast.classList.remove('hidden');
        
        // Hide after 5 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 5000);
    }
});