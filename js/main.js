// Hämtar spelen från servern och visar dem på sidan
async function fetchGames() {
    try {
        const response = await fetch('https://dt193g-backendramverk.onrender.com/');

        const games = await response.json();
        const gamesContainer = document.getElementById('games-container');

        // Rensar innehållet
        gamesContainer.innerHTML = '';

        // Loopar igenom spelen och skapar kort för varje spel
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';

            gameCard.innerHTML = `
                <img src="${game.coverUrl}" alt="Omslag för ${game.name}">
                <h2>${game.name}</h2>
                <p>${game.description}</p>
                <p><strong>Pris:</strong> ${game.price} SEK</p>
                <p><strong>År:</strong> ${game.year}</p>
                <p><strong>Spelad:</strong> ${game.played ? 'Ja' : 'Nej'}</p>
            `;  //ifall true så visas ja annars nej

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Uppdatera';
            updateButton.addEventListener('click', () => openUpdateModal(game));

            // Skapa knapp för att radera spelet
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Radera';
            deleteButton.addEventListener('click', () => {
                deleteGame(game._id); // Funktion för radering
            });

           
            gameCard.appendChild(updateButton);
            gameCard.appendChild(deleteButton);

            
            gamesContainer.appendChild(gameCard);
        });
    } catch (error) {
        console.error('Fel vid hämtning av spel:', error);
    }
}

// Funktion för att radera ett spel
async function deleteGame(id) {
    try {
        const response = await fetch(`https://dt193g-backendramverk.onrender.com/games/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Spelet raderades!');
            fetchGames(); 
        } else {
            throw new Error('Misslyckades att radera spelet.');
        }
    } catch (error) {
        console.error('Fel vid radering av spel:', error);
    }
}

const modal = document.getElementById('updateModal');
const closeModal = document.querySelector('.close');
const updateForm = document.getElementById('updateForm');


//stänger popup fönstret
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
})

function openUpdateModal(game) {
    modal.style.display = 'block';
    document.getElementById('gameId').value = game._id;
    document.getElementById('name').value = game.name;
    document.getElementById('description').value = game.description;
    document.getElementById('year').value = game.year;
    document.getElementById('price').value = game.price;
    document.getElementById('coverUrl').value = game.coverUrl;
    document.getElementById('played').value = game.played;
}

updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value.trim();
    const year = document.getElementById('year').value.trim();
    const coverUrl = document.getElementById('coverUrl').value.trim();
    const played = document.getElementById('played').checked;

    
    if (!name || !description || !price || !year || !coverUrl) {
        alert("Alla fält måste fyllas i och får inte innehålla endast mellanslag.");
        return;
    }

    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/?/;
    if (!urlPattern.test(coverUrl)) {
        alert("Omslagsbild (URL) måste vara en giltig URL.");
        return;
    }

    const gameId = document.getElementById('gameId').value;
    const updatedGame = {
        name,
        description,
        price,
        year,
        coverUrl,
        played,
    };

    try {
        const response = await fetch(`https://dt193g-backendramverk.onrender.com/games/${gameId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updatedGame),
        });

        if(response.ok){
            modal.style.display = 'none';
            fetchGames();
        } else {
            alert("kunde inte uppdater spelet");
        }


    } catch(error) {
        console.log("Kunde inte uppdatera spelet", error);
    }
})

// Kör funktionen när sidan laddas
fetchGames();