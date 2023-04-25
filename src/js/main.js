let maxPageYOffset = 0

window.addEventListener('scroll', function() {
  if(pageYOffset > 0){
       document.querySelector('.header').classList.add('header_bg');
       
  }
  else {
      document.querySelector('.header').classList.remove('header_bg');
      document.querySelector('.header').classList.remove('header_hidden');
  }

  if(pageYOffset > maxPageYOffset) {
    maxPageYOffset = pageYOffset;
    document.querySelector('.header').classList.add('header_hidden');
  }
  else if(pageYOffset < maxPageYOffset - 50){
    document.querySelector('.header').classList.remove('header_hidden');
    maxPageYOffset = pageYOffset;
  }
});

// heder burger menu
function openMenu(){
    document.getElementsByClassName('burger-btn')[0].classList.toggle('active');
    document.getElementsByClassName('burger_main')[0].classList.toggle('active');
    document.getElementsByClassName('header_burger')[0].classList.toggle('active');
    document.getElementsByTagName('body')[0].classList.toggle('scroll-hidden');
}

// animation
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ( (pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } 
            else {
                animItem. classList.remove('_active');
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    animOnScroll();
}
// FAQ
const btns = document.getElementsByClassName('faq_btn');
const answers = document.getElementsByClassName('faq_answer');
function showAnswer(num){
  btns[num - 1].classList.toggle('show');
  answers[num - 1].classList.toggle('show');
}

// module
const module_btns = document.getElementsByClassName('module_btn');
const module_text = document.getElementsByClassName('tariff_module_body');
function showModuleText(num){
  for (let i = 0; i < module_text.length; i++) {
    if(i !== num-1){
      module_text[i].classList.remove('show');
      module_btns[i].classList.remove('show');
    }
  }
  module_btns[num - 1].classList.toggle('show');
  module_text[num - 1].classList.toggle('show');
}

// review
const review_btns = document.getElementsByClassName('all_text');
const review_text = document.getElementsByClassName('review_text');
let flag = true
function showAllText(num){
    review_btns[num - 1].innerHTML = flag ? "Скрыть" : "Читать дальше";
    review_text[num - 1].classList.toggle('review_text_all');
    flag = !flag
}




// Me slider
var swiper = new Swiper(".me-swiper", {
    loop: true,
    // effect: "fade",
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // review slider
var keys_swiper = new Swiper(".keys-swiper", {
    autoHeight: true,
    spaceBetween: 20,
});

var review_swiper = new Swiper(".review-swiper", {
    effect: "cards",
    // loop: true,
    grabCursor: true,
});

var flipSwiper = new Swiper(".flip", {
    effect: "flip",
    grabCursor: true,
    loop: true,
    autoHeight: true,
    navigation: {
        nextEl: ".flip",
    },
});

// Projects slider
class SlideStories {
    constructor(id) {
      this.slide = document.querySelector(`[data-slide=${id}]`);
      this.active = 0;
      this.init();
    }
  
    activeSlide(index) {
      this.active = index;
      this.items.forEach((item) => {
        item.classList.remove("active");
      });
      this.items[index].classList.add("active");
      this.thumbItems.forEach((item) => {
        item.classList.remove("active");
      });
      this.thumbItems[index].classList.add("active");
      this.autoSlide();
    }
  
    prev() {
      if (this.active > 0) {
        this.activeSlide(this.active - 1);
      } else {
        this.activeSlide(this.items.length - 1);
      }
    }
  
    next() {
      if (this.active < this.items.length - 1) {
        this.activeSlide(this.active + 1);
      } else {
        this.activeSlide(0);
      }
    }
  
    addNavigation() {
      const nextBtn = this.slide.querySelector(".slide-next");
      const prevBtn = this.slide.querySelector(".slide-prev");
      nextBtn.addEventListener("click", this.next);
      prevBtn.addEventListener("click", this.prev);
    }
  
    addThumbItems() {
      this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
      this.thumbItems = Array.from(this.thumb.children);
    }
  
    autoSlide() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.next, 17000);
    }
  
    init() {
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
      this.items = this.slide.querySelectorAll(".slide-items > *");
      this.thumb = this.slide.querySelector(".slide-thumb");
      this.addThumbItems();
      this.activeSlide(0);
      this.addNavigation();
    }
  }
  
  new SlideStories("slide");



function sendWhats(tariff, kaspi) {
    const number = 77761756690

    let msg = `Здравствуйте, я хочу записаться на ${tariff} тариф ${ kaspi ? 'через каспи рассрочку.' : '.' }`

    window.location=`https://wa.me/${number}?text=${encodeURI(msg)}`
}

const deadline = new Date();
deadline.setMilliseconds(4 * 55 * 60 * 1000);
var countDownDate = deadline.getTime();

function getDedline() {

}

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    const text = hours + "ч "
        + minutes + "м " + seconds + "с ";
    document.getElementById("demo1").innerHTML = text;
    document.getElementById("demo2").innerHTML = text;
    document.getElementById("demo3").innerHTML = text;


    // If the count down is over, write some text
    if (distance < 9900000) {
        setInterval()
    }
}, 1000);
