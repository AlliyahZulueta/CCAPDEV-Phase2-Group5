document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const togglePassword = document.getElementById('togglePassword');
    const remember = document.getElementById("rememberMe");

    loginBtn.addEventListener('click', function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter both username and password.");
        } else {
            const isLoggedIn = true;

            if (isLoggedIn) {
                console.log("Username: ", username);
                console.log("Password: ", password);

                alert("Login successful!");

                // Redirect to the homepage
                setTimeout(function () {
                    window.location.href = '/homepage';
                }, 1000);
            } else {
                alert("Invalid username or password. Please try again.");
            }
        }
    });

    // Toggle password visibility when the image is clicked
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
    });

    if(localStorage.checkbox && localStorage.checkbox !== ""){
        remember.setAttribute("checked", "checked");
        usernameInput.value = localStorage.email;
        passwordInput.value = localStorage.password;
    }
    else{
        remember.removeAttribute("checked");
        passwordInput.value = "";
        usernameInput.value = "";
    }

    remember.addEventListener("change", function(){
        RememberMe();
    });

    function RememberMe() {
        if (remember.checked && usernameInput.value !== "" && passwordInput.value !== "") {
            localStorage.email = usernameInput.value;
            localStorage.password = passwordInput.value;
            localStorage.checkbox = remember.checked;
        } else {
            localStorage.email = "";
            localStorage.password = "";
            localStorage.checkbox = "";
        }
    };
});
