let topBar = document.getElementById('topBar')
console.log(topBar)
let topBarText = '';
topBarText=`
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <img src="https://routeegy.github.io/YummyExam/imgs/logo.png" id="logo" width="30px">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><i class="fa fa-bars" aria-hidden="true"></i></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="list">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="./index.html">Search For</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="./category.html">Cagetories</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="./area.html">Area</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
`;


if(topBar){
    topBar.innerHTML= topBarText;
}