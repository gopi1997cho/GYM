const menu_btn = document.querySelector('.menu-btn');
const nav_links = document.querySelector('.nav-links');

const image = document.querySelector('.explore');
const style = getComputedStyle(image);
const value = style.getPropertyValue('background-image');
const forwardButton = document.querySelector('.forward');
const backwardButton = document.querySelector('.backward');

const img = forwardButton.getAttribute('src');

const arr = [];
arr.push('images/Sale1.jpg');
arr.push('images/Sale2.jpg');
arr.push('images/Sale3.jpg');
arr.push('images/Sale4.jpg');
let x = 0;

let check = false;
function intervalSlider() {
    if (!check) {
        if (x < 0)
            x = 0;
        if (x >= arr.length - 1)
            check = true;
        image.style.backgroundImage = `url(${arr[x]})`
        x++;
    }
    if (check) {
        if (x > arr.length - 1)
            x = arr.length - 1;
        if (x <=0)
            check = false;
        image.style.backgroundImage = `url(${arr[x]})`
        x--;
    }
    console.log(x);
}
let slider = setInterval(() => intervalSlider(), 5000);

forwardButton.addEventListener('click', () => {
    if (x >= arr.length - 1)
        x = 0;
    if (x < arr.length - 1) {
        if (x <0)
            x =0;
        clearInterval(slider);
        slider = setInterval(() => intervalSlider(), 5000);
        image.style.backgroundImage = `url(${arr[x]})`
        x++;
    }
});
backwardButton.addEventListener('click', () => {
    if (x <= 0)
        x = arr.length-1;
    if (x >= 0) {
        if (x > arr.length - 1)
            x = arr.length-1;
        clearInterval(slider);
        slider = setInterval(() => intervalSlider(), 5000);
        image.style.backgroundImage = `url(${arr[x]})`
        x--;
    }
});

menu_btn.addEventListener('click', () => {
    nav_links.classList.toggle('mobile-menu');
})


//let equipment1 = document.getElementById('equipment1');
//equipment1.addEventListener('click', () => { window.location = "SalePage1.html"; });
