//configuration contents get it from firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0bQU9QWhULk7qoQcaUSUyv37e81AWp8Q",
    authDomain: "realtimecolab.firebaseapp.com",
    projectId: "realtimecolab",
    storageBucket: "realtimecolab.appspot.com",
    messagingSenderId: "413588146364",
    appId: "1:413588146364:web:4963a181276b51730fa8b9"
};
//load this function after everything is intialised 
function loadFirebase() {
    // Check if Firebase app has already been initialized
    if (!firebase.apps.length) {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    // Function to set up the notepad functionality
    function initializeNotepad() {
        const notepadTextarea = document.getElementById('editor');

        // Reference to the database
        const database = firebase.database();

        // Listen for text changes
        notepadTextarea.addEventListener('input', (event) => {
            const newText = event.target.value;

            // Update the text in the Firebase database
            database.ref('notepad').set(newText);
        });

        // Listen for changes from other users
        database.ref('notepad').on('value', (snapshot) => {
            const remoteText = snapshot.val();
            notepadTextarea.value = remoteText;
            updateLineNumbers(); 
        });
    }
    // Call the initializeNotepad function
    initializeNotepad();
}
const editor = document.getElementById('editor');
const lineNumbers = document.getElementById('line-numbers');

function updateLineNumbers() {
const lines = editor.value.split('\n');
lineNumbers.innerHTML = '';

for (let i = 1; i <= lines.length; i++) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(''));
    lineNumbers.appendChild(li);
}
}
updateLineNumbers(); 
editor.addEventListener('input', updateLineNumbers);