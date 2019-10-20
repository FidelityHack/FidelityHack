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
    $("#main > div > article > div").fadeOut("1000", function() {
        $(this).html('<iFrame width="100%" height="1500" src="http://127.0.0.1:5000/getForm"></iFrame>');
    }).fadeIn("1000");
};

let gs_html = '<a style="border-radius:15px;background:#bcd19b;margin-bottom:10px;overflow:hidden" href="#" onclick="window.loadTool()">Get Started</a>';

let replace = () => {
    let parent = document.getElementById("main_menu");
    let get_started = document.createElement("li");
    get_started.setAttribute("class", "has_children");
    get_started.innerHTML = gs_html.trim();
    parent.insertBefore(get_started, parent.lastChild.nextSibling);
};
setTimeout(replace, 500);