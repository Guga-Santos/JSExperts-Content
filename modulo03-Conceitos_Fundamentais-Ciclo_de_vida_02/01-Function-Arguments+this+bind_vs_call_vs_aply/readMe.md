# Function: arguments, this, bind vs call vs apply

## Como trabalhar com aplicações que mantém estados entre instâncias.

----

### Criamos uma classe File com dois métodos:
```javascript
  class File {
    watch(event, filename) {
      this.showContent(filename)
    }

    async showContent() {
      console.log((await readFile(filename)).toString());
    }
  }
  
  const file = new File();
```