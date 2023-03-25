# Function: arguments, this, bind vs call vs apply

## Como trabalhar com aplicações que mantém estados entre instâncias.

----

### Criamos uma classe File com dois métodos:
```javascript
'use strict';

const { watch, promises: { readFile } } = require('fs');

  class File {
    watchFile(event, filename) {
      this.showContent(filename)
    }

    async showContent(filename) {
      console.log((await readFile(filename)).toString());
    }
  }

  const file = new File();
```

É de se acreditar que a função watch chamará a função showContent e imprimirá o conteúdo do arquivo no terminal. Entretanto:

```
    this.showContent(filename)
         ^

TypeError: this.showContent is not a function
```
O que ocorre é que ele ignora o this da classe File e herda o this do método watch. E como podemos fazer para que ele entenda que o this deve ser herdado da classe?
<br>
<br>
Uma das formas é passando uma arrow function passando os argumentos na chamada da função:
```javascript
  const file = new File();

  watch(__filename, (event, filename) => file.watchFile(event, filename));
```

** Porém, esse é um método 'feio' e até considerado uma má prática.
<br>
<br>
A maneira correta de fazer essa herança é usando o método bind, deixando explícito qual o contexto que a função deve seguir:
```javascript
  const file = new File();

  watch(__filename, file.watchFile.bind(file))
```
** O bind vai substituir o this de dentro da função watchFile para quando ela for chamada.

----
----
----
# Call & Apply
Na função call, criamos um dublê (assim como no sinon) para a função e passamos os argumentos que ela precisa (event, filename):
```javascript
  file.watchFile.call({ showContent: () => console.log('call: hey dude') }, null, __filename)

  //output::  call: hey dude
```
Na função apply, fazemos do mesmo jeito mas os argumentos são passados dentro de um array. É uma forma mais semântica de obter o mesmo efeito:
```javascript
  file.watchFile.apply({ showContent: () => console.log('apply: hey dude') }, [null, __filename])

  //output:: apply: hey dude
```
----
----
----
# Arguments
Mostra os argumentos utilizados dentro de uma função. <b>É uma má prática!</b>
```javascript
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

file.watchFile.call({ showContent: () => console.log('call: hey dude') }, null, __filename)


// output: 
// call: hey dude
// Arguments:  [Arguments] {
// '0': null,
// '1': './../../directory/directory/index.js'
// }
```
** Os argumentos são o event e o filename passados dentro de watchFile e por isso vieram null e um path.