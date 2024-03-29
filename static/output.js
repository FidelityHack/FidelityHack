let gd = JSON.parse(inputData);
let flaskFundsList = JSON.parse(fundsList);
for (let i = 0; i < 5; i++) {
    if (flaskFundsList[i].oneyearp < 5)
        flaskFundsList[i].oneyearp = 5.1;
}
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

dset('timeframe', gd['time']);

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
            data: [20, 20, 20, 20, 20],
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
            flaskFundsList[4],
        ],
    },
    options: {
        segmentShowStroke : false,
        animateScale : true,
        responsive: false,
        legend: {
            display: false,
        },
        tooltips: {
            enabled: false,
        }
    }
});

var piChart = document.getElementById("pi");
piChart.onclick = function(event) {
    var points = pi.getElementsAtEvent(event);
    if (points[0]) {
        //var chartData = points[0]['_chart'].config.data;
        var index = points[0]['_index'];
        handleSwitch(index);
        //var label = chartData.labels[index];
        //var value = chartData.datasets[0].data[index];
        //var output = "label:" + label.name + ", value:" + value;
        //console.log(output);
    }
};
/////END PICHART LOGIC
/////TIMEFRAME LOGIC
let future_times = []
for (let j = 0; j < 5; j++) {
    tempTimes = [];
    tempTimes.push({
        time: 'Present',
        value: flaskFundsList[j].returns[0]
    });
    for (let i = 0; i < 2; i++) {
        let numYears = Math.round((i + 1) * 0.3333333 * gd['time']);
        if (numYears == 1) {
            tempTimes.push({
                time: '1 Year',
                value: flaskFundsList[j]['returns'][1]
            });
        } else {
            tempTimes.push({
                time: numYears.toString() + ' Years',
                value: flaskFundsList[j]['returns'][numYears],
            });
        }
    }
    tempTimes.push({
        time: gd['time'].toString() + ' Years',
        value: flaskFundsList[j]['returns'][gd['time']],
    })
    future_times.push(tempTimes);
}
let future_years = [
    {'time': future_times[0][0].time, value: 0},
    {'time': future_times[0][1].time, value: 0},
    {'time': future_times[0][2].time, value: 0},
    {'time': future_times[0][3].time, value: 0}
];
for (let i = 0; i < 4; i++) {
    let acc = 0;
    for (let j = 0; j < 5; j++) {
        acc += Math.round(0.2 * future_times[j][i].value);
    }
    future_years[i].value = acc;
}
for (let i = 0; i < 4; i++) {
    dset('future-' + i.toString(), '$ ' + future_years[i].value.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    dset('y-fut-' + i.toString(), future_years[i].time);
}
let historic_times = []
for (let j = 0; j < 5; j++) {
    tempTimes = [];
    tempTimes.push({
        time: gd['time'] + " Years ago",
        value: flaskFundsList[j].returns[0]
    })
    let numYears = Math.round(0.5 * gd['time']);
    if (numYears == 1) {
        tempTimes.push({
            time: '1 Year',
            value: Math.round(gd['amount'] * (flaskFundsList[j].annualized_return / 100.0 + 1))
        });
    } else {
        tempTimes.push({
            time: numYears.toString() + " Years ago",
            value: Math.round(gd['amount'] * ((flaskFundsList[j].annualized_return / 100.0 + 1) ** numYears))
        });
    }
    tempTimes.push({
        time: 'Present',
        value: Math.round(gd['amount'] * ((flaskFundsList[j].annualized_return / 100.0 + 1) ** gd['time']))
    })
    historic_times.push(tempTimes);
}
let historic_years = [
    {'time': historic_times[0][0].time, value: 0},
    {'time': historic_times[0][1].time, value: 0},
    {'time': historic_times[0][2].time, value: 0}
];
for (let i = 0; i < 3; i++) {
    let acc = 0;
    for (let j = 0; j < 5; j++) {
        acc += Math.round(0.2 * historic_times[j][i].value);
    }
    historic_years[i].value = acc;
}
for (let i = 0; i < 3; i++) {
    dset('historical-' + i.toString(), '$ ' + historic_years[i].value.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    dset('year-h-' + i.toString(), historic_years[i].time);
}

let min_oneyearp = flaskFundsList[0].oneyearp;
for (let i = 0; i < 5; i++) {
    if (flaskFundsList[i].oneyearp < min_oneyearp)
        min_oneyearp = flaskFundsList[i].oneyearp;
}
min_oneyearp *= 0.75;

let average_oneyearp = min_oneyearp / 1200.0 + 1;
let average_growth = [];
average_growth.push(parseInt(gd['amount']));
for (let i = 1; i < 12; i++) {
    average_growth.push(Math.round(average_growth[i - 1] * average_oneyearp));
}
let funds_growth_year = [];
for (let i = 0; i < 5; i++) {
    let growths = [];
    let rate = flaskFundsList[i].oneyearp / 1200.0 + 1;
    growths.push((parseInt(gd['amount'])));
    for (let j = 1; j < 12; j++) {
        let val = Math.round(growths[j - 1] * rate);
        growths.push(val);
    }
    funds_growth_year.push(growths);
}

/////END TIMEFRAME LOGIC

/////START INFO TAB SWITCHING LOGIC
var isSwitched = false;
function handleSwitch(index) {
    dset('fund-name-blurb', flaskFundsList[index].name);
    updateLineGraph(index);
    if (!isSwitched) {
        $("#input-col").animate({
            'right': '+=18%'
        }, 375);
        $('#main-col').animate({
            'right': '+=18%'
        }, 375);
        setTimeout(() => $('#info-col').fadeIn(375), 200);
    }
    isSwitched = true;
}
function handleSwitchBack() {
    if (!isSwitched)
        return;
    isSwitched = false;
    $("#main-col").animate({
        'right': '-=18%'
    }, 375);
    $("#input-col").animate({
        'right': '-=18%'
    }, 375);
    $('#info-col').fadeOut(100);
}
//?/?/?????//// END INFO TAB SWITCHING LOGIC



/////START LINECHART LOGIC


let updateLineGraph = (idx) => {
    var linectx=document.getElementById("line").getContext("2d");
    var linectx=new Chart (linectx, {
        type: "line",
        data: {
            labels: [
                "January",
                "February", 
                "March", 
                "April", 
                "May", 
                "June", 
                "July", 
                "August", 
                "September",
                "October",
                "November",
                "December"
                ],
            datasets: [
                {
                    label: flaskFundsList[idx].name, //enter stock label
                    pointBorderColor: pie_colours[idx],
                    borderColor: pie_colours[idx],
                    fill: false,
                    data: funds_growth_year[idx] //enter stock data
                },
                {
                    label: "Average Performance",
                    pointBorderColor: "#7c878e",
                    backgroundColor: "rgba(124, 135, 142, 0.2)",
                    borderColor: "#7c878e",
                    fill: true,
                    data: average_growth //enter average data
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Performance",
                fontSize: '19',
                fontFamily: 'Verdana, Geneva, sans-serif'
            },
            tooltips: {
                mode: "index", 
                intersect: false
            },
            hover: {
                mode: "nearest",
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Month"
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Value"
                    }
                }]
            },
            responsive: false
        }
    });
}
/////END LINECHART LOGIC
