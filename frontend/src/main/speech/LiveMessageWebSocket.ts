import { WEB_SOCKET_BASE_URL } from "../../env";

type OnMessageRecieve = (message: Message) => void;

export enum MessageType {
  TRANSCRIPT = "transcript",
  SUBSCRIPTION = "subscribe",
}
export interface TranscriptMessage {
  type: MessageType.TRANSCRIPT;
  isFinal: boolean;
  transcript: string;
  transcriptId: string;
  channelId: string;
}
export interface SubscribeMessage {
  type: MessageType.SUBSCRIPTION;
  channelId: string;
}

export type Message = SubscribeMessage | TranscriptMessage;

export default class LiveMessageWebSocket {
  socket: WebSocket;
  callback: OnMessageRecieve | null;
  constructor() {
    this.socket = new WebSocket(WEB_SOCKET_BASE_URL);
    this.callback = null;
    this.socket.addEventListener("message", (event) => {
      this.callback && this.callback(JSON.parse(event.data));
    });
    console.log("LiveMessage object created ====================");
  }

  onConnect(callback: () => void) {
    this.socket.addEventListener("open", callback);
  }

  sendMessage(message: Message) {
    this.socket.send(JSON.stringify(message));
  }
  onConnected(callback: () => void) {
    this.socket.addEventListener("open", function (event) {
      callback();
    });
  }
  onMessageRecieve(ca: OnMessageRecieve) {
    this.callback = ca;
  }

  close() {
    (this.socket.readyState === WebSocket.OPEN ||
      this.socket.readyState === WebSocket.CONNECTING) &&
      this.socket.close();
  }
}
