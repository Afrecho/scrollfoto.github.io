document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
  
    videos.forEach(video => {
      // Reproducir al pasar el cursor
      video.addEventListener('mouseenter', () => {
        alert("funcionando");
        video.play();
      });
  
      // Pausar al quitar el cursor
      video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;  // o volver al inicio
      });
    });
  });
  