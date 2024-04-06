// Función para actualizar la tabla de datos
function updateDataTable(name, amount) {
    const dataTable = document.getElementById("data-table").getElementsByTagName('tbody')[0];
    
    // Crear una nueva fila
    const newRow = dataTable.insertRow();

    // Insertar celdas con los datos del jugador
    const nameCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const seDebeCell = newRow.insertCell(2);
    const faltaCancelarCell = newRow.insertCell(3);
    const canceladoCell = newRow.insertCell(4);

    // Añadir los datos del jugador a las celdas
    nameCell.innerHTML = name;
    amountCell.innerHTML = amount;
    // Aquí podrías definir la lógica para las otras celdas (seDebe, faltaCancelar, cancelado)
}

// Modificar el evento de envío del formulario para llamar a la función updateDataTable con los datos del jugador
const betForm = document.getElementById("betForm");
const jugarBtn = document.getElementById("jugarBtn");

betForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar envío del formulario

    const name = document.getElementById("name").value.trim();
    const amount = document.getElementById("amount").value.trim();

    // Validar que se hayan ingresado datos
    if (name === "" || amount === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Llamar a la función updateDataTable para agregar los datos del jugador a la tabla
    updateDataTable(name, amount);

    // Mostrar mensaje de éxito
    alert("Datos guardados correctamente.");

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
    mensajeDiv.textContent = "¡Elige una carta para revelar su efecto!";
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
    {id: 1, nombre: "Recarguitas de 5 lucas al operador que tu quieras."},
    {id: 2, nombre: "Puedes ganarte una luca."},
    {id: 3, nombre: "El doble que apostaste."},
    {id: 4, nombre: "Devolver lo que apostaste."},
    {id: 5, nombre: "Perdiste Pe causa Gaaaa."}
];

// Función para mostrar el premio de la carta seleccionada
function mostrarEfectoSeleccionado() {
    // Obtener un índice aleatorio dentro del rango de premios
    const premioIndex = Math.floor(Math.random() * premios.length);
    
    // Obtener el premio correspondiente al índice aleatorio
    const premioSeleccionado = premios[premioIndex].nombre;

    // Mostrar el premio seleccionado al jugador
    alert("Has ganado: " + premioSeleccionado);
}

// Función para habilitar la selección de carta
function habilitarSeleccionCarta() {
    const cartas = document.querySelectorAll('.card.naipes');
    cartas.forEach(carta => {
        carta.addEventListener('click', function() {
            seleccionarCarta(carta);
        });
    });
}

// Función para manejar la selección de carta
function seleccionarCarta(carta) {
    carta.removeEventListener('click', function() {
        seleccionarCarta(carta);
    });
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
