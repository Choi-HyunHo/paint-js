const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){
    stopPainting()
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove); // 캔버스 위에서 움직일 때
    canvas.addEventListener("mousedown", onMouseDown); // 캔버스 위에서 클릭 했을 때
    canvas.addEventListener("mouseup", onMouseUp); // 캔버스 위에서 클릭 해제
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 위에 벗어날 경우
}