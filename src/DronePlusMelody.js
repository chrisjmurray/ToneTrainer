import * as Tone from 'tone';

const noteBaseNumbers = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A':9, 'B':11}
const noteModArray = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

const rhyStrPlay = {'1n': '1m', '2n': '2n', '4n': '4n', '8n': '8n', '16n': '16n'}
const rhyStrRest = {'1r': '1m', '2r': '2n', '4r': '4n', '8r': '8n', '16r': '16n'}

function noteNameToNumber(noteName) {
    let [n, o] = splitNoteOctave(noteName)
    o = parseInt(o)
    let noteMod = noteModArray.indexOf(n)
    return (o+1)*12+noteMod
}

function numberToNoteName(number) {
    let notemod = number%12
    let o = Math.floor(number/12)-1
    return noteModArray[notemod]+String(o)
}

function splitNoteOctave(noteOctave) {
    let result = reNoteName.exec(noteOctave)
    return [result[1], result[2]]
}

function getLoopLength(rhythmArr){
    let loopLength = {}
    for (const str of rhythmArr) {
        let newStr = str.slice(0,-1)+"n";
        loopLength[newStr] = (loopLength[newStr] || 0) + 1;
    }
    return loopLength
}
let melody1 = {"notes": ["C5", "D5", "E5", "F5"],
               "rhythm": ["16n", "16n", "16n", "16n"]
              }
let melody2 = {"notes": ["Db5", "Fb5", "Ab5"],
               "rhythm": [.125, .125, .125]
              }

export class DronePlusMelody {
    constructor() {
        this.isDrone = false;
        this.melody = this.getMelody(melody1["notes"], melody1["rhythm"]);
    }

    loadToneSampler(setLoaded) {
        this.sampler = new Tone.Sampler({
            urls: {
              A0: "A0.mp3",
              C1: "C1.mp3",
              "D#1": "Ds1.mp3",
              "F#1": "Fs1.mp3",
              A1: "A1.mp3",
              C2: "C2.mp3",
              "D#2": "Ds2.mp3",
              "F#2": "Fs2.mp3",
              A2: "A2.mp3",
              C3: "C3.mp3",
              "D#3": "Ds3.mp3",
              "F#3": "Fs3.mp3",
              A3: "A3.mp3",
              C4: "C4.mp3",
              "D#4": "Ds4.mp3",
              "F#4": "Fs4.mp3",
              A4: "A4.mp3",
              C5: "C5.mp3",
              "D#5": "Ds5.mp3",
              "F#5": "Fs5.mp3",
              A5: "A5.mp3",
              C6: "C6.mp3",
              "D#6": "Ds6.mp3",
              "F#6": "Fs6.mp3",
              A6: "A6.mp3",
              C7: "C7.mp3",
              "D#7": "Ds7.mp3",
              "F#7": "Fs7.mp3",
              A7: "A7.mp3",
              C8: "C8.mp3"
            },
            baseUrl: "./assets/PianoSamples/",
            onload: () => {
              setLoaded(true)
            }
          }).toDestination();
    }

    getDroneFilepath(rootNote) {
        return `./assets/DroneSamples/drone_${this.getRootMod(rootNote)+48}.mp3`
    }

    getRoot(rootNote) {
        let roots = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
        if (rootNote == 'Random') {
            rootNote = roots[Math.floor(Math.random()*12)]
        }
        return rootNote
    }

    getRootMod(rootNote) {
        let roots = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
        let i = 0
        if (rootNote == 'Random') {
            i = Math.floor(Math.random()*12)
        } else {
            i = roots.indexOf(rootNote)
        }
        return i
    }


    startDrone({lowestMidi, root}) {
        this.root = this.getRoot(root)
        this.dronePlayer = new Tone.Player(this.getDroneFilepath(root)).toDestination();
        this.dronePlayer.autostart = true;
        this.dronePlayer.loop = true;
    }

    stopDrone() {
        Tone.Transport.stop();
        this.dronePlayer.stop();
    }

    startExercise({lowestMidi, highestMidi, root, tempo, selectedDegrees}) {
        root = this.getRoot(root)
        let activeNotes = this.getActiveNotes(this.getActiveMidis(selectedDegrees, root, lowestMidi, highestMidi))
        this.dronePlayer = new Tone.Player(this.getDroneFilepath(root)).toDestination();
        this.dronePlayer.autostart = true;
        this.dronePlayer.loop = true;
        if(activeNotes.length){
            this.playAlong = new Tone.Loop((time) => {
                this.sampler.triggerAttackRelease(activeNotes[Math.floor(Math.random()*activeNotes.length)], '2n')
            }, "1n").start(0)
        }
        
        Tone.Transport.bpm.value = tempo
        Tone.Transport.start();
    }

    playMelody() {
        for (const note of this.melody) {
            this.sampler.triggerAttackRelease(note.note, note.duration, note.onset)
        }
    }


    getNumNotes(rhythmArr) {
        let numNotes = 0;
        for (let i = 0; i < rhythmArr.length; i++){
            if (rhythmArr[i].slice(-1) == "n") numNotes += 1;
        }
        return numNotes;
    }


    getMelody(toneArray, rhythmArr) {
        let melody = []
        for (let i = 0; i < rhythmArr.length; i++){
            if (rhythmArr[i].slice(-1) == "n"){
                let onset = getLoopLength(rhythmArr.slice(0, i))
                if (Object.keys(onset).length === 0) {
                    melody.push({
                        'note': toneArray[i],
                        'duration': rhythmArr[i],
                        'onset': '+0'
                    })
                } else {                            
                    let ons = "+"+Tone.Time(onset).toSeconds().toString()
                    melody.push({
                        'note': toneArray[i],
                        'duration': rhythmArr[i],
                        'onset': ons
                    })
                }
            }
        }
        return melody
    }
}