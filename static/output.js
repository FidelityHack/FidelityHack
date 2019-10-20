gd = JSON.parse(inputData);
function dset(id, s) {
    document.getElementById(id).innerHTML = s;
}
dset('age-echo', gd['age'] + " Years old");
dset('time-echo', gd['time'] + "Years");
dset('amount-echo', gd['amount'].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
dset('regular-echo', gd['regular'].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
dset('frequency-echo', gd['frequency']);
dset('risk-echo', "Level " + gd['risk']);