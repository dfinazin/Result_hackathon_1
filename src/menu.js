import { Menu } from './core/menu'
import { MessageModule } from './modules/message.module.js'

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector)

        this.el = document.querySelector(selector);
    }

    open(posX, posY) {
        this.el.classList.add('open');
        this.el.style.top = `${posY}px`;
        this.el.style.left = `${posX}px`;
    }

    add(module) {
        this.el.innerHTML = module;
    }

    close() {
        this.el.classList.remove('open');
    }
}

const messageModule = new MessageModule();
const menuModule = new ContextMenu('#menu');
const menuElement = document.querySelector('#menu');

menuModule.add(messageModule.toHTML());

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    menuModule.open(event.clientX, event.clientY);
});

menuElement.addEventListener('click', (event) => {
    if (event.target.dataset.type === "message") {
        messageModule.trigger("Уведомление");
        menuModule.close();
    }
})