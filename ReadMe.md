clone repo
npm install .
npm start
npm run make

---

## Detail..

---

App creation :

npm init -y
npm i --save-dev electron@latest

-> main.js
-> index.html

change main to main.js for main script

add start command to script: "start": "electron ."

for distribution :
npx @electron-forge/cli import

for packaging :
npm run make

don't forget to add "discord.js": "^12.5.1" in the main "dependencies"

<!-- BOT CREATION ON DISCORD -->

create new app
https://discord.com/developers/applications

create new bot with authorisations
get the token

go on OAuth2 tab, choose BOT scopes + Authorisation.
Copy the auto generated link, add the bot to your server.

<!-- NODEJS + JOHNY-FIVE + FIRMATA = ARDUINO CONTROL -->

https://www.npmjs.com/package/johnny-five

for serial port communication you need electron-prebuilt
npm install -g electron-prebuilt  
npm install --save serialport  
npm install --save-dev electron-rebuild
