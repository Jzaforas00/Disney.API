const GRAPHQL_URL = "http://localhost:5169/graphql";

let page2 = 1;
let nombreBusquedaGraphQL = "";

document.addEventListener("DOMContentLoaded", () => {
  cargarGraphQL(1);
});

async function cargarGraphQL() {
  const query = `
    query {
      characters(page: ${page2}, pageSize: 8, name: "${nombreBusquedaGraphQL}") {
        _id
        name
        imageUrl
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const result = await response.json();

    console.log("GraphQL response:", result);

    pintarGraphQL(result.data.characters);
    actualizarPaginaGraphQL(result.data.characters);

  } catch (error) {
    console.error("Error GraphQL:", error);
  }
}

function pintarGraphQL(personajes) {
  const contenedor = document.getElementById("graphql-list");

  contenedor.innerHTML = "";

  personajes.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <img src="${p.imageUrl}" alt="${p.name}">
        <h4>${p.name}</h4>
      </div>
    `;
  });
}

function buscarGraphQL() {
  const inputG = document.getElementById("searchInputGraphQL");
  nombreBusquedaGraphQL = inputG.value;
  page2 = 1;
  cargarGraphQL();
}

// actualizar paginación UI
function actualizarPaginaGraphQL(info) {
  document.getElementById("pagina-graphql").textContent = page2;

  console.log(info);
}

function anteriorGraphQL() {
  if (page2 > 1) {
    page2--;
    cargarGraphQL();
  }
}

// siguiente
function siguienteGraphQL() {
  page2++;
  cargarGraphQL();
}