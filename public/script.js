// Función para enviar la actualización del evento al servidor
function actualizarEvento(event) {
    var eventData = {
        id: event.id,
        title: event.title,
        start: event.startStr,
        end: event.endStr
    };

    fetch('/events/' + event.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el evento.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Evento actualizado correctamente:', data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}

        
        document.addEventListener('DOMContentLoaded', function() 
        {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, 
            {
                locale: 'es', // Establecer el idioma a español
                headerToolbar: {
                left: '', // Eliminamos los botones prev y next del calendario
                center: '',
                right: ''
                },
                initialView: 'dayGridMonth',
                events: '../events.json', // Ruta al archivo JSON que contiene los eventos
                editable: true, // Habilitar la edición de eventos en el calendario
                selectable: true, // Habilitar la selección de fechas para agregar eventos
                
                // Manejar el evento de selección de fechas
                select: function(info) 
                { 
                    
                    var title = prompt('Ingrese el título del evento:');
                    if (title) 
                    {
                        var eventData = {
                        title: title,
                        start: info.startStr,
                        end: info.endStr
                        };
                        // Función para enviar el evento al servidor
                        function guardarEvento(eventData) {
                            //Enviamos Los eventos al servidor
                            fetch
                            ('/events', 
                                {
                                    method: 'POST',
                                    headers:{'Content-Type': 'application/json'},
                                    body: JSON.stringify(eventData)
                                }
                            )
                        
                            .then
                            (response =>
                                {
                                    if (!response.ok) 
                                    {
                                        throw new Error('Error al agregar el evento.');
                                    }
                                    return response.json();
                                }
                            )
                            .then(data => {console.log('Evento agregado correctamente:', data);})
                            .catch(error => { console.error('Error:', error.message);});
                        }
                        calendar.addEvent(eventData); // Agregar el evento al calendario
                        guardarEvento(eventData); // Enviar el evento al servidor para guardarlo en el JSON
                    }
                },

                eventClick: function(info) {
                    // Obtener el evento seleccionado
                    var event = info.event;
            
                    // Pedir al usuario que ingrese el nuevo título del evento
                    var newTitle = prompt('Ingrese el nuevo título del evento:', event.title);
            
                    // Actualizar el título del evento si el usuario proporciona un valor
                    if (newTitle !== null) {
                        event.setProp('title', newTitle);
                        // Guardar el evento actualizado en el servidor
                        actualizarEvento(event);
                    }
                }
                
            });
        
            fetch('/events')
            .then(response => response.json())
            .then(eventos => {
                eventos.forEach(evento => {
                    if (!evento.id) {
                        evento.id = uuidv4(); // Asignar un id si no lo tiene
                    }
                    calendar.addEvent(evento);
                });
            })
            .catch(error => console.error('Error al cargar eventos desde JSON:', error));

            calendar.render();
        
            // Obtener el nombre del mes y año actual
            var currentMonthYear = calendar.view.title;

            // Mostrar el nombre del mes y año en un div separado
            document.getElementById('monthYear').innerText = currentMonthYear;
        
            // Función para cambiar al mes anterior
            function gotoPreviousMonth() {
                calendar.prev();
                // Obtener el nombre del mes y año actual
                var currentMonthYear = calendar.view.title;
                // Mostrar el nombre del mes y año en un div separado
                document.getElementById('monthYear').innerText = currentMonthYear;
            }

        // Función para cambiar al siguiente mes
            function gotoNextMonth() {
                calendar.next();
                // Obtener el nombre del mes y año actual
                var currentMonthYear = calendar.view.title;
                // Mostrar el nombre del mes y año en un div separado
                document.getElementById('monthYear').innerText = currentMonthYear;
            }

            // Agregar eventos click a los botones prev y next
            document.getElementById('btnAnt').addEventListener('click', gotoPreviousMonth);
            document.getElementById('btnSig').addEventListener('click', gotoNextMonth);
        });

        document.addEventListener('DOMContentLoaded', function() {
        // Hacer una solicitud al servidor para obtener los eventos
        
        });

    // Función para enviar el evento al servidor para guardarlo
    function guardarEvento(eventData) {
        fetch('/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el evento.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Evento agregado correctamente:', data);
            eventData.id = data.event.id; // Asignar el ID devuelto por el servidor
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }

    // Función para enviar la actualización del evento al servidor
    function actualizarEvento(event) {
        var eventData = {
            id: event.id,
            title: event.title,
            start: event.startStr,
            end: event.endStr
        };

        fetch('/events/' + event.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el evento.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Evento actualizado correctamente:', data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }