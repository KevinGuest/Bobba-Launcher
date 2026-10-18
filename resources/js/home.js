const j = global.jQuery || (global.jQuery = require("jquery-easing")), {
	remote: e,
	ipcRenderer: t
} = require("electron");

const p = require("../../package");

let s = null;
const n = [];

var url = process.env.URL;

function switchTab(e, t) {
	if (e === s) return;
	null !== s && (n[s].style.visibility = "hidden"), n[e].style.visibility = "visible", n[e].style.position = "absolute", n[e].style.width = "100%", n[e].style.bottom = "0";
	const i = document.getElementsByClassName("me__tab");
	for (let n = 0; n < i.length; n++) i[n].getAttribute("tab") === e && (i[n].classList.add("me__tab--active"), t && changeHeaderStyle(e, i)), i[n].getAttribute("tab") === s && i[n].classList.remove("me__tab--active");
	s = e
}

function fullScreen() {
	t.send("fullScreen")
}

async function createTab(e, t, s, i, a = null) {
	return new Promise((l) => {
		if (e in n) l();
		else {
			const o = document.getElementById("main"),
				r = document.createElement("webview");
			r.src = t, r.style.display = "none", r.setAttribute("plugins", ""), r.setAttribute("id", e), r.setAttribute("class", "me__webview"), null !== a && r.setAttribute("preload", a), o.appendChild(r), n[e] = r, r.addEventListener("will-navigate", e => {
				switch (e.url) {
					case url + '/logout':
						logout();
						break;
				}
			});

			r.addEventListener('did-stop-loading', () => {
				r.blur();
				r.focus();
			});

			r.addEventListener('new-window', async (e) => {
				if (e.url.includes("/hotel")) {
					createTab("hotel", url + "/hotel", "Hotel", "hotel.gif").then(() => switchTab("hotel", !0));
				}
			});

			r.addEventListener('did-navigate', async (e) => {
				if (e.url === url + "/") {
					const i = document.getElementsByClassName("me__tab");
					if (i["hotel-btn"]) {
						i["hotel-btn"].style.visibility = "hidden";
					}
				}
			});

			const d = document.getElementById("navigation"),
				c = document.createElement("li"),
				u = document.createElement("img");
			u.src = `../resources/img/${i}`, u.style.verticalAlign = "-5.5px", u.style.marginRight = "4px", u.setAttribute("draggable", "false");
			const m = document.createElement("span");
			m.innerHTML = s, c.appendChild(u), c.appendChild(m), c.setAttribute("tab", e), c.setAttribute("id", e + "-btn"), c.classList.add("me__tab"), d.appendChild(c), c.addEventListener("click", () => {
				switchTab(c.getAttribute("tab"), !0)
			}), l()
		}
	})
}
async function init() {
	await createTab("index", url, "Home", "home.gif"), setTimeout(() => switchTab("index", !1), 500)
}
init().then(() => console.debug("Launcher home initialized")), document.getElementById("fullScreen").addEventListener("click", fullScreen), document.getElementById("reload").addEventListener("click", () => {
	reload(!0)
}), t.on("reloadSession", () => {
	reload(!1, !0)
});
