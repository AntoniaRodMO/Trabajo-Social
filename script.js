const malla = {
  "Primer Semestre": [
    { nombre: "Fundamentos del Trabajo Social 1" },
    { nombre: "Sociología General" }
  ],
  "Segundo Semestre": [
    { nombre: "Fundamentos del Trabajo Social 2", requisito: "Fundamentos del Trabajo Social 1" }
  ],
  "Tercer Semestre": [
    { nombre: "Sociología del Desarrollo", requisito: "Sociología General" }
  ]
};

const aprobados = new Set(); // Aquí se guardan los ramos aprobados

function crearMalla() {
  const contenedor = document.getElementById("malla");

  for (let semestre in malla) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    divSemestre.appendChild(titulo);

    malla[semestre].forEach(ramo => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo";
      divRamo.textContent = ramo.nombre;

      if (ramo.requisito) {
        divRamo.dataset.requisito = ramo.requisito;
        divRamo.classList.add("bloqueado");
      }

      divRamo.onclick = () => {
        if (!divRamo.classList.contains("bloqueado")) {
          divRamo.classList.add("aprobado");
          aprobados.add(ramo.nombre);
          actualizarDesbloqueos();
        }
      };

      divSemestre.appendChild(divRamo);
    });

    contenedor.appendChild(divSemestre);
  }
  actualizarDesbloqueos();
}

function actualizarDesbloqueos() {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const requisito = ramo.dataset.requisito;

    if (!requisito || aprobados.has(requisito)) {
      ramo.classList.remove("bloqueado");
    } else {
      ramo.classList.add("bloqueado");
    }
  });
}

crearMalla();
