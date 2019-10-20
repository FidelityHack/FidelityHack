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
    document.getElementById('color-fund' + i.toString()).setAttribute(
        'style', 'width:10px;height:10px;background:' + pie_colours[i] + ';' +
            'border-radius:5px;'
    );
}

for (let i = 0; i < 5; i++) {
    document.getElementById('fund' + i.toString()).innerHTML = flaskFundsList[i];
}