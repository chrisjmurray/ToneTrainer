import { useState, useRef, useEffect } from "react"
import * as Tone from 'tone';
import { DegreeSelection } from "./DegreeSelection"
import { PianoDisplay } from "./PianoDisplay"
import { PlayerControls } from "./PlayerControls"
import { RangeControls } from "./RangeControls"
import { DronePlusTone } from "./DronePlusTone"
import useScreenSize from "./useScreenSize";
import { RhythmSelect } from "./RhythmSelect";


export function SteppingTones() {
    const [root, setRoot] = useState("Random")
    const [pianoRange, setPianoRange] = useState([23,30])
    const [tempo, setTempo] = useState(120)
    const [selectedDegrees, setSelectedDegrees] = useState([1,0,1,0,1,1,0,1,0,1,0,1])
    const [rhythmArr, setRhythmArr] = useState(['8n', '8n', '8n', '8n', '2r'])

    const [isLoaded, setLoaded] = useState(false);
    const droneAndTone = useRef(null);

    const screenSize = useScreenSize();

    const midiFromPiano = (num) => {
        let x = [21, 23, 24, 26, 28, 29, 31][num%7]
        let y = 12*Math.floor(num/7)
        return x+y
    }

    useEffect(() => {
        droneAndTone.current = new DronePlusTone()
        droneAndTone.current.loadToneSampler(setLoaded)
      }, []);

    const startExercise = () => {
        let lowestMidi = midiFromPiano(pianoRange[0])
        let highestMidi = midiFromPiano(pianoRange[1])
        droneAndTone.current.startSteppingTones({
            lowestMidi: lowestMidi,
            highestMidi: highestMidi,
            root: root,
            tempo: tempo,
            selectedDegrees: selectedDegrees,
            rhythmArr: rhythmArr
        });
    }

    const stopExercise = () => {
        droneAndTone.current.stopExercise();
    }
    
    const startNote = (midiNumber) => {
        droneAndTone.current.sampler.triggerAttack(Tone.Frequency(midiNumber, "midi").toNote())
    };
    const stopNote = (midiNumber) => {
        droneAndTone.current.sampler.triggerRelease(Tone.Frequency(midiNumber, "midi").toNote())
    }

    if (!isLoaded) {
        return (
            <>Loading...</>
        )
    }
    else {
        return (
            <>
                <PianoDisplay
                    pianoRange={pianoRange}
                    startNote={startNote}
                    stopNote={stopNote}
                    midiFromPiano={midiFromPiano}
                    screenWidth={screenSize.width}
                />
                <PlayerControls
                    tempo={tempo}
                    setTempo={setTempo}
                    startDrone={startExercise}
                    stopDrone={stopExercise}
                />
                <RangeControls 
                    root={root}
                    setRoot={setRoot}
                    pianoRange={pianoRange}
                    setPianoRange={setPianoRange}/>
                <DegreeSelection
                    selectedDegrees={selectedDegrees}
                    setSelectedDegrees={setSelectedDegrees}
                />
                <RhythmSelect
                    rhythmArr={rhythmArr}
                    setRhythmArr={setRhythmArr}
                />
            </>
        )
    }
}