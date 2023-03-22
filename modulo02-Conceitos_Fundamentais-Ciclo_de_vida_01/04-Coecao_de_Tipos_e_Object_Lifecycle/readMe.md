# Coerção de Tipos & Object LifeCycle

#### A coerção de tipos é um processo de conversão de valor para qualquer outro tipo. No javascript, qualquer tipo de dados está sujeito a coerção. Mas só há três tipos de conversão. Ou o tipo será String, ou Number ou Boolean. Existem dois tipos de coerção, a coerção implícita e a coerção explícita.
-----

### Coerção implícita:
- Coerção implícita é a que, geralmente, é feita através de operadores. Quando, por exemplo, tentamos somar um <i>number</i> com uma <i>string</i>. E esse tipo de coerção é uma grande causa de problemas em Javascript.
- Quando usamos o <i>loose equality operator</i> ( == ) ao invés do <i> strict equality operator </i> ( === ).

Aqui seguem exemplos de tabela contendo conversões implícitas e a diferença entre a utilização dos operadores:

### Loose equality operator:
<image src='./assets/loose.png'>
<br>

### Strict equality operator:
<image src='./assets/strict.png'>
<br>

### If Statement:
<image src='./assets/if.png'>

<i>fonte: https://dorey.github.io/JavaScript-Equality-Table </i>

Exemplos em código:
```javascript
  <INPUT>                  <OUTPUT>

  true + 2                  //  3
  true - 2                  // -1
  '21' + true               // '21true'
  '21' - true               // 20
  0.99999999999999999       // 1
  0.1 + 0.2                 // 0.30000000000000004
  0.1 + 0.2 === 0.3         // false
  3 > 2                     // true
  2 > 1                     // true
  3 > 2 > 1                 // false
  3 > 2 >= 1                // true
  '21' - - 1                // 22

  '1' == 1                  // true
  '1' === 1                 // false

  'B' + 'a' + + 'a' + 'a'   // 'BaNaNa'
```

Para mais exemplos bizarros: https://wtfjs.com

### Coerção explícita:
- Quando se expressa a intenção de converter entre tipos escrevendo o código apropriado. Como, por exemplo, chamando a função e passando o valor a ser convertido.
```javascript
  String(123)               // '123'
  Number('123')             //  123 
  ```
-----
-----
## Retornos de Operadores lógicos:
-----
### Operador | | :
```javascript
  if('user' || 1) {
    console.log('Cheguei aqui!');
  }

  // 'Cheguei aqui!'
```
** Quando alguma das duas condições forem true, o bloco irá imprimir <i>'Cheguei aqui!'</i>.

Entretando, o que é retornado desse argumento <b>( 'user' || 1 )</b> é o valor da expressão.
```javascript
  const abc = 'user' || 1;

  if (abc) {
    console.log(abc)
  }

  // 'user'
```
** Se as duas condições forem true, o | | sempre vai retornar o primeiro argumento.

<br>

### Operador && :

```javascript
  if('user' && 1) {
    console.log('Cheguei aqui!');
  }

  // 'Cheguei aqui!'
```
** Quando as duas condições forem true, o bloco irá imprimir <i>'Cheguei aqui!'</i>.

Entretando, o que é retornado desse argumento <b>( 'user' || 1 )</b> é o valor da expressão.
```javascript
  const abc = 'user' && 1;

  if (abc) {
    console.log(abc)
  }

  // 1
```
** Se as duas condições forem true, o && sempre vai retornar o último argumento.

O If é quem faz a coerção implícita após receber o valor.

