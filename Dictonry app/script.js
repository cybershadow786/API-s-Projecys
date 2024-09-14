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
            const phonetics = wordInfo.phonetics.map(p => {
                return p.audio ? `
                    <span>${p.text || ''}</span>
                    <button class="play-btn" onclick="playAudio('${p.audio}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
                            <path d="M11.536 7.936a1 1 0 0 1-.501 1.044 4.992 4.992 0 0 0 0 2.08 1 1 0 0 1 .501 1.044 1.003 1.003 0 0 1-.75 1.151C11.404 13.78 9.873 14 8 14c-3.39 0-6.206-2.596-6.846-6.081A.997.997 0 0 1 1 8a1 1 0 0 1 .154-.919C1.794 3.596 4.61 1 8 1c1.873 0 3.404.22 4.536.7a1.003 1.003 0 0 1 .75 1.151z"/>
                        </svg>
                        Pronounce
                    </button>
                ` : '';
            }).join(', ');

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

function playAudio(url) {
    const audio = new Audio(url.startsWith('//') ? `https:${url}` : url);
    audio.play();
}

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
