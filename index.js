// Define constants and variables
const empty_error = "field must not be empty*";
let final_data = {};
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const number = document.getElementById("number");
const gender = document.querySelectorAll(".radio");

// Function to display error messages
function display_error(elementid, error) {
  document.getElementById(elementid).innerHTML = error;
}

// Event listener for the next button click
const next_button = document.querySelector(".next-btn");
next_button.addEventListener("click", (e) => {
  e.preventDefault();
 
  const user_details = {};

  // Validate fullname input
  if (fullname.value.trim() === "") {
    display_error("name-error", empty_error);
  } else if (fullname.value.length < 3 || fullname.value.length > 20) {
    display_error("name-error", "Please enter a valid name*");
  } else {
    display_error("name-error", "");
    user_details.Fullname = fullname.value;
  }

  // Validate email input
  if (email.value.trim() === "") {
    display_error("email-error", empty_error);
  } else {
    display_error("email-error", "");
    user_details.Email = email.value;
  }

  // Validate number input
  if (number.value.trim() === "") {
    display_error("number-error", empty_error);
  } else if (number.value.length !== 10 || isNaN(number.value)) {
    display_error("number-error", "Please enter a valid number*");
  } else {
    display_error("number-error", "");
    user_details.Number = number.value;
  }

  // Validate gender selection
  let flag = false;
  for (let i of gender) {
    if (i.checked) {
      user_details.Gender = i.value;
      display_error("gender-error", "");
      flag = true;
      break;
    }
  }
  if (!flag) {
    display_error("gender-error", "Please select any one");
  }

  // If all details are filled, move to the next section
  if (Object.keys(user_details).length == 4) {
    final_data = user_details;
    // Clear input fields and update UI
    fullname.value = "";
    email.value = "";
    number.value = "";
    document.getElementById("level2").style.backgroundColor = "white";
    document.getElementById("circle2").style.backgroundColor = "white";
    slide_element(".one");
    // store_userdata(user_details);
  }
});

// Function to slide to the next section
function slide_element(id) {
  const slide = document.querySelector(id);
  slide.style.transform = "translateX(-100%)";
  slide.style.boxShadow="none"
}

// Event listener for the back button in the second section
const back_btn = document.querySelector(".back-btn");
back_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const page_one = document.querySelector(".one");
  page_one.style.transform = "translateX(0%)";
  // Restore input values from final_data
  fullname.value = final_data.Fullname;
  email.value = final_data.Email;
  number.value = final_data.Number;
  document.getElementById("level2").style.backgroundColor = "transparent";
  document.getElementById("circle2").style.backgroundColor = "transparent";
});

// Event listener for the next button in the second form
const second_next = document.getElementById("second-next");
second_next.addEventListener("click", (e) => {
  e.preventDefault();
  const Qualification = {
    hobbies: [],
  };

  const hobby = document.getElementsByName("hobbies");
  const qualification = document.querySelector(".dropdown");
  
  // Validate qualification selection
  if (qualification.value === "") {
    display_error("qualification_error", "Please select any one ");
  } else {
    Qualification.qualification = qualification.value;
    display_error("qualification_error", "");
  }

  // Validate hobbies selection
  for (let check of hobby) {
    if (check.checked) {
      Qualification.hobbies.push(check.value);
      display_error("hobby-error", "");
    }
  }
  if (Qualification.hobbies.length == 0) {
    display_error("hobby-error", "Please select at least one*");
  } else {
    // If all details are filled, move to the next section
    if (Object.keys(Qualification).length == 2) {
      final_data.Qualification = Qualification;
      document.getElementById("level3").style.backgroundColor = "white";
      document.getElementById("circle3").style.backgroundColor = "white";
      slide_element(".two");
    }
  }
});

// Event listener for the back button in the final section
const final_backbtn = document.getElementById("final-backbtn");
final_backbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const qualification = document.querySelector(".dropdown");
  const page_two = document.querySelector(".two");
  page_two.style.transform = "translateX(0%)";
  qualification.value = final_data.Qualification.qualification;
  document.getElementById("level3").style.backgroundColor = "transparent";
  document.getElementById("circle3").style.backgroundColor = "transparent";
});

// Event listener for the final submit button
const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const password = document.getElementById("password");
  const confirm_password = document.getElementById("recheck-password");
  const agree_condition = document.getElementById("condition-check");
  
  // Validate password and terms acceptance
  if (password.value !== confirm_password.value) {
    display_error("password-error", "Passwords don't match");
  } else if (password.value === "") {
    display_error("password-error", empty_error);
  } else {
    final_data.Password = password.value;
    display_error("password-error", "");
    if (agree_condition.checked) {
      display_error("condition-error", "");
      password.value="";
      agree_condition.checked=false;
      confirm_password.value="";
      store_userdata(final_data);
      console.log(localStorage);
    } else {
      display_error("condition-error", "Please accept terms and conditions*");
    }
  }
});

// Function to store user data in local storage
function store_userdata(data) {
  display_data(data);
  const storedData = localStorage.getItem("userData");
  const store = storedData ? JSON.parse(storedData) : [];

  store.push(data);
  localStorage.setItem("userData", JSON.stringify(store));
  alert("User added successfully!");
}

// Function to display user data
function display_data(data) {
  document.getElementById("name").innerHTML = data.Fullname;
  document.getElementById("mail").innerHTML = data.Email;
  document.getElementById("phone_number").innerHTML = data.Number;
  document.getElementById("gender").innerHTML = data.Gender;
  document.getElementById("education").innerHTML = data.Qualification.qualification;
  document.getElementById("hobby").innerHTML = data.Qualification.hobbies.join(",");
  document.getElementById("user_password").innerHTML = data.Password;
}