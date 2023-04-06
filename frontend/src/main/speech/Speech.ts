export interface SpeechProps {
  transcript: TranscriptProps;
  isFinal: boolean;
}
export interface TranscriptProps {
  final: string;
  interim: string;
}
export type SpeechRecognitionCallback = (speech: SpeechProps) => void;

export default class Speech {
  recognition: any;
  callback: SpeechRecognitionCallback | null;
  active: boolean;
  constructor() {
    let win = window as any;
    win.SpeechRecognition =
      win.SpeechRecognition ?? win.webkitSpeechRecognition;
    this.recognition = new win.SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";
    this.recognition.maxAlternatives = 1;
    this.callback = null;
    this.active = false;

    this.recognition.addEventListener("result", (event: any) => {
      let final = "";
      let interim = "";
      for (const element of event.results) {
        if (element.isFinal) {
          final += element[0].transcript;
        } else {
          interim += element[0].transcript;
        }
      }
      const transcript = event.results as any[];
      const speech = transcript[event.resultIndex];
      this.callback &&
        this.callback({
          transcript: {
            final,
            interim,
          },
          isFinal: speech.isFinal,
        });
    });

    this.recognition.addEventListener("end", (event: any) => {
      setTimeout(() => this.active && this.startSpeechRecognition(), 1500);
    });

    this.recognition.addEventListener("error", (event: any) => {
      console.log("error" + JSON.stringify(event));
    });
  }

  startSpeechRecognition() {
    this.recognition.start();
    this.active = true;
  }

  onSpeechRecognitioned(callbackProp: SpeechRecognitionCallback) {
    this.callback = callbackProp;
  }

  stopSpeechRecognition() {
    this.recognition.stop();
    this.active = false;
  }
}
