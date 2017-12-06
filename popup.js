/*jslint browser: true*/


/* 

add some multi line comments to all the methods/functions
*/

var options = ["first_option", "second_option", "third_option", "fourth_option"];
var first_options = ["text", "image", "quote", "link"];
var second_options = ["chat", "audio", "video", "ask"];
var third_options = ["reset", "saved", "blog_permissions", "outofblog"];
var current_options = [[first_options, second_options, third_options]];
var options_counter = 10000002;//fix this dumb way of doing shit - bug because at 0 goes to -1 
var choices = ["first_choice", "second_choice", "third_choice"];
var choice_counter = 0;
var picked_choices = [];
var num_choices = 3;

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

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-110804408-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();    
    
    
    

function save() {
    
    for(var i in picked_choices) {
        var picked_choice_type = picked_choices[i].substring(14, picked_choices[i].length);
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
        ask: pickedVals["ask"],
        
        picked_choices: picked_choices
        
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
            setTimeout(function() {
                window.close();
            }, 750);
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
        ask: false,
        
        picked_choices: []


    }, function(items){
        if (items.first_choice) {
            document.getElementById("first_choice").className = items.first_choice;
        }

        if (items.second_choice) {
            document.getElementById("second_choice").className = items.second_choice;
        }
        
        if(items.third_choice) {
            document.getElementById("third_choice").className = items.third_choice;
        }

        picked_choices = items.picked_choices;
    });
    


}

function chooseOption(option) {
    var choice_class_name = ("choice locked" + clicked_option_class.substring(16, clicked_option_class.length));
    var picked_choices_index = choice_counter % num_choices;
    var contains = false;
    for(var i = 0; i < choices.length; i++) {
    
        if (picked_choices[i] === choice_class_name) {
            contains = true;
            break
        }
    }
    
    if (!contains) {
        current_choice = document.getElementById(choices[picked_choices_index]);
        current_choice.className = choice_class_name;
        picked_choices[picked_choices_index] = choice_class_name;
        choice_counter++;

    }
}

function reset() {
        chrome.storage.sync.set({
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
            ask: false,

            picked_choices: []
        
    }, function() {
        options_counter = 10000002;  
        choice_counter = 0;
        picked_choices = [];
        
        for(var i = 0; i < choices.length; i++) {
            choice_elem = document.getElementById(choices[i]);
            choice_elem.className = "choice";
        }
            
        var status_bar = document.getElementById("status_text");
        status_bar.innerHTML = "Reset";
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
                setTimeout(function() {
                window.close();
            }, 750);
        });
        
    });

}

function promptUnavailable() {
    var status_bar = document.getElementById("status_text");
    status_bar.innerHTML = "Coming Soon!";
    
    setTimeout(function() {
        status_bar.innerHTML = "";    
    }, 1250);

}
function optionClick(option) {
    clicked_option = document.getElementById(option);
    clicked_option_class = clicked_option.getAttribute("class");
    clicked_option_type = clicked_option_class.substring(17, clicked_option_class.length);
    
    if(options_counter % current_options[0].length == 2) {//i don't like how this is hard coded - i could decided that the special options are at 2 and tthis code would be obsolete - it's ugly af
        
        if(clicked_option_type == "reset") {
            
            reset();
            
        } else if(clicked_option_type == "saved") {
            
            promptUnavailable();
            
        } else if(clicked_option_type == "blog_permissions") {
            
            promptUnavailable();

        } else if(clicked_option_type == "outofblog") {
                
            promptUnavailable();        
            
        }
    } else {
        chooseOption(option)
    }


  
}

function rightSwap(){
    options_counter++;
    for(var i = 0; i < options.length; i++) {
        document.getElementById(options[i]).className = ("option unclicked_" + current_options[0][Math.abs(options_counter) % current_options[0].length][i]);
    }

}

function leftSwap() {
    options_counter--;
    for(var i = 0; i < options.length; i++) {
        document.getElementById(options[i]).className = ("option unclicked_" + current_options[0][Math.abs(options_counter) % current_options[0].length][i]);
    }

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
