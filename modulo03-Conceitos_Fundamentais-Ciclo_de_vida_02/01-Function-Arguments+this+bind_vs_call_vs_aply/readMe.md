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

```
