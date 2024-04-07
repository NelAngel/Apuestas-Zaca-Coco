function updateDataTable(name, amount, premio) {
    const dataTable = document.getElementById("data-table").getElementsByTagName('tbody')[0];

    // Verificar si ya existe una fila para el jugador
    const existingRow = Array.from(dataTable.children).find(row => row.cells[0].textContent === name);
    if (existingRow) {
        // Si la fila ya existe, actualizar los datos en lugar de insertar una nueva fila
        existingRow.cells[1].textContent = amount + " Soles"; // Agregar "Soles" al monto
        existingRow.cells[2].textContent = premio;
        existingRow.cells[3].textContent = ''; // Limpia la celda "Falta Cancelar"
        existingRow.cells[4].textContent = ''; // Limpia la celda "Cancelado"
    } else {
        // Si no existe, crear una nueva fila
        const newRow = dataTable.insertRow();
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = amount + " Soles"; // Agregar "Soles" al monto
        newRow.insertCell(2).textContent = premio;
        newRow.insertCell(3).textContent = ''; // Limpia la celda "Falta Cancelar"
        newRow.insertCell(4).textContent = ''; // Limpia la celda "Cancelado"
    }
}

// Modificar el evento de envío del formulario para llamar a la función updateDataTable con los datos del jugador
betForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar envío del formulario

    const name = document.getElementById("name").value.trim();
    const amount = document.getElementById("amount").value.trim();

    // Validar que se hayan ingresado datos
    if (name === "" || amount === "") {
        mostrarMensaje("Por favor, complete todos los campos.");
        return;
    }

    // Llamar a la función updateDataTable para agregar los datos del jugador a la tabla
    updateDataTable(name, amount);

    // Mostrar mensaje de éxito
    mostrarMensaje("Datos guardados correctamente.");

    // Restablecer la variable premioMostrado a false para permitir la selección de premio nuevamente
    premioMostrado = false;

    // Activar botón de jugar
    jugarBtn.disabled = false;
});

// Obtener todas las cartas
const centerCards = document.querySelectorAll('.center .card.naipes');

// Función para activar la animación de mezcla en las cartas dentro del contenedor .center
function shuffleCenterCards() {
    centerCards.forEach(card => {
        // Eliminar temporalmente la clase que desencadena la animación
        card.classList.remove('shuffling');

        // Forzar el reflow (volver a cargar el estilo) para aplicar la eliminación de la clase
        void card.offsetWidth;

        // Volver a agregar la clase después de un breve retraso
        setTimeout(() => {
            card.classList.add('shuffling');
        }, 100);
    });
}

// Función para mostrar el mensaje de elección de carta en el centro de la pantalla
function mostrarMensajeElección() {
    // Crear un div para el mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "¡Elige una carta Causa!";
    mensajeDiv.style.position = 'fixed';
    mensajeDiv.style.top = '50%';
    mensajeDiv.style.left = '50%';
    mensajeDiv.style.transform = 'translate(-50%, -50%)';
    mensajeDiv.style.backgroundColor = '#ffd700'; // Color de fondo amarillo dorado
    mensajeDiv.style.color = '#ffffff'; // Texto blanco
    mensajeDiv.style.padding = '30px'; // Aumentar el relleno
    mensajeDiv.style.border = '4px solid #000000'; // Borde grueso negro
    mensajeDiv.style.borderRadius = '10px'; // Bordes redondeados
    mensajeDiv.style.fontSize = '24px'; // Tamaño del texto grande
    mensajeDiv.style.fontWeight = 'bold'; // Texto en negrita
    mensajeDiv.style.textAlign = 'center'; // Alineación del texto al centro
    mensajeDiv.style.zIndex = '9999';
    
    // Agregar el mensaje al body del documento
    document.body.appendChild(mensajeDiv);

    // Programar la eliminación del mensaje después de 3 segundos
    setTimeout(function() {
        mensajeDiv.remove(); // Eliminar el mensaje
        habilitarSeleccionCarta(); // Habilitar la selección de carta después de que desaparezca el mensaje
    }, 3000);
}

// Definir los premios de las cartas
const premios = [
    {id: 1, nombre: "Perdiste"},
    {id: 2, nombre: "Perdiste"},
    {id: 3, nombre: "Perdiste"},
    {id: 4, nombre: "Perdiste"},
    {id: 5, nombre: "Perdiste"},
    {id: 6, nombre: "Perdiste"},
    {id: 7, nombre: "Perdiste"},
    {id: 8, nombre: "Devolver"},
    {id: 9, nombre: "Devolver"},
    {id: 10, nombre: "Devolver"},
    {id: 11, nombre: "Devolver"},
    {id: 12, nombre: "Recarga de 5 lucas"},
    {id: 13, nombre: "1 + sol"},
    {id: 14, nombre: "1 + sol"},
    {id: 15, nombre: "1 + sol"},
    {id: 16, nombre: "Premio doble"}
];


// Función para mostrar el premio de la carta seleccionada
function mostrarEfectoSeleccionado() {
    if (!premioMostrado) {
        const premioIndex = Math.floor(Math.random() * premios.length);
        const premioSeleccionado = premios[premioIndex].nombre;
        
        // Mostrar el mensaje de premio en el centro de la pantalla
        mostrarMensajePremio(premioSeleccionado);
        
        const nombreJugador = document.getElementById("name").value.trim();
        const montoApostado = document.getElementById("amount").value.trim();
        
        updateDataTable(nombreJugador, montoApostado, premioSeleccionado);
        
        premioMostrado = true;
    }
}

let premioMostrado = false;

// Función para habilitar la selección de carta
function habilitarSeleccionCarta() {
    const cartas = document.querySelectorAll('.card.naipes');
    cartas.forEach(carta => {
        carta.addEventListener('click', function() {
            if (!premioMostrado) { // Verificar si el premio aún no se ha mostrado
                seleccionarCarta(carta);
            }
        }, { once: true });
    });
}
// Función para manejar la selección de carta
function seleccionarCarta(carta) {
    console.log("Carta seleccionada");
    mostrarEfectoSeleccionado();
}

// Agregar evento de clic al botón "Jugar" para activar la animación de mezcla en las cartas dentro del contenedor .center
jugarBtn.addEventListener('click', function() {
    // Después de un pequeño retraso, activar la animación de mezcla en las cartas dentro del contenedor .center
    setTimeout(shuffleCenterCards, 100);

    // Después de completar la animación de mezcla y movimiento de las cartas, mostrar el mensaje de elección
    setTimeout(mostrarMensajeElección, 6000); // Ajusta el tiempo según la duración de tu animación
});

function mostrarMensajePremio(premio) {
    // Crear un div para el mensaje de premio
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "¡Causa : " + premio + "!";
    mensajeDiv.style.position = 'fixed';
    mensajeDiv.style.top = '50%';
    mensajeDiv.style.left = '50%';
    mensajeDiv.style.transform = 'translate(-50%, -50%)';
    mensajeDiv.style.backgroundColor = '#48b300'; // Color de fondo amarillo dorado
    mensajeDiv.style.color = '#ffffff'; // Texto blanco
    mensajeDiv.style.padding = '30px'; // Aumentar el relleno
    mensajeDiv.style.border = '4px solid #000000'; // Borde grueso negro
    mensajeDiv.style.borderRadius = '10px'; // Bordes redondeados
    mensajeDiv.style.fontSize = '24px'; // Tamaño del texto grande
    mensajeDiv.style.fontWeight = 'bold'; // Texto en negrita
    mensajeDiv.style.textAlign = 'center'; // Alineación del texto al centro
    mensajeDiv.style.zIndex = '9999';
    
    // Agregar el mensaje al body del documento
    document.body.appendChild(mensajeDiv);

    // Programar la eliminación del mensaje después de 3 segundos
    setTimeout(function() {
        mensajeDiv.remove(); // Eliminar el mensaje
        habilitarSeleccionCarta(); // Habilitar la selección de carta después de que desaparezca el mensaje
    }, 2000);
}

// Función para mostrar mensajes en el centro de la pantalla
function mostrarMensaje(mensaje) {
    // Crear un div para el mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.position = 'fixed';
    mensajeDiv.style.top = '50%';
    mensajeDiv.style.left = '50%';
    mensajeDiv.style.transform = 'translate(-50%, -50%)';
    mensajeDiv.style.backgroundColor = '#48b300'; // Color de fondo amarillo dorado
    mensajeDiv.style.color = '#ffffff'; // Texto blanco
    mensajeDiv.style.padding = '30px'; // Aumentar el relleno
    mensajeDiv.style.border = '4px solid #000000'; // Borde grueso negro
    mensajeDiv.style.borderRadius = '10px'; // Bordes redondeados
    mensajeDiv.style.fontSize = '24px'; // Tamaño del texto grande
    mensajeDiv.style.fontWeight = 'bold'; // Texto en negrita
    mensajeDiv.style.textAlign = 'center'; // Alineación del texto al centro
    mensajeDiv.style.zIndex = '9999';
    
    // Agregar el mensaje al body del documento
    document.body.appendChild(mensajeDiv);

    // Programar la eliminación del mensaje después de 3 segundos
    setTimeout(function() {
        mensajeDiv.remove(); // Eliminar el mensaje
        habilitarSeleccionCarta(); // Habilitar la selección de carta después de que desaparezca el mensaje
    }, 3000);
}
