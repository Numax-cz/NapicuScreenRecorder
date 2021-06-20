# NapicuScreenRecorder
* Aplikace pro nahrávání obrazu
* Pro nahrávání zvuku potřeba povolit v `render.js` (Na linuxu problém se zvukem. Více na [Electron - DesktopCapturer](https://www.electronjs.org/docs/api/desktop-capturer) )
* Aplikace je připravena pro architekturu x64, lze ji ale změnit v `package.json` více na [Electron Builder - Any Target](https://www.electron.build/configuration/linux)
* Vyzkoušeno na rozlišení 1920x1080
* Kodek vp9
* Výstup .webm
* Vytvořeno pomocí [Electron](https://www.electronjs.org/)


### Instalace
1. Naklonování repozitáře
   ```sh
   git clone https://github.com/Numax-cz/NapicuScreenRecorder.git
   ```
2. Nainstalování balíčků
   ```sh
   npm install
   ```
3. Spuštění aplikace
    ```sh
    npm run start
    ```

### Buildnutí
* Pro Linux x64 - snap
   ```sh
   npm run buildLin
   ```
* Pro Windows x64
   ```sh
   npm run buildWin
   ```
### Pack
   ```sh
   npm run pack
   ```

![Nahled](https://github.com/Numax-cz/NapicuScreenRecorder/img/Sreen.png)