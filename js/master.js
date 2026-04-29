// check if there is local storage color option
let mainColr = localStorage.getItem("color_option");
// console.log(mainColr);

if (mainColr !== null) {
  // console.log("Your LocalStorage Is Not Empty");
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main-color", mainColr);

  // remove active class fom elements

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // add active class on element with data-data === localstorage item
    if (element.dataset.color === mainColr) {
      // add active class to color
      element.classList.add("active");
    }
    
  });
}

// select landing page
let landingPage = document.querySelector(".landing-page");
// get array of images
let imgsArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

let lastBackground = localStorage.getItem("last-background");

if (lastBackground !== null) {
  landingPage.style.backgroundImage = lastBackground;
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// check background local storage
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  // remove active class from spans

  let randomActive = document.querySelectorAll(".random-backgrounds span");

  randomActive.forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

function RandomizedBackground() {
  if (backgroundOption === true) {
    clearInterval(backgroundInterval);
    // change background url
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let random = Math.floor(Math.random() * imgsArr.length);
      landingPage.style.backgroundImage = 'url("imgs/' + imgsArr[random] + '")';
      localStorage.setItem(
        "last-background",
        landingPage.style.backgroundImage,
      );
    }, 3000);
  }
}

RandomizedBackground();

let settingBox = document.querySelector(".setting-box");
let settingIconBox = document.querySelector(".toggle-settings");
let gearIcon = document.querySelector(".icon");

settingIconBox.addEventListener("click", () => {
  // add and remove open class
  settingBox.classList.toggle("open");
  // make icon spin and stop spin
  gearIcon.classList.toggle("fa-spin");
});

// switch colors
const colorsLI = document.querySelectorAll(".colors-list li");

colorsLI.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color,
    );
    // set color on localstorage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});
// switch backgrounds random
const background = document.querySelectorAll(".random-backgrounds span");

background.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      RandomizedBackground();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);

      localStorage.setItem(
        "last-background",
        landingPage.style.backgroundImage,
      );
    }
  });
});

// select skills selector
let ourskills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsoffsettop = ourskills.offsetTop;

  // Skills Outer height
  let skillsOuterHeight = ourskills.offsetHeight;

  // Skills Window Height
  let windowHeight = this.innerHeight;

  // Window Scrolltop
  let windowScrollTop = this.pageYOffset;

  // console.log(windowScrollTop);

  if (windowScrollTop > skillsoffsettop + skillsOuterHeight - windowHeight) {
    let allSkills = this.document.querySelectorAll(
      ".skill-box .skill-progress span",
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-gallery";

    // add overlay to body
    document.body.appendChild(overlay);

    // create popup
    let popupBox = document.createElement("div");

    // add class to the popup
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the heading to the text
      imgHeading.appendChild(imgText);

      // append the heading to popupbox
      popupBox.appendChild(imgHeading);
    }

    // Create Image
    let popupImage = document.createElement("img");

    // set src of image
    popupImage.src = img.src;

    // append image to box
    popupBox.appendChild(popupImage);

    // append box to body
    document.body.appendChild(popupBox);

    // create close span
    let closeButton = document.createElement("span");

    // create the close button text
    let closeText = document.createTextNode("X");

    // ppend text to close button
    closeButton.appendChild(closeText);

    // add class to close button
    closeButton.className = "close-button";

    // append closebutton to popup box
    popupBox.appendChild(closeButton);
  });
});

// close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // remove popup
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector(".popup-gallery").remove();
  }
});

// Select All Bullets
const bullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const links = document.querySelectorAll(".landing-page .links a");

function scrolltosomewhere(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrolltosomewhere(bullets);
scrolltosomewhere(links);

// Handle Active State
function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class on target color
  e.target.classList.add("active");
}

const bulletsSpan = document.querySelectorAll(".show-bullets span");
const bulletsContainer = document.querySelector(".nav-bullets");
const bulletsLocalItem = localStorage.getItem("bullets_option");

if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem === "yes") {
    bulletsContainer.style.display = "block";
    document.querySelector(".show-bullets .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".show-bullets .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "yes");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "no");
    }
    handleActive(e);
  });
});

const reset = document.querySelector(".setting-box .reset-options");

reset.addEventListener("click", () => {
  // localStorage.clear();
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");

  location.reload();
});

// toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".landing-page .links");

toggleButton.onclick = function (e) {
  // stop propagation
  e.stopPropagation();

  // toggle menu-active class on button
  this.classList.toggle("menu-active");

  // toggle active class on links
  tLinks.classList.toggle("open");
};

// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleButton.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};
