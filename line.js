let context;

let tool = 'line';
let ready = false;

$().ready(() => {
    console.info('Ready');
    let canvas = document.getElementById('draw');
    context = canvas.getContext('2d');

    $('#draw').on('click', (e) => {
        console.info(e.pageX, e.pageX);

        if(!ready) {
            context.beginPath();
            context.moveTo(e.pageX, e.pageY);
            ready = true;   
        } else {
            context.lineTo(e.pageX,e.pageY);
            context.closePath();
            context.stroke();
            ready = false;
        }
    });
    $('line').on('click', (e) => {
        tool = 'line';
    });
});