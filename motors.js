// Sample data for motorcycles and bikes
const products = [
    {
        name: "Honda CG 125",
        price: "150,000",
        location: "dehradun, India",
        image: "./images/carimage.jpg",
        category: "Motorcycles",
    },
    {
        name: "Yamaha YBR 125",
        price: "180,000",
        location: "Chandigarh, India",
        image: "./images/laptopimage.jpg",
        category: "Motorcycles",
    },
    {
        name: "United US 70",
        price: "80,000",
        location: "muradabad, India",
        image: "./images/bags image.jpg",
        category: "Bikes",
    },
    {
        name: "Suzuki GD 110",
        price: "200,000",
        location: "Katra, shajhanpur India",
        image: "./images/carimage.jpg",
        category: "Motorcycles",
    },
];

// Save products to localStorage
localStorage.setItem("products", JSON.stringify(products));

// Function to filter products by category
function filterCategory(category) {
    const filteredProducts = products.filter((product) => product.category === category);
    updateUI(filteredProducts);
}

// Function to update the UI with filtered products
function updateUI(filteredProducts) {
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = ""; // Clear existing cards

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

// Display all motorcycle and bike products on page load
window.onload = () => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const motorcycleProducts = allProducts.filter((product) =>
        ["Motorcycles", "Bikes", "Scooters"].includes(product.category)
    );
    updateUI(motorcycleProducts);
};