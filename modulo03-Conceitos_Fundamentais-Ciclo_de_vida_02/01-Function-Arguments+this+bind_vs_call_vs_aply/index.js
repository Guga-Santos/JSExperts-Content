'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
  watchFile(event, filename) {
    this.showContent(filename)
    console.log('Arguments: ', arguments)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();

// watch(__filename, file.watchFile.bind(file))
// watch(__filename, (event, filename) => file.watchFile(event, filename));

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString());
// })

file.watchFile.call({ showContent: () => console.log('call: hey dude') }, null, __filename)
// file.watchFile.apply({ showContent: () => console.log('apply: hey dude') }, [null, __filename])

