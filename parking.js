let APARCAMIENTO_DATA = []; // Esta variable ahora es global y accesible en todo el archivo
let compraTicket_DATA = []; // Esta variable ahora es global

// Seleccionamos los botones y modales
let abrirModal = document.querySelector('[data-id="abrir1"]');
let cerrarModal = document.querySelector('[data-id="cerrar1"]');
let modal = document.querySelector('[data-id="modal1"]');
let abrirModal2 = document.querySelector('[data-id="abrir2"]');
let cerrarModal2 = document.querySelector('[data-id="cerrar2"]');
let modal2 = document.querySelector('[data-id="modal2"]');
let continuar = false; // Inicialmente, no continúa hasta que se presione "Iniciar"
let cicloActivo = false; // Para evitar reinicios del ciclo mientras ya está activo

  // Llama a la función al iniciar la aplicación
  cargarEstadoAparcamiento();
  cargarTicketsActivos();
  pintarParking();
  actualizarIngresosTotales();

  function detenerEjecucion() {
    continuar = false; // Detiene el ciclo
}

function manejarCiclo() {
  continuar = !continuar;
  if (continuar && !cicloActivo) {
      ciclo();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const switchControl = document.getElementById('flexSwitchCheck');
  switchControl.addEventListener('change', manejarCiclo);
});

async function iniciarEjecucion() {
    if (!continuar) { // Evita reiniciar el ciclo si ya está en ejecución
        continuar = true;
        await ciclo();
    }
}
async function ciclo() {
  cicloActivo = true;
  while (continuar) {
      const accion = Math.floor(Math.random() * 3);
      switch (accion) {
          case 0:
              entrada();
              break;
          case 1:
              salida();
              break;
              default:
                console.log("no hace nada")
          // No hace nada si es 2
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
  }
  cicloActivo = false;
}

async function entrada() {
  
  { 
    const matricula = generarMatriculaEspana();
    const plaza = await encontrarAparcamientoDisponible(); 
    if (!plaza || plaza === -1) {
        return;
    }
    try {
        const response = await axios.post('http://localhost:3000/api/tickets/ingresar', {
            aparcamiento_id: plaza.id,
            matricula: matricula,
            precio_hora: plaza.precio_hora
        });
        cambiarDisponibilidadEspacio(plaza.numero, false);
    } catch (error) {
        console.error('Error al ingresar el ticket:', error);
    }
  }
}

async function salida() {
    const ticketsNoPagados = await obtenerTicketsNoPagados();
    if (ticketsNoPagados.length === 0) {
      return;
    }
    const ticketSeleccionado = ticketsNoPagados[Math.floor(Math.random() * ticketsNoPagados.length)];
    const precioHora = ticketSeleccionado.precio_hora; 
    try {
        const response = await axios.post('http://localhost:3000/api/tickets/cerrar', {
            ticketId: ticketSeleccionado.id,
            precioHora: precioHora 
        });
        if (response.data.success) {
            const ticketActualizado = response.data.ticket;
//            console.log('Ticket actualizado:', ticketActualizado);
            const index = compraTicket_DATA.findIndex(ticket => ticket.id === ticketActualizado.id);
            if (index !== -1) {
                compraTicket_DATA[index] = ticketActualizado;
            }
            cambiarDisponibilidadEspacio(ticketSeleccionado.aparcamiento_id, true);
//            pintarUnParking(ticketSeleccionado.aparcamiento_id, true);
            actualizarIngresosTotales();
        } else {
            console.error('No se pudo cerrar el ticket:', response.data.message);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud al backend:', error);
    }
}
 
abrirModal.addEventListener('click', async () => { // Usa async aquí

  const matricula = generarMatriculaEspana();

  const plaza = await encontrarAparcamientoDisponible(); // Usa await aquí
  if (!plaza || plaza === -1) {
      alert('No hay plazas disponibles.');
      return;
  }

  try {
      const response = await axios.post('http://localhost:3000/api/tickets/ingresar', {
          aparcamiento_id: plaza.id,
          matricula: matricula,
          precio_hora: plaza.precio_hora
      });
      console.log(response.data.message);
      cambiarDisponibilidadEspacio(plaza.numero, false);
  } catch (error) {
      console.error('Error al ingresar el ticket:', error);
  }
});

cerrarModal.addEventListener('click', () => {
    modal.close();
});

abrirModal2.addEventListener('click', async () => {
    const ticketsNoPagados = await obtenerTicketsNoPagados();
    if (ticketsNoPagados.length === 0) {
      alert('No hay tickets de aparcamiento pendientes de pago.');
      return;
    }
    const ticketSeleccionado = ticketsNoPagados[Math.floor(Math.random() * ticketsNoPagados.length)];
    const precioHora = ticketSeleccionado.precio_hora; // Asumiendo que el ticket tiene el precio por hora
    try {
        const response = await axios.post('http://localhost:3000/api/tickets/cerrar', {
            ticketId: ticketSeleccionado.id,
            precioHora: precioHora // Enviamos el precio por hora al backend
        });
        if (response.data.success) {
            const ticketActualizado = response.data.ticket;
            console.log('Ticket actualizado:', ticketActualizado);
            // Actualizar el estado de compraTicket_DATA con la nueva información
            const index = compraTicket_DATA.findIndex(ticket => ticket.id === ticketActualizado.id);
            if (index !== -1) {
                compraTicket_DATA[index] = ticketActualizado;
            }
            cambiarDisponibilidadEspacio(ticketSeleccionado.aparcamiento_id, true);
            pintarUnParking(ticketSeleccionado.aparcamiento_id, true);
            actualizarIngresosTotales();
        } else {
            console.error('No se pudo cerrar el ticket:', response.data.message);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud al backend:', error);
    }
});

// Evento para cerrar el segundo modal
cerrarModal2.addEventListener('click', () => {
  modal2.close();
});


// Función asincrónica para cargar el estado de los parkings desde el backend
async function cargarEstadoAparcamiento() {
    try {
      const response = await axios.get('http://localhost:3000/api/parkings');
      const data = response.data;
      APARCAMIENTO_DATA = data; 
      pintarParking(); 
    } catch (error) {
      console.error('Error al cargar los datos de los parkings:', error);
    }
  }
  
  
// Función asincrónica para cargar el estado de los tickets activos desde el backend
async function cargarTicketsActivos() {
    try {
      const response = await axios.get('http://localhost:3000/api/tickets/activos');
      compraTicket_DATA = response.data; // Almacena los tickets activos en la variable global
      console.log(compraTicket_DATA)
      // Puedes llamar aquí a cualquier función que necesite usar compraTicket_DATA
      // Por ejemplo, si tienes una función que actualiza la UI con estos datos:
      // actualizarUIConTickets(compraTicket_DATA);
    } catch (error) {
      console.error('Error al cargar los tickets activos:', error);
    }
  }
  

async function cambiarDisponibilidadEspacio(numeroEspacio, disponible) {
    try {
      // Realiza la solicitud POST al backend con axios
      const response = await axios.post('http://localhost:3000/api/parkings/disponibilidad', {
        numeroEspacio: numeroEspacio,
        disponible: disponible
      });
      
      // Verifica la respuesta del servidor
      if (response.data.success) {
//        console.log(response.data.message);
//        console.log('cambiando el espacio  numero:  '+numeroEspacio)
        pintarUnParking(numeroEspacio,disponible);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error al cambiar la disponibilidad:', error);
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

function pintarUnParking(espacio, disponible) {
    let idEspacio = 'p' + espacio;
    let elementoEspacio = document.getElementById(idEspacio);
    console.log(idEspacio+" "+ (disponible ? "Liberado" : "Ocupado"));
    if (elementoEspacio) {
      elementoEspacio.style.backgroundColor = disponible ? 'green' : 'red';
  }
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

async function encontrarAparcamientoDisponible() {
  try {
      // Hacemos una solicitud al backend para encontrar un aparcamiento disponible
      const response = await axios.get('http://localhost:3000/api/aparcamientos/disponible');
      if (response.data.success) {
          // Si hay un aparcamiento disponible, lo devolvemos
          return response.data.aparcamiento;
      } else {
          // Si no hay aparcamientos disponibles, mostramos un mensaje y devolvemos -1
          alert('No hay plazas disponibles.');
          return -1;
      }
  } catch (error) {
      console.error('Error al buscar un aparcamiento disponible:', error);
      return -1; // En caso de error en la solicitud también devolvemos -1
  }
}

async function obtenerTicketsNoPagados() {
    try {
      const response = await axios.get('http://localhost:3000/api/tickets/activos');
      return response.data.filter(ticket => ticket.fecha_salida === null);
    } catch (error) {
      console.error('Error al obtener los tickets no pagados:', error);
      return []; // Devuelve un arreglo vacío en caso de error
    }
  }
  
  async function actualizarIngresosTotales() {
    try {
      const response = await axios.get('http://localhost:3000/api/ingresos/totales');
      if (response.data.success) {
        const ingresosTotales = response.data.ingresosTotales;
        const divGananciasTotales = document.getElementById('ganaciastotales');
        divGananciasTotales.innerHTML = `<h1>Ingresos totales del día: ${ingresosTotales} €</h1>`;
      }
    } catch (error) {
      console.error('Error al obtener los ingresos totales del día:', error);
    }
  }
  





