const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const equal = document.getElementById("equal");
const decimal = document.getElementById("decimal");
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
const previous = document.getElementById("previous");

clear.addEventListener("click", () => {
    previous.classList.toggle("visible");
});     