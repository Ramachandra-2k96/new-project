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

    // Set up a listener for changes in the editor content
    editorRef.on('value', (snapshot) => {
        const content = snapshot.val();
        // Disable editor change events to prevent an infinite loop
        editor.off('change', onEditorChange);
        if (content !== editor.getValue()) {
            // Update editor only if content has changed
            editor.setValue(content);
            // Set the selection range to the end of the document
            editor.gotoLine(editor.session.getLength(), editor.session.getLine(editor.session.getLength() - 1).length);
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