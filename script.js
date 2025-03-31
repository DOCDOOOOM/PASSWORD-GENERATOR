// Get elements
const passwordDisplay = document.getElementById("password");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercaseInput = document.getElementById("uppercase");
const lowercaseInput = document.getElementById("lowercase");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");
const strengthBar = document.getElementById("strength-bar");

// Floating random elements in background
function createFloatingElements() {
    for (let i = 0; i < 30; i++) {
        let element = document.createElement('div');
        element.classList.add('floating');
        element.style.width = `${Math.random() * 50 + 20}px`;
        element.style.height = element.style.width;
        element.style.top = `${Math.random() * 100}%`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 5 + 5}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        document.getElementById('floating-elements').appendChild(element);
    }
}

createFloatingElements(); // Generate floating elements at start

// Event listeners
lengthInput.addEventListener("input", updateLength);
generateButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);

// Update length value
function updateLength() {
    lengthValue.textContent = lengthInput.value;
}

// Function to generate a password
function generatePassword() {
    const length = lengthInput.value;
    const hasUppercase = uppercaseInput.checked;
    const hasLowercase = lowercaseInput.checked;
    const hasNumbers = numbersInput.checked;
    const hasSymbols = symbolsInput.checked;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbersChars = "0123456789";
    const symbolsChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charset = "";

    if (hasUppercase) charset += uppercaseChars;
    if (hasLowercase) charset += lowercaseChars;
    if (hasNumbers) charset += numbersChars;
    if (hasSymbols) charset += symbolsChars;

    if (charset === "") {
        alert("Please select at least one character type.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Update password display
    passwordDisplay.value = password;

    // Update strength meter
    updateStrengthMeter(password);
}

// Function to update strength meter
function updateStrengthMeter(password) {
    const strength = calculateStrength(password);

    strengthBar.style.width = `${strength}%`;

    if (strength <= 30) {
        strengthBar.style.backgroundColor = "red";
    } else if (strength <= 60) {
        strengthBar.style.backgroundColor = "orange";
    } else {
        strengthBar.style.backgroundColor = "green";
    }
}

// Function to calculate password strength
function calculateStrength(password) {
    let strength = 0;

    // Length of password
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (password.length >= 16) strength += 20;

    // Uppercase letters
    if (/[A-Z]/.test(password)) strength += 15;

    // Lowercase letters
    if (/[a-z]/.test(password)) strength += 15;

    // Numbers
    if (/\d/.test(password)) strength += 10;

    // Symbols
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;

    return strength;
}

// Function to copy the password
function copyPassword() {
    passwordDisplay.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}
