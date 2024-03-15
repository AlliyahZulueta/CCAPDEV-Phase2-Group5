document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const createAccountBtn = document.getElementById('createAccountBtn');

    togglePassword.addEventListener('click', function () {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });

    toggleConfirmPassword.addEventListener('click', function () {
        confirmPasswordInput.type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    });


    createAccountBtn.addEventListener('click', function () {
        // Get all input fields
        const firstName = document.querySelector('input[placeholder="First Name"]').value;
        const lastName = document.querySelector('input[placeholder="Last Name"]').value;
        const username = document.querySelector('input[placeholder="Username"]').value;
        const email = document.querySelector('input[placeholder="Email"]').value;
        const mobileNumber = document.querySelector('input[placeholder="Mobile Number"]').value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        //  form validation
        if (!firstName || !lastName || !username || !email || !mobileNumber || !password || !confirmPassword) {
            alert('All fields are required except for the profile picture');
            return;
        }

        //  password validation
        if (password.length < 6) {
            alert('Password must be at least 6 characters.');
            return;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
            alert('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        console.log('Account creation successful!');
        alert('Account creation successful!');

        window.location.href = 'log_in.html';
    });
});

function previewProfileImage(event) {
    const input = event.target;
    const previewImage = document.getElementById('previewImage');

    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}