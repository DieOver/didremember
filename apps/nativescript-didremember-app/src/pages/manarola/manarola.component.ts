import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { on, off } from '@nativescript/core/application';
import {
  OrientationChangedEventData,
  StackLayout,
  Application,
  Dialogs,
  File,
  isAndroid,
  knownFolders,
  Observable,
  Slider,
  Utils,
} from '@nativescript/core';
import {
  AudioPlayerOptions,
  AudioRecorderOptions,
  TNSPlayer,
  TNSRecorder,
} from 'nativescript-audio';

@Component({
  selector: 'ns-manarola',
  templateUrl: './manarola.component.html',
  styleUrls: ['./manarola.component.scss'],
})
export class ManarolaComponent extends Observable implements OnInit, OnDestroy {
  spaceCardMidle = 0;
  @ViewChild('cardMiddle', { static: true })
  cardMiddle: ElementRef<StackLayout>;

  cardMiddleLoaded() {
    setTimeout(() => {
      this.spaceCardMidle =
        this.cardMiddle.nativeElement.getActualSize().height / 2 + 20;
      console.log('cardMiddleLoaded', this.spaceCardMidle);
    }, 1);
  }

  ngOnInit(): void {
    on('orientationChanged', (evt: OrientationChangedEventData) => {
      console.log('orientationChanged', evt.newValue);
    });
  }

  ngOnDestroy(): void {
    off('orientationChanged', () => {
      console.log('remove watch orientationChanged');
    });
  }

  public isPlaying = false;
  public isRecording = false;
  public recordedAudioFile: string;
  public currentVolume;
  public audioTrackDuration;
  public remainingDuration;
  private _recorder;
  private _player: TNSPlayer;
  private _audioUrls: Array<any> = [
    {
      name: 'Fight Club',
      pic: '~/pics/canoe_girl.jpeg',
      url: 'http://www.noiseaddicts.com/samples_1w72b820/2514.mp3',
    },
    {
      name: 'To The Bat Cave!!!',
      pic: '~/pics/bears.jpeg',
      url: 'http://www.noiseaddicts.com/samples_1w72b820/17.mp3',
    },
    {
      name: 'Marlon Brando',
      pic: '~/pics/northern_lights.jpeg',
      url: 'http://www.noiseaddicts.com/samples_1w72b820/47.mp3',
    },
  ];
  private _meterInterval: any;
  private _slider: Slider;

  constructor() {
    super();
    this._player = new TNSPlayer();
    this._player.debug = true; // set true for tns_player logs

    this._recorder = new TNSRecorder();
    this._recorder.debug = true; // set true for tns_recorder logs

    this.currentVolume = 1;
    // this._slider = page.getViewById('volumeSlider') as Slider;

    // Set player volume
    // if (this._slider) {
    //   this._slider.on('valueChange', (data: any) => {
    //     this._player.volume = this._slider.value / 100;
    //   });
    // }
  }

  public async startRecord() {
    try {
      if (!TNSRecorder.CAN_RECORD()) {
        Dialogs.alert('This device cannot record audio.');
        return;
      }
      const audioFolder = knownFolders.currentApp().getFolder('audio');
      console.log(JSON.stringify(audioFolder));

      let androidFormat;
      let androidEncoder;
      if (isAndroid) {
        // m4a
        // static constants are not available, using raw values here
        // androidFormat = android.media.MediaRecorder.OutputFormat.MPEG_4;
        androidFormat = 2;
        // androidEncoder = android.media.MediaRecorder.AudioEncoder.AAC;
        androidEncoder = 3;
      }

      const recordingPath = `${
        audioFolder.path
      }/recording.${this.platformExtension()}`;
      const recorderOptions: AudioRecorderOptions = {
        filename: recordingPath,
        format: androidFormat,
        encoder: androidEncoder,
        metering: true,
        infoCallback: (infoObject) => {
          console.log(JSON.stringify(infoObject));
        },
        errorCallback: (errorObject) => {
          console.log(JSON.stringify(errorObject));
        },
      };

      await this._recorder.start(recorderOptions);
      this.isRecording = true;
    } catch (err) {
      this.isRecording = false;
      Dialogs.alert(err);
    }
  }

  public async stopRecord() {
    await this._recorder.stop().catch((ex) => {
      console.log(ex);
      this.isRecording = false;
    });

    this.isRecording = false;
    alert('Recorder stopped.');
    this.getFile();
  }

  public getFile() {
    try {
      const audioFolder = knownFolders.currentApp().getFolder('audio');
      const recordedFile = audioFolder.getFile(
        `recording.${this.platformExtension()}`
      );
      console.log(JSON.stringify(recordedFile));
      console.log('recording exists: ' + File.exists(recordedFile.path));
      this.recordedAudioFile = recordedFile.path;
    } catch (ex) {
      console.log(ex);
    }
  }

  public async playRecordedFile() {
    const audioFolder = knownFolders.currentApp().getFolder('audio');
    const recordedFile = audioFolder.getFile(
      `recording.${this.platformExtension()}`
    );
    console.log('RECORDED FILE : ' + JSON.stringify(recordedFile));

    const playerOptions: AudioPlayerOptions = {
      audioFile: `~/audio/recording.${this.platformExtension()}`,
      loop: false,
      completeCallback: async () => {
        alert('Audio file complete.');
        this.isPlaying = false;
        if (!playerOptions.loop) {
          await this._player.dispose();
          console.log('player disposed');
        }
      },

      errorCallback: (errorObject) => {
        console.log(JSON.stringify(errorObject));
        this.isPlaying = false;
      },

      infoCallback: (infoObject) => {
        console.log(JSON.stringify(infoObject));
        Dialogs.alert('Info callback');
      },
    };

    await this._player.playFromFile(playerOptions).catch((err) => {
      console.log('error playFromFile');
      this.isPlaying = false;
    });

    this.isPlaying = true;
  }

  /***** AUDIO PLAYER *****/

  public playAudio(filepath: string, fileType: string) {
    try {
      const playerOptions: AudioPlayerOptions = {
        audioFile: filepath,
        loop: false,
        completeCallback: async () => {
          alert('Audio file complete.');
          await this._player.dispose();
          this.isPlaying = false;
          console.log('player disposed');
        },
        errorCallback: (errorObject) => {
          console.log(JSON.stringify(errorObject));
          this.isPlaying = false;
        },
        infoCallback: (args) => {
          Dialogs.alert('Info callback: ' + args.info);
          console.log(JSON.stringify(args));
        },
      };

      this.isPlaying = true;

      if (fileType === 'localFile') {
        this._player.playFromFile(playerOptions).then(async () => {
          this.isPlaying = true;
          this.audioTrackDuration = await this._player.getAudioTrackDuration();
          // start audio duration tracking
          this._startDurationTracking(this.audioTrackDuration);
          this._startVolumeTracking();
        }).catch(() => {
          this.isPlaying = false;
        });
      } else if (fileType === 'remoteFile') {
        console.log('fileType', fileType);
        this._player.playFromUrl(playerOptions).then((res) => {
          console.log('fileType', res);
          this.isPlaying = true;
        }).catch((error) => {
          console.error('fileType error', error);
          this.isPlaying = false;
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  /**
   * PLAY REMOTE AUDIO FILE
   */
  public playRemoteFile() {
    console.log('playRemoteFile');
    const filepath = 'http://www.noiseaddicts.com/samples_1w72b820/2514.mp3';

    this.playAudio(filepath, 'remoteFile');
  }

  public resumePlayer() {
    console.log(JSON.stringify(this._player));
    this._player.resume();
  }

  /**
   * PLAY LOCAL AUDIO FILE from app folder
   */
  public playLocalFile() {
    const filepath = '~/audio/angel.mp3';
    this.playAudio(filepath, 'localFile');
  }

  public async pauseAudio() {
    try {
      await this._player.pause();
      this.isPlaying = false;
    } catch (error) {
      console.log(error);
      this.isPlaying = true;
    }
  }

  public async resumeAudio() {
    try {
      await this._player.resume();
      this.isPlaying = true;
    } catch (error) {
      console.log(error);
      this.isPlaying = false;
    }
  }

  public async stopPlaying() {
    await this._player.dispose();
    Dialogs.alert('Media Player Disposed.');
  }

  public muteTap() {
    this.currentVolume = this._player.volume;
    this._player.volume = 0;
  }

  public unmuteTap() {
    console.log('unmuteTap', this._player.volume);
    this._player.volume = 1;
  }

  public skipTo8() {
    this._player.seekTo(8);
  }

  public playSpeed1() {
    this._player.changePlayerSpeed(1);
  }

  public playSpeed15() {
    this._player.changePlayerSpeed(1.5);
  }

  public playSpeed2() {
    this._player.changePlayerSpeed(2);
  }

  private platformExtension() {
    return `${Application.android ? 'm4a' : 'caf'}`;
  }

  private async _startDurationTracking(duration) {
    if (this._player && this._player.isAudioPlaying()) {
      const timerId = Utils.setInterval(() => {
        this.remainingDuration = duration - this._player.currentTime;
        console.log(`this.remainingDuration = ${this.remainingDuration}`);
      }, 1000);
    }
  }

  private _startVolumeTracking() {
    if (this._player) {
      const timerId = Utils.setInterval(() => {
        console.log('volume tracking', this._player.volume);
        this.currentVolume = this._player.volume;
      }, 2000);
    }
  }
}
