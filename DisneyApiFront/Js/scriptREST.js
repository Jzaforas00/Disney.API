const API_URL = "http://localhost:5169/api/characters";

let page = 1;
let nombreBusquedaREST = "";

document.addEventListener("DOMContentLoaded", () => {
  cargarPersonajes();
});

// GET personajes
async function cargarPersonajes() {
  try {
    let url = `${API_URL}?page=${page}&pageSize=8`;

    if (nombreBusquedaREST) {
      url += `&name=${nombreBusquedaREST}`;
    }

    const response = await fetch(url);
    const result = await response.json();

    pintar(result.data);
    actualizarPaginaREST(result.info);

  } catch (error) {
    console.error("Error:", error);
  }
}

// pintar cards
function pintar(personajes) {
  const contenedor = document.getElementById("rest-list");

  contenedor.innerHTML = "";

  personajes.forEach(p => {
    contenedor.innerHTML += `
      <div class="card" onclick="verDetalle('${p._id}')">
        <img src="${p.imageUrl}" alt="${p.name}">
        <h4>${p.name}</h4>
      </div>
    `;
  });
}

// actualizar paginación UI
function actualizarPaginaREST(info) {
  document.getElementById("pagina-rest").textContent = page;

  console.log(info);
}

// búsqueda
function buscarREST() {
  const inputR = document.getElementById("searchInputREST");
  nombreBusquedaREST = inputR.value;

  page = 1;
  cargarPersonajes(nombreBusquedaREST);
}

// Paginador
function anteriorREST() {
  if (page > 1) {
    page--;
    cargarPersonajes();
  }
}

// siguiente
function siguienteREST() {
  page++;
  cargarPersonajes();
}