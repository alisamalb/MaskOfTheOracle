let shuffledCards = [];

document.addEventListener('DOMContentLoaded', function () {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            // Convert the object data into an array and shuffle it
            shuffledCards = shuffleArray(Object.values(data));
            createPage(); // Call createPage now that data is shuffled and ready
        })
        .catch(error => console.error('Error fetching data:', error));
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
}

function createPage() {
    console.log(shuffledCards); // Logs the shuffled array of cards
    loadRandomCards('initial-card', 1);
    loadRandomCards('branch1', Math.floor(Math.random() * 3) + 1);
    loadRandomCards('branch2', Math.floor(Math.random() * 3) + 1);
    loadRandomCards('branch3', 1);
}

function loadRandomCards(containerId, count) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content
    for (let i = 0; i < count; i++) {
        const card = popCard();
        if (!card) continue; // Skip if no card is returned

        const img = document.createElement('img');
        img.src = card.Path;
        img.alt = "Tarot Card";
        img.classList.add('card');
        container.appendChild(img);

        const infobox= document.createElement('div');
        infobox.classList.add('info')

        const nameDiv = document.createElement('div');
        nameDiv.textContent = card.Name;
        nameDiv.classList.add('card-name');
        infobox.appendChild(nameDiv);
        infobox.innerHTML+='<br>'

        const meaningDiv = document.createElement('div');
        meaningDiv.textContent = card.Meaning;
        meaningDiv.classList.add('card-meaning');
        infobox.appendChild(meaningDiv);

        container.appendChild(infobox)
    }
}

function popCard() {
    if (shuffledCards.length === 0) {
        console.error('No more cards available');
        return null;
    }
    return shuffledCards.pop(); // Pop a card from the end of the array
}
