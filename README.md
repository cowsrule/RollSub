# RollSub
Rollbar UI to Sublime Text helper

## Setup

1. Ensure subl.exe is in your path or specify `--subl=<path>` to the server
2. Install the RollSub extension into Chrome from chrome://extensions/ using the 'Load unpacked extension' button

## Usage
1. Run `node server/RollbarServer.js --path=<jsroot>`
2. Run Sublime Text
3. Click stack traces in Rollbar to open the corresponding line in Sublime Text
