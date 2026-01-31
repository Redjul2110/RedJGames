const button = document.getElementById('continueBtn');
const logo = document.querySelector('.logo-text');

const loader = document.querySelector('.loader');

button.addEventListener('click', () => {
  // Text & Button verschwinden lassen
  logo.classList.add('fade-out');
  button.classList.add('fade-out');

  // Loader einblenden
  setTimeout(() => {
    loader.style.opacity = '1';

    // Weiterleitung nach 0-1 Sekunde
    const delay = Math.random() * 2000;
    setTimeout(() => {
      window.location.href = "https://redjgames.base44.app/";
    }, delay);
  }, 500); // kurz warten, bis Fade-Out fertig ist
});
