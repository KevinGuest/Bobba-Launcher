const {
	Menu: e
} = require("electron"), u = [{
	label: "Quit BobbaRP",
	submenu: [{
		role: "quit"
	}]
}];
module.exports = e.buildFromTemplate(u);