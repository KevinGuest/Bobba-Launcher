# Eyefind
The alternative browser with Flash Player for Windows 7/10 (x32/x64) and MacOS.

## How to install?
1. Download NodeJS: https://nodejs.org/
 
2. Open `Command Prompt` and make sure you are in the same location as the AsteroidApp.

3. Install the dependencies by execute the command: `npm install`

4. Make sure the file `package.json` is set up as desired.

    • productName = Hotel name
    
    • appId = nl.hotelname.appname (also in Main.js!)

5. Open the configuration file `config.env` and put your link here like this:

    URL = https://www.habbo.com
    
    SHORT_URL = habbo.com
    
6. Translate/edit the file `views/home.html`

7. Open `Command Prompt` again and execute the command: `npm start` 

8. Yay congrats! Your app should be up and running. If everything is okay you can make it a .exe or a .dmg

9. Open `Command Prompt` again and execute one of these commands:
    * `npm run windows` - For Windows 
    * `npm run mac` - For Mac 
    
10. Yay! your app is ready for publishing! Go to the folder `dist` and your .exe / .dmg should be there!

Props to Bobba, AsteroidApp,& Electron.