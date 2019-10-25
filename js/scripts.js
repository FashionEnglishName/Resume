// resume text shadow
const resume = document.querySelector("#resume-title");
const cover = document.querySelector("#cover");

function textShadow(e) {
    const {clientX: x, clientY: y} = e;
    const {offsetWidth: width, offsetHeight: height} = cover;
    const walk = 30;

    const walkX = (x / width * walk) - (walk / 2);
    const walkY = (y / height * walk) - (walk / 2);
    resume.style.textShadow = `${walkX}px ${walkY}px 0 #cccccc`;
}

cover.addEventListener('mousemove', textShadow);


// fix nav bar and show keyboard when scroll down
// scroll spy to highlight nav bar tag
const nav = document.querySelector('nav');
const navTop = nav.offsetTop;
const keyboard = document.querySelector('#keyboard');
const links = Array.from(document.querySelectorAll("nav ul li:not(.logo) a"));
const pagesTop = Array.from(document.querySelectorAll(".page")).map(page => page.offsetTop - 75);

function fixNav() {
    if(window.scrollY > navTop) {
        document.body.style.paddingTop = `${nav.offsetHeight}px`;
        document.body.classList.add('fixed-nav');
    } else {
        document.body.style.paddingTop = `0px`;
        document.body.classList.remove('fixed-nav');
        links[0].style.color = "#333333";
    }

    if(window.scrollY > pagesTop[1] && window.scrollY < pagesTop[2]) {
        links[0].style.color = "white";
        links[1].style.color = "#333333";
        keyboard.style.right = "-35vw";
    } else if (window.scrollY >= pagesTop[2] && window.scrollY < pagesTop[3]) {
        links[0].style.color = "#333333";
        links[1].style.color = "white";
        links[2].style.color = "#333333";
        keyboard.style.right = "-50vw";
    }
    else if (window.scrollY >= pagesTop[3] && window.scrollY < pagesTop[4]) {
        links[1].style.color = "#333333";
        links[2].style.color = "white";
        links[3].style.color = "#333333";
    }
    else if (window.scrollY >= pagesTop[4]) {
        links[2].style.color = "#333333";
        links[3].style.color = "white";
    } else {
        links[0].style.color = "#333333";
        keyboard.style.right = "-50vw";
    }
}
window.addEventListener("scroll", fixNav);


// highlight information when hover
const highlighter = document.createElement('span');
const triggers = document.querySelectorAll('.intro-line .info');
let lastTrigger = null;

highlighter.classList.add('highlighter');
document.body.append(highlighter);

function highlightInfo () {
    if(lastTrigger) {
        lastTrigger.style.color = 'black';
    }
    this.style.color = 'white';
    const linkCords = this.getBoundingClientRect();
    const cords = {
        width: linkCords.width,
        height: linkCords.height,
        left: linkCords.left + window.scrollX - 20,
        top: linkCords.top + window.scrollY - 5
    };

    highlighter.style.width = `${cords.width + 40}px`;
    highlighter.style.height = `${cords.height + 10}px`;
    highlighter.style.transform = `translate(${cords.left}px, ${cords.top}px)`;
    lastTrigger = this;
}

function resetInfo() {
    this.style.color = 'black';
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', highlightInfo));

// // Skills hoisting
// const skills = document.querySelectorAll(".skill");
// function skillHoist() {
//     this.firstElementChild.classList.add("skill-hoist");
// }
// function resetSkill() {
//     this.firstElementChild.classList.remove("skill-hoist");
// }

// skills.forEach(skill => {
//     skill.addEventListener("mouseenter", skillHoist);
//     skill.addEventListener('mouseout', resetSkill);
// });