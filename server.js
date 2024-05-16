const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Importar uuid

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname+'/public/style'));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo calendario.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/calendario.html'));
});


// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar JSON
app.use(express.json());

// Ruta para servir el archivo calendario.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/calendario.html'));
});

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ruta para servir el archivo calendario.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/calendario.html'));
});

// Ruta al archivo JSON de eventos
const eventsFilePath = path.join(__dirname, 'events.json');

// Ruta para manejar la solicitud POST para agregar un evento
app.post('/events', (req, res) => {
    const nuevoEvento = req.body;
    nuevoEvento.id = uuidv4(); // Asignar un identificador único al evento

    let eventos = leerEventos();
    eventos.push(nuevoEvento);
    escribirEventos(eventos);

    res.status(201).json({ message: 'Evento agregado correctamente', event: nuevoEvento });
});

// Ruta para manejar las solicitudes PUT para actualizar un evento específico
app.put('/events/:id', (req, res) => {
    const eventId = req.params.id;
    const updatedEvent = req.body;

    let eventos = leerEventos();
    const eventIndex = eventos.findIndex(evento => evento.id === eventId);

    if (eventIndex !== -1) {
        eventos[eventIndex] = { ...eventos[eventIndex], ...updatedEvent };
        escribirEventos(eventos);
        res.status(200).json({ message: 'Evento actualizado correctamente' });
    } else {
        res.status(404).json({ message: 'Evento no encontrado' });
    }
});

// Ruta para manejar las solicitudes GET para obtener eventos
app.get('/events', (req, res) => {
    const eventos = leerEventos();
    res.json(eventos);
});

// Función para leer eventos desde el archivo JSON
function leerEventos() {
    try {
        const eventos = fs.readFileSync(eventsFilePath);
        return JSON.parse(eventos);
    } catch (error) {
        console.error('Error al leer eventos:', error);
        return [];
    }
}

// Función para escribir eventos en el archivo JSON
function escribirEventos(eventos) {
    try {
        fs.writeFileSync(eventsFilePath, JSON.stringify(eventos, null, 2));
        console.log('Eventos escritos en el archivo JSON.');
    } catch (error) {
        console.error('Error al escribir eventos:', error);
    }
}

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Node.js iniciado en el puerto ${PORT}`);
});

