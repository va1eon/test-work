document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn');
  const form = document.querySelector('#requestForm');

  const btnClick = (event) => {
    smoothScroll(event);
    if(form) {
      form.querySelector('.request__form-input').select();
      form.querySelector('.request__form-input').focus();
    }
  }

  const smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - 80;
    const duration = 1000;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      window.scrollTo(0, distance * (progress / duration) + startPosition);
      if (progress < duration) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  for (let btn of buttons) {
    if (btn.getAttribute('href')[0] === '#') {
      btn.addEventListener('click', btnClick);
    }
  }

  const reviewsSlider = new Swiper('.reviews', {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    wrapperClass: 'reviews__list',
    slideClass: 'reviews__item',
    loop: true,
    slidesPerView: 1,
  });

  const inputTel = document.querySelector('#tel');

  inputTel.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/[^+\d]/g, '');
  })

  const timerDiv = document.querySelector('.timer');
  let timeMinute = 30 * 60;

  let timer = setInterval(function () {
    let minutes = timeMinute / 60;
    let seconds = timeMinute % 60;
    if(seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (timeMinute <= 0) {
      clearInterval(timer);
    } else {
      timerDiv.innerHTML = `${Math.trunc(minutes)}:${seconds}`;
    }
    --timeMinute;
  }, 1000)
});