// ==UserScript==
// @name         InsertionScript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  inserts html
// @author       You
// @match        https://www.fidelity.ca/*
// @include      https://www.fidelity.ca/*
// @grant        none
// ==/UserScript==
'use strict';
window.loadTool = () => {
    let req = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/getit";
    req.open("GET", url);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.send();
    req.onload = function () {
        $("#main > div > article > div").fadeOut("1000", function() {
            let resp = JSON.parse(req.response);
            console.log(resp);
            $(this).html(resp.msg);
        }).fadeIn("slow");
    };
};

let gs_html = '<a style="border-radius:15px;background:#bcd19b;margin-bottom:10px;" href="#" onclick="window.loadTool()">Get Started</a>';

let replace = () => {
    let parent = document.getElementById("main_menu");
    let get_started = document.createElement("li");
    get_started.setAttribute("class", "has_children");
    get_started.innerHTML = gs_html.trim();
    parent.insertBefore(get_started, parent.lastChild.nextSibling);
};
setTimeout(replace, 200);