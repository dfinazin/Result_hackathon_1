import { Menu } from './core/menu';
import { MessageModule } from './modules/timur-message.module.js';
import { randomBackgroundColor } from './modules/Dmitry-randomBackgroundColor.module.js';
import { BoardModule } from './modules/Vlad-board.module.js';
import { RandomFigure } from './modules/Almaz-randomFigure.module.js';
import { JokesModule } from './modules/kritprogram-jokes.module.js';
import { CryptoVolumeModule } from './modules/timur-crypto.module.js';
import { countdownTimerModule } from './modules/Anastasia-timer.module.js';
import { RandomDogPic } from './modules/Vlad-randomDogPic.module.js';

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector);

        this.el = document.querySelector(selector);
    }

    open(posX, posY) {
        this.el.classList.add('open');
        this.el.style.top = `${posY}px`;
        this.el.style.left = `${posX}px`;
    }

    add(module) {
        this.el.innerHTML += module;
    }

    close() {
        this.el.classList.remove('open');
    }
}

function getMenuSize(menuElement) {
    const prevDisplay = menuElement.style.display;
    const prevVisibility = menuElement.style.visibility;
    const prevTop = menuElement.style.top;
    const prevLeft = menuElement.style.left;

    let needRestore = false

    if (getComputedStyle(menuElement).display === 'none') {
        menuElement.style.visibility = 'hidden';
        menuElement.style.display = 'block';
        menuElement.style.top = '-9999px';
        menuElement.style.left = '-9999px';
        needRestore = true;
    }

    const width = menuElement.offsetWidth;
    const height = menuElement.offsetHeight;

    if (needRestore) {
        menuElement.style.display = prevDisplay;
        menuElement.style.visibility = prevVisibility;
        menuElement.style.top = prevTop;
        menuElement.style.left = prevLeft;
    }

    return { width, height }
}

const messageModule = new MessageModule();
const menuModule = new ContextMenu('#menu');
const menuElement = document.querySelector('#menu');

const randomBackgroundModule = new randomBackgroundColor();
const boardModule = new BoardModule();
const randomFigure = new RandomFigure();
const jokesModule = new JokesModule();
const cryptoModule = new CryptoVolumeModule();
const timerModule = new countdownTimerModule();
const randomDogPic = new RandomDogPic();

menuModule.add(messageModule.toHTML());
menuModule.add(randomBackgroundModule.toHTML());
menuModule.add(boardModule.toHTML());
menuModule.add(randomFigure.toHTML());
menuModule.add(jokesModule.toHTML());
menuModule.add(cryptoModule.toHTML());
menuModule.add(timerModule.toHTML());
menuModule.add(randomDogPic.toHTML());

document.addEventListener('contextmenu', (event) => {
    event.preventDefault()

    const { width: menuWidth, height: menuHeight } = getMenuSize(menuElement)

    let x = event.clientX
    let y = event.clientY

    if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - (menuWidth + 10)
    }
    if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - (menuHeight + 10)
    }

    menuModule.open(x, y)
})

let activeModule = null;
menuElement.addEventListener('click', (event) => {
    const type = event.target.dataset.type;

    if (typeof activeModule?.remove === 'function') {
        activeModule.remove();
    }

    if (type === "message") {
        messageModule.trigger("Здесь находится какой-то текст");
        activeModule = messageModule;
        menuModule.close();
    }

    if (type === "randomBackgroundColor") {
        randomBackgroundModule.trigger();
        activeModule = null;
        menuModule.close();

    }

    if (type === "board") {
        boardModule.trigger();
        activeModule = boardModule;
        menuModule.close();

    }

    if (type === "randomFigure") {
        randomFigure.trigger();
        activeModule = randomFigure;
        menuModule.close();

    }

    if (type === "jokes") {
        jokesModule.trigger();
        activeModule = jokesModule;
        menuModule.close();

    }

    if (type === "crypto") {
        cryptoModule.trigger();
        activeModule = cryptoModule;
        menuModule.close();

    }

    if (type === "countdownTimer") {
        timerModule.trigger();
        activeModule = timerModule;
        menuModule.close();

    }

    if (type === "randomDogPic") {
        randomDogPic.trigger();
        activeModule = randomDogPic;
        menuModule.close();

    }

    menuModule.close();
})
