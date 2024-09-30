document.addEventListener("DOMContentLoaded", function() {
    // Intervales and Notes data
    const intervalesData = [
        "Liste intervales[1]",
        "Liste intervales[2]",
        "Liste intervales[3]",
        "Liste intervales[4]",
        "Liste intervales[5]",
        "Liste intervales[6]",
        "Liste intervales[7]"
    ];

    const notesData = [
        "Liste notes[1]",
        "Liste notes[2]",
        "Liste notes[3]",
        "Liste notes[4]",
        "Liste notes[5]",
        "Liste notes[6]",
        "Liste notes[7]"
    ];

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
