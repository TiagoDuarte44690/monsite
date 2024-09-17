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
