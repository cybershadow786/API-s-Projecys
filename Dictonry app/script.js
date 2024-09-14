document.getElementById('dictionary-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const word = document.getElementById('word-input').value;
    const loader = document.getElementById('loader');
    const resultDiv = document.getElementById('result');
  
    resultDiv.innerHTML = '';
    loader.classList.remove('hidden');
  
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
      
        loader.classList.add('hidden');
      
        if (data.title === 'No Definitions Found') {
            resultDiv.innerHTML = `<p>No definition found for <strong>${word}</strong>.</p>`;
        } else {
            const wordInfo = data[0];
            const phonetics = wordInfo.phonetics.map(p => p.text || '').join(', ');
            const meanings = wordInfo.meanings.map(meaning => `
                <h3>${meaning.partOfSpeech}</h3>
                <ul>
                    ${meaning.definitions.map(def => `
                        <li>
                            <strong>Definition:</strong> ${def.definition} <br>
                            ${def.example ? `<strong>Example:</strong> ${def.example}` : ''}
                        </li>
                    `).join('')}
                </ul>
            `).join('');
          
            resultDiv.innerHTML = `
                <h2>${wordInfo.word}</h2>
                <p><strong>Phonetic:</strong> ${phonetics}</p>
                <p><strong>Origin:</strong> ${wordInfo.origin || 'Unknown'}</p>
                ${meanings}
            `;
        }
    } catch (error) {
        loader.classList.add('hidden');
        resultDiv.innerHTML = `<p>Failed to fetch data. Please try again later.</p>`;
    }
});

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleBtn.textContent = 'Switch to Dark Theme';
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleBtn.textContent = 'Switch to Light Theme';
    }
});
