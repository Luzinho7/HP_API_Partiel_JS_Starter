const API_URL = 'https://hp-api.onrender.com/api/characters';
const container = document.querySelector('.characters');

function maison(house){
    switch(house){
        case 'Gryffindor': return 'gryffondor';
        case 'Slytherin' : return 'serpentard';
        case 'Hufflepuff' : return 'poufsouffle';
        case 'Ravenclaw' : return 'serdaigle';
        default: return 'troll';
    }   
}

function personnage(perso){
    const maisonClasse = maison(perso.house);
    const name = perso.name ;
    const img = perso.image ;
    return `
    <div class="character ${maisonClasse}">
      <img src="${img}" alt="${name}" />
      <p>${name}</p>
    </div>
  `;
}

async function loadCharacters() {
try{
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error('Erreur');
    const data = await res.json();
    const first12 = data.slice(0,12);
    container.innerHTML = first12.map(personnage).join('');
}catch(e){
    container.innerHTML = '<p>Erreur</p>';
}
}
document.addEventListener('DOMContentLoaded',loadCharacters);  