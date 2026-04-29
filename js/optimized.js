// Improved version of master.js with performance optimizations

// Cache DOM elements at the top to avoid repeated queries
const landingPage = document.querySelector(".landing-page");
const settingBox = document.querySelector(".setting-box");
const settingIconBox = document.querySelector(".toggle-settings");
const gearIcon = document.querySelector(".icon");
const colorsLI = document.querySelectorAll(".colors-list li");
const randomActive = document.querySelectorAll(".random-backgrounds span");
const backgroundSpans = document.querySelectorAll(".random-backgrounds span");
const bulletsSpan = document.querySelectorAll(".show-bullets span");
const bulletsContainer = document.querySelector(".nav-bullets");
const reset = document.querySelector(".setting-box .reset-options");
const ourskills = document.querySelector(".skills");
const ourGallery = document.querySelectorAll(".gallery .images-box img");
const bullets = document.querySelectorAll(".nav-bullets .bullet");
const links = document.querySelectorAll(".landing-page .links a");

// Cache localStorage values to minimize access
const mainColor = localStorage.getItem("color_option");
const lastBackground = localStorage.getItem("last-background");
const backgroundLocalItem = localStorage.getItem("background_option");
const bulletsLocalItem = localStorage.getItem("bullets_option");

// Array of images
const imgsArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Apply main color from localStorage
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colorsLI.forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// Apply last background from localStorage
if (lastBackground !== null) {
  landingPage.style.backgroundImage = lastBackground;
}

// Handle background option from localStorage
if (backgroundLocalItem !== null) {
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

// Function to start random background
function startRandomBackground() {
  if (backgroundOption && !backgroundInterval) {
    backgroundInterval = setInterval(() => {
      const random = Math.floor(Math.random() * imgsArr.length);
      landingPage.style.backgroundImage = `url("imgs/${imgsArr[random]}")`;
      localStorage.setItem("last-background", landingPage.style.backgroundImage);
    }, 3000);
  }
}

// Function to stop random background
function stopRandomBackground() {
  if (backgroundInterval) {
    clearInterval(backgroundInterval);
    backgroundInterval = null;
  }
}

// Initialize random background
startRandomBackground();

// Settings toggle
settingIconBox.addEventListener("click", () => {
  settingBox.classList.toggle("open");
  gearIcon.classList.toggle("fa-spin");
});

// Color switching
colorsLI.forEach((li) => {
  li.addEventListener("click", (e) => {
    const color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("color_option", color);
    handleActive(e);
  });
});

// Background random toggle
backgroundSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      startRandomBackground();
      localStorage.setItem("background_option", "true");
    } else {
      backgroundOption = false;
      stopRandomBackground();
      localStorage.setItem("background_option", "false");
      localStorage.setItem("last-background", landingPage.style.backgroundImage);
    }
  });
});

// Skills animation on scroll
window.onscroll = function () {
  const skillsoffsettop = ourskills.offsetTop;
  const skillsOuterHeight = ourskills.offsetHeight;
  const windowHeight = this.innerHeight;
  const windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsoffsettop + skillsOuterHeight - windowHeight) {
    const allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Gallery popup
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "popup-gallery";
    document.body.appendChild(overlay);

    // Create popup box
    const popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt) {
      const imgHeading = document.createElement("h3");
      const imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    // Create image
    const popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    // Create close button
    const closeButton = document.createElement("span");
    const closeText = document.createTextNode("X");
    closeButton.appendChild(closeText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);

    document.body.appendChild(popupBox);
  });
});

// Close popup
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-gallery").remove();
  }
});

// Scroll to sections
function scrollToSomewhere(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(bullets);
scrollToSomewhere(links);

// Handle active state
function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

// Bullets visibility
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

// Reset options
reset.addEventListener("click", () => {
  localStorage.clear();
  location.reload(); // Assuming reload to reset UI
});
