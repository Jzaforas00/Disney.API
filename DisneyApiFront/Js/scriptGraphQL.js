const GRAPHQL_URL = "http://localhost:5169/graphql";

document.addEventListener("DOMContentLoaded", () => {
  cargarGraphQL(1);
});

async function cargarGraphQL(page = 1) {
  const query = `
    query {
      characters(page: ${page}, pageSize: 8) {
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