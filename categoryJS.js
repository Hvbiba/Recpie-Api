// Function to fetch and display meal categories
function displayCategory() {
    const keyApi = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    fetch(keyApi)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(data);
            updateUI(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
displayCategory();

// Function to update the UI with fetched meal categories
function updateUI(categoryData) {
    let htmlPage = '';
    const categoryContainer = document.getElementById('categoryContainer');

    // Loop through each category and create HTML elements
    categoryData.categories.forEach(element => {
        const modified = handleString(element.strCategoryDescription);
        htmlPage += `
            <div class="category" data-category='${element.strCategory}' onclick="fetchMealsByCategory('${element.strCategory}')">
                <div class="categoryImg">
                    <img src="${element.strCategoryThumb}" width="200px">
                </div>
                <div class="categoryContent">
                    <h3>${element.strCategory}</h3>
                    <p>${modified}</p>
                </div>
            </div>
        `;
    });

    if (categoryContainer) {
        categoryContainer.innerHTML = htmlPage;
        // Add click event listeners to each category element
        document.querySelectorAll('.category').forEach(element => {
            element.addEventListener('click', function() {
                setTimeout(function() {
                    location.href = './displayCategory.html';
                }, 500);
                let category = element.getAttribute('data-category');
                fetchMealsByCategory(category);
            });
        });
    }
}

function handleString(text) {
    return text.slice(0, 100); 
}

// Function to fetch and store meals by category
function fetchMealsByCategory(category) {
    const keyApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    fetch(keyApi)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('categoryMeal', JSON.stringify(data));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to filter and display meals in displayCategory.html
function filterCategory(categoryData) {
    let htmlPage = '';
    const container = document.getElementById('category-container');

    categoryData.meals.forEach(element => {
        htmlPage += `
            <div class='container'>
                <div class="img-container">
                    <img src="${element.strMealThumb}" width="150px">
                </div>
                <div class="category-content">
                    <h4>${element.strMeal}</h4>
                </div>
            </div>
        `;
    });

    if (container) {
        container.innerHTML = htmlPage;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const categoryData = localStorage.getItem('categoryMeal');
    if (categoryData) {
        // from local storage
        filterCategory(JSON.parse(categoryData));
    }
});
