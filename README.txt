# Compilar desde root

// Para instalar dependencias de ts
npm install

// Automáticamente compila el proyecto y muestra errores
npx tsc --watch

# Correr server desde root

// No hace falta volver a correr el comando al hacer cambios al código
npx http-server ./dist -o

# Para subir a pages

build es dist, compilar ts manualmente o en pages.