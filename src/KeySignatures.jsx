import { Stack, Button, Box, TextField } from "@mui/material";
import { BorderedSection } from "./BorderedSection";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from "react"

export function KeySignatures() {
    const relative_minors = {
        "do": "la", "so": "me", "re": "ti",
        "la": "fi", "mi": "di", "ti": "si", 
        "fi": "ri", "di": "li", "fa": "re",
        "te": "so", "me": "do", "le": "fa", 
        "ra": "te", "se": "me", "da": "le"
    }
    const [root, setRoot] = useState("mi")
    const [selectedModes, setSelectedModes] = useState([1,0])
    const [activeMode, setActiveMode] = useState(["Major"])
    const [showHelp, setShowHelp] = useState(false)
    
    function handleHelpClick() {
		setShowHelp(!showHelp)
	}

    function setNewRoot() {
        let new_root = root
        while (new_root == root){
            new_root = Object.keys(relative_minors)[Math.floor(Math.random()*Object.keys(relative_minors).length)]
        }
        setRoot(new_root)
    }

    function newActiveMode() {
        if (selectedModes[0] + selectedModes[1] == 2) {
            setActiveMode(["Major", "Minor"][Math.floor(Math.random()*2)])
        } else if (selectedModes[1]) {
            setActiveMode("Minor") 
        } else {
            setActiveMode("Major")
        }
    }

    function handleModeClick(i) {
        let temp = [...selectedModes]
        temp[i] = (temp[i]+1)%2
        setSelectedModes(temp)
    }



    function getVariant(selected) {
        return ['outlined', 'contained'][selected]
    }
    

    return (
        <>  
            <BorderedSection>
                <Stack
                    direction="column"
                    alignItems="center"
                    >
                    <Box
                        component="img"
                        sx={{
                            height: 233,
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        src = {"/assets/KeySignatures/"+root+".png"}
                    />
                    {activeMode}
                </Stack>
            </BorderedSection>
            <BorderedSection>
                <Stack direction='row' justifyContent='space-around'>
                    <TextField 
                        label="Enter root as solfege" 
                        variant="standard"
                        onChange={(event)  => {
                            console.log(root)
                            console.log(event.target.value)
                            if (activeMode == "Major") {
                                if (root == event.target.value) {
                                    setNewRoot()
                                    newActiveMode()
                                    event.target.value = ""
                                }      
                            }
                            if (activeMode == "Minor") {
                                if (relative_minors[root] == event.target.value) {
                                    setNewRoot()
                                    newActiveMode()
                                    event.target.value = ""
                                }
                            }                
                        }}
                    ></TextField>
                    <HelpOutlineIcon onClick={() => handleHelpClick()} style={{alignSelf: 'center'}}></HelpOutlineIcon>
                </Stack>
                {showHelp &&
                    <Stack
                    direction="column"
                    alignItems="center"
                    >
                        <Box
                            component="img"
                            sx={{
                                height: 321,
                                width: 273,
                                maxHeight: { xs: 321, md: 231 },
                                maxWidth: { xs: 273, md: 195 },
                            }}
                            src={'./assets/solfege-help.png'}
                        />
                    </Stack>
                }
            </BorderedSection>
            <BorderedSection title="Options">
                <Stack
                    direction = 'column'
                    justifyContent='space-around'>
                    <Button variant={getVariant(selectedModes[0])} onClick={() => handleModeClick(0)}>Major</Button>
                    <Button variant={getVariant(selectedModes[1])} onClick={() => handleModeClick(1)}>Minor</Button>               
                </Stack>
            </BorderedSection>
        </>
    )
}