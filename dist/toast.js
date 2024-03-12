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
        this.toastContainer = document.querySelector(`.toast__container`);
        this.options = options;
        Object.entries(this.options).forEach(([key, value]) => {
            this[key] = value;
        });
        this.close();
    }
    set position(value) {
        // If the toast container already exists, update its position
        if (this.toastContainer) {
            // Set the data-position attribute
            this.toastContainer.setAttribute("data-position", value);
            this.toastContainer.insertAdjacentHTML("beforeend", this.markup());
        }
        else {
            // Otherwise, create the container with the specified position
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
    remove() {
        if (this.toastContainer) {
            this.toastContainer.remove();
        }
    }
    close() {
        document.querySelector('.icon__close').addEventListener('click', e => {
            this.toastContainer.style.display = 'none';
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
        <!-- iocn -->
        <div class="icon__wrapper">
          <div class="icon__overlay "></div>
          <svg class="icon__picture">
            <use xlink:href="image/sprite.svg#icon-${iconName}"></use>
          </svg>
        </div>

        <!-- message -->
        <div class="message">
          <h3 class="title-text">Success</h3>
          <p class="body-text"> &nbsp;</p>
        </div>
        <!-- close btn -->
        <div class="icon__wrapper">
          <svg class="icon__close">
            <use xlink:href="image/sprite.svg#icon-cancel-circle"></use>
          </svg>
        </div>
      </div>
    </div> `;
    }
}
function createContainer(position) {
    const container = document.createElement("div");
    container.dataset.position = position;
    container.classList.add(`toast__container`);
    document.body.append(container);
    return container;
}
const toast = new Toast({ position: "top-right", text: "Hello world!", type: 'info' });
// setTimeout(()=>{
//   toast.remove()
// },1000)
