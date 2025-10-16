const API_URL = 'https://hp-api.onrender.com/api/characters';

function maison(house){
    switch(house){
        case 'Gryffindor': return 'gryffondor';
        case 'Slytherin' : return 'serpentard';
        case 'Hufflepuff' : return 'poufsouffle';
        case 'Ravenclaw' : return 'serdaigle';
        default: return '';
    }   
}
async function loadCharacter() {
    try{
        const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) throw new Error('Aucun personnage spécifié');
    
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Erreur API');
    
    const data = await res.json();
    const character = data.find(c => c.id === id);
    
    if (!character) throw new Error('Personnage introuvable');
    const maisonClasse = maison(character.house);
    document.querySelector('h3').textContent = character.name;
    document.title = `${character.name} - Harry Potter`;
    
    const figure = document.querySelector('.perso__left');
    figure.className = `perso__left ${maisonClasse}`;
    figure.querySelector('img').src = character.image || './images/characters/default.png';
    figure.querySelector('figcaption').textContent = character.name;
    
    const persoRight = document.querySelector('.perso__right');
    persoRight.innerHTML = `
      <p><strong>Nom Complet :</strong> ${character.name}</p>
      <p><strong>Maison :</strong> ${character.house || 'Inconnue'}</p>
      <p><strong>Né :</strong> ${character.dateOfBirth || 'Inconnue'}</p>
      <p><strong>Ascendance :</strong> ${character.ancestry || 'Inconnue'}</p>
      <p><strong>Patronus :</strong> ${character.patronus || 'Inconnu'}</p>
      <p><strong>Acteur :</strong> ${character.actor || 'Inconnu'}</p>
    `;
    const houseLogo = document.querySelector('.house__perso img');
    if(houseLogo && character.house) {
      houseLogo.src = `./images/logo/${character.house}.png`;
    }

    } catch (e) {
    console.error(e);
    document.querySelector('main').innerHTML = `
      <section>
        <h3>Erreur</h3>
        <p>Impossible de charger les détails du personnage.</p>
        <a href="index.html">Retour à l'accueil</a>
      </section>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadCharacter);