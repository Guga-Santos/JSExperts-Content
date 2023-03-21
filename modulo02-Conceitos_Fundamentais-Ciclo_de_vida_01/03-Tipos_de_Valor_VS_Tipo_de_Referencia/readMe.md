# Valores de Tipos Vs Valores de Referência

#### Quando usamos tipos primitivos como valor de uma variável, é criado um endereço na stack para armazenar a variável e esta aponta para um valor (que também foi armazenado na memória). Entretanto, esse valor é imutável pois é um tipo primitivo.
<br>

```javascript
  let counter = 0
  let counter2 = counter

  counter += 1

  console.log(counter) // 1
  console.log(counter2) // 0
```

#### Por outro lado, quando usamos estruturas de dados como arrays e objetos, criamos um endereço da memória que aponta para um endereço na memory heap (que é outro tipo de pilha) e esse endereço aponta para um valor (que pode ser modificado, pois é uma outra organização de pilha). Esses valores, são mutáveis.
<br>

```javascript
  const items = { counter: 0}
  const items2 = item

  item2.counter += 1

  console.log(items)  // { counter: 1 }
  console.log(items2) // { counter: 1 }

  items.counter += 1

  console.log(items)  // { counter: 2 }
  console.log(items2) // { counter: 2 }
```

---
## Diagrama
----

<image src="./CallStack.png"/>

Explicação imutável:
- O <i>counter</i> criou o endereço A000001x que apontava para o valor 0.
- O <i>counter2</i> apontou para o endereço A000001x.
- O <i>counter</i> apontou para outro endereço A000003x criado que recebeu o valor 1.

Explicação mutável:
- O <i>item</i> criou o endereço A000004x que recebeu como valor B000001x.
- B000001x era uma referência à o endereço B000001x na Memory Heap que apontava para o valor {}.
- o <i>item2</i> criou o endereço A000005x que recebeu como valor B000001x.
- B000001x era uma referência à o endereço B000001x na Memory Heap que apontava para o valor {}.
  

---
### Link útil:
- <a>https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0</a>
---