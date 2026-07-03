// ========================================
// BREW BLISS CAFE - JAVASCRIPT
// Interactivity: Menu Filtering, Order Handling, Form Validation
// ========================================

// ========== MENU FILTERING ==========
function initializeMenuFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter menu items
            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ========== ORDER BUTTON HANDLERS ==========
function initializeOrderButtons() {
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const itemName = this.getAttribute('data-item');
            showOrderConfirmation(itemName);
        });
    });
}

function showOrderConfirmation(itemName) {
    const modal = document.getElementById('orderModal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.textContent = `You've ordered a ${itemName}! ☕`;
    modal.classList.remove('hidden');
    
    // Auto-close modal after 4 seconds
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 4000);
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.add('hidden');
}

// ========== FORM VALIDATION & HANDLING ==========
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset error messages
        clearErrorMessages();
        
        // Validate form
        let isValid = true;
        
        // Validate name
        if (!name || name.length < 2) {
            showError('nameError', 'Please enter a valid name (at least 2 characters).');
            isValid = false;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address.');
            isValid = false;
        }
        
        // Validate message
        if (!message || message.length < 10) {
            showError('messageError', 'Please enter a message (at least 10 characters).');
            isValid = false;
        }
        
        // If valid, show success and reset form
        if (isValid) {
            // Hide form
            form.style.display = 'none';
            
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Reset form fields after 3 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.classList.add('hidden');
            }, 3000);
        }
    });
}

function isValidEmail(email) {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputId = elementId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    
    errorElement.textContent = message;
    inputElement.classList.add('error');
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(el => el.textContent = '');
    inputElements.forEach(el => el.classList.remove('error'));
}

// ========== INITIALIZATION ==========
// Run all initialization functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMenuFiltering();
    initializeOrderButtons();
    initializeContactForm();
});

// ========== UTILITY: Close modal when clicking outside ==========
document.addEventListener('click', function(e) {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});
