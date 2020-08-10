const gravity = 0.1;
const gravitySpeed = 0.95;

const colorArr = [
    "#ffb3ff", 
    "#b3d9ff", 
    "#ffffcc", 
    "#c2f0c2", 
    "#ffb3b3", 
    "#dfbf9f",
    "#b3b3cc"
];


class Circle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.gravity = gravity;
        this.radius = radius;
        this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
    } 
    draw (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
        context.closePath();
    }

    update () {

        if (this.y + this.radius + this.dy > window.innerHeight) {
			this.dy = -this.dy;
			this.dy = this.dy * gravitySpeed;
			this.dx = this.dx * gravitySpeed;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) {
			this.dx = -this.dx * gravitySpeed;
		}

		this.x += this.dx;
		this.y += this.dy;
   }
}

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
let circleArray = [];

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

for (let i = 0; i < 300; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;
    const radius = 20;
    circleArray.push(new Circle(x, y,  dx, dy, radius))    
}

function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    window.requestAnimationFrame(animate);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].draw(ctx);
        circleArray[i].update(ctx);
    }
}

animate();