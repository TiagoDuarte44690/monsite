document.addEventListener("DOMContentLoaded", function () {
    // Intervales and Notes data

    const intervalesData = ['Cellule 1', 'Cellule 2', 'Cellule 3', 'Cellule 4', 'Cellule 5', 'Cellule 6'];
    const notesData = ['Note 1', 'Note 2', 'Note 3', 'Note 4', 'Note 5', 'Note 6'];
    
    // Get the table body
    const tableBody = document.querySelector("#dynamicTable tbody");

    // Populate the "Intervales" row
    const intervalesRow = tableBody.insertRow(0);
    intervalesRow.insertCell(0).innerHTML = "Intervales";
    intervalesData.forEach((intervale, index) => {
        const cell = intervalesRow.insertCell(index + 1);
        cell.innerHTML = intervale;
    });

    // Populate the "Notes" row
    const notesRow = tableBody.insertRow(1);
    notesRow.insertCell(0).innerHTML = "Notes";
    notesData.forEach((note, index) => {
        const cell = notesRow.insertCell(index + 1);
        cell.innerHTML = note;
    });
});
