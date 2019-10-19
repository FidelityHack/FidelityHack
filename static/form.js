// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementById('iframeBody').appendChild(script);

$('input').on('keypress', function (event) {
    let $this = $(this);
if (event.which == 13) {
    event.preventDefault();
    var $next = $('[tabIndex=' + ( + this.tabIndex + 1) + ']');
    if ($this.id == 'frequency') {
        $('#submit').click();
    }
    $next.focus();
}
});

$('input').on('focus', function (event) {
let $this = $(this);
if ($this.is(":focus")) {
$this.parent().parent().find("label").css("color", "#c1c6c8");
}
});

$('input').on('focusout', function (event) {
let $this = $(this);
if ($this.not(":focus")) {
$this.parent().parent().find("label").css("color", "#45555f");
}
});

var slider = document.getElementById("range");
var output = document.getElementById("rangeamount");
output.innerHTML = slider.value;

slider.oninput = function() {
output.innerHTML = this.value;
}

var timeslider = document.getElementById("timerange");
var timeoutput = document.getElementById("durationamount");
timeoutput.innerHTML = timeslider.value;

timeslider.oninput = function() {
timeoutput.innerHTML = this.value;
}