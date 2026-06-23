const btnMenu = document.querySelector(".svg-container");
const navMenu = document.querySelector(".info-container");

btnMenu.addEventListener("click", () => {
  // la funcion toggle quita y pone
  navMenu.classList.toggle("menu-abierto");

  const estaAbierto = navMenu.classList.contains("menu-abierto");
  btnMenu.setAttribute("aria-expanded", estaAbierto);
});

document.addEventListener("click", function (evento) {
  const clicDentroDelHeader = evento.target.closest("header");

  if (!clicDentroDelHeader) {
    navMenu.classList.remove("menu-abierto");
    btnMenu.setAttribute("aria-expanded", false);
  }
});

const enlaces = navMenu.querySelectorAll("a");

enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    navMenu.classList.remove("menu-abierto");
    btnMenu.setAttribute("aria-expanded", false);
  });
});
