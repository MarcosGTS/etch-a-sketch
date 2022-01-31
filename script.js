const BACKGROUND_COLOR = "white";
let currentColor = "black";

let sizeInput = document.querySelector(".size");
let clearButton = document.querySelector(".clear");
let colorInput = document.querySelector(".crr-color");

sizeInput.addEventListener("change", () => createCanvas(sizeInput.value));
clearButton.addEventListener("click", clearCanvas);
colorInput.addEventListener("change", changeColor);

function createCanvas(size) {
    const canvas = document.querySelector(".canvas");
    const pixelDimession = canvas.clientWidth / size;

    //clear Canvas
    canvas.innerHTML = "";

    for (let i = 0; i < size * size; i++) {
        let pixel = createPixel(pixelDimession);

        pixel.addEventListener("mouseover", paintPixel);
        pixel.addEventListener("mousedown", paintPixel);
        //prevent draging
        pixel.ondragstart = () => false;

        canvas.appendChild(pixel);
    }
}

function createPixel(size) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");

    pixel.style.width = `${size}px`;
    pixel.style.height = `${size}px`;

    return pixel;
}

function paintPixel(e) {
    // if mouse is pressed
    if (e.type == "mousedown" || e.buttons == 1)
        this.style.backgroundColor = currentColor;
}

function clearCanvas() {
    let pixels = document.querySelectorAll(".pixel");

    for(let pixel of pixels) {
        pixel.style.backgroundColor = BACKGROUND_COLOR;
    }
}

function changeColor() {
    currentColor = this.value;
}

createCanvas(16);

document.addEventListener("click" ,(e) => {
    let {target} = e;
    console.log([...target.classList].includes("pixel"))
})