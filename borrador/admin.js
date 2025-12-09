// Menú genérico que se aplicará a todos los restaurantes
const menuGenerico = [
  { nombre: "Tacos de jaca al pastor", ingredientes: ["Jaca", "Piña", "Achiote", "Tortilla de maíz"] },
  { nombre: "Pizza vegana de champiñones", ingredientes: ["Masa integral", "Champiñones", "Queso vegano", "Orégano"] },
  { nombre: "Curry de lentejas rojas", ingredientes: ["Lentejas", "Leche de coco", "Cúrcuma", "Jengibre"] },
  { nombre: "Risotto de setas", ingredientes: ["Arroz arborio", "Setas", "Caldo vegetal", "Aceite de oliva"] }
];

document.getElementById("add-restaurant-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nuevoRestaurante = {
    nombre: document.getElementById("nombre").value,
    tipo: document.getElementById("tipo").value,
    ubicacion: document.getElementById("ubicacion").value,
    puntuacion: parseInt(document.getElementById("puntuacion").value),
    descripcion: document.getElementById("descripcion").value,
    imagen: document.getElementById("imagen").value || "imagenes/default.jpg",
    etiquetas: [],
    menu: menuGenerico // 👈 menú genérico automático
  };

  let restaurantes = JSON.parse(localStorage.getItem("restaurantes")) || [];
  restaurantes.push(nuevoRestaurante);

  localStorage.setItem("restaurantes", JSON.stringify(restaurantes));

  alert("Restaurante agregado correctamente ✅");
  this.reset();
});
