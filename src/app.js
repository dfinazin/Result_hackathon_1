import "./styles.css";
import "./menu.js";


document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const welcome = document.getElementById('welcome-screen');

    startBtn.addEventListener('click', () => {
        welcome.style.display = 'none';
    });
});