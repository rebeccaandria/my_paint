var canvas, ctx,
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        size: 10,
        down: false,
    },
    strokes = [],
    currentStroke = null;

function redraw () {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.lineCap = 'round';
    for (var i = 0; i < strokes.length; i++) {
        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }
}

function init () {
    canvas = $('#draw');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    ctx = canvas[0].getContext('2d');

    function mouseEvent (e) {
        brush.x = e.pageX;
        brush.y = e.pageY;

        currentStroke.points.push({
            x: brush.x,
            y: brush.y,
        });

        redraw();
    }

    canvas.mousedown(function (e) {
        brush.down = true;

        currentStroke = {
            color: brush.color,
            size: brush.size,
            points: [],
        };

        strokes.push(currentStroke);

        mouseEvent(e);
    }).mouseup(function (e) {
        brush.down = false;

        mouseEvent(e);

        currentStroke = null;
    }).mousemove(function (e) {
        if (brush.down)
            mouseEvent(e);

    });

    $('#save-btn').click(function () {
        var data = canvas[0].toDataURL('image/jpeg',1.0)
        data = data.splist(',')
        window.location.href = 'data:application/octet-stream;base64,' + data[1]
    })
    $('#open').click(function() {

    })

    $('#undo-btn').click(function () {
        strokes.pop();
        redraw();
    });

    $('#clear-btn').click(function () {
        strokes = [];
        redraw();
    });

    $('#color-picker').on('input', function () {
        brush.color = this.value;
    });

    $('#brush-size').on('input', function () {
        brush.size = this.value;
    });

    

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
    $('square').on('click', (e) => {
        tool = 'square';
    });
});
}
$(init);

