const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
// const appKey = 'f0053bac';



searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    
    fetchAPI();
    
  })

async function fetchAPI(){
    const baseURL = `https://api.tvmaze.com/search/shows`;
    const config = { params: { q: searchQuery } }
    const res = await axios.get(baseURL, config);

    // const baseURL = `http://www.omdbapi.com/?apikey=${appKey}&s=${searchQuery}`;
    // const baseURL = `https://api.tvmaze.com/search/shows?q=${searchQuery}`;

    // const response = await fetch(baseURL);
    // const data = await response.json();
    genHTML(res.data);
    console.log(res.data);
 
}

function genHTML(results){
    container.classList.remove('initial');
    let genDHTML = '';
    results.map( result => {
        try {
            genDHTML +=
        `
        <div class="item">
                    <img src="${result.show.image.medium}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.show.name}</h1>
                        <a class="viewButton" href="${result.show.officialSite}" target="_blank">View Info</a>
                    </div>
                    <p class="item-data">
                        Rating: ${result.show.rating.average}
                    </p>
                    <p class="item-data">
                        Premiered: ${result.show.premiered}
                    </p>
                    <p class="item-data">
                        Language: ${result.show.language}
                    </p>
                    <p class="item-data">
                        Genre: ${result.show.genres}
                    </p>
                </div>
        `
            
        } catch (error) {
            console.log(error)
        }
        
    })
    searchResultDiv.innerHTML = genDHTML;
}
