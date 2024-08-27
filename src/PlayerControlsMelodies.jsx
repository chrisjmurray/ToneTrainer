import { Button, Stack, Box, Slider} from '@mui/material'
import { BorderedSection } from './BorderedSection'

import * as React from 'react';

export function PlayerControlsMelodies({startDrone, stopDrone, playMelody, nextMelody}) {
    
    
    return (
        <BorderedSection title="Player Controls">
            <Stack direction="row" justifyContent="space-evenly">
                <Button onClick={startDrone}>Start Drone</Button>
                <Button onClick={playMelody}>Play Melody</Button>
                <Button onClick={nextMelody}>Next Melody</Button>
                <Button onClick={stopDrone}>Stop</Button>
            </Stack>
        </BorderedSection>
    )
}