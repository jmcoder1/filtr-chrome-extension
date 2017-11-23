/*jslint browser: true*/
/*global $, jQuery, alert*/
var options;
var first_options;
var second_options;
var current_options;

$(document).ready(new function() {
    
    options = ["first_option", "second_option", "third_option", "fourth_option"];
    first_options = ["text", "image", "quote", "link"];
    second_options = ["chat", "audio", "video", "ask"];     
    current_options = [second_options];
});



function save() {
    status_bar = document.getElementById("status_text");
    status_bar.innerHTML = "Saved";

    setTimeout(function() {
        status_bar.innerHTML = "";
        }, 750);
    
    
}

function rightSwap(){
    
    for(i = 0; i < options.length; i++) {
        document.getElementById(options[i]).className = ("option unclicked_" + current_options[0][i]);
    }
    
    current_options = [first_options];
}


function leftSwap() {
    
    for(i = 0; i < options.length; i++) {
        document.getElementById(options[i]).className = ("option unclicked_" + current_options[0][i]);
    }
    
    current_options = [second_options];
}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#right_arrow").addEventListener("click", rightSwap);
    document.querySelector("#left_arrow").addEventListener("click", leftSwap);
    
    document.querySelector("#save").addEventListener("click", save);
});