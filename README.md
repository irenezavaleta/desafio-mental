# Desafío Mental — prototipo frontend 0.1

Este proyecto conserva el flujo visual del prototipo: inicio, creación de sala, unión por código, sala de espera, preguntas y clasificación con copa.

## Requisitos
- Node.js LTS (incluye npm)
- Visual Studio Code (recomendado)

## Ejecutar en local
1. Abre una terminal en la carpeta `frontend`.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev`.
4. Abre en el navegador la dirección local que muestra Vite (normalmente `http://localhost:5173`).

## Estado y límites
- La interfaz y navegación funcionan localmente.
- Las preguntas de esta versión son una demostración local; el cronómetro se muestra como referencia y todavía no cuenta regresivamente.
- El código de sala se genera localmente; copiarlo no conecta a otros dispositivos.
- Los jugadores y la clasificación secundaria son datos de demostración.
- La siguiente etapa técnica es crear el backend Node.js + Socket.IO, validar respuestas en el servidor y sincronizar cronómetro, salas y puntuaciones.
