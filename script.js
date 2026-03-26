let turno = "X";
let tablero = ["", "", "", "", "", "", "", "", ""];

const casillas = document.querySelectorAll(".casilla");
const textoTurno = document.getElementById("turno");
const botonReiniciar = document.getElementById("reiniciar");

const combinaciones = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

casillas.forEach(casilla => {
    casilla.addEventListener("click", () => jugar(casilla));
});

function jugar(casilla) {
    const index = casilla.dataset.index;

    if (tablero[index] !== "") return;

    tablero[index] = turno;
    casilla.textContent = turno;

    if (ganador(turno)) {
        setTimeout(() => alert(`🎉 ¡Jugador ${turno} ganó!`), 100);
        return;
    }

    if (!tablero.includes("")) {
        setTimeout(() => alert("😐 ¡Empate!"), 100);
        return;
    }

    turno = turno === "X" ? "O" : "X";
    textoTurno.textContent = "Turno: " + turno;
}

function ganador(simbolo) {
    return combinaciones.some(comb =>
        comb.every(i => tablero[i] === simbolo)
    );
}

botonReiniciar.addEventListener("click", () => {
    tablero = ["", "", "", "", "", "", "", "", ""];
    turno = "X";
    textoTurno.textContent = "Turno: X";
    casillas.forEach(c => c.textContent = "");
});