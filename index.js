// Load existing entries from local storage and display them on page load
window.addEventListener('DOMContentLoaded', () => {
    loadEntries();
});

const addInput = () => {
    // Taking the input values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    let key = "user_" + email;
    // Storing in local storage in object form
    let myObj = {
        name: name,
        email: email
    };
    localStorage.setItem(key, JSON.stringify(myObj));

    // Append the new entry to the UI
    appendEntry(myObj, key);

    alert('Form data saved!');
};

const appendEntry = (entry, key) => {
    const entriesContainer = document.getElementById('entries-container');

    // Create a div element for the entry
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    // Create a paragraph element to display the entry details
    const entryDetails = document.createElement('p');
    entryDetails.textContent = `Name: ${entry.name}, Email: ${entry.email}`;

    // Create a delete button for the entry
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteEntry(key);
        entriesContainer.removeChild(entryDiv);
    });

    // Append the entry details and delete button to the entry div
    entryDiv.appendChild(entryDetails);
    entryDiv.appendChild(deleteButton);

    // Append the entry div to the entries container
    entriesContainer.appendChild(entryDiv);
};

const deleteEntry = (key) => {
    localStorage.removeItem(key);
};

const loadEntries = () => {
    const entriesContainer = document.getElementById('entries-container');

    // Clear existing entries
    entriesContainer.innerHTML = '';

    // Iterate over the local storage items
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // Skip the "UserDetails" key used for the form data
        if (key !== 'UserDetails') {
            let entry;
            try {
                entry = JSON.parse(localStorage.getItem(key));
            } catch (error) {
                console.error(`Error parsing entry with key "${key}": ${error}`);
                continue; // Skip this entry and move to the next one
            }
            appendEntry(entry, key);
        }
    }
};