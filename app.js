const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // default 색상 
ctx.lineWidth = 2.5; // 선의 굵기

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(painting === false){  // 클락하지 않고 마우스를 움직였을 때 시작 - beginPath
        ctx.beginPath(); // 경로 생성
        ctx.moveTo(x,y); // 선 시작 좌표
    } else {
        ctx.lineTo(x,y); // 선 끝 좌표
        ctx.stroke(); // 선 그리기
    }
}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){
    stopPainting()
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function changeRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove); // 캔버스 위에서 움직일 때
    canvas.addEventListener("mousedown", startPainting); // 캔버스 위에서 클릭 했을 때
    canvas.addEventListener("mouseup", stopPainting); // 캔버스 위에서 클릭 해제
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 위에 벗어날 경우
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor)); 
// 각 컬러들을 배열로 만들어주고, forEach() 를 사용하여 배열을 하나씩 실행시킨다.

if(range){
    range.addEventListener("input", changeRange)
}

if(mode){
    mode.addEventListener("click", modeClick)
}