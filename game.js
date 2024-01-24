let pianoContainer = document.querySelector("#piano-container")

const noteBaseNumbers = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A':9, 'B':11}
const noteModArray = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const reNoteName = /([A-Gb]*)([0-9])/
const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;

const btnStart = document.querySelector("#btn-start");
const btnStop = document.querySelector("#btn-stop")
const selectExercise = document.getElementById("select-exercise");


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

const sampler = new Tone.Sampler({
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
    release: 1,
    baseUrl: "assets/PianoSamples/"
}).toDestination();

function clearContainer() {
    while (pianoContainer.firstChild) {
        pianoContainer.removeChild(pianoContainer.firstChild)
    }
}

function reinitPiano(rootNote, lowestNote, highestNote) {
    clearContainer()
    
    let [startLetter, startOctave] = splitNoteOctave(lowestNote)
    let [endLetter, endOctave] = splitNoteOctave(highestNote)

    if (!noteBaseNumbers.hasOwnProperty(startLetter)) {
        let num = noteNameToNumber(lowestNote) - 1
        startLetter = splitNoteOctave(numberToNoteName(num))[0]
    }

    if (!noteBaseNumbers.hasOwnProperty(endLetter)) {
        let num = noteNameToNumber(highestNote) + 1
        endLetter = splitNoteOctave(numberToNoteName(num))[0]
    }

    piano(pianoContainer, {
        range: {
            startKey: startLetter,
            startOctave: startOctave,
            endKey: endLetter,
            endOctave: endOctave
        },
        notation: 'scientific',
        lang: 'en',
        rootNote: rootNote,
        namesMode: 'flat',
        onKeyClick: keyDownHandler
    })
    pianoContainer.classList.add('piano-show-names');
    pianoContainer.classList.add('shrink');
}

function keyDownHandler(key) {
    sampler.triggerAttackRelease(key['target'].getAttribute("data-ipn"), "2n")
}

function keyUpHandler(key) {
    sampler.triggerRelease(key['target'].getAttribute("data-ipn"))
}

function* getTARValues(notes, rhythm, tempo) {
    let rhythmAccum = 0;
    let quarternote = 60/tempo
    for (let i = 0; i < notes.length; i++) {
        let duration = rhythm[i]*quarternote
        yield {"note": notes[i], "duration": duration, "attack": "+"+rhythmAccum}
        rhythmAccum = rhythmAccum+duration
    }
}

function getSelectedRootMod() {
    let selectedRoot = parseInt(document.getElementById("root-note").value)
    if (selectedRoot == 12) {
        selectedRoot = Math.floor(Math.random()*12)
    }
    return selectedRoot
}

function getSelectedDegrees() {
    let activeDegrees = new Array();
    for (let i = 0; i < 12; i++) {
        let cbid = "tone-"+i.toString()
        if (document.getElementById(cbid).checked) {
            activeDegrees.push(i)
        }
    }

    return activeDegrees;
}

function getActiveNums(selectedDegreeMods, rootMod, minNum, maxNum) {
    let activenums = [];
    selectedDegreeMods = selectedDegreeMods.map((x) => (x+rootMod)%12)
    for (let i = minNum; i <= maxNum; i++) {
        if (selectedDegreeMods.includes(i%12)) {
            activenums.push(i)
        }
    }
    return activenums
}

function getActiveMods(selectedDegreeMods, rootMod) {
    let activemods = [];
    selectedDegreeMods = selectedDegreeMods.map((x) => (x+rootMod)%12)
    for (let i = 0; i < 12; i++) {
        if (selectedDegreeMods.includes(i%12)) {
            activemods.push(i)
        }
    }
    return activemods
}

function getSelectedRange() {
    let end1 = document.getElementById("range-end-1").value
    let end2 = document.getElementById("range-end-2").value
    let end1num = noteNameToNumber(end1)
    let end2num = noteNameToNumber(end2)
    if (end1num == end2num) {
        alert("Range Invalid")
    }

    if (end1num < end2num) {
        return [end1, end2]
    }
    return [end2, end1]
}

function degreeExerciseTemplate(exerciseFunc) {
    let exerciseParams = {};
    exerciseParams['rootMod'] = getSelectedRootMod()
    exerciseParams['droneNumber'] = exerciseParams['rootMod']+48
    exerciseParams['rootNote'] = Tonal.Note.pitchClass(Tonal.Note.fromMidi(exerciseParams['droneNumber']))
    exerciseParams['tempo'] = parseInt(document.getElementById("input-tempo").value)
    let r = getSelectedRange();
    exerciseParams['rangeMin'] = r[0]
    exerciseParams['rangeMax'] = r[1]
    exerciseParams['rangeMinNum']= noteNameToNumber(exerciseParams['rangeMin'])
    exerciseParams['rangeMaxNum'] = noteNameToNumber(exerciseParams['rangeMax'])
    exerciseParams['selectedDegrees'] = getSelectedDegrees()
    exerciseParams['activeNums'] = getActiveNums(exerciseParams['selectedDegrees'], exerciseParams['rootMod'], exerciseParams['rangeMinNum'], exerciseParams['rangeMaxNum'])
    exerciseParams['activeMods'] = getActiveMods(exerciseParams['selectedDegrees'], exerciseParams['rootMod'])
    console.log(exerciseParams)
    
    reinitPiano(exerciseParams['rootNote'], exerciseParams['rangeMin'], exerciseParams['rangeMax'])
    
    let droneFilepath = "assets/drone_"+exerciseParams['droneNumber'].toString()+".mp3"
    player = new Tone.Player(droneFilepath).toDestination();
    player.autostart = true;
    player.loop = true;
    toDispose.push(player)

    playAlong = new Tone.Loop((time) => {
        for (const tv of exerciseFunc(exerciseParams)) {
            sampler.triggerAttackRelease(tv["note"], tv["duration"], tv["attack"])
        }
    }, "1n").start(0)
    toDispose.push(playAlong)
    Tone.Transport.bpm.value = exerciseParams['tempo'];
    Tone.Transport.start();
}

function singleToneExercise(exerciseParams) {
    let randomNum = exerciseParams['activeNums'][Math.floor(Math.random()*exerciseParams['activeNums'].length)]
    return [{'note': numberToNoteName(randomNum), 'duration': "2n", 'attack': "+0"}]
}

function closedIntervalExercise(exerciseParams) {
    if(!persistent.hasOwnProperty('possibleIntervals')) {
        persistent['possibleIntervals'] = new Array()
        for (let i = 0; i < exerciseParams['activeNums'].length; i++) {
            for (let j = i+1; j < exerciseParams['activeNums'].length; j++) {
                if(exerciseParams['activeNums'][j] - exerciseParams['activeNums'][i] > 11) {
                    continue
                }
                persistent['possibleIntervals'].push([Tonal.Note.fromMidi(exerciseParams['activeNums'][i]), Tonal.Note.fromMidi(exerciseParams['activeNums'][j])])
            }
    }
    }
    
    let r = Math.floor(Math.random()*2)
    let randInterval = Math.floor(Math.random()*persistent['possibleIntervals'].length)
    return getTARValues([persistent['possibleIntervals'][randInterval][r], persistent['possibleIntervals'][randInterval][(r+1)%2]], [1, 1], exerciseParams['tempo'])
}

function getModDistanceDirected(mod1, mod2, modulo) {
    if (mod2 < mod1) {
        mod2 = mod2 + modulo
    }
    return mod2-mod1
}

function noteRunExercise(exerciseParams) {
    if (!persistent.hasOwnProperty('runLength')){
        let highestActive = exerciseParams['activeNums'][exerciseParams['activeNums'].length-1]
        let modIndex = exerciseParams['activeMods'].indexOf(highestActive%12)
        let activeModCount = exerciseParams['activeMods'].length
        persistent['runLength'] = parseInt(prompt("Enter Run Length"))
        persistent['activeNums'] = [...exerciseParams['activeNums']]
        for (let i = 1; i <= persistent['runLength']; i++) {
            persistent['activeNums'].push(persistent['activeNums'][persistent['activeNums'].length-1]+getModDistanceDirected(exerciseParams['activeMods'][modIndex%activeModCount],exerciseParams['activeMods'][(modIndex+1)%activeModCount], 12))
            modIndex = modIndex + 1;
        }
    }
   
    let startIndex = Math.floor(Math.random()*(persistent['activeNums'].length-persistent['runLength']))
    let runNums = persistent['activeNums'].slice(startIndex, startIndex+persistent['runLength'])
    let runNotes = runNums.map((x) => numberToNoteName(x))
    if (Math.floor(Math.random()*2)) {
        runNotes.reverse()
    }
    console.log(runNotes)
    let rhythm = new Array(persistent['runLength']).fill(2/persistent['runLength'])
    return getTARValues(runNotes, rhythm, exerciseParams['tempo'])
}

function btnStartClickHandler() {
    btnStopClickHandler()

    let exercises = {"singleTone": {"func": degreeExerciseTemplate, "args": [singleToneExercise]},
                    "closedInterval": {"func": degreeExerciseTemplate, "args": [closedIntervalExercise]},
                    "noteRun": {"func": degreeExerciseTemplate, "args": [noteRunExercise]}}

    
    let selected = document.getElementById("select-exercise").value
    exercises[selected]["func"](...exercises[selected]["args"])
}
function btnStopClickHandler() {
    Tone.Transport.stop()
    persistent = {}
    while (toDispose.length) {
        let x = toDispose.pop();
        x.stop(0)
        x.dispose()
    }
    reinitPiano("", "C4", "C5")
}

reinitPiano("", "C4", "C5")

let player;
let playAlong;

btnStart.addEventListener("click", btnStartClickHandler)
btnStop.addEventListener("click", btnStopClickHandler)

let persistent = {};
let toDispose = [];