const menu_btn = document.querySelector('.menu-btn');
const nav_links = document.querySelector('.nav-links');

const image = document.querySelector('.explore');
const style = getComputedStyle(image);
const value = style.getPropertyValue('background-image');
const forwardButton = document.querySelector('.forward');
const backwardButton = document.querySelector('.backward');

const cartQuantity = document.querySelector('#cartQuantity');

setInterval(() => {
    cartQuantity.innerText = localStorage.getItem("cartItems");
}, 1000);

const img = forwardButton.getAttribute('src');


let dataFunc=fetch("./Cart.json")
        .then((res) => 
            res = res.json()
).then((data) => { return data; });


let x = 0;

let check = false;

const arr = [];
arr.push('Images/Sale1.jpg');
arr.push('Images/Sale2.jpg');
arr.push('Images/Sale3.jpg');
arr.push('Images/Sale4.jpg');

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