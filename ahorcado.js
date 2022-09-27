const piezasFigura = document.querySelectorAll(".pieza-figura");
const letrasErradas = document.getElementById("letras-erradas");
const palabraSecreta = document.getElementById("palabra-secreta");
const mensaje = document.getElementById("contenedor-mensaje");
const mensajeFinal = document.getElementById("mensaje-final");
const botonReiniciar = document.getElementById("boton-reiniciar");
const letraRepetida = document.getElementById("contenedor-letra-repetida");

const palabras = ["HTML", "CSS", "ALURA", "ORACLE", "DESARROLLO", "FRONTEND", "CHALLENGE", "WEB", "AHORCADO", "PROGRAMACION", "LOGICA", "DESAFIO"];

let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

const letraCorrecta = [];
const letraErrada = [];

//Mostrar palabra secreta
function mostrarPalabra() {
    palabraSecreta.innerHTML = `
        ${palabraSeleccionada
            .split('')
            .map(letra => `
                <span class="letra">
                    ${letraCorrecta.includes(letra) ? letra : ""}
                </span>
            `).join("")}
    `;
    
    const palabraAdivinada = palabraSecreta.innerText.replace(/\n/g, "");

    if(palabraAdivinada === palabraSeleccionada) {
        mensajeFinal.innerText = '¡Felicidades! ¡Ganaste! 😎';
        mensaje.style.display = 'flex';
    }
}

//Actualizar letras erradas
function actualizarLetraErrada() {
    letrasErradas.innerHTML = `
        ${letraErrada.length > 0 ? '<p>Letra errada</p>' : ''}
        ${letraErrada.map(letra => `<span>${letra}</span>`)}
    `;

    piezasFigura.forEach((pieza, index) => {
        const errores = letraErrada.length;

        if(index < errores) {
            pieza.style.display = "block";
        } else {
            pieza.style.display = "none";
        }
    });

    if(letraErrada.length === piezasFigura.length) {
        mensajeFinal.innerText = "Perdiste! 😓 La palabra era " + palabraSeleccionada;
        mensaje.style.display = "flex";
    }
}


//Mostrar alerta
function mostrarAlerta() {
    letraRepetida.classList.add("show");

    setTimeout(() => {
        letraRepetida.classList.remove("show");
    }, 2000);
}

//Comprobar letra tabla ASCII 65=A 90=Z key=navegador entiende que es una tecla
window.addEventListener("keydown", (e) => {
    if(e.keyCode >=  '65' && e.keyCode <= '90') {
        const letra = e.key.toUpperCase();

        if(palabraSeleccionada.includes(letra)) {
            if(!letraCorrecta.includes(letra)) {
                letraCorrecta.push(letra);

                mostrarPalabra();
            } else {
                mostrarAlerta();
            }
        } else {
            if(!letraErrada.includes(letra)) {
                letraErrada.push(letra);

                actualizarLetraErrada();
            } else {
                mostrarAlerta();
            }
        }
    }
});

//Resetear juego y empezar de nuevo
botonReiniciar.addEventListener('click', () => {
    letraCorrecta.splice(0);
    letraErrada.splice(0);

    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

    mostrarPalabra();
    actualizarLetraErrada();

    mensaje.style.display = "none";
})

mostrarPalabra();