"use strict";
var SVG;
(function (SVG) {
    SVG["success"] = "check-alt";
    SVG["error"] = "x-altx-alt";
    SVG["info"] = "notification";
    SVG["warning"] = "warning";
})(SVG || (SVG = {}));
class Toast {
    constructor(options) {
        this.defaultOptions = {
            position: "top-right",
            text: "",
            type: "success",
            autoClose: false
        };
        this.options = Object.assign(Object.assign({}, this.defaultOptions), options);
        this.toastContainer = createContainer(this.options.position);
        Object.entries(this.options).forEach(([key, value]) => {
            this[key] = value;
        });
        this.close();
    }
    set position(value) {
        if (this.toastContainer) {
            this.toastContainer.setAttribute("data-position", value);
            this.toastContainer.insertAdjacentHTML("beforeend", this.markup());
        }
        else {
            this.toastContainer = createContainer(value);
            this.toastContainer.insertAdjacentHTML("beforeend", this.markup());
        }
    }
    set type(value) {
        this.toastContainer.classList.add(`toast__container-${value}`);
        document.querySelector('.icon__overlay').classList.add(`icon__overlay-${value}`);
        document.querySelector('.icon__picture').classList.add(`icon__picture-${value}`);
        document.querySelector('.toast__messageBox .message .title-text').textContent = value;
    }
    set text(value) {
        document.querySelector(`.toast__messageBox .message .body-text`).textContent = value;
    }
    set autoClose(value) {
        if (value) {
            setTimeout(() => { this.remove(); }, 5000);
        }
    }
    remove() {
        if (this.toastContainer) {
            this.toastContainer.remove();
        }
    }
    close() {
        document.querySelector('.icon__close').addEventListener('click', e => {
            this.toastContainer.remove();
        });
    }
    markup() {
        let iconName = SVG.success;
        if (this.options.type === 'success')
            iconName = SVG.success;
        if (this.options.type === 'error')
            iconName = SVG.error;
        if (this.options.type === 'info')
            iconName = SVG.info;
        if (this.options.type === 'warning')
            iconName = SVG.warning;
        return `<div class="toast__messageBox">
        <!-- icon -->
        <div class="icon__wrapper">
          <div class="icon__overlay "></div>
          <svg class="icon__picture">
            <use xlink:href="image/sprite.svg#icon-${iconName}"></use>
          </svg>
        </div>

        <!-- message -->
        <div class="message">
          <h3 class="title-text">${this.options.type || "Success"}</h3>
          <p class="body-text">${this.options.text || "&nbsp;"}</p>
        </div>
        <!-- close button -->
        <div class="icon__wrapper">
          <svg class="icon__close">
            <use xlink:href="image/sprite.svg#icon-cancel-circle"></use>
          </svg>
        </div>
      </div>`;
    }
}
function createContainer(position) {
    const container = document.createElement("div");
    container.dataset.position = position;
    container.classList.add(`toast__container`);
    document.body.append(container);
    return container;
}
const toast = new Toast({ position: "top-right", text: "Hello world!", type: 'success', autoClose: true });
