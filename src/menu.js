import { Menu } from './core/menu'
import { MessageModule } from './modules/timur-message.module.js'
import { randomBackgroundColor } from './modules/Dmitry-randomBackgroundColor.module.js';
import { BoardModule } from './modules/Vlad-board.module.js';


export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector);

        this.el = document.querySelector(selector);
    }

    open(posX, posY) {
        this.el.classList.add("open");
        this.el.style.top = `${posY}px`;
        this.el.style.left = `${posX}px`;
    }

    add(module) {
        this.el.innerHTML += module;
    }

    close() {
        this.el.classList.remove("open");
    }
}

function getMenuSize(menuElement) {
    const prevDisplay = menuElement.style.display;
    const prevVisibility = menuElement.style.visibility;
    const prevTop = menuElement.style.top;
    const prevLeft = menuElement.style.left;

    let needRestore = false;

    if (getComputedStyle(menuElement).display === "none") {
        menuElement.style.visibility = "hidden";
        menuElement.style.display = "block";
        menuElement.style.top = "-9999px";
        menuElement.style.left = "-9999px";
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

    return { width, height };
}

const messageModule = new MessageModule();
const menuModule = new ContextMenu("#menu");
const menuElement = document.querySelector("#menu");

const randomBackgroundModule = new randomBackgroundColor();
const boardModule = new BoardModule();


menuModule.add(messageModule.toHTML());
menuModule.add(randomBackgroundModule.toHTML());
menuModule.add(boardModule.toHTML());

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    const { width: menuWidth, height: menuHeight } = getMenuSize(menuElement);

    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - (menuWidth + 10);
    }
    if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - (menuHeight + 10);
    }

    menuModule.open(x, y);
});

menuElement.addEventListener('click', (event) => {
    if (event.target.dataset.type === "message") {
        messageModule.trigger("Здесь находится какой то текст");
        menuModule.close();
    }
    if (event.target.dataset.type === "randomBackgroundColor") {
        randomBackgroundModule.trigger();
        menuModule.close();
    }
    if (event.target.dataset.type === "board") {
        boardModule.trigger();
        menuModule.close();
    }
})

