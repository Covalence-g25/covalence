'use babel';

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
    console.log(pulledData.val().pageData);
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
        console.log('Covalence was toggled!');
        atom.workspace.observeTextEditors(function(editor) {
            pageData = editor.getText();
        });

        function sendData(pageData) {
            firebase.database.INTERNAL.forceWebSockets();
            console.log('rawr');
            firebase.database().ref("projects").set({
                "pageData": pageData
            });
        }



        sendData(pageData);

    }

};
