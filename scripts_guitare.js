const maxCases = 18;
const incrementCases = (106 / maxCases);
const casesPositions = Array.from({ length: maxCases }, (_, i) => i * incrementCases);

function generateFrettes() {
    const frettesContainer = document.querySelector('.frettes');

    casesPositions.forEach((position, index) => {
        // Création de la frette
        const frette = document.createElement('div');
        frette.className = 'frette';
        frette.style.left = `${position}%`;

        // Création du numéro de case
        const caseNumber = document.createElement('div');
        caseNumber.className = 'case-number';
        caseNumber.textContent = index; // Affiche le numéro de la case (0, 1, 2, ...)

        // Calcul de la position du numéro de case entre les frettes
        const positionInterCase = position + (incrementCases / 2);
        caseNumber.style.position = 'absolute';
        caseNumber.style.top = '-20px'; // Ajustez cette valeur pour positionner correctement le numéro
        caseNumber.style.left = `${positionInterCase}%`; // Place le numéro entre les frettes
        caseNumber.style.transform = 'translateX(-50%)'; // Centre le numéro par rapport à la frette
        caseNumber.style.zIndex = '2'; // S'assure que les numéros sont au-dessus des frettes

        // Ajout de la frette et du numéro au conteneur
        frettesContainer.appendChild(frette);
        frettesContainer.appendChild(caseNumber);
    });
}

function generateCordes() {
    const mancheContainer = document.querySelector('.manche');
    const cordesContainer = document.querySelector('.cordes');
    const mancheHeight = mancheContainer.offsetHeight;
    const spacing = Math.round(mancheHeight / cordes.length);

    cordes.forEach((corde, index) => {
        const cordeDiv = document.createElement('div');
        cordeDiv.className = 'corde';
        cordeDiv.style.top = `${(cordes.length - index - 1) * spacing}px`;
        const cordeLabel = document.createElement('span');
        cordeLabel.textContent = corde;
        cordeDiv.appendChild(cordeLabel);
        cordesContainer.appendChild(cordeDiv);
    });
}

function generateVoyants() {
    const cordesContainer = document.querySelector('.cordes');
    const cordesElements = document.querySelectorAll('.corde');

    cordesElements.forEach((corde, cordeIndex) => {
        const voyantsContainer = document.createElement('div');
        voyantsContainer.className = 'voyants-container';
        cordesContainer.appendChild(voyantsContainer);

        casesPositions.forEach((position, index) => {
            const voyant = document.createElement('div');
            voyant.className = 'voyant off';
            voyant.style.left = `${position + incrementCases / 2}%`;
            voyant.style.top = `${corde.offsetTop + 2}px`;
            voyant.textContent = genererTableauNotes(cordes, notes)[cordeIndex][index];

            voyant.addEventListener('click', handleVoyantClick);

            voyantsContainer.appendChild(voyant);
        });
    });
}

function updateVoyants(notesGardes) {
    document.querySelectorAll('.voyant').forEach(voyant => {
        if (notesGardes.includes(voyant.textContent)) {
            voyant.classList.add('on');
            voyant.classList.remove('off');
            voyant.classList.remove('standby');
        } else {
            voyant.classList.add('off');
            voyant.classList.remove('on');
            voyant.classList.remove('standby');
        }
    });
}

function handleVoyantClick() {
    this.classList.toggle('standby');
    this.classList.toggle('on');
    this.classList.remove('off');
}

document.getElementById('scale-selector').addEventListener('change', (e) => {
    updateVoyants(notesGardes);
});

generateFrettes();
generateCordes();
generateVoyants();
