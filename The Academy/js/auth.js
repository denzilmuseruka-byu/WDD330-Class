// const form = document.querySelector("form");
const signupForm = document.getElementById('signUpForm');
const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('psw');


var hasLowercase = document.getElementById("hasLowercase");
var hasUppercase = document.getElementById("hasUppercase");
var hasNumber = document.getElementById("hasNumber");
var hasMinLength = document.getElementById("hasMinLength");


const emailError = document.getElementById('emailError');
const passwordErrors = document.getElementById('passwordErrors');
const nameErrors = document.getElementById('nameErrors');
const loginErrors = document.getElementById('loginErrors');
let isPasswordValid = false;

// ********************************************************************************************************************************** 
// * USERNAME VALIDATIONS.
// **********************************************************************************************************************************
if (username) {
  username.oninput = function () {
    if (username.validity.valid) {
      // In case there is an error message visible, if the field  is valid, we remove the error message.
      nameErrors.innerHTML = ''; // Reset the content of the message.
      nameErrors.className = 'error'; // Reset the visual state of the message.
      document.getElementById("usernameIcon").classList.add('hidden');
      document.getElementById("validName").classList.remove('hidden');
    } else {
      // If there is still an error, show the correct error.
      document.getElementById("validName").classList.add('hidden');
      showUsernameError();
    }
  }
}

// ********************************************************************************************************************************** 
// * EMAIL VALIDATIONS.
// **********************************************************************************************************************************
if (email) {
  email.oninput = function () {
    if (email.validity.valid) {
      // In case there is an error message visible, if the field  is valid, we remove the error message.
      emailError.innerHTML = ''; // Reset the content of the message.
      emailError.className = 'error'; // Reset the visual state of the message.
      document.getElementById("emailIcon").classList.add('hidden');
      document.getElementById("validEmail").classList.remove('hidden');
    } else {
      // If there is still an error, show the correct error.
      document.getElementById("validEmail").classList.remove('hidden');
      showEmailError();
    }
  }
}

// ********************************************************************************************************************************** 
// * PASSWORD VALIDATIONS.
// **********************************************************************************************************************************
// When the user clicks on the password field, show the message box
if (password) {
  password.oninput = function () {
    // If there is still an error, show the correct error.
    document.getElementById("validPsw").classList.add('hidden');
    document.getElementById("pswErrors").classList.remove('hidden');
    document.getElementById("pswIcon").classList.remove('hidden');
    showPasswordError();
    if (isPasswordValid) {
      // In case there is an error message visible, if the field  is valid, we remove the error message.
      document.getElementById("pswIcon").classList.add('hidden');
      document.getElementById("validPsw").classList.remove('hidden');
      document.getElementById("pswErrors").classList.add('hidden');
    }
  }

  // When the user clicks outside of the password field, hide the message box
  password.onblur = function () {
    document.getElementById("pswErrors").classList.add('hidden');
  }
}

// ********************************************************************************************************************************** 
// * ON SIGN UP FORM SUBMIT.
// **********************************************************************************************************************************
if (email) {
  signupForm.onsubmit = (e) => {
    if (!email.validity.valid) {
      // If it isn't valid, we display an appropriate error message
      showEmailError();
      e.preventDefault(); //preventing from form submitting
    } else if (!username.validity.valid) {
      // If it isn't valid, we display an appropriate error message
      showEmailError();
      showUsernameError();
      showPasswordError();
      e.preventDefault(); //preventing from form submitting
    } else if (!password.validity.valid) {
      document.getElementById("pswErrors").classList.remove('hidden');
      document.getElementById("pswIcon").classList.remove('hidden');
      e.preventDefault(); //preventing from form submitting
    } else {
      signUp();
      window.location.href = signupForm.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag.
    }
  }
}
// ********************************************************************************************************************************** 
// * ON SIGN IN FORM SUBMIT.
// **********************************************************************************************************************************
if (!email) {
  loginForm.onsubmit = (e) => {
    if (!username.validity.valid) {
      // If it isn't valid, we display an appropriate error message
      showUsernameError();
      e.preventDefault(); //preventing from form submitting
    } else if (!password.validity.valid) {
      document.getElementById("pswErrors").classList.remove('hidden');
      document.getElementById("pswIcon").classList.remove('hidden');
      e.preventDefault(); //preventing from form submitting
    } else {
      e.preventDefault();
      validateUsername();
    }
  }
}




// ********************************************************************************************************************************** 
// * CHECK AND SHOW APPROPRIATE EMAIL ERROR.
// **********************************************************************************************************************************
function showEmailError() {
  document.getElementById("emailIcon").classList.remove('hidden');
  if (email.validity.valueMissing) {
    // If the field is empty,  display the following error message.
    emailError.innerHTML = 'You need to enter an e-mail address.';
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address, display the following error message.
    emailError.innerHTML = 'Please enter a valid email.';
  } else if (email.validity.tooShort) {
    // If the data is too short,  display the following error message.
    emailError.innerHTML = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = 'error error-txt';
}

// ********************************************************************************************************************************** 
// * CHECK AND SHOW APPROPRIATE USERNAME ERROR.
// **********************************************************************************************************************************
function showUsernameError() {
  document.getElementById("usernameIcon").classList.remove('hidden');
  if (username.validity.valueMissing) {
    // If the field is empty,  display the following error message.
    nameErrors.innerHTML = 'You need to enter username.';
  } else if (username.validity.tooShort) {
    // If the data is too short,  display the following error message.
    nameErrors.innerHTML = `Username should be at least ${username.minLength} characters; you entered ${username.value.length}.`;
  }

  // Set the styling appropriately
  nameErrors.className = 'error error-txt';
}

// ********************************************************************************************************************************** 
// * CHECK AND SHOW APPROPRIATE PASSWORD ERROR.
// **********************************************************************************************************************************
function showPasswordError() {
  let hasLowerCase = false;
  let hasUpperCase = false;
  let hasNumber = false;
  let hasMinLength = false;

  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (password.value.match(lowerCaseLetters)) {
    hasLowercase.classList.remove("invalid");
    hasLowercase.classList.add("valid");
    hasLowerCase = true;
  } else {
    hasLowercase.classList.remove("valid");
    hasLowercase.classList.add("invalid");
  }

  // Validate hasUppercase letters
  var upperCaseLetters = /[A-Z]/g;
  if (password.value.match(upperCaseLetters)) {
    hasUppercase.classList.remove("invalid");
    hasUppercase.classList.add("valid");
    hasUpperCase = true;
  } else {
    hasUppercase.classList.remove("valid");
    hasUppercase.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (password.value.match(numbers)) {
    hasDigit.classList.remove("invalid");
    hasDigit.classList.add("valid");
    hasNumber = true;
  } else {
    hasDigit.classList.remove("valid");
    hasDigit.classList.add("invalid");
  }

  // Validate length
  if (password.value.length >= 4) {
    hasMinlength.classList.remove("invalid");
    hasMinlength.classList.add("valid");
    hasMinLength = true;
  } else {
    hasMinlength.classList.remove("valid");
    hasMinlength.classList.add("invalid");
  }

  // When the the password field is valid, hide the message box.
  if (hasLowerCase && hasUpperCase && hasNumber && hasMinLength) {
    isPasswordValid = true;
  }

}




function validateUsername() {
  let currentloggedin = JSON.parse((localStorage.getItem("userProfile")));
  if (currentloggedin) {
    if (currentloggedin.name !== username.value || currentloggedin.password !== password.value) {
      loginErrors.innerHTML = 'You have entered an invalid username or password';
      loginErrors.className = 'error error-txt';
      username.value = '';
      password.value = '';
      document.getElementById("validPsw").classList.add('hidden');
      document.getElementById("pswIcon").classList.remove('hidden');
      document.getElementById("usernameIcon").classList.remove('hidden');
      document.getElementById("validName").classList.add('hidden');
      loginForm.elements.forEach(i => {
        i.classList.add('border-red-500');
      })
    } else {
      logIn();
    }
  }

}


function signUp() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('psw').value;
  var email = document.getElementById('email').value;
  let userProfile = { name: username, password: password }
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
  localStorage.setItem('email', JSON.stringify(email));
}


function logIn() {
  let currentloggedin = JSON.parse((localStorage.getItem("userProfile")));
  if (currentloggedin) {
    if (currentloggedin.name === username.value && currentloggedin.password === password.value) {
      window.location.href = loginForm.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
    }
  } else {
    window.location.href = 'sign-up.html'; //redirecting user to the signup.
  }
}


