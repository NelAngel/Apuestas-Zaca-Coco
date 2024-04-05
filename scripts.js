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

// Agregar evento de clic al botón "Jugar" para activar la animación de mezcla en las cartas dentro del contenedor .center
jugarBtn.addEventListener('click', function() {
    // Después de un pequeño retraso, activar la animación de mezcla en las cartas dentro del contenedor .center
    setTimeout(shuffleCenterCards, 100);
});
