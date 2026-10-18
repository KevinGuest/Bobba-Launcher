const {
	BrowserWindow: e,
	globalShortcut: i,
	DiscordRPC = require('./'),
    shell
} = require("electron"), s = require("path"), t = require("url");

class n {
	constructor(n = 1200, r = 630, o = !0, l = !0, w = !1, c) {
		this._window = new e({
			width: n,
			height: r,
			resizable: l,
			frame: false,
			backgroundColor: '#292929',
			resizable: l,
			webPreferences: {
				nodeIntegration: true,
				plugins: !0,
				webSecurity: !0,
				webviewTag: !0
			}
		}), this._window.loadURL(t.format({
			pathname: s.join(__dirname, `../views/${c}.html`),
			protocol: "file:",
			slashes: !0,
			icon: s.join(__dirname, "../resources/icons/64x64.png")
		})), ["win32", "linux"].includes(process.platform) && this._window.removeMenu(), this._view = c, this._fullScreen = w, "home" === this._view && (i.register("Command+Shift+F", () => {
			this._window.isFocused() && this._window.setFullScreen(!0)
		}), i.register("Esc", () => {
			this._window.isFocused() && this._window.setFullScreen(!1)
		}), this._window.on("closed", () => {
			i.unregisterAll()
		}))

	// Set this to your Client ID.
	const clientId = '859709297897766913';

	// Only needed if you want to use spectate, join, or ask to join
	DiscordRPC.register(clientId);

	const rpc = new DiscordRPC.Client({ transport: 'ipc' });
	const startTimestamp = new Date();

	async function setActivity() {
	if (!rpc) {
    return;
  }


  rpc.setActivity({
    startTimestamp,
    largeImageKey: 'bobba-b',
    instance: false,
  });
}

	rpc.on('ready', () => {
	setActivity();

	// activity can only be set every 15 seconds
	setInterval(() => {
    setActivity();
	}, 15e3);
	});
	rpc.login({ clientId }).catch(console.error);
	}
	
	getWindow() {
		return this._window
	}
	getView(){
		return this._view
	}
	toggleFullScreen() {
		this._fullScreen = !this.getFullScreen(), this._window.setFullScreen(this._fullScreen)
	}
	getFullScreen() {
		return this._fullScreen
	}
	close() {
		this._window.close()
	}
}

module.exports = n;
