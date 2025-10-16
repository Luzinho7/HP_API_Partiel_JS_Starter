const API_URL = 'https://hp-api.onrender.com/api/characters';
const container = document.querySelector('.characters');

let charac = [];
let currentFilter = null;

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
function renderList(list){
  container.innerHTML = list.map(personnage).join('');
}

function filtreMaison(){
    const maisonElements = document.querySelectorAll('.houses .house');
    if(!maisonElements.length) return;

    maisonElements.forEach(ma => {
        ma.addEventListener('click', () => {
            const img = ma.querySelector('img');
            const nomMaison = img ? img.alt : ma.dataset.house;
            const classe = maison(nomMaison);

            if(currentFilter === classe){
                currentFilter = null;
                maisonElements.forEach(m=> m.classList.remove('active'));
                renderList(charac);
                return;
            }
            currentFilter = classe;
            maisonElements.forEach(m=> m.classList.remove('active', m === ma));
            const listeFiltree = charac
            .filter(f => maison(f.house) === classe)
            .sort((a,b) => a.name.localeCompare(b.name));

            renderList(listeFiltree);

        });
    });
}
async function loadCharacters() {
try{
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error('Erreur');
    const data = await res.json();
    const first12 = data.slice(0,12);
    charac = first12;
    renderList(first12);
    filtreMaison();
}catch(e){
    container.innerHTML = '<p>Erreur</p>';
}
}
document.addEventListener('DOMContentLoaded',loadCharacters);  