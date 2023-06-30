window.addEventListener("DOMContentLoaded", loadPage, false);

// define variables
const audioCtx = new AudioContext();
let source;
let buffer;

const play = document.getElementById("play");
const stop = document.getElementById("stop");

function loadPage() {
    getAudio("brown10");
}

// use XHR to load an audio file and
// decodeAudioData to decode it and stick it in in global buffer variable.
// We put the buffer into the source in play.onclick().
function getAudio(name) {
    request = new XMLHttpRequest();
    request.open("GET", `${name}.mp3`, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
        let audioData = request.response;
        audioCtx.decodeAudioData(
          audioData,
          (buf) => {
            buffer = buf;
            //const max = Math.floor(buf.duration); // in this case buf === global buffer
            play.disabled = false;
          },
          (err) => {
            console.error(
              `Unable to get the audio file: ${name} Error: ${err.message}`
            );
          }
        );
    };
    request.send();
}

play.onclick = () => {
    source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.loop = true;
    source.start();
    play.disabled = true;
};

stop.onclick = () => {
    source.stop();
    play.disabled = false;
};
