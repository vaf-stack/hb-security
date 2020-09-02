import Event from "./Event";
import { Room, Player } from "haxball-types";

type Options = {
  banPlayerAutomatically?: boolean;
  sendAlertsOnTheConsole?: boolean;
  sendPlayerAuth?: boolean;
};

/**
 * Plugin class
 */
class Plugin extends Event {
  public token: string;
  public room: Room;
  public options: Options;
  /**
   *
   * @param room Room object
   */
  constructor(room: Room) {
    super();

    this.token = "";
    this.room = room;
    this.options = { banPlayerAutomatically: false, sendAlertsOnTheConsole: true, sendPlayerAuth: true };
  }

  /**
   *
   * @param token Login access
   */
  public login(token: string) {
    this.token = token;

    return this;
  }

  /**
   *
   * @param options Otions object
   */
  public config(options: Options) {
    this.options = Object.assign(this.options, options);

    return this;
  }
}

export default Plugin;
