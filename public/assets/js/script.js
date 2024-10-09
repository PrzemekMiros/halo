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

            // Pobieramy aktualny adres URL
            var currentUrl = window.location.pathname;
        
            // Pobieramy wszystkie linki w menu
            var menuLinks = document.querySelectorAll('.menu a');

                // Usuwamy klasę "active" ze wszystkich linków w menu
    menuLinks.forEach(function(link) {
      link.classList.remove('link-active');
  });
        
            // Iterujemy przez wszystkie linki w menu
            menuLinks.forEach(function(link) {
                // Sprawdzamy, czy adres URL linka odpowiada aktualnemu adresowi URL
                if (link.getAttribute('href') === currentUrl) {
                    // Dodajemy klasę "active" do linka, jeśli adresy URL się zgadzają
                    link.classList.add('link-active');
                }
            });

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


if (document.querySelector('.works-grid-item')) {
  // Pobierz wszystkie elementy z klasą "works-grid-item"
var worksGridItems = document.querySelectorAll('.works-grid-item');

// Iteruj przez każdy element i dodaj obsługę zdarzenia dla najechania kursorem
worksGridItems.forEach(function(item) {
    item.addEventListener('mouseenter', function(event) {
        // Usuń klasę "works-grid-item-effect" ze wszystkich elementów
        worksGridItems.forEach(function(innerItem) {
            if (innerItem !== item) {
                innerItem.classList.add('works-grid-item-effect');
            }
        });
    });

    // Dodaj obsługę zdarzenia dla opuszczenia kursora
    item.addEventListener('mouseleave', function(event) {
        // Usuń klasę "works-grid-item-effect" ze wszystkich elementów
        worksGridItems.forEach(function(innerItem) {
            if (innerItem !== item) {
                innerItem.classList.remove('works-grid-item-effect');
            }
        });
    });
});

}


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
    var threshold = 50;

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


  // Acordion
  if (document.querySelector(".accordion")) {
    let t = document.getElementsByClassName("accordion");
    for (let e = 0; e < t.length; e++)
      t[e].addEventListener("click", function () {
        let e = this.nextElementSibling;
        if (e.style.maxHeight)
          (e.style.maxHeight = null), this.classList.remove("open");
        else {
          for (let a = 0; a < t.length; a++)
            t[a].classList.remove("open"),
              (t[a].nextElementSibling.style.maxHeight = null);
          (e.style.maxHeight = e.scrollHeight + "px"),
            this.classList.toggle("open");
        }
      });
  };



if(document.querySelector('.form-outer')) {
  initMultiStepForm();

  function initMultiStepForm() {
      const progressNumber = document.querySelectorAll(".step").length;
      const slidePage = document.querySelector(".slide-page");
      const progressCheck = document.querySelectorAll(".step .check");
      const bullet = document.querySelectorAll(".step .bullet");
      const pages = document.querySelectorAll(".page");
      const nextButtons = document.querySelectorAll(".next");
      const prevButtons = document.querySelectorAll(".prev");
      const stepsNumber = pages.length;
  
      if (progressNumber !== stepsNumber) {
          console.warn(
              "Error, number of steps in progress bar do not match number of pages"
          );
      }
  
      document.documentElement.style.setProperty("--stepNumber", stepsNumber);
  
      let current = 1;
  
      for (let i = 0; i < nextButtons.length; i++) {
          nextButtons[i].addEventListener("click", function (event) {
              event.preventDefault();
  
              inputsValid = validateInputs(this);
              // inputsValid = true;
  
              if (inputsValid) {
                  slidePage.style.marginLeft = `-${
                      (100 / stepsNumber) * current
                  }%`;
                  bullet[current - 1].classList.add("active");
                  progressCheck[current - 1].classList.add("active");
                  current += 1;
              }
          });
      }
  
      for (let i = 0; i < prevButtons.length; i++) {
          prevButtons[i].addEventListener("click", function (event) {
              event.preventDefault();
              slidePage.style.marginLeft = `-${
                  (100 / stepsNumber) * (current - 2)
              }%`;
              bullet[current - 2].classList.remove("active");
              progressCheck[current - 2].classList.remove("active");
              current -= 1;
          });
      }
  
      function validateInputs(ths) {
          let inputsValid = true;
  
          const inputs =
              ths.parentElement.parentElement.querySelectorAll("input");
          for (let i = 0; i < inputs.length; i++) {
              const valid = inputs[i].checkValidity();
              if (!valid) {
                  inputsValid = false;
                  inputs[i].classList.add("invalid-input");
              } else {
                  inputs[i].classList.remove("invalid-input");
              }
          }
          return inputsValid;
      }
  }
  
}


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




};
