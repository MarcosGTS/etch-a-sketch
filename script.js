const BACKGROUND_COLOR = "#ffffff";
let currentColor = "#000000";

const toolsState = {
    currentColor: "#000000",
    STATES: ["PAINT", "PICK", "FILL"],
    pencilState: "PAINT",
}

let sizeInput = document.querySelector(".size");
let clearButton = document.querySelector(".clear");
let colorInput = document.querySelector(".crr-color");
let colorPicker = document.querySelector(".color-picker");
let bucketFillBtn = document.querySelector(".fill");

sizeInput.addEventListener("change", () => createCanvas(sizeInput.value));
sizeInput.addEventListener("mousemove", displaySize);

clearButton.addEventListener("click", clearCanvas);
colorInput.addEventListener("change", changeColor);

//pick color
colorPicker.addEventListener("click", () => {
    toolsState.pencilState = "PICK";
});
document.addEventListener("click" ,pickColor);

//fill bucket
bucketFillBtn.addEventListener("click", () => {
    toolsState.pencilState = "FILL";
})

document.addEventListener("click" ,(e) => {
    if (toolsState.pencilState == "FILL") fillShape(e.target);
});

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

function fillShape(target) {
    if (!isPixel(target) || toolsState.pencilState != "FILL") return;

    const canvas = document.querySelector(".canvas");
    const pixels =  Array.from(document.querySelectorAll(".pixel"));
    const dimession = pixels.length ** (1/2);
    const targetIndex =  pixels.indexOf(target, canvas);
    const selectedColor = rgbToHex(target.style.backgroundColor);

    function paintRecursion(x, y, color, selectedColor) {
        
        const currPixel = pixels[x + y * dimession];
    
        // Is a pixel
        if (!isPixel(currPixel)) return;
        
        // Should pixel be painted 
        const currPixelColor =  rgbToHex(currPixel.style.backgroundColor);
        if (currPixelColor == color) return;
        if (currPixelColor != selectedColor) return;
    
        // Update pixel's color
        currPixel.style.backgroundColor = color;
        
        //spread to adjacent pixels
        paintRecursion(x, y-1, color, selectedColor);
        paintRecursion(x, y+1, color, selectedColor);
        paintRecursion(x-1, y, color, selectedColor);
        paintRecursion(x+1, y, color, selectedColor);
    }
    
    const x = targetIndex % dimession;
    const y = Math.floor(targetIndex / dimession);
    
    paintRecursion(x, y, currentColor, selectedColor);

    toolsState.pencilState = "PAINT";
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
    if (isPixel(target) && toolsState.pencilState === "PICK")
    {
        let {backgroundColor} = target.style;
        
        colorInput.value = rgbToHex(backgroundColor);
        currentColor = backgroundColor;
        toolsState.pencilState = "PAINT";   
    }   
}

function isPixel(el) {
    if (!el) return false;
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

