AOS.init({
    duration: 1000,
    once: true
});

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

window.addEventListener('DOMContentLoaded', () => {
    generarBurbujasDecorativas();
});

function generarBurbujasDecorativas() {
    const contenedor = document.getElementById('burbujas-background');
    if (!contenedor) return;

    for (let i = 0; i < 15; i++) {
        crearBurbuja(contenedor);
    }setInterval(() => {
        crearBurbuja(contenedor);
    }, 1500);
}

function crearBurbuja(contenedor) {
    const burbuja = document.createElement('div');
    burbuja.classList.add('burbuja-flotante');

    const tamaño = Math.random() * 50 + 30;
    burbuja.style.width = `${tamaño}px`;
    burbuja.style.height = `${tamaño}px`;
    burbuja.style.left = `${Math.random() * 100}%`;const duracion = Math.random() * 6 + 6;
    burbuja.style.animationDuration = `${duracion}s`;
    burbuja.style.animationDelay = `${Math.random() * 4}s`;
    burbuja.addEventListener('click', () => {
        burbuja.style.transform = 'scale(1.3)';
        burbuja.style.opacity = '0';
        burbuja.style.transition = 'all 0.1s ease';
        const rect = burbuja.getBoundingClientRect();
        confetti({
            particleCount: 8,
            spread: 30,
            origin: { x: rect.left / window.innerWidth, y: rect.top / window.innerHeight }
        });

        setTimeout(() => { burbuja.remove(); }, 100);
    });

    contenedor.appendChild(burbuja);
}

function iniciarExperiencia() {
    const musica = document.getElementById('musica-beatles');
    if (musica) {
        musica.play().catch(err => console.log("Interacción requerida para audio."));
    }
    const seccionJardin = document.getElementById('jardin');
    if (seccionJardin) {
        seccionJardin.scrollIntoView({ behavior: 'smooth' });
    }
}

const frasesTréboles = [
    "Sabías que... ¡Eres una niña maravillosa con las mejores ideas del mundo entero! Sobreppasas tu gran creatividad.",
    "Tip de felicidad: Un trébol me dijo que tu sonrisa ilumina hasta el día más gris.",
    "Eres alguien linda y admirable y trabajadora, hasta creativa, pastelito chula."
];
let fraseIndex = 0;

function revelarDatoCurioso(elemento) {
    elemento.style.transform = 'scale(1.5) rotate(15deg)';
    setTimeout(() => { elemento.style.transform = ''; }, 300);
    alert(frasesTréboles[fraseIndex]);
    fraseIndex = (fraseIndex + 1) % frasesTréboles.length;
}

function ladrarYDarSorpresa() {
    confetti({ particleCount: 40, spread: 50 });
    alert("Guauf guauf guauf guauf: Eres la novia más hermosa, auténtica y especial de todo el universo entero. No importa cuánto llegues a crecer, siempre te amaré y siempre serás ante mis ojos la niña, la chica, la mujer, la damita de mi vida. JAMÁS DUDE QUE TE AMOOOO MUCHÍSIMO.❤️");
}


function revelarSobre() {
    confetti({
        particleCount: 150,
        spread: 80,
        colors: ['#bb0a1e', '#ffffff', '#ffb3c1']
    });
    
    const sobre = document.getElementById('contenedor-sobre');
    if (sobre) {
        sobre.classList.remove('oculto');
        setTimeout(() => {
            sobre.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

function abrirCarta() {
    const envelope = document.querySelector('.envelope');
    if (envelope && !envelope.classList.contains('open')) {
        envelope.classList.add('open');
        setTimeout(() => {
            confetti({ particleCount: 30, angle: 60, spread: 55, origin: { x: 0, y: 0.8 } });
            confetti({ particleCount: 30, angle: 120, spread: 55, origin: { x: 1, y: 0.8 } });
        }, 400);
        cargarCartitaPDF('/docs/Cartita.pdf');
    }
}

function cargarCartitaPDF(url) {
    const viewer = document.getElementById('pdf-viewer');
    if (!viewer || viewer.children.length > 0) return;
    pdfjsLib.getDocument(url).promise.then(pdf => {
       for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                viewer.appendChild(canvas);
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        }
    }).catch(error => {
        console.error("Error crítico al procesar o buscar el archivo Cartita.pdf:", error);
        viewer.innerHTML = `<p style="color:red; text-align:center; padding:20px;">¡Ups! No pudimos abrir tu cartita original en este momento. 😢</p>`;
    });
}