import { Box } from '@mui/material';
import {Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css'

export function PianoDisplay({pianoRange, startNote, stopNote, midiFromPiano, screenWidth}) {
    const firstNote = midiFromPiano(pianoRange[0])
    const lastNote = midiFromPiano(pianoRange[1])

    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
      });
    console.log(screenWidth)
    return (
        <Box sx={{height: 200}}>
          <Piano
            noteRange = {{first: firstNote, last: lastNote}}
            playNote={(midiNumber) => {
              startNote(midiNumber)}}
            stopNote={(midiNumber) => {
              stopNote(midiNumber)}}
            width={screenWidth}
            keyboardShortcuts={keyboardShortcuts}
          ></Piano>
        </Box>

    )
}