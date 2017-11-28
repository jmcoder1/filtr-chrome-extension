/*jslint browser: true*/
var options = ["first_option", "second_option", "third_option", "fourth_option"];
var first_options = ["text", "image", "quote", "link"];
var second_options = ["chat", "audio", "video", "ask"];  
var current_options = [second_options];
var choices = ["first_choice", "second_choice", "third_choice"];
var choice_counter = 0;
var picked_choices = [];

var pickedVals = {
    text: false,
    image: false,
    quote: false,
    link: false,
    chat: false,
    audio: false,
    video: false,
    ask: false
};

    
    
    
    

function save() {
    
    //fix this ugly way of looping through a dict
    for(var i = 0; i < picked_choices.length; i++) {
        var picked_choice_type = picked_choices[i].substring(14,picked_choices[i].length);
        //make this more clear --> pickedVals[key] = key 
        for(var key in pickedVals) {
            if (key == picked_choice_type) {
                pickedVals[key] = true; 
            }
        }
    }
    

    chrome.storage.sync.set({
        first_choice: picked_choices[0],
        second_choice: picked_choices[1],
        third_choice: picked_choices[2],
        
        text: pickedVals["text"],
        image: pickedVals["image"],
        quote: pickedVals["quote"],
        link: pickedVals["link"],
        chat: pickedVals["chat"],
        audio: pickedVals["audio"],
        video: pickedVals["video"],
        ask: pickedVals["ask"]
        
    }, function() {
        
        var status_bar = document.getElementById("status_text");
        status_bar.innerHTML = "Saved";
        setTimeout(function() {
        status_bar.innerHTML = "";
        }, 750);
        
        var my_url = "https://www.tumblr.com/dashboard";
        var tab_url = "";
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            tab_url = tabs[0].url;

            if (my_url == tab_url) {

                chrome.tabs.reload();
            }
        });    
        
    });
    

      
}

function getOptions() {
        chrome.storage.sync.get({

            first_choice: false,
            second_choice: false,
            third_choice: false,
            
            text: false,
            image: false,
            quote: false,
            link: false,
            chat: false,
            audio: false,
            video: false,
            ask: false
    }, function(items){
        if (items.first_choice) {
            document.getElementById("first_choice").className = items.first_choice;
        }

        if (items.second_choice != false) {
            document.getElementById("second_choice").className = items.second_choice;
        }
        
        if(items.third_choice != false) {
            document.getElementById("third_choice").className = items.third_choice;
        }

    });
    
    //add some code to set the picked vals based on chrome.storage too


}

function optionClick(option) {
    clicked_option = document.getElementById(option);
    clicked_option_class = clicked_option.getAttribute("class");
    picked_choices_index = choice_counter % 3;
    
    var choice_class_name = ("choice locked" + clicked_option_class.substring(16, clicked_option_class.length));
    
    var contains = false;
    for(var i = 0; i < picked_choices.length; i++) {
    
        if (picked_choices[i] === choice_class_name) {
            contains = true;
            break
        }
    }
    
    if (!contains) {
        document.getElementById(choices[picked_choices_index]).className =  choice_class_name;
        picked_choices[picked_choices_index] = choice_class_name;
        choice_counter++;

    }

  
}

function rightSwap(){
    
    for(var i = 0; i < options.length; i++) {
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
    getOptions()
});
