'use babel';

var currentRow = 0;
var newRow = 0;
var applyChange = true;

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
var config = {
    apiKey: "AIzaSyCh_DO86KwghVrvE5WyeZ0h0qK3bLIQxi8",
    authDomain: "covalence-6384b.firebaseapp.com",
    databaseURL: "https://covalence-6384b.firebaseio.com",
    storageBucket: "covalence-6384b.appspot.com",
};
firebase.initializeApp(config);

import CovalenceView from './covalence-view';
import {
    CompositeDisposable
} from 'atom';

var changedData = firebase.database().ref('projects');
changedData.on('value', function(pulledData) {
    atom.workspace.observeTextEditors(function(editor) {
        editor.setTextInBufferRange([
            [pulledData.val().rowToEdit, 0],
            [pulledData.val().rowToEdit, 0]
        ], pulledData.val().lineData);
        console.log(currentRow);
        console.log(newRow);
        applyChange = false;
        // currentRow = editor.setCursorBufferPosition([newRow, 0]);

        // editor.setText(pulledData.val().lineData)
    });
});

export default {

    covalenceView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.covalenceView = new CovalenceView(state.covalenceViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.covalenceView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'covalence:toggle': () => this.toggle()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.covalenceView.destroy();
    },

    serialize() {
        return {
            covalenceViewState: this.covalenceView.serialize()
        };
    },

    toggle() {
        var pageData;
        var lineData;
        // var currentRow = 0;
        // var newRow = 0;
        atom.workspace.observeTextEditors(function(editor) {
          currentRow = editor.getCursorBufferPosition().row;
          newRow = editor.getCursorBufferPosition().row;
          editor.onDidChange(function(){
            newRow = editor.getCursorBufferPosition().row;
            console.log(currentRow);
            console.log(newRow);
            if (newRow !== currentRow && applyChange === true) {
              lineData = editor.lineTextForBufferRow(currentRow);
              console.log(lineData);
              if (lineData) {
                sendData(lineData, currentRow);
                console.log(lineData);
                // currentRow = editor.getCursorBufferPosition().row;
              }
            }
          })

            // editor.onDidChange(function(){
            //   pageData = editor.getText();
            //   console.log(pageData);
            //   sendData(pageData)
            // })
        });

        function sendData(lineData, rowToEdit) {
            firebase.database.INTERNAL.forceWebSockets();
            console.log(lineData);
            console.log(rowToEdit);
            firebase.database().ref("projects").set({
                "lineData": lineData,
                "rowToEdit": rowToEdit
            });
        }
        // sendData(pageData);
    }

};
