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
var review_swiper = new Swiper(".review-swiper", {
  effect: "cards",
  // loop: true,
  grabCursor: true,
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
  



// Open cantact menu
let this_tariff = "";
function popupMenuStart(tariff){
  const name = document.getElementsByClassName("popup_curse_name")[0];
  const price = document.getElementsByClassName("popup_curse_price")[0];

  if(tariff !== "69"){
    this_tariff = tariff;
    name.innerHTML = tariff;

    if(tariff === "OZIM"){
      price.innerHTML = "14 990тг";
    }
    else if(tariff === "BIRGE"){
      price.innerHTML = "25 990тг";
    }
    
  }
  document.getElementsByClassName("popup")[0].classList.remove('popup_active');
  document.getElementsByClassName("popup")[0].classList.toggle('popup_start_active');
  document.getElementsByClassName('popup_start')[0].style.display = "flex";
  document.getElementsByClassName('popup_container')[0].style.display = "none";
  document.getElementsByClassName('popup_thanks')[0].style.display = "none";
}
function popupMenu(){
  document.getElementsByClassName("input_tariff")[0].value = this_tariff;

  document.getElementsByClassName('popup_start')[0].style.display = "none";
  document.getElementsByClassName("popup")[0].classList.remove('popup_start_active');

  document.getElementsByClassName("popup")[0].classList.toggle('popup_active');
  document.getElementsByClassName('popup_container')[0].style.display = "flex";
  document.getElementsByClassName('popup_thanks')[0].style.display = "none";
  document.getElementsByClassName('invalid_message')[0].style.display = 'none';
}
function popupMenuThanks(){
  document.getElementsByClassName("popup")[0].classList.remove('popup_active');
  document.getElementsByClassName('popup_container')[0].style.display = "flex";
  document.getElementsByClassName('popup_thanks')[0].style.display = "none";
}


// Sending form values
const form = document.getElementById("form");
const fileInput = document.getElementById('file-select');

fileInput.addEventListener('change', function (e) {
  let countFiles = '';
        if (fileInput.files && fileInput.files.length >= 1)
          countFiles = fileInput.files.length;
  
        if (countFiles)
          document.getElementsByClassName('contact-form__file-text')[0].innerText = 'Выбрано файлов: ' + countFiles;
})

document.querySelector('.call_me').addEventListener('click', event => {
  if(form.checkValidity() && phone.value.length == 16 
     && fileInput.files[0]){
      submitVal();
}
else{
  document.getElementsByClassName('invalid_message')[0].innerHTML = "Введите корректные данные!";
  document.getElementsByClassName('invalid_message')[0].style.display = 'block';
}

});

const name = document.getElementById('name');
const phone = document.getElementById('phone');
const tariff = document.getElementById('curse');
const file = document.getElementById('file-select');

const TOKEN = '5431914503:AAFMujAqZpfI2Y6I8PMbp5mPz2MmbzcLi-0';
const CHATID = '-669738154';
const URL_API_MESSAGE = `https://api.telegram.org/bot${ TOKEN }/sendMessage`
const URL_API_DOCUMENT = `https://api.telegram.org/bot${ TOKEN }/sendDocument`
function submitVal(){
  const phoneVal = phone.value ;
  const nameVal = name.value ;
  const tariffVal = tariff.value ;
  const fileVal = file.files[0];
  let d = new Date();
  let dformat =  [d.getDate(),
                  d.getMonth()+1,
                  d.getFullYear()].join('.')+' '+
                 [d.getHours(),
                  d.getMinutes(),
                  d.getSeconds()].join(':');
  
  let message = "";
  message += `Имя клиента: <b>${ nameVal }</b> \n`;
  message += `Тариф: <b>${ tariffVal }</b> \n`;
  message += `Телефон:  +7 ${ phoneVal } \n`;
  message += `Время: ${ dformat } \n`;

  const formData = new FormData();
  formData.append('chat_id', CHATID);
  formData.append('document', fileVal);
  formData.append('caption', message);
  formData.append('parse_mode', "html")
  axios.post(URL_API_DOCUMENT, formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((res) => {
    document.getElementsByClassName('popup_container')[0].style.display = "none";
    document.getElementsByClassName('popup_thanks')[0].style.display = "flex";
    document.getElementsByClassName('popup')[0].classList.add('thanks_active');
  })
  .catch((err) => {
    const error = document.getElementsByClassName('invalid_message')[0];
    error.innerHTML = "Ошибка отправки";
    error.style.display = 'block';
  })
  

}


// function sendWhats(){
//   popupMenu();

//   let nameVal = name.value ;
//   const phoneNumber = "77051611222";

//   let message = '';

//       message += 'Здравствуйте!' + '\r\n';
//       message += 'Меня зовут ' + nameVal +'.'+ '\r\n';
//       message += 'Я хочу получить консультацию.';

//   window.location = 'https://wa.me/'+phoneNumber+'?text=' + encodeURI(message);
// }

// Copy text
function copyText() {

  // Card number
  const text = "4400 0000 0000 0000";
  const num = document.getElementById("kaspi_num");
  num.select();
  let retVal = document.execCommand("copy");
  if(retVal){
    alert("Cкопировано в буфер обмена");
  }
}

// formating phone number
const isNumericInput = (event) => {
  const key = event.keyCode;
  return ((key >= 48 && key <= 57) || // Allow number line
          (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = (event) => {
  const key = event.keyCode;
  return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
      (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
      (key > 36 && key < 41) || // Allow left, up, right, down
      (
          // Allow Ctrl/Command + A,C,V,X,Z
          (event.ctrlKey === true || event.metaKey === true) &&
          (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
      )
};

const enforceFormat = (event) => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if(!isNumericInput(event) && !isModifierKey(event)){
      event.preventDefault();
  }
};

const formatToPhone = (event) => {
  if(isModifierKey(event)) {return;}

  const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
  const areaCode = input.substring(0,3);
  const middle = input.substring(3,6);
  const last = input.substring(6,10);

  if(input.length > 6){event.target.value = `(${areaCode}) ${middle} - ${last}`;}
  else if(input.length > 3){event.target.value = `(${areaCode}) ${middle}`;}
  else if(input.length > 0){event.target.value = `(${areaCode}`;}
};

const inputElement = document.getElementById('phone');
inputElement.addEventListener('keydown',enforceFormat);
inputElement.addEventListener('keyup',formatToPhone);



function sendWhats(tariff) {
    const number = 77785680719

    const base = "Здравствуйте, я хочу записаться на базовый тариф"
    const premium = "Здравствуйте, я хочу записаться на PREMIUM тариф"
    const vip = "Здравствуйте, я хочу записаться на тариф VIP"

    let msg
    if (tariff === 'base') msg = base
    else if (tariff === 'premium') msg = premium
    else if (tariff === 'vip') msg = vip

    window.location=`https://wa.me/${number}?text=${encodeURI(msg)}`
}
