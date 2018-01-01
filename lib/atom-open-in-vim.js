'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-open-in-vim:toggle': () => this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-open-in-vim:winonly': () => this.winOnly()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  winOnly() {
      const currentPane = atom.workspace.getActivePane()
      const panes = atom.workspace.getPanes()
      debugger
      for(pane of panes) {
          if(pane !== currentPane && pane.close){
              pane.close()
          }
      }

  },
  toggle() {
    const file = atom.workspace.getActivePaneItem().buffer.file.path
    let osascriptCommand = `
        osascript << END
            tell application "ITerm2"
                activate
                tell current session of current window
                    write text ":e ${file}"
                end tell
            end tell
        END
    `
    require('child_process').exec(osascriptCommand)
  }

};
