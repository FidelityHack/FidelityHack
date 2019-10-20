window.onload = () => {
    drawBar('future-bar');
    drawBar('historical-bar');
}

let drawBar = (id) => {
    let elem = document.getElementById(id);
    let width = 1;
    var temp = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
          clearInterval(temp);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
    }
}