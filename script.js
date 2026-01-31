// Weiterleitung bei Button-Klick
document.getElementById('continueBtn').addEventListener('click', () => {
    const loader = document.querySelector('.loader');
    loader.style.transform = 'scale(1.5)';
    loader.style.transition = 'transform 0.5s ease';

    setTimeout(() => {
        window.location.href = "https://redjgames.base44.app/";
    }, 500);
});
