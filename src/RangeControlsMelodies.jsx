import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Slider, Stack } from '@mui/material'
import { BorderedSection } from './BorderedSection'

function noteRangeFormat(value) {
    let note = ['A', 'B', 'C', 'D', 'E', 'F', 'G'][value%7];
    let octave = Math.floor((value+5)/7);
    return note+octave.toString();
}

export function RangeControlsMelodies({root, setRoot, pianoRange, setPianoRange}) {
    const handleRootChange = (event) => {
        setRoot(event.target.value)
    }
    const roots = ['Random', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']
    const maxPianoNum = 51;
    
    const handleNoteRangeChange = (event, newValue) => {
        setPianoRange([newValue, newValue+14])
      }
    
    return (
        <BorderedSection title="Range Controls">
            <Stack
                direction="row"
                justifyContent="space-around"
            >
                <FormControl sx={{width: 1/4}}>
                    <InputLabel id="root-select-label">Root</InputLabel>
                    <Select
                        labelId="root-select-label"
                        id="root-select"
                        value={root}
                        label="Root"
                        onChange={handleRootChange}
                    >
                        {roots.map((r) =>
                            <MenuItem value={r} key={r}>{r}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Stack
                    sx={{width: 1/2}}
                    direction="column"
                    justifyContent="flex-end"
                    textAlign="center"
                    >
                    <Slider
                        getAriaLabel={() => "Note Range"}
                        min={0}
                        max={maxPianoNum}
                        value={pianoRange[0]}
                        onChange={handleNoteRangeChange}
                        valueLabelFormat={noteRangeFormat}
                        valueLabelDisplay="on"
                        track={false}
                    />
                    <>Minimum Note</>
                </Stack>
            </Stack>
        </BorderedSection>
    )
}