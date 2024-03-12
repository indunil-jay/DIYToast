"use strict";
class Toast {
    constructor(options) {
        this.options = options;
        Object.entries(this.options).forEach(([key, value]) => {
            this[key] = value;
        });
        this.createContainer();
        this.toggleBtn();
    }
    toggleBtn() {
        var _a;
        (_a = document.querySelector('.toggleBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            var _a;
            (_a = document.querySelector('.toast__container')) === null || _a === void 0 ? void 0 : _a.classList.toggle('hidden');
        });
    }
    show() { }
    update() { }
    remove() { }
    createContainer() {
        const html = `   <div class="toast__container" data-position=${this.options.position}>
      <div class="toast__messageBox">
        <!-- iocn -->
        <div class="icon__wrapper">
          <div class="icon__overlay "></div>
          <svg class="icon__picture ">
            <use xlink:href="image/sprite.svg#icon-check-alt"></use>
          </svg>
        </div>

        <!-- message -->
        <div class="message">
          <h3 class="title-text">Success</h3>
          <p class="body-text">Lorem ipsum dolor sit amet elit sit amet eli.</p>
        </div>
        <!-- close btn -->
        <div class="icon__wrapper">
          <svg class="icon__close">
            <use xlink:href="image/sprite.svg#icon-cancel-circle"></use>
          </svg>
        </div>
      </div>
</div>
    
  `;
        document.body.insertAdjacentHTML('afterbegin', html);
    }
}
const app = new Toast({ position: 'top-right' });
