const videoSelectBtn = document.getElementById('videocct');
videoSelectBtn.onclick = getVideoSources;
const { desktopCapturer } = require('electron');
const { Menu, dialog } = require('electron').remote;
const { writeFile } = require('fs')
const video = document.querySelector("video");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
var Record;
const Chunks = [];


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

async function selectSource(source) {
    const con = {
        audio: {
            mandatory: {
                chromeMediaSource: 'desktop'
            }
        },
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };
    const stream = await navigator.mediaDevices
        .getUserMedia({ audio: false, video: con.video });
    const VideoOut = await navigator.mediaDevices
        .getUserMedia(con);
    video.srcObject = stream;
    video.play();
    const option = { mimeType: 'video/webm;codecs=vp9' };
    Record = new MediaRecorder(VideoOut, option);
    Record.ondataavailable = Data;
    Record.onstop = Save;
}

function Data(e) {
    Chunks.push(e.data)
}

async function Save(e) {
    const blob = new Blob(Chunks, {
        type: 'video/webm;codecs=vp9'
    });
    const buffer = Buffer.from(await blob.arrayBuffer());
    const { filePath } = await dialog.showSaveDialog({
        buttonLabel: 'Save',
        defaultPath: `video-${Date.now()}.webm`
    });
    console.log(filePath);
    writeFile(filePath, buffer, () => console.log("Uloženo"));
}

start.onclick = e => {
    if (Record) {
        Record.start();
        start.innerText = 'Nahráváš!';
    }
};

stop.onclick = e => {
    if (Record) {
        Record.stop();
        start.innerText = 'Nahrávat';
    }
};