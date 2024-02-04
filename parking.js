
let abrirModal = document.querySelector('[data-id="abrir1"]'); // Seleccionamos el boton que abre el modal
let cerrarModal = document.querySelector('[data-id="cerrar1"]'); // Seleccionamos el boton que cierra el modal
let modal = document.querySelector('[data-id="modal1"]'); // Seleccionamos el modal

abrirModal.addEventListener('click', () => {
    
    var ahora = new Date();
    var fechaHora = ahora.toISOString().substring(0, 19).replace('T', ' ');
    console.log(fechaHora);
    document.getElementById('exampleInputTiempo1').value = fechaHora;
    const matricula = generarMatriculaEspana();
    console.log(matricula);
    document.getElementById('exampleInputMatricula').value = matricula;
    const plaza = encontrarAparcamientoDisponible();
    console.log(plaza.numero);
    console.log(plaza.precio_hora);
    compraTicket_DATA.push({fechaHora: fechaHora, matricula: matricula, plaza: plaza.numero, precio_hora: plaza.precio_hora});
    cambiarDisponibilidadEspacio(plaza.numero, false);
    pintarParking();

    console.log(compraTicket_DATA);

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


const compraTicket_DATA =[]

const APARCAMIENTO_DATA_ALMACENADO = localStorage.getItem('APARCAMIENTO_DATA');
const APARCAMIENTO_DATA = APARCAMIENTO_DATA_ALMACENADO ? JSON.parse(APARCAMIENTO_DATA_ALMACENADO) : [
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
    // Tus datos iniciales aquí...
];

pintarParking();

function cambiarDisponibilidadEspacio(numeroEspacio, disponible) {
    const espacio = APARCAMIENTO_DATA.find(espacio => espacio.numero === numeroEspacio);
    if (espacio) {
        espacio.disponible = disponible;
        guardarEstadoAparcamiento(); // Guardar los cambios
    }
}

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





function generarMatriculaEspana() {
    // Generar cuatro dígitos aleatorios.
    const numeros = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
    // Generar tres letras aleatorias.
    // Excluimos las vocales y la letra Ñ y algunas combinaciones inapropiadas.
    const letrasExcluidas = ['A', 'E', 'I', 'O', 'U', 'Ñ'];
    let letras = '';
    while (letras.length < 3) {
      let letraAleatoria = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
      if (!letrasExcluidas.includes(letraAleatoria)) {
        letras += letraAleatoria;
      }
    }
  
    // Devuelve la combinación de números y letras.
    return numeros + ' ' + letras;
  }

  function encontrarAparcamientoDisponible() {
    // Filtrar para obtener solo los espacios disponibles
    const espaciosDisponibles = APARCAMIENTO_DATA.filter(espacio => espacio.disponible);

    if (espaciosDisponibles.length === 0) {
        alert('No hay aparcamientos disponibles.');
        return null; // o podrías manejar esto de otra manera, como mostrar un mensaje al usuario
    }

    // Seleccionar un espacio disponible aleatoriamente
    const espacioAleatorio = espaciosDisponibles[Math.floor(Math.random() * espaciosDisponibles.length)];

    // Marcar el espacio seleccionado en el DOM
    pintarParking(espacioAleatorio);

    return espacioAleatorio;
}
function guardarEstadoAparcamiento() {
    localStorage.setItem('APARCAMIENTO_DATA', JSON.stringify(APARCAMIENTO_DATA));
}


// Primero, seleccionamos el botón por su atributo data-id
let botonLimpiar = document.querySelector('[data-id="limpiarDATA"]');

// Luego, agregamos un event listener para el evento 'click'
botonLimpiar.addEventListener('click', () => {
    // Aquí se coloca el código para limpiar el LocalStorage
     localStorage.removeItem('APARCAMIENTO_DATA');
     location.reload();
    // Puedes agregar aquí código adicional si necesitas realizar otras acciones
    // después de limpiar el LocalStorage, como actualizar la interfaz de usuario.
    alert("Datos limpiados del LocalStorage.");
});
