const BACKGROUND_COLOR = "#ffffff";
let currentColor = "#000000";

const toolsState = {
    currentColor: "#000000",
    STATES: ["PAINT", "PICK"],
    pencilState: "PAINT",
}

let sizeInput = document.querySelector(".size");
let clearButton = document.querySelector(".clear");
let colorInput = document.querySelector(".crr-color");
let colorPicker = document.querySelector(".color-picker");

sizeInput.addEventListener("change", () => createCanvas(sizeInput.value));
sizeInput.addEventListener("mousemove", displaySize);

clearButton.addEventListener("click", clearCanvas);
colorInput.addEventListener("change", changeColor);
//pick color
colorPicker.addEventListener("click", () => {
    toolsState.pencilState = "PICK";
    console.log(toolsState.pencilState);
});

document.addEventListener("click" ,pickColor);

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

    pixel.style.backgroundColor = BACKGROUND_COLOR;
    pixel.style.width = `${size}px`;
    pixel.style.height = `${size}px`;

    return pixel;
}

function displaySize() {
    let sizeValue = document.querySelector('.size-value');
    sizeValue.textContent = `${this.value} X ${this.value}`;
}

function paintPixel(e) {
    // if mouse is pressed
    if (toolsState.pencilState === "PAINT" && (e.type == "mousedown" || e.buttons == 1)){
        this.style.backgroundColor = currentColor;
    }
        
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

function pickColor(e) {
    //verificar se e um pixel
    let {target} = e
    if (isPixel(target))
    {
        let {backgroundColor} = target.style;
        
        colorInput.value = rgbToHex(backgroundColor);
        currentColor = backgroundColor;
        toolsState.pencilState = "PAINT";   
    }   
}

function isPixel(el) {
    return [...el.classList].includes("pixel");
}

function rgbToHex(rgb) {
    let colors = rgb.match(/\d+/g);
    let hexColor = "#"
    for (let color of colors)
        hexColor += (+color).toString(16).padStart(2, 0);

    return hexColor;
}

createCanvas(16);

