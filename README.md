#Generador de codigos QR

## Requisitos

Node.js

### Instalar dependencias

```
$ npm i
```

o

```
$ yarn
```

### Arrancar el proyecto

```
$ node server.js
```

### Crear un QR Personalizado

Abrimos un navegador con las opciones

```
http://localhost:3000/generate-qr?url=https://example.com&size=200&color=%230000FF&bgColor=%23FFFF00
```

### Crear un Codigo de Barras

Abrimos un navegador con las opciones

```
http://localhost:3000/generate-barcode?text=123456789012&width=2&height=100&format=code128
```


