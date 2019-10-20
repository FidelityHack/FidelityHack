let gd = JSON.parse(inputData);
let flaskFundsList = JSON.parse(fundsList);
console.log(flaskFundsList);
function dset(id, s) {
    document.getElementById(id).innerHTML = s;
}
dset('age-echo', gd['age'] + " Years old");
dset('time-echo', gd['time'] + " Years");
dset('amount-echo', '$' + parseInt(gd['amount']).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
dset('regular-echo', '$' + parseInt(gd['regular']).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
dset('frequency-echo', gd['frequency']);
dset('risk-echo', "Level " + gd['risk']);

let pie_colours = [
    "#4a7729",
    "#5b7f95",
    "#1d252d",
    "#7a9a01",
    "#115e67"
];

for (let i = 0; i < 5; i++) {
    document.getElementById('colour-fund' + i.toString()).setAttribute(
        'style', 'width:10px;height:10px;background:' + pie_colours[i] + ';' +
            'border-radius:5px;'
    );
}

for (let i = 0; i < 5; i++) {
    document.getElementById('fund' + i.toString()).innerHTML = flaskFundsList[i]['name'];
}

///PICHART LOGIC
var ctx = document.getElementById("pi").getContext("2d");
                    
var pi = new Chart(ctx, {
    type:'pie',
    data: {
        datasets: [{
            data: [10, 10, 20, 30, 30],
            backgroundColor: [
                "#4a7729",
                "#5b7f95",
                "#1d252d",
                "#7a9a01",
                "#115e67"
            ],
        }],
        labels: [
            flaskFundsList[0],
            flaskFundsList[1],
            flaskFundsList[2],
            flaskFundsList[3],
            flaskFundsList[4]
        ],
    },
    options: {
        segmentShowStroke : false,
        animateScale : true,
        responsive: false,
        legend: {
            display: false,
        },
    }
});

var piChart = document.getElementById("pi");
piChart.onclick = function(event) {
    var points = pi.getElementsAtEvent(event);
    if (points[0]) {
        var chartData = points[0]['_chart'].config.data;
        var index = points[0]['_index'];
        var label = chartData.labels[index];
        var value = chartData.datasets[0].data[index];
        var output = "label:" + label + ", value:" + value;
            
        console.log(output);
        alert(output);
    }
};
/////END PICHART LOGIC