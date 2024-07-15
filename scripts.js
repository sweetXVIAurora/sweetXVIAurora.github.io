document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('background-audio');
    const audioIcon = document.getElementById('audioIcon');
    const musicControlButton = document.getElementById('musicControlButton');

    musicControlButton.style.display = 'none';

    // Fecha para cuenta regresiva
    var countdownDate = new Date("Sep 13, 2024 19:30:00").getTime();

    // Cuenta regresiva
    var countdownFunction = setInterval(function () {
        var now = new Date().getTime();
        var distance = countdownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("timer").innerHTML = "¡La fiesta ha comenzado!";
            document.getElementById("wait-time").innerHTML = "";
        }
    }, 1000);

    // Animaciones al aparecer
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    let items = ['invitation-item-date', 'invitation-item-dresscode', 'invitation-item-address', 'invitation-item-attendance', 'invitation-item-message', 'invitation-item-bye'];
    items.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            observer.observe(element);
        }
    });

    // Dirigir al WhatsApp de Aurora con mensaje predeterminado
    const fixedButton = document.getElementById('celular');
    fixedButton.addEventListener('click', function () {
        window.location.href = 'https://wa.me/15521801762?text=¡Hola!%20quiero%20confirmar%20mi%20asistencia%20a%20tu%20fiesta';
    });

    // Restaurar el estado del audio al cargar la página
    const audioState = localStorage.getItem('audioState');
    if (audioState === 'paused') {
        audio.pause();
        audioIcon.src = 'botonSilencio.png'; // Cambia a la imagen de reproducción
    } else {
        audio.play();
        localStorage.setItem('audioState', 'playing');
        audioIcon.src = 'botonMusica.png'; // Cambia a la imagen de pausa
    }

    // Pausar el audio cuando la página no está visible
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            if (!audio.paused) {
                audio.pause();
                localStorage.setItem('audioState', 'playing'); // Guardar estado del audio
                audioIcon.src = 'botonSilencio.png'; // Cambia a la imagen de reproducción
            }
        } else {
            if (localStorage.getItem('audioState') === 'playing') {
                audio.play();
                audioIcon.src = 'botonMusica.png'; // Cambia a la imagen de pausa
            }
        }
    });

    // Ajusta la altura al cargar la página
    setFullscreenHeight();
    // Ajusta la altura cuando se redimensiona la ventana
    window.addEventListener('resize', setFullscreenHeight);
});

function toggleMusic() {
    const audio = document.getElementById('background-audio');
    const audioIcon = document.getElementById('audioIcon');

    if (audio.paused) {
        audio.play();
        localStorage.setItem('audioState', 'playing'); // Guardar estado del audio
        audioIcon.src = 'botonMusica.png'; // Cambia a la imagen de pausa
    } else {
        audio.pause();
        localStorage.setItem('audioState', 'paused'); // Guardar estado del audio
        audioIcon.src = 'botonSilencio.png'; // Cambia a la imagen de reproducción
    }
}

function setFullscreenHeight() {
    document.querySelector('#initial-view').style.height = `${window.innerHeight}px`;
}

// FUNCIÓN: Cuando se hace click en el botón inicial (Let's Party)
document.getElementById('initial-button').addEventListener('click', function () {
    // Muestra el botón de control de audio
    document.getElementById('musicControlButton').style.display = 'inline-block';

    // Mostrar el contenido principal con animación
    var mainContent = document.getElementById('main-content');
    mainContent.classList.add('show');

    // Reproducir el audio de fondo
    const audio = document.getElementById('background-audio');
    audio.play();
    localStorage.setItem('audioState', 'playing'); // Guardar estado del audio

    // Asegurar que el icono sea el correcto
    const audioIcon = document.getElementById('audioIcon');
    audioIcon.src = 'botonMusica.png'; // Cambia a la imagen de pausa
});