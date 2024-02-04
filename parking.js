// Seleccionamos los botones y modales
let abrirModal = document.querySelector('[data-id="abrir1"]');
let cerrarModal = document.querySelector('[data-id="cerrar1"]');
let modal = document.querySelector('[data-id="modal1"]');
let abrirModal2 = document.querySelector('[data-id="abrir2"]');
let cerrarModal2 = document.querySelector('[data-id="cerrar2"]');
let modal2 = document.querySelector('[data-id="modal2"]');

// Evento para abrir el primer modal
abrirModal.addEventListener('click', () => {
    var ahora = new Date();
    var fechaHora = ahora.toISOString().substring(0, 19).replace('T', ' ');
    document.getElementById('exampleInputTiempo1').value = fechaHora;
    const matricula = generarMatriculaEspana();
    document.getElementById('exampleInputMatricula').value = matricula;
    const plaza = encontrarAparcamientoDisponible();
    console.log(plaza.numero);
    if (!plaza) {
        alert('No hay plazas disponibles.');
        return;
    }

    compraTicket_DATA.push({
        fechaHoraEntrada: fechaHora,
        fechaHoraSalida: '',
        matricula: matricula,
        numero: plaza.numero,
        precio_hora: plaza.precio_hora,
        tiempo: 0,
        importeTotal: 0,
    });
    //console.log(compraTicket_DATA.length);
    guardarEstadoCompraTicket_DATA();
    cambiarDisponibilidadEspacio(plaza.numero, false);
    pintarParking();

    modal.showModal();
});

// Evento para cerrar el primer modal
cerrarModal.addEventListener('click', () => {
    modal.close();
});

// Evento para abrir el segundo modal
abrirModal2.addEventListener('click', () => {
    const ticketsNoPagados = compraTicket_DATA.filter(ticket => ticket.fechaHoraSalida === '');
    console.log(ticketsNoPagados.length);
    if (ticketsNoPagados.length === 0) {
        alert('No hay tickets de aparcamiento pendientes de pago.');
        return;
    }
    //escoge un tiket aleatorio y registra la hora de salida calcula el tiempo y el importe
    const ticket = ticketsNoPagados[Math.floor(Math.random() * ticketsNoPagados.length)];
    console.log(ticket.numero);

    var ahora = new Date();
    var fechaHora = ahora.toISOString().substring(0, 19).replace('T', ' ');
//    document.getElementById('exampleInputTiempo2').value = fechaHora;
 //   document.getElementById('exampleInputMatricula2').value = ticket.matricula;
 //   document.getElementById('exampleInputPlaza').value = ticket.plaza;
 //   document.getElementById('exampleInputPrecioHora').value = ticket.precio_hora;
 //   document.getElementById('exampleInputFechaHoraEntrada').value = ticket.fechaHoraEntrada;
 //   document.getElementById('exampleInputFechaHoraSalida').value = fechaHora;
    var fechaHoraEntrada = new Date(ticket.fechaHoraEntrada);
    var fechaHoraSalida = new Date(fechaHora);
    var tiempo = Math.round((fechaHoraSalida - fechaHoraEntrada) / 1000 / 60);
 //   document.getElementById('exampleInputTiempo').value = tiempo;
    var importeTotal = ticket.precio_hora * tiempo;
 //   document.getElementById('exampleInputImporteTotal').value = importeTotal;
    ticket.fechaHoraSalida = fechaHora;
    ticket.tiempo = tiempo;
    ticket.importeTotal = importeTotal;
    guardarEstadoCompraTicket_DATA();
    cambiarDisponibilidadEspacio(ticket.numero, true);
    console.log(APARCAMIENTO_DATA);
    pintarParking();
  modal2.showModal();
});

// Evento para cerrar el segundo modal
cerrarModal2.addEventListener('click', () => {
  modal2.close();
});

// Recuperación de datos desde LocalStorage o uso de datos por defecto
const compraTicket_DATA_ALMACENADO = localStorage.getItem('COMPRATICKET_DATA');
const compraTicket_DATA = compraTicket_DATA_ALMACENADO ? JSON.parse(compraTicket_DATA_ALMACENADO) : [];

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

];

pintarParking();

function cambiarDisponibilidadEspacio(numeroEspacio, disponible) {
    const espacio = APARCAMIENTO_DATA.find(espacio => espacio.numero === numeroEspacio);
    if (espacio) {
        espacio.disponible = disponible;
        guardarEstadoAparcamiento();
    }
}

function pintarParking() {
    APARCAMIENTO_DATA.forEach(espacio => {
        let idEspacio = 'p' + espacio.numero;
        let elementoEspacio = document.getElementById(idEspacio);

        if (elementoEspacio) {
            elementoEspacio.style.backgroundColor = espacio.disponible ? 'green' : 'red';
        }
    });
}

function generarMatriculaEspana() {
    const numeros = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const letrasExcluidas = ['A', 'E', 'I', 'O', 'U', 'Ñ'];
    let letras = '';
    while (letras.length < 3) {
        let letraAleatoria = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
        if (!letrasExcluidas.includes(letraAleatoria)) {
            letras += letraAleatoria;
        }
    }
    return numeros + ' ' + letras;
}

function encontrarAparcamientoDisponible() {
    const espaciosDisponibles = APARCAMIENTO_DATA.filter(espacio => espacio.disponible);
    if (espaciosDisponibles.length === 0) {
        return null;
    }
    return espaciosDisponibles[Math.floor(Math.random() * espaciosDisponibles.length)];
}

function guardarEstadoAparcamiento() {
    localStorage.setItem('APARCAMIENTO_DATA', JSON.stringify(APARCAMIENTO_DATA));
}

function guardarEstadoCompraTicket_DATA() {
    localStorage.setItem('COMPRATICKET_DATA', JSON.stringify(compraTicket_DATA));
}

let botonLimpiar = document.querySelector('[data-id="limpiarDATA"]');
botonLimpiar.addEventListener('click', () => {
    localStorage.removeItem('APARCAMIENTO_DATA');
    localStorage.removeItem('COMPRATICKET_DATA');
    location.reload();
});
