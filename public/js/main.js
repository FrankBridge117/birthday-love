// Inicializadores globales
AOS.init({ duration: 1000, once: true });
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

window.addEventListener('DOMContentLoaded', () => {
    generarBurbujasDecorativas();
    generarPatitosInfinitos();
});

function generarBurbujasDecorativas() {
    const contenedores = [
        document.getElementById('burbujas-background'), 
        document.getElementById('patitos-background')
    ];
    
    contenedores.forEach(contenedor => {
        if (!contenedor) return;
        for (let i = 0; i < 20; i++) { crearBurbuja(contenedor); }
        setInterval(() => { crearBurbuja(contenedor); }, 1200);
    });
}

function crearBurbuja(contenedor) {
    const burbuja = document.createElement('div');
    burbuja.classList.add('burbuja-flotante');

    const tamaño = Math.random() * 55 + 30;
    burbuja.style.width = `${tamaño}px`;
    burbuja.style.height = `${tamaño}px`;
    burbuja.style.left = `${Math.random() * 95}%`;

    const duracion = Math.random() * 4 + 7;
    burbuja.style.animationDuration = `${duracion}s`;
    burbuja.style.animationDelay = `${Math.random() * 3}s`;

    burbuja.addEventListener('mouseenter', () => {
        burbuja.style.transform = `translate(${Math.random() * 20 - 10}px, -15px) scale(1.1)`;
    });
    burbuja.addEventListener('mouseleave', () => { burbuja.style.transform = ''; });

    burbuja.addEventListener('click', () => {
        burbuja.style.transform = 'scale(1.4)';
        burbuja.style.opacity = '0';
        
        const rect = burbuja.getBoundingClientRect();
        confetti({
            particleCount: 10,
            spread: 35,
            origin: { x: rect.left / window.innerWidth, y: rect.top / window.innerHeight }
        });
        setTimeout(() => { burbuja.remove(); }, 80);
    });

    contenedor.appendChild(burbuja);
}

function iniciarExperiencia() {
    const musica = document.getElementById('musica-beatles');
    if (musica) { musica.play().catch(() => console.log("Interacción requerida para audio.")); }
    document.getElementById('jardin')?.scrollIntoView({ behavior: 'smooth' });
}

const frasesTréboles = [
    "Sabías que... ¡Eres una niña maravillosa con las mejores ideas del mundo entero! Sobrepasas tu gran creatividad.",
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
    alert("Guauf guauf guauf guauf: Eres la novia más hermosa, auténtica y especial de todo el universo entero. No importa cuánto llegues a crecer, siempre te amaré y siempre serás ante mis ojos la niña, la chica, la mujer, la damita de mi vida. JAMÁS DUDES QUE TE AMOOOO MUCHÍSIMO.❤️");
}

function revelarSobre() {
    confetti({ particleCount: 150, spread: 80, colors: ['#bb0a1e', '#ffffff', '#ffb3c1'] });
    const sobre = document.getElementById('contenedor-sobre');
    if (sobre) {
        sobre.classList.remove('oculto');
        setTimeout(() => { sobre.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
    }
}

function abrirCarta() {
    const envelope = document.querySelector('.envelope');
    if (envelope && !envelope.classList.contains('open')) {
        envelope.classList.add('open');
        setTimeout(() => {
            confetti({ particleCount: 30, angle: 60, spread: 55, origin: { x: 0.1, y: 0.6 } });
            confetti({ particleCount: 30, angle: 120, spread: 55, origin: { x: 0.9, y: 0.6 } });
        }, 500);
        cargarCartitaPDF('/docs/Cartita.pdf');
    }
}

function cerrarCarta(event) {
    event.stopPropagation(); 
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.remove('open');
        // Limpiamos estilos inline residuales que confundan al navegador móvil
        const letter = document.querySelector('.letter');
        if (letter) { letter.style.position = ''; letter.style.top = ''; letter.style.left = ''; }
    }
}

function cargarCartitaPDF(url) {
    const viewer = document.getElementById('pdf-viewer');
    if (!viewer || viewer.children.length > 0) return;

    pdfjsLib.getDocument(url).promise.then(pdf => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
                const scale = 2.0; 
                const viewport = page.getViewport({ scale: scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                viewer.appendChild(canvas);
                
                page.render({ canvasContext: context, viewport: viewport });
            });
        }
    }).catch(error => {
        console.error("Error al cargar el PDF:", error);
        viewer.innerHTML = `<p style="color:red; text-align:center; padding:20px;">¡Ups! Tu cartita está lista pero no pudimos renderizarla en local. 😢</p>`;
    });
}

function generarPatitosInfinitos() {
    const contenedor = document.getElementById('patitos-background');
    if (!contenedor) return;

    setInterval(() => {
        const patito = document.createElement('div');
        patito.classList.add('patito-flotante');
        patito.innerText = '🦆'; 

        patito.style.bottom = `${Math.random() * 30 - 15}px`;
        patito.style.left = `${Math.random() * 90}%`;
        
        const duracion = Math.random() * 4 + 7; 
        patito.style.animationDuration = `${duracion}s`;

        patito.addEventListener('click', () => {
            confetti({ particleCount: 15, colors: ['#facc15', '#fef08a'], spread: 40 });
            patito.style.transform = 'scale(0) rotate(360deg)';
            setTimeout(() => { patito.remove(); }, 300);
        });

        contenedor.appendChild(patito);
        setTimeout(() => { patito.remove(); }, duracion * 1000);
    }, 2000);
}