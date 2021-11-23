const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); // 기본적으로 canvas의 배경은 white
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR; // default 색상 
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

function changeColor(event){ // 색상 변경
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event){ // 브러쉬의 굵기 설정
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeClick(){ // 버튼의 모드 변경
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function canvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function saveClick(){ // 그림 저장
    const image = canvas.toDataURL(); // 지정된 포맷의 이미지를 표현을 포함한 data URL을 반환
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

canvas.addEventListener("mousemove",onMouseMove); // 캔버스 위에서 움직일 때
canvas.addEventListener("mousedown", startPainting); // 캔버스 위에서 클릭 했을 때
canvas.addEventListener("mouseup", stopPainting); // 캔버스 위에서 클릭 해제
canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 위에 벗어날 경우
canvas.addEventListener("click", canvasClick); // 모드 변경
canvas.addEventListener("contextmenu", handleCM);

Array.from(colors).forEach(color => color.addEventListener("click", changeColor)); 
// 각 컬러들을 배열로 만들어주고, forEach() 를 사용하여 배열을 하나씩 실행시킨다.


range.addEventListener("input", changeRange);
mode.addEventListener("click", modeClick);
saveBtn.addEventListener("click", saveClick);
