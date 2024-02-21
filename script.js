let editor;

window.onload = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.session.setMode("ace/mode/python");
    loadFirebase();
}

//configuration contents get it from firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0bQU9QWhULk7qoQcaUSUyv37e81AWp8Q",
    authDomain: "realtimecolab.firebaseapp.com",
    projectId: "realtimecolab",
    storageBucket: "realtimecolab.appspot.com",
    messagingSenderId: "413588146364",
    appId: "1:413588146364:web:4963a181276b51730fa8b9"
};
function loadFirebase() {
    // Check if Firebase app has already been initialized
    if (!firebase.apps.length) {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();
    const editorRef = database.ref('editor');
    const editor = ace.edit('editor'); // Replace 'yourEditorElementId' with the actual ID of your Ace editor element

    // Set up a listener for changes in the editor content
    editorRef.on('value', (snapshot) => {
        const content = snapshot.val();
        // Disable editor change events to prevent an infinite loop
        editor.off('change', onEditorChange);
        if (content !== editor.getValue()) {
            // Get the current cursor position
            const cursorPosition = editor.getCursorPosition();
            // Update editor only if content has changed
            editor.setValue(content);
            // Set the selection range to the cursor position or the end of the document
            editor.gotoLine(cursorPosition.row + 1, cursorPosition.column);
        }
        // Re-enable editor change events
        editor.on('change', onEditorChange);
    });

    // Set up a listener for changes in the editor and update the database
    function onEditorChange(delta) {
        const currentContent = editor.getValue();
        editorRef.set(currentContent);
    }
    editor.on('change', onEditorChange);
}
function changeLanguage()
{
    var selectedLanguage = document.getElementById("languages").value;
    switch (selectedLanguage) {
        case "java":
            alert("You selected JAVA!");
            editor.session.setMode("ace/mode/java");
            break;
        case "python":
            alert("You selected Python!");
            editor.session.setMode("ace/mode/python");
            break;
        default:
            break;
    }
}
