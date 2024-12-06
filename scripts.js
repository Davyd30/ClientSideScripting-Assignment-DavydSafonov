const teamUrl = 'https://api-nba-v1.p.rapidapi.com/teams';
const teamOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'da7ee2d10bmsh7cd13191fe0115dp189d45jsn2f97842e1550',
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
};

const playersUrl = 'https://api-nba-v1.p.rapidapi.com/players?team=1&season=2021';
const playersOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'da7ee2d10bmsh7cd13191fe0115dp189d45jsn2f97842e1550',
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
};

async function fetchData(url, options, displayFunction) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result); 
        displayFunction(result.response);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
        callback(true);
    } else {
        img.onload = () => {
            callback(true);
        };
        
        img.onerror = () => {
            callback(false);
        };
    }
}

function displayTeams(teams) {
    const teamsContainer = document.getElementById('team-container');
    teamsContainer.innerHTML = ''; 
    teams.forEach(team => {

        const selectedConference = document.querySelector('input[name="conference"]:checked').value;
        if (selectedConference === 'West' && team.leagues.standard.conference === 'West' ||
            selectedConference === 'East' && team.leagues.standard.conference === 'East'
        ) {
            checkIfImageExists(team.logo, (exists) => {
                if (exists) {
                    const teamCard = document.createElement('div');
                    teamCard.classList.add('team-card');
                    teamCard.innerHTML = `
                        <h2>${team.name}</h2>
                        <img src="${team.logo}" alt="${team.name} logo" class="team-logo">
                        <p>City: ${team.city}</p>
                        <p>Conference: ${team.leagues.standard.conference}</p>
                        <p>Division: ${team.leagues.standard.division}</p>
                    `;
                    teamsContainer.appendChild(teamCard);
                }
            });
        }
    });
}

(function() {
    document.getElementById('show-team').addEventListener('click', () => {
        fetchData(teamUrl, teamOptions, displayTeams);
    });
    
})();
