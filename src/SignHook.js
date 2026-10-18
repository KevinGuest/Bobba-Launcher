const fs = require('fs');
const path = require('path');
const s = require("../package");
var electron_notarize = require('electron-notarize');
require('dotenv').config({path: path.resolve(__dirname, '../config.env')});
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

module.exports = async function (params) {
    if (process.platform !== 'darwin') {
        return;
    }
    console.log('afterSign hook triggered', params);

    const appleId = process.env.APPLE_ID;
    const appleIdPassword = process.env.APPLE_APP_SPECIFIC_PASSWORD;
    const teamId = process.env.APPLE_TEAM_ID;

    if (!appleId || !appleIdPassword || !teamId) {
        console.log('Skipping notarization: set APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD and APPLE_TEAM_ID (see .env.example) to notarize.');
        return;
    }

    let appId = s.build.appId

    let appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);
    if (!fs.existsSync(appPath)) {
        throw new Error(`Cannot find application at: ${appPath}`);
    }

    console.log(`Notarizing ${appId} found at ${appPath}`);

    try {
        await electron_notarize.notarize({
            appBundleId: appId,
            appPath: appPath,
            appleId: appleId,
            appleIdPassword: appleIdPassword,
            ascProvider: teamId,
        });
    } catch (error) {
        console.error(error);
    }

    console.log(`Done notarizing ${appId}`);
};
