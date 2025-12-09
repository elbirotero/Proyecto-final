let filtrosActivos = [];

// Menú genérico
const menuGenerico = [
  { nombre: "Tacos de jaca al pastor", ingredientes: ["Jaca", "Piña", "Achiote", "Tortilla de maíz"] },
  { nombre: "Pizza vegana de champiñones", ingredientes: ["Masa integral", "Champiñones", "Queso vegano", "Orégano"] },
  { nombre: "Curry de lentejas rojas", ingredientes: ["Lentejas", "Leche de coco", "Cúrcuma", "Jengibre"] },
  { nombre: "Risotto de setas", ingredientes: ["Arroz arborio", "Setas", "Caldo vegetal", "Aceite de oliva"] }
];

let restaurantes = [];

// Buscar según filtros activos
function buscar() {
  const resultados = restaurantes.filter(r =>
    filtrosActivos.every(f => r.etiquetas.includes(f))
  );
  mostrarResultados(resultados);
}

// Renderizar resultados
function mostrarResultados(lista) {
  const contenedor = document.getElementById("results");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron restaurantes con esos filtros.</p>";
    return;
  }

  lista.forEach(r => {
    const card = document.createElement("div");
    card.className = "restaurant-card";
    card.onclick = () => verDetalle(r.nombre);
    card.innerHTML = `
      <img src="${r.imagen}" alt="${r.nombre}">
      <div class="info">
        <h3>${r.nombre}</h3>
        <p>${r.tipo} · ${r.ubicacion}</p>
        <div class="stars">${"⭐".repeat(r.puntuacion)}${"☆".repeat(5 - r.puntuacion)}</div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// Cargar restaurantes desde localStorage
function cargarRestaurantes() {
  const data = localStorage.getItem("restaurantes");
  restaurantes = data ? JSON.parse(data) : [];
}

// Mostrar detalle en modal principal
function verDetalle(nombre) {
  const restaurante = restaurantes.find(r => r.nombre === nombre);
  if (!restaurante) return;

  document.getElementById("modal-img").src = restaurante.imagen;
  document.getElementById("modal-nombre").textContent = restaurante.nombre;
  document.getElementById("modal-tipo").textContent = restaurante.tipo;
  document.getElementById("modal-ubicacion").textContent = restaurante.ubicacion;
  document.getElementById("modal-puntuacion").textContent = "⭐".repeat(restaurante.puntuacion);
  document.getElementById("modal-descripcion").textContent = restaurante.descripcion;

  // Menú resumen
  const menuList = document.getElementById("modal-menu");
  menuList.innerHTML = "";
  menuGenerico.forEach(plato => {
    const item = document.createElement("li");
    item.textContent = plato.nombre;
    menuList.appendChild(item);
  });

  // Mapa dinámico
  const mapaContainer = document.getElementById("mapa-container");
  mapaContainer.innerHTML = `
    <iframe
      width="100%"
      height="300"
      style="border:0"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=${encodeURIComponent(restaurante.ubicacion)}&output=embed">
    </iframe>
  `;

  document.getElementById("modal").classList.add("visible");
  activarPestaña("menu");
}

// Cerrar modal principal
function cerrarModal() {
  document.getElementById("modal").classList.remove("visible");
}

// Tabs dentro del modal
function activarPestaña(tabId) {
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.toggle("hidden", content.id !== tabId);
  });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  cargarRestaurantes();
  mostrarResultados(restaurantes);

  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => activarPestaña(btn.dataset.tab));
  });

  // Modal secundario (menú completo con acordeón)
  const btnVerMenu = document.getElementById("btn-ver-menu-completo");
  const modalMenuCompleto = document.getElementById("modal-menu-completo");
  const cerrarMenuCompleto = document.getElementById("cerrar-menu-completo");

  if (btnVerMenu) {
    btnVerMenu.addEventListener("click", () => {
      const nombre = document.getElementById("modal-nombre").textContent;

      cerrarModal();

      document.getElementById("modal-menu-nombre").textContent = `Menú completo de ${nombre}`;
      const acordeon = document.getElementById("acordeon-menu");
      acordeon.innerHTML = "";

      // Usamos SIEMPRE el menú genérico
      menuGenerico.forEach(plato => {
        const item = document.createElement("div");
        item.className = "acordeon-item";

        const titulo = document.createElement("div");
        titulo.className = "acordeon-titulo";
        titulo.textContent = plato.nombre;

        const contenido = document.createElement("div");
        contenido.className = "acordeon-contenido";
        const lista = document.createElement("ul");
        plato.ingredientes.forEach(ing => {
          const li = document.createElement("li");
          li.textContent = ing;
          lista.appendChild(li);
        });
        contenido.appendChild(lista);

        titulo.addEventListener("click", () => {
          const abierto = contenido.style.display === "block";
          contenido.style.display = abierto ? "none" : "block";
          titulo.classList.toggle("active", !abierto);
        });

        item.appendChild(titulo);
        item.appendChild(contenido);
        acordeon.appendChild(item);
      });

      modalMenuCompleto.classList.add("visible");
    });
  }

  cerrarMenuCompleto.addEventListener("click", () => {
    modalMenuCompleto.classList.remove("visible");
  });

  window.addEventListener("click", function (e) {
    const modal = document.getElementById("modal");
    const modal2 = document.getElementById("modal-menu-completo");
    if (e.target === modal) cerrarModal();
    if (e.target === modal2) modal2.classList.remove("visible");
  });
});
