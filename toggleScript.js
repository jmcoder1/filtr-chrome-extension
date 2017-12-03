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

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    
   	// Text Post
   	if(items.text){
    	$("[class*='post_full is_regular']").hide();
    }
    else{
    	$("[class*='post_full is_regular']").show();
    }

    // Photo Posts
    if(items.image){
    	$("[class*='post_full is_photo']").hide();
    }
    else{
    	$("[class*='post_full is_photo']").show();
    }

    // Quote Posts
    if(items.quote){
    	$("[class*='post_full is_quote']").hide();
    }
    else{
    	$("[class*='post_full is_quote']").show();
    }

    // Link Posts
    if(items.link){
    	$("[class*='post_full is_link']").hide();
    }
    else{
    	$("[class*='post_full is_link']").show();
    }

    // Chat Posts
    if(items.chat){
    	$("[class*='post_full is_conversation']").hide();
    }
    else{
    	$("[class*='post_full is_conversation']").show();
    }

    // Audio Posts
    if(items.audio){
    	$("[class*='post_full is_audio']").hide();
    }
    else{
    	$("[class*='post_full is_audio']").show();
    }


    // Video Posts
    if(items.video){
    	$("[class*='post_full is_video']").hide();
    }
    else{
    	$("[class*='post_full is_video']").show();
    }

    // Ask Posts
    if(items.ask){
    	$("[class*='post_full is_note']").hide();
    }
    else{
    	$("[class*='post_full is_note']").show();
    }

    
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});


});
