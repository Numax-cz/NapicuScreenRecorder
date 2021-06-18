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
        inputSources.map(source => {
            return {
                label: source.name,
                click: () => selectSource(source)
            };
        })
    );
    videoOptionsMenu.popup();
}


