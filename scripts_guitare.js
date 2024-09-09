const intervals = ['1', '2m', '2', '3m', '3', '4', '4aug', '5', '6m', '6', '7m', '7'];
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const cordes = ['E', 'A', 'D', 'G', 'B', 'E'];
const maxCases = 18;
const incrementCases = (106 / maxCases);
const casesPositions = Array.from({ length: maxCases }, (_, i) => i * incrementCases);

// Declaration des gammes et des triades
const gammes = {
    modesIonien: ['1', '2', '3', '4', '5', '6', '7'],              //DO --> degre I
    modesDorien: ['1', '2', '3m', '4', '5', '6', '7m'],            //RE --> degre II
    modesPhrygien: ['1', '2m', '3m', '4', '5', '6m', '7m'],        //MI --> degre III
    modesLydien: ['1', '2', '3', '4aug', '5', '6', '7'],           //FA --> degre IV
    modesMixolydien: ['1', '2', '3', '4', '5', '6', '7m'],         //SOL --> degre V
    modesEolien: ['1', '2', '3m', '4', '5', '6m', '7m'],           //LA --> degre VI
    modesLocrien: ['1', '2m', '3m', '4', '4aug', '5', '6m', '7m'], //SI --> degre VII
    Pentatonique: ['1', '3m', '4', '5', '7m'],
    Blues: ['1', '3m', '4', '4aug', '5', '7m']
};

const triades = {
    Majeure: ['1', '3', '5'],
    Mineure: ['1', '3m', '5']
};

let intervallesGardes = intervals;
let notesGardes = notes;

function genererTableauNotes(cordes, notes) {
    const tableauNotes = [];

    cordes.forEach(corde => {
        let indexDepart = notes.indexOf(corde);
        const notesSuivantes = [];

        for (let i = 0; i < maxCases; i++) {
            notesSuivantes.push(notes[(indexDepart + i + 1) % notes.length]);
        }

        tableauNotes.push(notesSuivantes);
    });

    return tableauNotes;
}

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
    const spacing = mancheHeight / cordes.length;

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

function updateTableForScale(scale) {
    if (scale === "default") {
        intervallesGardes = intervals;
        notesGardes = notes;
    } else if (gammes[scale]) {
        intervallesGardes = gammes[scale];
        notesGardes = notes.filter((note, index) => {
            const intervalIndex = index % intervals.length;
            return intervallesGardes.includes(intervals[intervalIndex]);
        });
    } else if (triades[scale]) {
        intervallesGardes = triades[scale];
        notesGardes = notes.filter((note, index) => {
            const intervalIndex = index % intervals.length;
            return intervallesGardes.includes(intervals[intervalIndex]);
        });
    }

    generateTable(intervallesGardes, notesGardes);
    updateVoyants(notesGardes);
}

function generateTable(intervals, notes) {
    const intervalsRow = document.getElementById('intervals-row');
    const notesRow = document.getElementById('notes-row');

    intervalsRow.innerHTML = '';
    notesRow.innerHTML = '';

    intervals.forEach(interval => {
        const intervalCell = document.createElement('td');
        intervalCell.textContent = interval;
        intervalsRow.appendChild(intervalCell);
    });

    notes.forEach(note => {
        const noteCell = document.createElement('td');
        noteCell.textContent = note;
        notesRow.appendChild(noteCell);
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
    updateTableForScale(e.target.value);
    updateVoyants(notesGardes);
});

generateFrettes();
generateCordes();
generateVoyants();
generateTable(intervals, notes);
updateTableForScale();
