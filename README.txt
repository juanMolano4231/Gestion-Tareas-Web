# Compilar desde root

// Para instalar dependencias de ts
npm install

// Automáticamente compila el proyecto y muestra errores
npx tsc --watch

# Correr server desde root

// No hace falta volver a correr el comando al hacer cambios al código
npx http-server . -o /src/html/index.html

# Para subir a pages

Quitar ../../dist de las rutas y dejarlas como /ts/
Meter ts dentro de html.