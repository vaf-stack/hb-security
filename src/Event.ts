import { Player, Room } from "haxball-types";
import Api from "./Api";

type Options = {
  banPlayerAutomatically?: boolean;
  sendAlertsOnTheConsole?: boolean;
  sendPlayerAuth?: boolean;
};

class Event extends Api {
  public token?: string;
  public options?: Options;
  public room?: Room;
  /**
   *
   * @param name
   * @param player
   */
  public emit(name: "playerJoined", player: Player) {
    if (name === "playerJoined") {
      if (this.options?.sendPlayerAuth) console.log(`[AUTH] ${player.name}: ${player.auth}`);
      this.create("player/add", "POST", player)?.then((res) => {
        if (res.status === 200 && res.data.code === 401) {
          return console.warn("The [PlayerObject] is invalid, it was not possible to analyze this player.")
        }
      })
      this.create(
        `player/verify?conn=${player?.conn}&auth=${player?.auth}`,
        "GET"
      )?.then((res) => {
        if (res.data && res.data.message && this.options?.sendAlertsOnTheConsole) {
          console.warn(res.data.message);
        }
        if (res.data && res.data.banned && this.options?.banPlayerAutomatically) {
          this.room?.kickPlayer(player?.id, "You are permanently banned from our database", true);
        }
      });
    }
  }
}

export default Event;
