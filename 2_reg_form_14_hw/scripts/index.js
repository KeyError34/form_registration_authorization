// добавляем обработку картинки с глазом
const userPasswordAutorization = document.querySelector("#passwordInput");
const userPasswordRegestration = document.querySelector(".userPassword");
const togglePasswordAutorization = document.querySelector(".passwordControl");
const togglePasswordRegestration = document.querySelector(
  ".passwordControlRegistration"
);

function togglePasswordShow(userPass, togglPas) {
  togglPas.addEventListener("click", () => {
    if (userPass.type === "password") {
      userPass.type = "text";
      togglPas.classList.add("view");
    } else {
      userPass.type = "password";
      togglPas.classList.remove("view");
    }
  });
}

if (userPasswordAutorization && togglePasswordAutorization) {
  togglePasswordShow(userPasswordAutorization, togglePasswordAutorization);
} else {
  console.log("Authorization elements not found");
}

if (userPasswordRegestration && togglePasswordRegestration) {
  togglePasswordShow(userPasswordRegestration, togglePasswordRegestration);
} else {
  console.log("Registration elements not found");
}

// добавление данных регистрации в локальное хранилище(сервер)
const registrationForm = document.querySelector("#registrationForm");
const submitBtn = document.querySelector(".submitBtn");
const userTelephone = document.querySelector(".userTelephone");
const userSername = document.querySelector(".userSername");
const userEmail = document.querySelector(".userEmail");
const userPassword = document.querySelector(".userPassword");
const registrationFormContainer = document.querySelector(
  "#registrationFormContainer"
);
const authorizationFormContainer = document.querySelector(
  "#authorizationFormContainer"
);
// получение данных нового пользователя из формы
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function hasPlusSign(phoneNumber) {
    const plusRegex = /^\+/;
    return plusRegex.test(phoneNumber);
  }

  function addUserData() {
    const userData = {
      userSername: userSername.value,
      userTelephone: userTelephone.value,
      userEmail: userEmail.value,
      userPassword: userPassword.value,
    };

    if (
      userSername.value.length <= 2 ||
      userSername.value.length >= 24 ||
      !hasPlusSign(userTelephone.value)||
      userTelephone.value.length < 13 ||
      !isValidEmail(userEmail.value) ||
      userPassword.value.length <= 5 ||
      userPassword.value.length >= 26
    ) {
      alert("Please make sure all fields are correctly filled. The name must be from 3 to 24 arbitrary characters, the phone number must start with + and be more than 12 digits, the password must be from 6 to 24 arbitrary characters.");
      return null;
    }

    return userData;
  }

  const userData = addUserData();

  if (userData) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isDuplicate = users.some(
      (user) =>
        user.userSername === userData.userSername ||
        user.userEmail === userData.userEmail
    );

    if (isDuplicate) {
      alert("Username or email already exists.");
      registrationFormContainer.classList.add("hidden");
      authorizationFormContainer.classList.remove("hidden");
      return;
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User data added:", userData);

    // oчистка полей ввода
    userSername.value = "";
    userTelephone.value = "";
    userEmail.value = "";
    userPassword.value = "";

    // перенаправляем пользователя на страницу авторизации
    alert("Registration successful!");
    registrationFormContainer.classList.add("hidden");
    authorizationFormContainer.classList.remove("hidden");
  }

});


const authorizationForm = document.querySelector("#authorizationForm");
const userLogin = document.querySelector("#userLogin");
const passwordInput = document.querySelector("#passwordInput");

authorizationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginValue = userLogin.value;
  const passwordValue = passwordInput.value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users)
  const user = users.find(user => user.userEmail === loginValue || user.userSername === loginValue);

  if (user && user.userPassword === passwordValue) {
    alert("Authorization successful!");
    window.location.href = 'https://www.facebook.com/';
  } else {
    alert("Invalid login or password.");
  }
});

// const users = JSON.parse(localStorage.getItem("users")) || [];
// console.log(users)
// localStorage.clear()
// После реализации основного функционала проекта “Регистрации и Авторизации с помощью localstorage” реализовать валидацию инпутов (Имя, Эмейл, Телефон, Пароль) с помощью JS.

