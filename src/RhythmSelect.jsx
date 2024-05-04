import * as React from 'react';
import { BorderedSection } from './BorderedSection'
import { Button, ButtonGroup, Stack, Box, IconButton, Divider } from '@mui/material';

const btnSize = "24"
function ButtonGroupIconButton(props) {
    // intercept props only implemented by `Button`
    const { disableElevation, fullWidth, variant, ...iconButtonProps } = props;
    return <IconButton {...iconButtonProps} />;
  }

export function RhythmSelect({rhythmArr, setRhythmArr}) {
    function clearRhythm() {
        setRhythmArr((currentRhythm) => {
            return []
        })
    }
    
    function handleRhythmClick(str) {
        setRhythmArr((currentRhythm) => {
            return [...currentRhythm, str]
        })
    }

    let rhythmDisplay;
    if (rhythmArr.length){
        rhythmDisplay = rhythmArr.map((n) => 
            <img src={"./assets/RhythmIcons/"+n+".png"} width={btnSize} height={btnSize}></img>
        )
    } else {
        rhythmDisplay = "No Rhythm Selected"
    }

    return (
        <BorderedSection title="Rhythm Select">
            <Box textAlign='center'>
                        {rhythmDisplay}
            </Box>
            <Divider orientation='horizontal' flexItem/>
            <Stack
                direction="row"
                justifyContent="space-around"
                >
                <Stack sx={{width: 1/2}} justifyContent="space-around">
                    <Box>Note</Box>
                    <ButtonGroup variant='outlined'>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("1n")}>
                            <img src="./assets/RhythmIcons/1n.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("2n")}>
                            <img src="./assets/RhythmIcons/2n.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("4n")}>
                            <img src="./assets/RhythmIcons/4n.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("8n")}>
                            <img src="./assets/RhythmIcons/8n.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("16n")}>
                            <img src="./assets/RhythmIcons/16n.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                    </ButtonGroup>
                    <Box>Rest</Box>
                    <ButtonGroup variant='outlined'>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("1r")}>
                            <img src="./assets/RhythmIcons/1r.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("2r")}>
                            <img src="./assets/RhythmIcons/2r.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("4r")}>
                            <img src="./assets/RhythmIcons/4r.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("8r")}>
                            <img src="./assets/RhythmIcons/8r.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                        <ButtonGroupIconButton onClick={() => handleRhythmClick("16r")}>
                            <img src="./assets/RhythmIcons/16r.png" width={btnSize} height={btnSize}/>
                        </ButtonGroupIconButton>
                    </ButtonGroup>
                </Stack>
                <Stack sx={{width: 1/2}} justifyContent="space-around" alignContent="space-evenly">
                    <Box textAlign="end">
                        <Button sx={{width: 1/2}} onClick={() => clearRhythm()}>Clear</Button>
                    </Box>
                </Stack>
            </Stack>
        </BorderedSection>
    )
}