var phone = localStorage.getItem("phoneShow").toLowerCase();
if (phone === "no") {
  document.getElementById("phoneL").innerHTML = "Cann't Show Phone";
} else {
  document.getElementById("phoneL").innerHTML = localStorage.getItem("phone");
}
document.getElementById("nameL").innerHTML = localStorage.getItem("name");
document.getElementById("description").innerHTML =
  localStorage.getItem("description");
document.getElementById("description2").innerHTML =
  localStorage.getItem("description");
document.getElementById("main").src = localStorage.getItem("image");
document.getElementById("price").innerHTML = localStorage.getItem("price");
document.getElementById("location").innerHTML =
  localStorage.getItem("location");
document.getElementById("productName").innerHTML =
  localStorage.getItem("productName");
  // Function to get user location 



function getUserLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              reverseGeocode(latitude, longitude); // Convert to address
          },
          (error) => {
              console.error("Error fetching location:", error);
              document.getElementById("userLocation").placeholder = "Location access denied";
          }
      );
  } else {
      console.error("Geolocation is not supported by this browser.");
      document.getElementById("userLocation").placeholder = "Location not supported";
  }
}

// Function to reverse geocode (convert lat/long to address)
function reverseGeocode(latitude, longitude) {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your Google Maps API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  fetch(url)
      .then((response) => response.json())
      .then((data) => {
          if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              document.getElementById("userLocation").value = address;
              filterResultsByLocation(address); // Filter results based on location
          } else {
              console.error("No address found for this location.");
          }
      })
      .catch((error) => {
          console.error("Error fetching address:", error);
      });
}

// Existing JavaScript code
var categories = [
  "Mobile Phones",
  "Cars",
  "Motercycles",
  "House",
  "Tv - Video - Audio",
  "Tablets",
  "Land & Ports"
];

categories.map((data) => {
  document.getElementById("links").innerHTML += `
      <button onclick="categorySet(this)">${data}</button>
  `;
});

function showData() {
  var data = JSON.parse(localStorage.getItem("users"));
  var email = localStorage.getItem("email");
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  for (let i = 0; i < data.length; i++) {
      if (email == data[i].email && isAuthenticated === "true") {
          document.getElementById("login__sell").innerHTML = `
              <img class="avatar" onclick="profilePage()" width="60px" src="./images/avatar.png" />
              <button onclick="sell()" class="sell__btn">+ Sell</button>
          `;
      }
  }
}

function sell() {
  var data = JSON.parse(localStorage.getItem("users"));
  var email = localStorage.getItem("email");
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  var flage = true;
  for (let i = 0; i < data.length; i++) {
      if (email == data[i].email && isAuthenticated === "true") {
          flage = false;
          window.location.href = "./sell.html";
      }
  }
  if (flage === true) {
      document.getElementById("login").classList.remove("hidden");
  }
}

// New JavaScript code for location detection
function getUserLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              reverseGeocode(latitude, longitude);
          },
          (error) => {
              console.error("Error fetching location:", error);
              document.getElementById("userLocation").placeholder = "Location access denied";
          }
      );
  } else {
      console.error("Geolocation is not supported by this browser.");
      document.getElementById("userLocation").placeholder = "Location not supported";
  }
}

function reverseGeocode(latitude, longitude) {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  fetch(url)
      .then((response) => response.json())
      .then((data) => {
          if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              document.getElementById("userLocation").value = address;
              filterResultsByLocation(address);
          } else {
              console.error("No address found for this location.");
          }
      })
      .catch((error) => {
          console.error("Error fetching address:", error);
      });
}

function filterResultsByLocation(location) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const filteredProducts = products.filter((product) =>
      product.location.toLowerCase().includes(location.toLowerCase())
  );
  updateUI(filteredProducts);
}

function updateUI(filteredProducts) {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  filteredProducts.forEach((product, index) => {
      cardsContainer.innerHTML += `
          <div onclick="productDetail(${index})" class="card">
              <div class="img__featured">
                  <img src="${product.image}" alt="">
                  <p class="featured">featured</p>
              </div>
              <div class="card__content">
                  <div class="card__content-gap">
                      <div class="name__heart">
                          <h4>${product.name}</h4>
                          <i class="fa-solid fa-heart"></i>
                      </div>
                      <h2>Rs ${product.price}</h2>
                  </div>
                  <h5>${product.location}</h5>
              </div>
          </div>
      `;
  });
}

// Call the function to get user location on page load
window.onload = getUserLocation; 

// Function to toggle favorite icon
function toggleFavorite() {
  const favoriteIcon = document.querySelector(".favorite-icon");
  favoriteIcon.classList.toggle("active"); // Toggle active class

  // Save favorite state to localStorage (optional)
  const isFavorite = favoriteIcon.classList.contains("active");
  localStorage.setItem("isFavorite", isFavorite);

  // Display a message or perform an action
  if (isFavorite) {
      alert("Added to favorites!");
  } else {
      alert("Removed from favorites!");
  }
}

// Check and set favorite state on page load
window.onload = () => {
  const favoriteIcon = document.querySelector(".favorite-icon");
  const isFavorite = localStorage.getItem("isFavorite") === "true";

  if (isFavorite) {
      favoriteIcon.classList.add("active");
  }
}; 




function showData() {
  var data = JSON.parse(localStorage.getItem("users"));
  var email = localStorage.getItem("email");
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  for (let i = 0; i < data.length; i++) {
    if (email == data[i].email && isAuthenticated === "true") {
      document.getElementById("login__sell").innerHTML = `
       <img class="avatar" onclick="profilePage()" width="60px"src="./images/avatar.png" />
                 <button onclick="sell()" class="sell__btn">+ Sell</button>
                `;
    }
  }
}

/*function sell() {
  var data = JSON.parse(localStorage.getItem("users"));
  var email = localStorage.getItem("email");
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  var flage = true;
  for (let i = 0; i < data.length; i++) {
    if (email == data[i].email && isAuthenticated === "true") {
      flage = false;
      window.location.href = "./sell.html";
    }
  }
  if (flage === true) {
    document.getElementById("login").classList.remove("hidden");
  }
}*/

// Function to handle the Sell button click
function sell() {
  var data = JSON.parse(localStorage.getItem("users")) || [];
  var email = localStorage.getItem("email");
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  var flage = true;

  for (let i = 0; i < data.length; i++) {
      if (email == data[i].email && isAuthenticated === "true") {
          flage = false;
          window.location.href = "./sell.html"; // Redirect to sell page if authenticated
          break; // Exit the loop once the user is found
      }
  }

  if (flage === true) {
      // If the user is not authenticated, show the sell popup
      document.getElementById("sellPopup").classList.remove("hidden");
  }
}

// Function to close the sell popup
function closeSellPopup() {
  document.getElementById("sellPopup").classList.add("hidden");
}

// Function to open the login modal
function openLogin() {
  document.getElementById("login").classList.remove("hidden");
  closeSellPopup(); // Close the sell popup
}

// Function to open the signup modal
function createAccountPage() {
  document.getElementById("signUp").classList.remove("hidden");
  closeSellPopup(); // Close the sell popup
}

function profilePage() {
  window.location.href = "./profile.html";
}
showData();

function openLogin() {
  document.getElementById("login").classList.remove("hidden");
}

function closeLogin() {
  document.getElementById("login").classList.add("hidden");
}

function emailLogin() {
  document.getElementById("email").classList.remove("hidden");
  document.getElementById("login").classList.add("hidden");
}

function closeEmail() {
  document.getElementById("email").classList.add("hidden");
}

function backEmail() {
  document.getElementById("email").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function phoneLogin() {
  document.getElementById("phone").classList.remove("hidden");
  document.getElementById("login").classList.add("hidden");
}

function closePhone() {
  document.getElementById("phone").classList.add("hidden");
}

function backPhone() {
  document.getElementById("phone").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function createAccountPage() {
  document.getElementById("signUp").classList.remove("hidden");
  document.getElementById("login").classList.add("hidden");
}

function closeSignUp() {
  document.getElementById("signUp").classList.add("hidden");
}

function backSignUp() {
  document.getElementById("signUp").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function signUp() {
  let data = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  let flage = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].email === document.getElementById("signEmail").value) {
      flage = true;
      alert("You have entered a duplicate email address");
    }
  }
  if (flage === false) {
    let users = [];
    let obj = {
      name: document.getElementById("name").value,
      email: document.getElementById("signEmail").value,
      gender: document.getElementById("gender").value,
      phone: document.getElementById("signphone").value,
      isAuthenticated: true,
    };
    users = JSON.parse(localStorage.getItem("users"))
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    users.push(obj);
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("signUp").classList.add("hidden");
    document.getElementById("email").classList.remove("hidden");
  }
}

function login() {
  let email = document.getElementById("emailLogin").value;
  let users = JSON.parse(localStorage.getItem("users"));
  var flage = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      flage = true;
      alert("You have successfully Login");
      localStorage.setItem("name", users[i].name);
      localStorage.setItem("email", email);
      localStorage.setItem("phone", users[i].phone);
      localStorage.setItem("isAuthenticated", users[i].isAuthenticated);
      window.location.reload();
    }
  }
  if (flage == false) {
    alert("Please enter a valid email and password");
  }
}