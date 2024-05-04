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


export class DronePlusTone {
    constructor() {
        this.isDrone = false;
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
        if (rootNote = 'Random') {
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

    getActiveMidis(selectedDegrees, rootNote, lowestMidi, highestMidi) {
        let activeMods = [];
        let rootMod = this.getRootMod(rootNote)
        for (let i = 0; i < selectedDegrees.length; i++) {
            if (selectedDegrees[i] == 1) {
                activeMods.push((i+rootMod)%12);
            }
        }
        let activeMidis = []
        for (let i = lowestMidi; i <= highestMidi; i++) {
            if (activeMods.indexOf(i%12) != -1) {
                activeMidis.push(i)
            }
        }

        return activeMidis
    }

    getActiveNotes(activeMidis) {
        let activeNotes = [];
        for (let i = 0; i < activeMidis.length; i++) {
            activeNotes.push(numberToNoteName(activeMidis[i]))
        }
        return activeNotes
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

    getRandomTones(toneArray, rhythmArr) {
        let melody = []
        for (let i = 0; i < rhythmArr.length; i++){
            if (rhythmArr[i].slice(-1) == "n"){
                let onset = getLoopLength(rhythmArr.slice(0, i))
                if (Object.keys(onset).length === 0) {
                    melody.push({
                        'note': toneArray[Math.floor(Math.random()*toneArray.length)],
                        'duration': rhythmArr[i],
                        'onset': '+0'
                    })
                } else {                            
                    let ons = "+"+Tone.Time(onset).toSeconds().toString()
                    melody.push({
                        'note': toneArray[Math.floor(Math.random()*toneArray.length)],
                        'duration': rhythmArr[i],
                        'onset': ons
                    })
                }
            }
        }
        return melody
    }

    getNumNotes(rhythmArr) {
        let numNotes = 0;
        for (let i = 0; i < rhythmArr.length; i++){
            if (rhythmArr[i].slice(-1) == "n") numNotes += 1;
        }
        return numNotes;
    }

    startRandomTones({lowestMidi, highestMidi, root, tempo, selectedDegrees, rhythmArr}) {
        root = this.getRoot(root)
        let activeNotes = this.getActiveNotes(this.getActiveMidis(selectedDegrees, root, lowestMidi, highestMidi))
        if (rhythmArr.length === 0) {
            rhythmArr = ["1n"]
        }
        let numSelectedDegrees = 0;
        selectedDegrees.forEach( num => {
            numSelectedDegrees += num;
        })
        
        let loopLength = getLoopLength(rhythmArr)
        this.dronePlayer = new Tone.Player(this.getDroneFilepath(root)).toDestination();
        this.dronePlayer.autostart = true;
        this.dronePlayer.loop = true;

        if(activeNotes.length){
            let t = Tone.Time(loopLength)
            let bi = activeNotes.length-numSelectedDegrees;
            let randBi = Math.floor(Math.random()*(bi+1))
            let arrslice = activeNotes.slice(randBi, randBi+numSelectedDegrees)
            let melody = this.getRandomTones(arrslice, rhythmArr)
            this.playAlong = new Tone.Loop((time) => {
                for (const note of melody) {
                    this.sampler.triggerAttackRelease(note.note, note.duration, note.onset)
                }
                bi = activeNotes.length-numSelectedDegrees;
                randBi = Math.floor(Math.random()*(bi+1))
                arrslice = activeNotes.slice(randBi, randBi+numSelectedDegrees)
                melody = this.getRandomTones(arrslice, rhythmArr)
            }, t).start(0);
        }
        
        Tone.Transport.bpm.value = tempo;
        Tone.Transport.start();
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

    startSteppingTones({lowestMidi, highestMidi, root, tempo, selectedDegrees, rhythmArr}) {
        root = this.getRoot(root)
        let activeNotes = this.getActiveNotes(this.getActiveMidis(selectedDegrees, root, lowestMidi, highestMidi))
        if (rhythmArr.length === 0) {
            rhythmArr = [""]
        }
        let numNotes = this.getNumNotes(rhythmArr)
        if (numNotes > activeNotes.length) {
            numNotes = activeNotes.length
        }
        
        let loopLength = getLoopLength(rhythmArr)
        this.dronePlayer = new Tone.Player(this.getDroneFilepath(root)).toDestination();
        this.dronePlayer.autostart = true;
        this.dronePlayer.loop = true;

        if(activeNotes.length){
            let t = Tone.Time(loopLength)
            let bi = activeNotes.length-numNotes;
            let randBi = Math.floor(Math.random()*(bi+1))
            let arrslice = activeNotes.slice(randBi, randBi+numNotes)
            if (Math.random() < .5) arrslice.reverse();
            let melody = this.getMelody(arrslice, rhythmArr)
            this.playAlong = new Tone.Loop((time) => {
                for (const note of melody) {
                    this.sampler.triggerAttackRelease(note.note, note.duration, note.onset)
                }
                bi = activeNotes.length-numNotes;
                randBi = Math.floor(Math.random()*(bi+1))
                arrslice = activeNotes.slice(randBi, randBi+numNotes)
                if (Math.random() < .5) arrslice.reverse();
                melody = this.getMelody(arrslice, rhythmArr)
            }, t).start(0);
        }
        
        Tone.Transport.bpm.value = tempo;
        Tone.Transport.start();
    }


    stopExercise() {
        Tone.Transport.stop();
        this.dronePlayer.stop();
        this.playAlong.stop();
    }
}