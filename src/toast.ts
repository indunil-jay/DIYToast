
interface Options {
  position :'top-right'|'top-left'|'bottom-right'|"bottom-left"|"top-center"|"bottom-center";
}


class Toast {
 private options:Options
constructor(options:Options){
   this.options =options
  
    Object.entries(this.options).forEach(([key, value])=>{
    this[key as keyof Toast] = value;
  
    })

  this.createContainer()
  this.toggleBtn()

}


  private toggleBtn(){
    document.querySelector<HTMLButtonElement>('.toggleBtn')?.addEventListener('click', function(){
      document.querySelector<HTMLDivElement>('.toast__container')?.classList.toggle('hidden')
    })
  }
  show(){}
  update(){}
  remove(){}


  createContainer(){
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
    
  `

   document.body.insertAdjacentHTML('afterbegin', html)

 }
}




const app = new Toast({position:'top-right'});