// Sample data for properties
const properties = [
    {
        name: "3-Bedroom House",
        price: "5,000,000",
        location: "Delhi, India",
        image: "./images/pahad.jpg",
        category: "Houses",
    },
    {
        name: "Luxury Apartment",
        price: "3,500,000",
        location: "Noida, India",
        image: "./images/bags image.jpg",
        category: "Apartments",
    },
    {
        name: "500 sq.yd Plot",
        price: "2,000,000",
        location: "Bareilly, Uttar pradesh India",
        image: "./images/laptopimage.jpg",
        category: "Plots",
    },
    {
        name: "2-Bedroom House",
        price: "4,000,000",
        location: "Rampur, India",
        image: "./images/carimage.jpg",
        category: "Houses",
    },
];

// Save properties to localStorage
localStorage.setItem("properties", JSON.stringify(properties));

// Function to filter properties by category
function filterCategory(category) {
    const filteredProperties = properties.filter((property) => property.category === category);
    updateUI(filteredProperties);
}

// Function to update the UI with filtered properties
function updateUI(filteredProperties) {
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = ""; // Clear existing cards

    filteredProperties.forEach((property, index) => {
        cardsContainer.innerHTML += `
            <div onclick="propertyDetail(${index})" class="card">
                <div class="img__featured">
                    <img src="${property.image}" alt="">
                    <p class="featured">featured</p>
                </div>
                <div class="card__content">
                    <div class="card__content-gap">
                        <div class="name__heart">
                            <h4>${property.name}</h4>
                            <i class="fa-solid fa-heart"></i>
                        </div>
                        <h2>Rs ${property.price}</h2>
                    </div>
                    <h5>${property.location}</h5>
                </div>
            </div>
        `;
    });
}

// Display all property products on page load
window.onload = () => {
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    updateUI(allProperties);
};