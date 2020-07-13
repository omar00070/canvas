const canvas = document.querySelector("canvas");

//set canves dimensions
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const c = canvas.getContext('2d');

// global variables
let circles = []
let colors = [
    "#FF9040",
    "#9A470C",
    "#E67423",
    "#008D9A",
    "#23D6E6"

]
//mouse position
let mouse = {
    x: undefined,
    y:  undefined
};

let mclick = {
    x: undefined,
    y: undefined
}

//event listener
window.addEventListener("resize", ()=>{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
});

document.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
});

document.addEventListener('click', function(e){
    mclick.x = e.x
    mclick.y =e.y
    console.log(e)
    console.log(mclick)
})

//circle object
function Circle(x, y, radius, dx, dy, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        this.x += this.dx
        this.y += this.dy
        let distance_x = Math.abs(mouse.x - this.x);
        let distance_y = Math.abs(mouse.y - this.y);
        let mdistance_x = Math.abs(mclick.x - this.x);
        let mdistance_y = Math.abs(mclick.y - this.y);
        //interaction with mouse movement
        if(distance_x < 50 && distance_y < 50){
            if(this.radius < 40){
                this.radius += 1
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 1
        }
        // collision with walls
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx = - this.dx;
        }
        if(this. y + this.radius > canvas.height || this.y - this.radius < 0){
            this.dy = -this.dy;
        };
        //interaction with mouse click
        if(mdistance_x < this.radius && mdistance_y < this.radius){
            let color_choice = Math.floor(Math.random() * colors.length + 1)
            this.color = colors[color_choice];
            mclick.x = undefined;
            mclick.y = undefined;
        }

        this.draw();
    }
}

function init(){
    circles = [];
    for(let i = 0; i < 500; i++){
        let radius = Math.random() * 10 + 3
        let x = Math.random() * (window.innerWidth - 2 * radius) + radius;
        let y = Math.random() * (window.innerHeight - 2 * radius) + radius;
        let color_choice = Math.floor(Math.random() * colors.length + 1)
        let color = colors[color_choice];
        let dx = (Math.random() - 0.5) * 8 + 1
        let dy = (Math.random() - 0.5) * 8 + 1
        circles.push(new Circle(x, y, radius, dx, dy, color));
    }
}

//initiate the circles
init();

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < circles.length; i++){
        circles[i].update();
    }
};

animate();