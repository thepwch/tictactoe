const celdas = document.querySelectorAll(".celda");
const turnoTexto = document.getElementById("turno");
const botonReiniciar = document.getElementById("reiniciar");

let turno = "X";
let tablero = ["", "", "", "", "", "", "", "", ""];
let juegoActivo = true;

const combinacionesGanadoras = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function manejarClick(e) {
    const index = e.target.getAttribute("data-index");

    if (tablero[index] !== "" || !juegoActivo) return;

    tablero[index] = turno;
    e.target.textContent = turno;

    if (revisarGanador()) {
        turnoTexto.textContent = `Ganó: ${turno} 🎉`;
        juegoActivo = false;
        return;
    }

    if (tablero.every(c => c !== "")) {
        turnoTexto.textContent = "¡Empate! 😐";
        juegoActivo = false;
        return;
    }

    turno = turno === "X" ? "O" : "X";
    turnoTexto.textContent = `Turno: ${turno}`;
}

function revisarGanador() {
    return combinacionesGanadoras.some(comb => {
        return comb.every(i => tablero[i] === turno);
    });
}

function reiniciarJuego() {
    tablero = ["", "", "", "", "", "", "", "", ""];
    turno = "X";
    juegoActivo = true;
    turnoTexto.textContent = "Turno: X";
    celdas.forEach(c => c.textContent = "");
}

celdas.forEach(celda => celda.addEventListener("click", manejarClick));
botonReiniciar.addEventListener("click", reiniciarJuego);