// Edit icon image credit: https://commons.wikimedia.org/wiki/File:Edit_icon_(the_Noun_Project_30184).svg
// Trash icon image credit: https://www.iconfinder.com/icons/115789/trash_icon

// Set variables
let button = document.getElementById("submitBtn");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let email = document.getElementById("email");
let level = document.getElementById("level");
let table = document.getElementById("table");
let clear = document.getElementById("clear");
let sort = document.getElementById("sort");
let inputFile = document.getElementById("file");

// Set size for edit/trash icons
var iconSize = '18px';

// Editing: True if currently editing table, False otherwise
let editing = false;
let currRow = null;

// Add event listeners
button.addEventListener("click", addStudent);
fName.addEventListener("click", newEntry);
lName.addEventListener("click", newEntry);
email.addEventListener("click", newEntry);
level.addEventListener("click", newEntry);
clear.addEventListener("click", deleteTable);
inputFile.addEventListener("change", readFile);

// Click "+" button: add new student and change button appearance
function addStudent() {
    
    // Validate input
    // Alert for any error
    if (validateInput() == true) {
        window.alert("Please fix red field(s).")
        return;
    }

    // Change button appearance
    button.style.color = "white";
    button.style.backgroundColor ="#4a4a4a";
    // Change "+"" to check mark
    button.textContent =  "\u2713";
    button.style.fontWeight = "normal";
    button.style.fontSize = iconSize;

    // Update table
    // If editing row, only change selected row
    if (editing == true) {
        editTable();
        editing = false;
    // Otherwise add a new row
    } else {
        addRow();
    }

    // Reset input value
    fName.value = "";
    lName.value = "";
    email.value = "";

    // Reset select input to default 
    sort.selectedIndex = 0;
    level.selectedIndex = 0;
}

// New entry: resets button appearance
// Occurs when user clicks any of the input values on the form
function newEntry() {
    button.style.color = "#4a4a4a";
    button.style.backgroundColor = "white";
    button.textContent = "+";
    button.style.fontWeight = "bold";
    button.style.fontSize = "20px";
}

// Add new row in table with user input
function addRow() {
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    // Fill table cells with user input
    cell1.textContent = fName.value;
    cell2.textContent = lName.value;
    cell3.textContent = email.value;
    addLevel(cell4);
 
    // Add edit icon to row
    var edit = document.createElement('img');
    edit.src = "./img/edit.png";
    edit.style.width = iconSize;
    edit.style.height = iconSize;
    edit.style.padding = '0px 5px';
    edit.addEventListener("click", editEntry);
    cell5.appendChild(edit);
    cell5.style.textAlign = "center";

    // Add trash icon to row
    var trash = document.createElement('img');
    trash.src = "./img/trash.png";
    trash.style.width = iconSize;
    trash.style.height = iconSize;
    trash.style.padding = '0px 5px';
    trash.addEventListener("click", deleteEntry);
    cell5.appendChild(trash);
}

// Add Level input to row 
function addLevel(cell) {
    var grade = document.createElement("p");
    grade.textContent = level.value;
    cell.appendChild(grade);

    // Add color to level
    grade.classList.add("grade");
    switch(level.value) {
        case 'Freshman':
            // Color: Green
            grade.classList.add("freshman");
            break;
        case 'Sophomore':
            // Color: Orange
            grade.classList.add("sophomore");
            break;
        case "Junior":
            // Color: Purple
            grade.classList.add("junior");
            break;
            // Color: Blue
        case "Senior":
            grade.classList.add("senior");
            break;
        default:
            break;
    }
}

// Delete row if trash icon is clicked
function deleteEntry() {
    var index = this.parentNode.parentNode.rowIndex;
    table.deleteRow(index);
}

// Edit button clicked
// Fill form with values from the row being edited
function editEntry() {
    row = this.parentNode.parentNode;
    document.getElementById("fName").value = row.cells[0].textContent;
    document.getElementById("lName").value = row.cells[1].textContent;
    document.getElementById("email").value = row.cells[2].textContent;
    document.getElementById("level").value = row.cells[3].textContent;
    
    // Color selected row
    if (currRow != row && currRow != null) {
        currRow.style.backgroundColor = "white";
    }
    row.style.backgroundColor = '#f6f6f3';

    currRow = row;
    editing = true;

    // Reset appearance of '+' button
    newEntry();
}

// Enter edited input into selected row
function editTable() {
    table.rows[row.rowIndex].cells[0].textContent = fName.value;
    table.rows[row.rowIndex].cells[1].textContent = lName.value;
    table.rows[row.rowIndex].cells[2].textContent = email.value;
    table.rows[row.rowIndex].cells[3].textContent = "";
    addLevel(table.rows[row.rowIndex].cells[3]);
    row.style.backgroundColor = "white";
}

// Validate input
// Checks if fields are missing or invalid format
// Error: outline input field(s) in red
function validateInput() {
    var error = true;
    
    var validFirst = checkFirstName();
    var validLast = checkLastName();
    var validEmail = checkEmail(); 

    if (validFirst && validLast && validEmail) {
        error = false;
    }

    return error;
}

// Check if first name input is empty
function checkFirstName() {
    if (fName.value == "") {
        fName.classList.add("error");
        return false;
    } else {
        fName.classList.remove("error");
        return true;
    }
}

// Check if last name input is empty
function checkLastName() {
    if (lName.value == "") {
        lName.classList.add("error");
        return false;
    } else {
        lName.classList.remove("error");
        return true;
    }
}

// Validate email format 
function checkEmail() {
    // Check if email is in format string@string.string
    var format = /\S+@\S+\.\S+/;
    correctFormat = format.test(email.value);
    if (!correctFormat) {
        window.alert("Invalid email format");
    }
    
    noDuplicate = true;
    var rows = table.rows;

    // If email is already in table, show error
    for (ind = 1; ind < rows.length; ind++) {
        if (rows[ind].getElementsByTagName("TD")[2].textContent == email.value && !editing) {
            noDuplicate = false;
            window.alert("Duplicate entry: Already added student with that email");
        }
    }

    // Check if email input is empty, in correct format, and is not a duplicate
    if (email.value != "" && correctFormat && noDuplicate) {
        // Get rid of red outline if there is no error
        email.classList.remove("error");
        return true;
    } 
    else {
        // Outline email input box in red
        email.classList.add("error");
        return false;
    }
}

// Delete all entries in the table
function deleteTable() {
    for(var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

// Read input file line by line
function readFile() {
    var file = inputFile.files[0];
    var reader = new FileReader();

    // Add each line into array
    reader.onload = function(progressEvent){    
        var lines = this.result.split(/\r\n|\n/);
        for (ind = 0; ind < lines.length; ind++){
            // Split the values at commas
            var info = lines[ind].split(",");

            // Add entry with values from file
            fName.value = info[0].replace(/\s+/g, '');
            lName.value = info[1].replace(/\s+/g, '');
            email.value = info[2].replace(/\s+/g, '');
            level.value = info[3].replace(/\s+/g, '');
            addRow(); 
        }
    }
    reader.readAsText(file);
}

// User chooses which header to sort the table by
function sortOption() {
    var selected = document.getElementById("sort").value;
    var labels = ["firstName", "lastName", "email", "level"];
    sortTableByCol(labels.indexOf(selected));
}

// Sort Table
// col: selected column to sort
function sortTableByCol(col) {
    var swap;
    var rows = table.rows;
    var sorting = true;

    // Keep sorting column while 'sorting' is true
    while (sorting) {
        sorting = false;
        // Loop through rows 
        for (ind = 1; ind < (rows.length - 1); ind++) {
            swap = false;
        
            // Compare current row's content with next row's content
            // If the current cell is greater than the next, we will need to swap the rows
            var curr = rows[ind].getElementsByTagName("TD")[col];
            var next = rows[ind + 1].getElementsByTagName("TD")[col];
            if (curr.textContent.toLowerCase() > next.textContent.toLowerCase()) {
                swap = true;
                break;
            }
        } 
        // Swap rows
        if (swap) {
            rows[ind].parentNode.insertBefore(rows[ind + 1], rows[ind]);
            sorting = true;
        }
    }
}
