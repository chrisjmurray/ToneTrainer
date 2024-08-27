import { useState, useRef, useEffect } from "react"
import * as Tone from 'tone';
import { PianoDisplay } from "./PianoDisplay"
import { PlayerControlsMelodies } from "./PlayerControlsMelodies"
import { RangeControlsMelodies } from "./RangeControlsMelodies"
import { DronePlusMelody } from "./DronePlusMelody"
import useScreenSize from "./useScreenSize";


export function Melodies() {
    const [root, setRoot] = useState("Random")
    const [pianoRange, setPianoRange] = useState([23,30])
    const [isLoaded, setLoaded] = useState(false);
    const droneAndTone = useRef(null);

    const screenSize = useScreenSize();

    const midiFromPiano = (num) => {
        let x = [21, 23, 24, 26, 28, 29, 31][num%7]
        let y = 12*Math.floor(num/7)
        return x+y
    }

    useEffect(() => {
        droneAndTone.current = new DronePlusMelody()
        droneAndTone.current.loadToneSampler(setLoaded)
      }, []);

    const startDrone = () => {
        let lowestMidi = midiFromPiano(pianoRange[0])
        droneAndTone.current.startDrone({
            lowestMidi: lowestMidi,
            root: root,
        });
    }

    const stopDrone = () => {
        droneAndTone.current.stopDrone();
    }

    const playMelody = () => { 
        droneAndTone.current.playMelody();
     }
    const nextMelody = () => { return }
    
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
                <PlayerControlsMelodies
                    startDrone={startDrone}
                    stopDrone={stopDrone}
                    playMelody={playMelody}
                    nextMelody={nextMelody}
                />
                <RangeControlsMelodies
                    root={root}
                    setRoot={setRoot}
                    pianoRange={pianoRange}
                    setPianoRange={setPianoRange}
                />
            </>
        )
    }
}