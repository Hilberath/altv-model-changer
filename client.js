import * as alt from "alt";
import * as native from "natives";

let loaded = false;
let opened = false;

const view = new alt.WebView("http://resource/html/index.html");

function menu(toggle) {
  opened = toggle;

  alt.showCursor(toggle);
  alt.toggleGameControls(!toggle);

  if (toggle) {
    view.focus();
  } else {
    view.unfocus();
  }

  view.emit("menu", toggle);
}

function promisify(callback) {
  return new Promise((resolve, reject) => {
    let loader = alt.setInterval(() => {
      if (callback() == true) {
        resolve(true);
        alt.clearInterval(loader);
      }
    }, 80);
  });
}

view.on("ready", () => {
  loaded = true;
});

view.on("menu", (toggle) => {
  menu(toggle);
});

view.on("select", (model) => {
  alt.emitServer("playerPedModel", model);
  menu(false);
});

alt.on("keyup", (key) => {
  if (!loaded) return;

  if (key === 0x68) {
    // Numpad 8
    menu(!opened);
  } else if (opened && key === 0x1b) {
    // Escape-Taste
    menu(false);
  }
});

alt.log("[HMC] Client-Side Loaded.");
