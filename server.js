import * as alt from "alt-server";

alt.onClient("playerPedModel", (player, model) => {
  //#########################################################
  //Setze das Model direkt, indem du den Hash des Models verwendest
  //#########################################################
  player.model = alt.hash(model);
});

console.log("[HMC] Server-Side Loaded.");
