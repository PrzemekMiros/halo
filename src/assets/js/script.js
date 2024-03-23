function appMain() {
/*
const changeTheme = document.querySelector(".change-theme");
let theme = localStorage.getItem("theme");
changeTheme.addEventListener('click', () => {
    if (theme === "dark") {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.add("light");
        theme = "light";
    } else {
        document.querySelector("html").classList.add("dark");
        document.querySelector("html").classList.remove("light");
        theme = "dark";
    }
    localStorage.setItem("theme", theme);
});
if (theme === "dark") {
    document.querySelector("html").classList.add("dark");
}
if (theme === "light") {
    document.querySelector("html").classList.add("light");
};
*/

  // Lazy blur images
  if (document.querySelector(".blur-load")) {
    const blurImgWrap = document.querySelectorAll(".blur-load");
    blurImgWrap.forEach((item) => {
      const img = item.querySelector("picture img");
      function loaded() {
        item.classList.add("loaded");
      }
      if (img.complete) {
        loaded();
      } else {
        img.addEventListener("load", loaded);
      }
    });
  }

if (document.querySelector('.swiper')) {
  var swiper = new Swiper(".swiper", {
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 15,
    lazyPreloadPrevNext: 1,
    centeredSlides: false,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
    keyboard: {
      enabled: true
    },
    mousewheel: false,
    breakpoints: {
      460: {
        slidesPerView: 1.25
      },
      768: {
        slidesPerView: 1.8
      },
      991: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 2
      }
    }
  });
};

if (document.querySelector('.swiper-works')) {
  var swiper = new Swiper(".swiper-works", {
    grabCursor: true,
    spaceBetween: 20,
    lazyPreloadPrevNext: 1,
    centeredSlides: false,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
    keyboard: {
      enabled: true
    },
    mousewheel: false,
  });
};


  // Greeting
  if (document.querySelector("#greeting")) {
    const greeting = document.getElementById("greeting");
    const hour = new Date().getHours();
    const welcomeTypes = ["Dzień dobry !", "Dobry wieczór !"];
    let welcomeText = "";
    if (hour < 20) welcomeText = welcomeTypes[0];
    else welcomeText = welcomeTypes[1];
    greeting.innerHTML = welcomeText;
  }



  (function(){

    var doc = document.documentElement;
    var w   = window;
    var curScroll;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curDirection = 0;
    var prevDirection = 0;
    var header = document.querySelector('.site-header');
    var toggled;
    var threshold = 200;

    var checkScroll = function() {
        curScroll = w.scrollY || doc.scrollTop;
        if(curScroll > prevScroll) {
            // scrolled down
            curDirection = 2;
        }
        else {
            // scrolled up
            curDirection = 1;
        }

        if(curDirection !== prevDirection) {
            toggled = toggleHeader();
        }

        // Add or remove 'scrolled' class based on scroll position
        if (curScroll > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        prevScroll = curScroll;
        if(toggled) {
            prevDirection = curDirection;
        }
    };

    var toggleHeader = function() { 
        toggled = true;
        if(curDirection === 2 && curScroll > threshold) {
            header.classList.add('hide');
        }
        else if (curDirection === 1) {
            header.classList.remove('hide');
        }
        else {
            toggled = false;
        }
        return toggled;
    };

    window.addEventListener('scroll', checkScroll);

})();



if(document.querySelector('.multiform')) {
  
const previousButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const submitButton = document.querySelector('#submit')
const tabTargets = document.querySelectorAll('.tab')
const tabPanels = document.querySelectorAll('.tabpanel')
const isEmpty = (str) => !str.trim().length
let currentStep = 0

// Validate first input on load
validateEntry()

// Next: Change UI relative to current step and account for button permissions
nextButton.addEventListener('click', (event) => {
  event.preventDefault()

  // Hide current tab
  tabPanels[currentStep].classList.add('hidden')
  tabTargets[currentStep].classList.remove('active')

  // Show next tab
  tabPanels[currentStep + 1].classList.remove('hidden')
  tabTargets[currentStep + 1].classList.add('active')
  currentStep += 1
  
  validateEntry()
  updateStatusDisplay()
})

// Previous: Change UI relative to current step and account for button permissions
previousButton.addEventListener('click', (event) => {
  event.preventDefault()

  // Hide current tab
  tabPanels[currentStep].classList.add('hidden')
  tabTargets[currentStep].classList.remove('active')

  // Show previous tab
  tabPanels[currentStep - 1].classList.remove('hidden')
  tabTargets[currentStep - 1].classList.add('active')
  currentStep -= 1

  nextButton.removeAttribute('disabled')
  updateStatusDisplay()
})


function updateStatusDisplay() {
  // If on the last step, hide the next button and show submit
  if (currentStep === tabTargets.length - 1) {
    nextButton.classList.add('hidden')
    previousButton.classList.remove('hidden')
    submitButton.classList.remove('hidden')
    validateEntry()

    // If it's the first step hide the previous button
  } else if (currentStep == 0) {
    nextButton.classList.remove('hidden')
    previousButton.classList.add('hidden')
    submitButton.classList.add('hidden')
    // In all other instances display both buttons
  } else {
    nextButton.classList.remove('hidden')
    previousButton.classList.remove('hidden')
    submitButton.classList.add('hidden')
  }
}

function validateEntry() {
  let input = tabPanels[currentStep].querySelector('.form-input')
  
  // Start but disabling continue button
  nextButton.setAttribute('disabled', true)
  submitButton.setAttribute('disabled', true)
  
  // Validate on initial function fire
  setButtonPermissions(input)
  
  // Validate on input
  input.addEventListener('input', () => setButtonPermissions(input))
  // Validate if bluring from input
  input.addEventListener('blur', () => setButtonPermissions(input))
}

function setButtonPermissions(input) {
  if (isEmpty(input.value) && input.classList.contains('required') ) { 
    nextButton.setAttribute('disabled', true)
    submitButton.setAttribute('disabled', true)
  } else {
    nextButton.removeAttribute('disabled')
    submitButton.removeAttribute('disabled')
  }
}
}


const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    const video = modal.querySelector("#modalVideo");

    modal.classList.add("open");

    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
        // Pauzuj wideo po zamknięciu popupu
        video.pause();
      });
    });

    // Startuj wideo po otwarciu popupu
    video.play();
  });
});


function handleSubmit(formId, redirectUrl) {
  var form = document.getElementById(formId);

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      var formData = new FormData(form);
      var xhr = new XMLHttpRequest();
      
      xhr.open('POST', 'https://www.futurewebstudio.pl/form/forms/' + formId + '.php');
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            if (res.status === 1) {
              form.reset();
              window.location.href = redirectUrl; // Przekieruj po pomyślnym wysłaniu formularza
            }
          }
        }
      };
      
      xhr.send(formData);
    });
  }
}

handleSubmit('briefForm', '/wyslano-formularz');
handleSubmit('contactForm', '/wyslano-formularz');


};
