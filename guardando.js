// Generar colores aleatorios
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




// // Crear 25 divs con tamaños aleatorios
// const container = document.querySelector('.container');
// for (let i = 0; i < 25; i++) {
//     const div = document.createElement('div');
//     div.className = 'content-box';
//     div.style.height = Math.floor(Math.random() * 200 + 100) + 'px';
//     div.style.backgroundColor = getRandomColor();
//     div.textContent = `Box ${i + 1}`;
//     container.appendChild(div);
// }




const timeline = document.querySelector('.timeline');
const marker = document.querySelector('.timeline-marker');
const timer = document.querySelector('.timer');
const ANIMATION_DURATION = 600000; // 10 minutos en milisegundos
let startTime = Date.now();
let isUserScrolling = false;
let userScrollTimeout;

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function animate() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = (elapsed % ANIMATION_DURATION) / ANIMATION_DURATION;

    // Actualizar posición del marcador
    marker.style.left = `${progress * 100}%`;

    // Solo actualizar el scroll si el usuario no está scrolleando
    if (!isUserScrolling) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        container.scrollTop = maxScroll * progress;
    }

    // Actualizar timer
    timer.textContent = formatTime(elapsed % ANIMATION_DURATION);

    requestAnimationFrame(animate);
}

// Iniciar animación inmediatamente
requestAnimationFrame(animate);

// Manejar scroll manual
container.addEventListener('scroll', () => {
    if (!isUserScrolling) {
        isUserScrolling = true;
        // Actualizar el tiempo basado en la posición del scroll
        const progress = container.scrollTop / (container.scrollHeight - container.clientHeight);
        startTime = Date.now() - (ANIMATION_DURATION * progress);
    }

    // Limpiar el timeout anterior si existe
    clearTimeout(userScrollTimeout);

    // Establecer un nuevo timeout
    userScrollTimeout = setTimeout(() => {
        isUserScrolling = false;
    }, 1000); // Volver a la animación automática después de 1 segundo sin scroll
});

// Manejar clicks en la línea de tiempo
timeline.addEventListener('click', (e) => {
    const rect = timeline.getBoundingClientRect();
    const clickPercentage = ((e.clientX - rect.left) / rect.width);
    startTime = Date.now() - (ANIMATION_DURATION * clickPercentage);
    isUserScrolling = false;
});

// Manejar clicks en los divs
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('content-box')) {
        const boxes = Array.from(document.querySelectorAll('.content-box'));
        const clickedBox = e.target;
        const totalHeight = container.scrollHeight - container.clientHeight;
        const boxTop = clickedBox.offsetTop;
        const percentage = boxTop / totalHeight;
        startTime = Date.now() - (ANIMATION_DURATION * percentage);
        isUserScrolling = false;
    }
});