import { Button, Stack, Box, Slider} from '@mui/material'
import { BorderedSection } from './BorderedSection'

import * as React from 'react';

export function PlayerControls({tempo, setTempo, startDrone, stopDrone}) {
    
    const handleTempoChange = (event, newValue, activeThumb) => {
        setTempo(newValue)
    }
    
    return (
        <BorderedSection title="Player Controls">
            <Stack
                direction="row"
                justifyContent="space-around"
                >
                <Stack sx={{width: 1/2}} direction="column">
                    <Stack direction="row" justifyContent="space-evenly">
                        <Button onClick={startDrone}>Start</Button>
                        <Button onClick={stopDrone}>Stop</Button>
                    </Stack>
                </Stack> 
                <Stack sx={{width: 1/2}} justifyContent="space-around">
                    <Slider
                        min={20}
                        max={300}
                        value={tempo}
                        onChange={handleTempoChange}
                    ></Slider>
                    <Stack direction="row" justifyContent="space-around">
                        <Box>Tempo</Box>
                        <Box>{tempo}</Box>
                    </Stack>
                </Stack> 
            </Stack>                    
        </BorderedSection>
    )
}