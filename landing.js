// Landing Page JavaScript for TaskFlow

class LandingPage {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.userNameInput = document.getElementById('userName');
        this.dateOfBirthInput = document.getElementById('dateOfBirth');
        this.nameError = document.getElementById('nameError');
        this.ageError = document.getElementById('ageError');
        
        this.init();
    }
    
    init() {
         ('LandingPage initialized');
        
        // Check if all required elements exist
        if (!this.form || !this.userNameInput || !this.dateOfBirthInput) {
            console.error('Required form elements not found:', {
                form: !!this.form,
                userNameInput: !!this.userNameInput,
                dateOfBirthInput: !!this.dateOfBirthInput
            });
            return;
        }
        
        // Check if user is already logged in
        this.checkExistingUser();
        
        // Add event listeners
        this.addEventListeners();
        
        // Focus on first input
        this.userNameInput.focus();
        
         ('LandingPage initialization complete');
    }
    
    checkExistingUser() {
        const userData = localStorage.getItem('taskflow_user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user.name && user.dateOfBirth) {
                    // User is already logged in, show logout option
                    this.showLoggedInState(user);
                    return;
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        
        // Show login form
        this.showLoginForm();
    }
    
    showLoggedInState(user) {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="welcome-card">
                <div class="logo">
                    <h1>TaskFlow</h1>
                    <p>Your Personal Productivity Companion</p>
                </div>
                
                <div class="info-message">
                    <strong>👋 Welcome back, ${user.name}!</strong><br>
                    You're already logged in and ready to continue managing your tasks.
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <button onclick="window.location.href='app.html'" class="btn-primary" style="margin-bottom: 15px;">
                        Continue to TaskFlow
                    </button>
                    <br>
                    <button onclick="logout()" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; transition: background-color 0.3s ease;">
                        Sign Out
                    </button>
                </div>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">📝</div>
                        <h3>Task Management</h3>
                        <p>Organize your tasks across different stages</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📊</div>
                        <h3>Progress Tracking</h3>
                        <p>Monitor your productivity and completion rates</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">💾</div>
                        <h3>Data Persistence</h3>
                        <p>Your data is saved locally and secure</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    showLoginForm() {
        // The login form is already in the HTML, just ensure it's visible
        const form = document.getElementById('registrationForm');
        if (form) {
            form.style.display = 'block';
        }
    }
    
    addEventListeners() {
         ('Adding event listeners');
        
        // Add form submit event listener
        this.form.addEventListener('submit', (e) => {
             ('Form submitted');
            this.handleSubmit(e);
        });
        
        // Add input event listeners for real-time validation
        this.userNameInput.addEventListener('input', () => {
             ('Name input changed:', this.userNameInput.value);
            this.validateName();
        });
        
        this.dateOfBirthInput.addEventListener('input', () => {
             ('Date input changed:', this.dateOfBirthInput.value);
            this.validateAge();
        });
        
         ('Event listeners added');
    }
    
    handleSubmit(e) {
         ('handleSubmit called');
        e.preventDefault();
        
        // Clear previous errors
        this.clearErrors();
        
        // Validate inputs
         ('Starting validation...');
        const isNameValid = this.validateName();
         ('Name validation result:', isNameValid);
        
        const isAgeValid = this.validateAge();
         ('Age validation result:', isAgeValid);
        
         ('Validation results:', { isNameValid, isAgeValid });
        
        if (isNameValid && isAgeValid) {
             ('All validation passed, saving user data');
            this.saveUserData();
        } else {
             ('Validation failed - Name:', isNameValid, 'Age:', isAgeValid);
        }
    }
    
    validateName() {
        const name = this.userNameInput.value.trim();
         ('Validating name:', name);
        
        if (!name) {
            this.showError(this.nameError, 'Name is required');
            return false;
        }
        
        if (name.length < 2) {
            this.showError(this.nameError, 'Name must be at least 2 characters long');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            this.showError(this.nameError, 'Name can only contain letters and spaces');
            return false;
        }
        
        this.clearError(this.nameError);
         ('Name validation passed');
        return true;
    }
    
    validateAge() {
        try {
            const dateOfBirth = this.dateOfBirthInput.value;
             ('Validating date of birth:', dateOfBirth);
            
            if (!dateOfBirth) {
                this.showError(this.ageError, 'Date of birth is required');
                return false;
            }
            
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            
             ('Today:', today);
             ('Birth date:', birthDate);
            
            // Check if the date is valid
            if (isNaN(birthDate.getTime())) {
                this.showError(this.ageError, 'Please enter a valid date');
                return false;
            }
            
            // Check if date is in the future
            if (birthDate > today) {
                this.showError(this.ageError, 'Date of birth cannot be in the future');
                return false;
            }
            
            // Simple age calculation
            let age = today.getFullYear() - birthDate.getFullYear();
            
            // Adjust age if birthday hasn't occurred this year
            const currentMonth = today.getMonth();
            const birthMonth = birthDate.getMonth();
            const currentDay = today.getDate();
            const birthDay = birthDate.getDate();
            
            if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
                age--;
            }
            
             ('Calculated age:', age);
            
            if (age < 10) {
                this.showError(this.ageError, 'You must be at least 10 years old to use TaskFlow');
                return false;
            }
            
            if (age > 120) {
                this.showError(this.ageError, 'Please enter a valid date of birth , you are too old');
                return false;
            }
            
            this.clearError(this.ageError);
             ('Age validation passed');
            return true;
            
        } catch (error) {
            console.error('Error in age validation:', error);
            this.showError(this.ageError, 'Error validating age. Please try again.');
            return false;
        }
    }
    
    showError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
             ('Error shown:', message);
        }
    }
    
    clearError(element) {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    }
    
    clearErrors() {
        this.clearError(this.nameError);
        this.clearError(this.ageError);
    }
    
    saveUserData() {
         ('saveUserData function called');
        
        const userData = {
            name: this.userNameInput.value.trim(),
            dateOfBirth: this.dateOfBirthInput.value,
            registrationDate: new Date().toISOString()
        };
        
         ('Saving user data:', userData);
        
        try {
            localStorage.setItem('taskflow_user', JSON.stringify(userData));
             ('User data saved successfully to localStorage');
            this.showSuccessMessage();
            
            // Redirect to app after a short delay
             ('Setting up redirect timer...');
            setTimeout(() => {
                 ('Redirecting to app.html');
                window.location.href = 'app.html';
            }, 1500);
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('Error saving user data. Please try again.');
        }
    }
    
    showSuccessMessage() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="welcome-card">
                <div class="logo">
                    <h1>TaskFlow</h1>
                    <p>Your Personal Productivity Companion</p>
                </div>
                
                <div style="text-align: center; padding: 40px 0;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
                    <h2 style="color: #ffffff; margin-bottom: 15px;">Welcome to TaskFlow!</h2>
                    <p style="color: #bdc3c7; margin-bottom: 30px;">Your account has been created successfully. Redirecting you to the main application...</p>
                    <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden;">
                        <div style="width: 100%; height: 100%; background: #3498db; animation: loading 1.5s ease-in-out;"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add loading animation CSS
        if (!document.querySelector('#loading-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-styles';
            style.textContent = `
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Global functions for modal and logout
function openTermsModal() {
    const modal = document.getElementById('termsModal');
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeTermsModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeTermsModal();
        }
    });
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    modal.style.display = 'none';
}

function logout() {
    if (confirm('Are you sure you want to sign out? This will clear all your data.')) {
        localStorage.removeItem('taskflow_user');
        localStorage.removeItem('taskflow_tasks');
        localStorage.removeItem('taskflow_has_visited');
        window.location.reload();
    }
}

// Initialize landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
     ('DOM loaded, initializing LandingPage');
    new LandingPage();
}); 