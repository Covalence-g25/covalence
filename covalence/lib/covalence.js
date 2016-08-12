'use babel';

import CovalenceView from './covalence-view';
import {
    CompositeDisposable
} from 'atom';

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
                //We can add multiple functions in here for different options, ie start session, join session, etc.
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
        console.log('Covalence was toggled!');
        //put the functionality in here for now
        //Need to access and place all div elements with a class of "lines" into a var
        //with this we can send to database, consolelog, etc.
        return (
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        );
    }

};
