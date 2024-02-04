
let abrirModal = document.querySelector('[data-id="abrir1"]'); // Seleccionamos el boton que abre el modal
let cerrarModal = document.querySelector('[data-id="cerrar1"]'); // Seleccionamos el boton que cierra el modal
let modal = document.querySelector('[data-id="modal1"]'); // Seleccionamos el modal

abrirModal.addEventListener('click', () => {
    var ahora = new Date();
    var fechaHora = ahora.toISOString().substring(0, 19);
    document.getElementById('exampleInputTiempo1').value = fechaHora;
  modal.showModal();
});

cerrarModal.addEventListener('click', () => {
    modal.close();
});


let abrirModal2 = document.querySelector('[data-id="abrir2"]'); // Seleccionamos el boton que abre el modal
let cerrarModal2 = document.querySelector('[data-id="cerrar2"]'); // Seleccionamos el boton que cierra el modal
let modal2 = document.querySelector('[data-id="modal2"]'); // Seleccionamos el modal

abrirModal2.addEventListener('click', () => {
  modal2.showModal();
});

cerrarModal2.addEventListener('click', () => {
  modal2.close();
});
const APARCAMIENTO_DATA = [
    { planta: '1', numero: 1, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 2, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 3, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 4, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 5, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 6, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 7, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 8, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 9, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 10, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 11, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 12, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 13, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 14, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 15, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 16, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 17, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 18, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 19, disponible: true, precio_hora: 0.25 },
    { planta: '1', numero: 20, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 21, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 22, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 23, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 24, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 25, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 26, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 27, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 28, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 29, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 30, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 31, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 32, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 33, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 34, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 35, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 36, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 37, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 38, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 39, disponible: true, precio_hora: 0.25 },
    { planta: '2', numero: 40, disponible: true, precio_hora: 0.25 },
]
// Ejemplo de APARCAMIENTO_DATA

function pintarParking() {
    APARCAMIENTO_DATA.forEach(espacio => {
        let idEspacio = 'p' + espacio.numero; // Construir el ID, por ejemplo 'p1', 'p2', etc.
        let elementoEspacio = document.getElementById(idEspacio); // Obtener el elemento del DOM

        if (elementoEspacio) {
            if (espacio.disponible) {
                // Si el espacio está disponible
                elementoEspacio.style.backgroundColor = 'green';
            } else {
                // Si el espacio no está disponible
                elementoEspacio.style.backgroundColor = 'red';
            }
        }
    });
}

// Llamar a la función para actualizar los colores al cargar la página
pintarParking();




