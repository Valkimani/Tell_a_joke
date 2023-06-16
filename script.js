
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

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
                key: '5a8902ae37f846d3b5bd18f5acb9fed1',
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
// Launches after the audio has ended to disable the button once the joke is starts, disable while the joke is being told and enable when the joke is done
audioElement.addEventListener('ended', toggleButton);
