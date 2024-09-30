const tableau = document.getElementById('tableau');
const ligneIntervalle = document.createElement('div');
const ligneNotes = document.createElement('div');
const cellule = document.createElement('div');
const cell = document.createElement('div');
const intervalle = ['Cellule 1', 'Cellule 2', 'Cellule 3', 'Cellule 4', 'Cellule 5', 'Cellule 6'];
const notes = ['Note 1', 'Note 2', 'Note 3', 'Note 4', 'Note 5', 'Note 6'];



function majTableau(intervalle, notes) {
    
    
    // Effacer le contenu actuel du tableau
    tableau.innerHTML = '';

    // Créer la ligne pour les intervalles
    
    ligneIntervalle.className = 'Ligne';
    ligneIntervalle.appendChild(createCell('Intervalle', 'EnteteIntervalle')); // Ajouter l'en-tête Intervalle

    intervalle.forEach(item => {
        const cellule = document.createElement('div');
        cellule.textContent = item || '';
        ligneIntervalle.appendChild(cellule);
    });
    tableau.appendChild(ligneIntervalle);

    // Créer la ligne pour les notes
    
    ligneNotes.className = 'Ligne';
    ligneNotes.appendChild(createCell('Notes', 'EnteteNotes')); // Ajouter l'en-tête Notes

    notes.forEach(item => {
        
        cellule.textContent = item || '';
        ligneNotes.appendChild(cellule);
    });
    tableau.appendChild(ligneNotes);
}

function createCell(text, className) {
    
    cell.textContent = text;
    cell.className = className;
    return cell;
}

// Exemple d'utilisation
document.addEventListener("DOMContentLoaded", function() {
   
    majTableau(intervalle, notes);
});
