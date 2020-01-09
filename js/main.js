import languages from './language.js';

var language = 'pt-br';
const skillsBarFill = document.querySelectorAll('.skills-bar-fill');
skillsBarFill.forEach(function (element) {
    barLoading(element);
});
const schoolingDiv = document.getElementById("schooling");
function barLoading(element) {
    const percentual = element.dataset.percentual;
    var i = 0;
    const tempo = setInterval(function () {
        if (i == percentual) {
            clearInterval(tempo);
            return;
        }
        i++;
        element.style.width = `${i}%`;
        element.innerHTML = `${i}%`;
    }, 20);
}
const selectLanguage = document.createElement("select");
languages.forEach(function (lang) {
    const option = document.createElement("option");
    option.value = lang.lang;
    option.innerText = lang.description;
    selectLanguage.appendChild(option);
});
document.getElementById("language").appendChild(selectLanguage);
selectLanguage.addEventListener('change', (val) => changeLanguage(val.target.value));
function changeLanguage(element) {
    language = element ? element : language;
    const lang = languages.find(function (obj) {
        return obj.lang == language
    });
    document.getElementById("title-skill").innerText = lang.language.titleSkills;
    document.getElementById("title-schooling").innerText = lang.language.titleSchooling;
    document.querySelectorAll('.label-course').forEach((element) => {
        element.innerText = lang.language.labelCourse;
    });

    document.querySelectorAll('.label-educational-institution').forEach((element) => {
        element.innerText = lang.language.labelEducationalInstitution;
    });
    document.getElementById("description-course-1").innerText = lang.language.descriptionCourse1;
    document.getElementById("description-course-2").innerText = lang.language.descriptionCourse2;
}
const cards = document.querySelectorAll(".card");
function animateCards() {
    const widthWindow = (window.screen.width - 100) / 2;
    cards.forEach(function (element, index) {
        if (index % 2 == 0) {
            element.animate([
                // keyframes
                {transform: `translateX(-${widthWindow}px)`},
                {transform: 'translateX(0px)'}
            ], {
                // timing options
                duration: 1000,
            });
        } else {
            element.animate([
                // keyframes
                {transform: `translateX(${widthWindow}px)`},
                {transform: 'translateX(0px)'}
            ], {
                // timing options
                duration: 1000,
            });
        }

    });
}
var cardEnableEffect = true;
window.addEventListener("scroll", function () {
    if (this.scrollY > (schoolingDiv.offsetTop - 400) && cardEnableEffect) {
        console.log(this.pageYOffset, schoolingDiv.offsetTop);
        cardEnableEffect = false;
        animateCards();
        return;
    }
});
changeLanguage();
