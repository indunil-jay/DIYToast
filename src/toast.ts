interface Options {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  text?: string;
  type?: string;
  autoClose?: boolean;
  showProgress?:boolean
  showRemainSeconds?:boolean;
  duration?: number
}

enum SVG {
  success = "check-alt",
  error = "x-altx-alt",
  info = "notification",
  warning = "warning"
}

class Toast {
  private options: Options;
  private toastContainer: HTMLDivElement;
  private progressBar: HTMLDivElement | null = null;
  private remainSecondsContainer: HTMLDivElement | null = null;
  private progressInterval: number | null = null;
  private progressTime: number = 0;
  private readonly progressDuration: number = 10000; 
  private showProgress: boolean = false;
  private showRemainSeconds: boolean = false;

  private progressContainer: HTMLElement | null = null;
  private isPaused: boolean = false;

  private defaultOptions: Options = {
    position: "top-right",
    text: "",
    type: "success",
    autoClose: false,
    showProgress: false,
    showRemainSeconds: false,

  };

  constructor(options: Options) {
    this.options = { ...this.defaultOptions, ...options };
    this.toastContainer = createContainer(this.options.position!);

    Object.entries(this.options).forEach(([key, value]) => {
      (this[key as keyof Toast] as any) = value;
    });

    if (this.showProgress) {
      this.setupProgress();
         document.querySelector('.toast__progress-bar')!.classList.add(`toast__progress-bar-${this.options.type}`)

    }
    if (this.showRemainSeconds) {
      this.setupRemainSeconds();
    }

    this.progressContainer = this.progressBar ? this.progressBar.parentElement : null;
    if (this.progressContainer) {
      this.progressContainer.addEventListener('mouseenter', this.pauseProgress.bind(this));
      this.progressContainer.addEventListener('mouseleave', this.resumeProgress.bind(this));
    }

    this.close();
  }
  private pauseProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.isPaused = true;
    }
  }

  private resumeProgress() {
    if (this.isPaused) {
      this.progressInterval = setInterval(this.updateProgress.bind(this), 100);
      this.isPaused = false;
    }
  }

  private setupProgress() {
    if (this.options.autoClose) {
      this.progressTime = 0;
      this.progressBar = document.createElement("div");
      this.progressBar.classList.add(`toast__progress-bar`);
      this.toastContainer.appendChild(this.progressBar);
      this.progressInterval = setInterval(this.updateProgress.bind(this), 100);
    }
  }

  private setupRemainSeconds() {
    if (this.options.autoClose) {
      
      this.remainSecondsContainer = document.createElement("div");
      this.remainSecondsContainer.classList.add("toast__remain-seconds");
      this.toastContainer.appendChild(this.remainSecondsContainer);
      this.remainSecondsContainer.innerText = `${(this.progressDuration / 1000).toFixed(0)}s remaining`;
    }
  }

  private updateProgress() {
    if (this.progressBar) {
      this.progressTime += 100;
      const progressWidth = (this.progressTime / this.progressDuration) * 100;
      this.progressBar.style.width = `${progressWidth}%`;

      if (this.remainSecondsContainer) {
        const remainSeconds = ((this.progressDuration - this.progressTime) / 1000).toFixed(0);
        this.remainSecondsContainer.innerText = `${remainSeconds}s remaining`;
      }

      if (this.progressTime >= this.progressDuration) {
        this.remove();
        clearInterval(this.progressInterval!);
      }
    }
  }

  set position(value: string) {
    if (this.toastContainer) {
      this.toastContainer.setAttribute("data-position", value);
      this.toastContainer.insertAdjacentHTML("beforeend", this.markup());
    } else {
      this.toastContainer = createContainer(value);
      this.toastContainer.insertAdjacentHTML("beforeend", this.markup());
    }
  }

  set type(value: string) {
    this.toastContainer.classList.add(`toast__container-${value}`);
    document.querySelector('.icon__overlay')!.classList.add(`icon__overlay-${value}`);
    document.querySelector('.icon__picture')!.classList.add(`icon__picture-${value}`);
    document.querySelector('.toast__messageBox .message .title-text')!.textContent = value;

 
  }

  set text(value: string) {
    document.querySelector(`.toast__messageBox .message .body-text`)!.textContent = value;
  }

  set autoClose(value: boolean) {
    if (value) {
      setTimeout(() => { this.remove(); }, this.progressDuration);
    }
  }

  public remove() {
    if (this.toastContainer) {
      this.toastContainer.remove();
    }
  }

  private close() {
    document.querySelector('.icon__close')!.addEventListener('click', e => {
      this.toastContainer.remove();
    });
  }

  private markup() {
    let iconName: SVG = SVG.success;
    if (this.options.type === 'success') iconName = SVG.success;
    if (this.options.type === 'error') iconName = SVG.error;
    if (this.options.type === 'info') iconName = SVG.info;
    if (this.options.type === 'warning') iconName = SVG.warning;

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

function createContainer(position: string) {
  const container = document.createElement("div");
  container.dataset.position = position;
  container.classList.add(`toast__container`);
  document.body.append(container);
  return container;
}

const toast = new Toast({ position: "top-right", text: "Hello world!", type: 'error', autoClose: true,showProgress:true,showRemainSeconds:true });
