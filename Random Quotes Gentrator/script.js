const url = 'https://quotesondesign.com/wp-json/wp/v2/posts/';
let previousIndices = [];

let getQuote = async () => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    
    let indexOfApi;
    if (previousIndices.length === 10) {
      previousIndices = [];
    }

    do {
      indexOfApi = Math.floor(Math.random() * 10);
    } while (previousIndices.includes(indexOfApi) && previousIndices.length < 10);

    previousIndices.push(indexOfApi);

    let quote = data[indexOfApi].content.rendered;
    document.querySelector('.quote').innerHTML = quote;
  } catch (error) {
    console.error('Error fetching quote:', error);
    document.querySelector('.quote').innerHTML = 'Failed to fetch quote.';
  }
}

document.querySelector(".generator").addEventListener('click', getQuote);

const themeToggleBtn = document.querySelector('.theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleBtn.textContent = 'Switch to Light Theme';
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleBtn.textContent = 'Switch to Dark Theme';
    }
});
