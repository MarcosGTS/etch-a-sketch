let sizeInput = document.querySelector(".size");
let clearButton = document.querySelector(".clear");

sizeInput.addEventListener("change", () => {
    createCanvas(sizeInput.value);
})

function createCanvas(size) {
    const canvas = document.querySelector(".canvas");
    const pixelDimession = canvas.clientWidth / size;

    //clear Canvas
    canvas.innerHTML = "";

    for (let i = 0; i < size * size; i++) {
        let pixel = createPixel(pixelDimession);

        pixel.addEventListener("mouseover", paintPixel);
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
    if (e.buttons == 1)
        this.style.backgroundColor = "black";
}

createCanvas(16);