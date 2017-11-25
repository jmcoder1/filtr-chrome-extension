/*jslint browser: true*/
/*global $, jQuery, alert*/
var options;
var first_options;
var second_options;
var current_options;
var choices;
var choice_counter;
var picked_choices;

$(document).ready(new function() {
    
    options = ["first_option", "second_option", "third_option", "fourth_option"];
    first_options = ["text", "image", "quote", "link"];
    second_options = ["chat", "audio", "video", "ask"];  
    current_options = [second_options];
    choices = ["first_choice", "second_choice", "third_choice"];
    choice_counter = 0;
    picked_choices = [];
});




function save() {
    status_bar = document.getElementById("status_text");
    status_bar.innerHTML = "Saved";

    setTimeout(function() {
        status_bar.innerHTML = "";
        }, 750);
    
    
}

function optionClick(option) {
    clicked_option = document.getElementById(option);
    clicked_option_class = clicked_option.getAttribute("class");
    picked_choices_index = choice_counter % 3;
    
    var choice_class_name = ("choice locked" + clicked_option_class.substring(16, clicked_option_class.length));
    
    var contains = false;
    for(i = 0; i < picked_choices.length; i++) {
    
        if (picked_choices[i] === choice_class_name) {
            contains = true;
            break
        }
    }
    
    if (!contains) {
        document.getElementById(choices[picked_choices_index]).className =  choice_class_name;
        picked_choices[picked_choices_index] = choice_class_name;

    }

    choice_counter++;
  
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
    
    document.querySelector("#first_option").addEventListener("click", function() {
        optionClick("first_option");
    }, false);
    
    document.querySelector("#second_option").addEventListener("click", function() {
        optionClick("second_option");
    }, false);
   
    document.querySelector("#third_option").addEventListener("click", function() {
        optionClick("third_option");
    }, false);
    
    document.querySelector("#fourth_option").addEventListener("click", function() {
        optionClick("fourth_option");
    }, false);    
    
});
