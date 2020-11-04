import refs from './refs';

const spinerMarkup = `
<div class="spiner-wrap">
  <div class="spiner">
  <span class="svg-spinner">
    <svg
      width="70px"
      height="70px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient
        id="spiner-gradient"
        x1="50%"
        y1="70%"
        x2="80%"
        y2="60%"
        spreadMethod="pad"
      >
        <stop offset="0%" stop-color="#ff0000" stop-opacity="1" />
        <stop offset="100%" stop-color="#ff0000" stop-opacity="0" />
      </linearGradient>
      <circle
        class="path"
        fill="none"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke="url(#spiner-gradient)"
        cx="8"
        cy="8"
        r="7"
      ></circle>
    </svg>
  </span>
  </div>
</div>
`

const spiner = {
  spinerWrap: '',

  show() {    
    if(!this.spinerWrap){
      refs.cleanBoxWrp.insertAdjacentHTML('beforebegin', spinerMarkup); 
    } 

    this.spinerWrap = document.querySelector('.spiner-wrap');
    this.spinerWrap.classList.remove('is-hidden');    
  },

  hide(){    
    this.spinerWrap.classList.add('is-hidden');
  }
}

export default spiner;