function animationMain() {
  gsap.registerPlugin(ScrollTrigger);
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".scrollContainer", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".scrollContainer").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.defaults({ scroller: ".scrollContainer" });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
  new ResizeObserver(() => locoScroll.update()).observe(
    document.querySelector(".scrollContainer")
  );

  // Header scrolled
  let lastScrollPos = 0;
  locoScroll.on("scroll", (position) => {
    const currentScrollPos = position.scroll.y;

    if (currentScrollPos > 50) {
      if (currentScrollPos > lastScrollPos) {
        document.querySelector(".site-header").classList.add("scrolled");
      } else {
        document.querySelector(".site-header").classList.remove("scrolled");
      }
    } else {
      document.querySelector(".site-header").classList.remove("scrolled");
    }

    lastScrollPos = currentScrollPos;
  });

  // Paragraph --------------------------------------------------------------
  if (document.querySelector(".split-lines")) {
    let splitTextLines = [...document.querySelectorAll(".split-lines")];
    splitTextLines.forEach((element) => {
      let mySplitText = new SplitText(element, {
        type: "lines",
        linesClass: "line",
      });
      new SplitText(element, {
        type: "lines",
        linesClass: "line-parent",
      });
      gsap.from(mySplitText.lines, {
        duration: 1,
        stagger: 0.05,
        yPercent: 110,
        ease: Power2.easeInOut,
        scrollTrigger: {
          scroller: ".scrollContainer",
          trigger: element,
          start: "top 95%",
          //toggleActions: 'restart pause reverse pause',
        },
      });
    });
  };

  const textHighlights = document.querySelectorAll(".text-highlight");
  textHighlights.forEach((textHighlight) => {
    const splitText = new SplitText(textHighlight, {
      type: "lines, chars",
      charsClass: "char-highlight"
    });
  
    const tlh = gsap.timeline({
      scrollTrigger: {
        trigger: textHighlight,
        scrub: 1,
        start: "top 90%",
        end: "bottom 55%"
      }
    });
  
    tlh.to(".char-highlight", {
      "--highlight-offset": "100%",
      stagger: 0.3
    });
  });
  
  // Fade in
  const fadeIn = gsap.utils.toArray(".fade-in");
  fadeIn.forEach((fadeInItem) => {
    gsap.from(fadeInItem, {
      autoAlpha: 0,
      opacity: 0,
      y: 20,
      duration: 1,
      delay: .2,
      scrollTrigger: {
        scroller: ".scrollContainer",
        trigger: fadeInItem,
        start: "top 90%",
      },
    });
  });

  // Line animation
  const lineX = gsap.utils.toArray(".line-x");
  lineX.forEach((lineXItem) => {
    gsap.from(lineXItem, {
      width: "0",
      duration: 1,
      ease: Power2.easeInOut,
      scrollTrigger: {
        scroller: ".scrollContainer",
        trigger: lineXItem,
        start: "top 90%",
      },
    });
  });

  // Footer parallax
  if (window.matchMedia("(min-width: 767px)").matches) {
    gsap.from(".footer-parallax", {
      y: "-25%",
      scrollTrigger: {
        scroller: ".scrollContainer",
        trigger: ".site-footer",
        start: "top 95%",
        end: "bottom 80%",
        scrub: true,
      },
    });
  } else {
    gsap.from(".footer-parallax", {
      y: "-15%",
      scrollTrigger: {
        scroller: ".scrollContainer",
        trigger: ".site-footer",
        start: "top 95%",
        end: "bottom 90%",
        scrub: true,
      },
    });
  }

     // Nav menu
     const menuToggle = document.getElementById("menuToggle");
     const menuBar = gsap.timeline();
     var tl = gsap.timeline({ paused: true});
     tl.to('.fullpage-menu', {
         duration: 0,
         display: "block",
         ease: 'Expo.easeInOut',
     });
     tl.from('.menu-bg', {
         duration: .8,
         opacity: 0,
         ease: 'Expo.easeInOut'
     });
     tl.from('.main-menu li a', {
         duration: 1.3,
         y:"110%",
         stagger: 0.1,
         ease: 'Expo.easeInOut'
     }, "-=0.6");
     tl.from('.line-xh', {
      duration: 1,
      stagger: .1,
      width: "0",
      ease: 'Expo.easeInOut'
     }, "-=1.3");
     tl.reverse();
     menuToggle.addEventListener('click', function(){
         menuBar.reversed(!menuBar.reversed());
         tl.reversed(!tl.reversed());
       // menuWrap.classList.toggle("active");
     });


  // Magnetic
  if (document.querySelector(".magnetic")) {
    var magnets = document.querySelectorAll(".magnetic");
    var magnetText = document.querySelectorAll(".btn-text");
    if (window.innerWidth > 767) {
      // Mouse Reset
      magnets.forEach((magnet) => {
        magnet.addEventListener("mousemove", moveMagnet);
        // $(this.parentNode).removeClass('not-active');
        magnet.addEventListener("mouseleave", function (event) {
          gsap.to(event.currentTarget, 1.5, {
            x: 0,
            y: 0,
            ease: "Elastic.easeOut",
          });
          gsap.to(magnetText, 1.5, {
            x: 0,
            y: 0,
            ease: "Elastic.easeOut",
          });
        });
      });
      // Mouse move
      function moveMagnet(event) {
        var magnetButton = event.currentTarget;
        var bounding = magnetButton.getBoundingClientRect();
        var magnetsStrength = magnetButton.getAttribute("data-strength");
        var magnetsStrengthText =
          magnetButton.getAttribute("data-strength-text");
        var magnetText = magnetButton.querySelector(".btn-text");
        gsap.to(magnetButton, 1.5, {
          x:
            ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
            magnetsStrength,
          y:
            ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
            magnetsStrength,
          rotate: "0.005deg",
          ease: "Power4.easeOut",
        });
        gsap.to(magnetText, 1.5, {
          x:
            ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
            magnetsStrengthText,
          y:
            ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
            magnetsStrengthText,
          rotate: "0.001deg",
          ease: "Power4.easeOut",
        });
      }
    }
  }

     // Scroll progress
     if (window.matchMedia("(min-width: 767px)").matches) {
      gsap.to(".scrollprogress", {
       height: "100vh",
       ease: 'none',
       scrollTrigger: { 
         scroller: ".scrollContainer",
         trigger: ".scrollContainer",
         start: "top 0%",
         end: "bottom 99%",
         scrub: true,
       }
     });
     };



  // End animation
}

function addMenuClass() {
  MenuClass = document.querySelector("body");
  MenuToggle = document.querySelector(".menu-toggle");
  MenuToggle.addEventListener('click', () => {
    MenuClass.classList.toggle("menu-open");
  });
}
addMenuClass();
function removeMenuClass() {
  document.querySelector("body").classList.remove("menu-open");
}