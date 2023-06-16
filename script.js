
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

// Disable/Enable button

function toggleButton(){
    // If button disabled is true, conversely the opposite will be false on the other side
    // When the page first loads, the button is not disabled
    button.disabled = !button.disabled;
}
// Commenting out the test function to test the Joke function. Moved to the tell me joke function
// function test(){
//     VoiceRSS.speech({
//         key: '<API KEY HERE>',
//         src: 'Hello, world!',
//         hl: 'en-us',
//         v: 'Linda',
//         r: 0, 
//         c: 'mp3',
//         f: '44khz_16bit_stereo',
//         ssml: false
//     });
// }
// test();

// Passing our Joke to our VoiceRSS API
// create new function
function tellMe(joke){
    VoiceRSS.speech({
                key: '<API KEY HERE>',
                src: joke,
                hl: 'en-us',
                v: 'Linda',
                r: 0, 
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
    console.log('Utter:', joke);
}
// Get jokes from joke API

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';
    try{
        // In the fetch method, parse in apiUrl constant
        // For the response, create a data constant. Turn response into response.json
        // Wait until response.json is done to set our data value
const response = await fetch(apiUrl);
const data = await response.json();
// 
if (data.setup) {
// Using template string to make it easier to add strings... and variables ${}
    joke = `${data.setup} ... ${data.delivery}`;
}else{
    joke = data.joke;
}
// Text-to-speech
tellMe(joke);
// Disable button
toggleButton();
// console.log(joke)
    } catch(error){
// catch Errors here
console.log('Oops', error);
    }
}
// getJokes();

// Event listeners: Get the jokes function to start on the click of a button Tell me a joke

button.addEventListener('click', getJokes);
// Launches after the audio has ended to disable the button once the joke is done, disable while the joke is being told and enable when the joke is done
audioElement.addEventListener('ended', toggleButton);
