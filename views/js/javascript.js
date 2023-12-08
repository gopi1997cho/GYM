let signUpButton = document.getElementById('signupBtn');
let signInButton = document.getElementById('signinBtn');
let title = document.getElementById('title');
let nameField = document.getElementById('nameField');
let emailField = document.getElementById('emailField');
let passwordField = document.getElementById('passwordField');
let name = document.getElementById('name');
let userIcon = document.getElementById('userIcon');

window.onload = () => {
    nameField.style.maxHeight = "65px";
    nameField.style.display = "flex";
    userIcon.style.display = "block";
    title.innerText = "Sign Up";
}
signInButton.addEventListener('click', () => {
    signInButton.classList.remove('disable');
    signUpButton.classList.add('disable');
    window.location.href='/login';
});
