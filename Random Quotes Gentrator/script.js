// const quoteUrl = 'https://zenquotes.io/api/random'; // Use /random for a random quote
// let quoteBox = document.querySelector(".quote");
async function getQuotes() {
  try {
    const url = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=10&cat=movies';
    const options = {
      method: 'GET', // Change to GET
      headers: {
        'x-rapidapi-key': 'd491171087msh06458daf2c3c081p14b829jsna065beec8c96', // Replace with your actual API key
        'x-rapidapi-host': 'andruxnet-random-famous-quotes.p.rapidapi.com',
        		'Content-Type': 'application/json'
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // The response is likely JSON data

  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

getQuotes(); // Call the function to fetch quotes