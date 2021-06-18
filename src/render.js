const videoSelectBtn = document.getElementById('videocct');
videoSelectBtn.onclick = getVideoSources;
const { desktopCapturer } = require('electron');
const { Menu } = require('electron').remote;

const video = document.querySelector("video");
const start = document.getElementById("start");
const stop = document.getElementById("stop");





async function getVideoSources() {
    const InputVideo = await desktopCapturer.getSources({
        types: ['window', 'screen']
    });

    const videoOptionsMenu = Menu.buildFromTemplate(
        InputVideo.map(source => {
            return {
                label: source.name,
                click: () => selectSource(source)
            };
        })
    );
    videoOptionsMenu.popup();
}
var Record;
const Chunks = [];

async function selectSource(source) {


    const con = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    const stream = await navigator.mediaDevices
        .getUserMedia(con);
    video.srcObject = stream;
    video.play();


    const option = { mimeType: 'video/webm; codecs=h264' };
    Record = new MediaRecorder(stream, option);
    Record.ondataavailable = DataAv;
    Record.onstop = InStop;
}

function DataAv(e) {
    Chunks.push(e.data)
}

async function InStop(e) {

}
//Other Buttons


start.onclick = e => {



}

