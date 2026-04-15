const API_URL = "http://localhost:5169/api/characters";

let page = 1;

document.addEventListener("DOMContentLoaded", () => {
  cargarPersonajes();
});

// 🔵 GET personajes
async function cargarPersonajes(name = "") {
  try {
    let url = `${API_URL}?page=${page}&pageSize=8`;

    if (name) {
      url += `&name=${name}`;
    }

    const response = await fetch(url);
    const result = await response.json();

    pintar(result.data);
    actualizarPagina(result.info);

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

// ctualizar paginación UI
function actualizarPagina(info) {
  document.getElementById("pagina-rest").textContent = page;

  console.log(info);
}

// búsqueda
function buscarREST() {
  const name = document.getElementById("searchInput").value;
  page = 1;
  cargarPersonajes(name);
}

// anterior
function anterior() {
  if (page > 1) {
    page--;
    cargarPersonajes();
  }
}

// siguiente
function siguiente() {
  page++;
  cargarPersonajes();
}