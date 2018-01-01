'use babel';

function boo(){
  console.log('boo')
  const file = atom.workspace.getActivePaneItem().buffer.file.path
  let osascriptCommand = `
tell application "ITerm2"
  activate
  tell current window
    create tab with default profile
    tell current session
      write text "vim ${file}"
    end tell
  end tell

end tell
  `
  osascriptCommand = 'osascript << END \n' + osascriptCommand + 'END'
  console.log(osascriptCommand)
  const exec = require('child_process').exec
  exec(osascriptCommand)
}
import { CompositeDisposable } from 'atom';

export default {

  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-open-in-vim:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  toggle() {
    boo()
    return null
  }

};
