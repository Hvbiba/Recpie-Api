// Function to fetch and display list of areas 
function displayArea(){
    let keyApi = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

    fetch(keyApi)
    .then(function(res){
        if(res.ok){
            return res.json();
        }else{
            throw new Error('Network response was not ok');
        }
    })
    .then(function(data){
        console.log(data);
        updateUI(data);
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}
displayArea();


// Function to update the UI with the fetched areas
function updateUI(areaData){
    let htmlPage = '';
    let areaContainer = document.getElementById('areaContainer');

    areaData.meals.forEach(element => {
        htmlPage += `
            <div class="area" data-area='${element.strArea}' onclick="fetchMealsByArea('${element.strArea}')">
                <i class="fa fa-home" aria-hidden="true"></i>
                <h4>${element.strArea}</h4>
            </div>
        `;
    });

    if(areaContainer){
        areaContainer.innerHTML = htmlPage;

        // Add click event listeners to each area element
        document.querySelectorAll('.area').forEach(element => {
            element.addEventListener('click', function(){
                setTimeout(function(){
                    location.href = './displayArea.html';
                }, 500);
                let area = element.getAttribute('data-area');
                fetchMealsByArea(area);
            });
        });
    }
}


// Function to fetch and display meals by area
function fetchMealsByArea(areaName) {
    let keyApi = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`;

    fetch(keyApi)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(function(data) {
        console.log(data);
        localStorage.setItem('areaMeal', JSON.stringify(data));
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}


// Function to filter and display meals in displayArea.html
function filterArea(areaData){
    let htmlPage = '';
    let container = document.getElementById('area-meals');

    areaData.meals.forEach(element => {
        htmlPage += `
            <div class='container'>
                <div class="img-container">
                    <img src="${element.strMealThumb}" width="150px">
                </div>
                <div class="area-content">
                    <h4>${element.strMeal}</h4>
                </div>
            </div>
        `;
    });

    if(container){
        container.innerHTML = htmlPage;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let areaData = localStorage.getItem('areaMeal');
    if (areaData) {
        // from local storage
        filterArea(JSON.parse(areaData)); 
    }
});
