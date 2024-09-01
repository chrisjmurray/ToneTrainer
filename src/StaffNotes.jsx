import { Stack, Button, Box, TextField } from "@mui/material";
import { BorderedSection } from "./BorderedSection";
import { useState } from "react"
import { start } from "tone";


const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

export function StaffNotes() {
    const startingStack = [
        [
          "re",
          "/assets/StaffNotes/38-b.png"
        ],
        [
          "mi",
          "/assets/StaffNotes/40-b.png"
        ],
        [
          "fa",
          "/assets/StaffNotes/41-b.png"
        ],
        [
          "so",
          "/assets/StaffNotes/43-b.png"
        ],
        [
          "la",
          "/assets/StaffNotes/45-b.png"
        ],
        [
          "te",
          "/assets/StaffNotes/47-b.png"
        ],
        [
          "do",
          "/assets/StaffNotes/48-b.png"
        ],
        [
          "re",
          "/assets/StaffNotes/50-b.png"
        ],
        [
          "mi",
          "/assets/StaffNotes/52-b.png"
        ],
        [
          "fa",
          "/assets/StaffNotes/53-b.png"
        ],
        [
          "so",
          "/assets/StaffNotes/55-b.png"
        ],
        [
          "la",
          "/assets/StaffNotes/57-b.png"
        ],
        [
          "te",
          "/assets/StaffNotes/59-b.png"
        ],
        [
          "do",
          "/assets/StaffNotes/60-b.png"
        ],
        [
          "re",
          "/assets/StaffNotes/62-b.png"
        ]
      ]
    const bass_range = [38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62]
    const treble_range = [59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83]
    const midi_to_index = [0, ,1,,2,3,,4,,5,,6,,7]
    const major_key_notes = {
        "C Major": ["do", "re", "mi", "fa", "so", "la", "ti"],
        "G Major": ["do", "re", "mi", "fi", "so", "la", "ti"],
        "D Major": ["di", "re", "mi", "fi", "so", "la", "ti"],
        "A Major": ["di", "re", "mi", "fi", "si", "la", "ti"],
        "E Major": ["di", "ri", "mi", "fi", "si", "la", "ti"],
        "B Major": ["di", "ri", "mi", "fi", "si", "li", "ti"],
        "F# Major": ["di", "ri", "mai", "fi", "si", "li", "ti"],
        "C# Major": ["di", "ri", "mai", "fi", "si", "li", "tai"],
        "F Major": ["do", "re", "mi", "fa", "so", "la", "te"],
        "Bb Major": ["do", "re", "me", "fa", "so", "la", "te"],
        "Eb Major": ["do", "re", "me", "fa", "so", "le", "te"],
        "Ab Major": ["do", "ra", "me", "fa", "so", "le", "te"],
        "Db Major": ["do", "ra", "me", "fa", "se", "le", "te"],
        "Gb Major": ["de", "ra", "me", "fa", "se", "le", "te"],
        "Cb Major": ["de", "ra", "me", "fe", "se", "le", "te"]
    }
    const minor_key_notes = {
        "A minor": ["do", "re", "mi", "fa", "so", "la", "ti"],
        "E minor": ["do", "re", "mi", "fi", "so", "la", "ti"],
        "B minor": ["di", "re", "mi", "fi", "so", "la", "ti"],
        "F# minor": ["di", "re", "mi", "fi", "si", "la", "ti"],
        "C# minor": ["di", "ri", "mi", "fi", "si", "la", "ti"],
        "G# minor": ["di", "ri", "mi", "fi", "si", "li", "ti"],
        "D# minor": ["di", "ri", "mai", "fi", "si", "li", "ti"],
        "A# minor": ["di", "ri", "mai", "fi", "si", "li", "tai"],
        "D minor": ["do", "re", "mi", "fa", "so", "la", "te"],
        "G minor": ["do", "re", "me", "fa", "so", "la", "te"],
        "C minor": ["do", "re", "me", "fa", "so", "le", "te"],
        "F minor": ["do", "ra", "me", "fa", "so", "le", "te"],
        "Bb minor": ["do", "ra", "me", "fa", "se", "le", "te"],
        "Eb minor": ["de", "ra", "me", "fa", "se", "le", "te"],
        "Ab minor": ["de", "ra", "me", "fe", "se", "le", "te"]
    }

    const [noteStack, setNoteStack] = useState(startingStack)
    const [selectedModes, setSelectedModes] = useState([1,0])
    const [selectedClefs, setSelectedClefs] = useState([0,1])
    const [imgPath, setImgPath] = useState("/assets/StaffNotes/38-b.png")
    const [solfegeAnswer, setSolfegeAnswer] = useState("re")
    const [activeKey, setActiveKey] = useState("F Major")
    const [activeRanges, setActiveRanges] = useState(["Bass"])
    const [activeNotes, setActiveNotes] = useState(major_key_notes["F Major"])

    function handleModeClick(i) {
        let temp = [...selectedModes]
        temp[i] = (temp[i]+1)%2
        setSelectedModes(temp)
    }

    function handleClefClick(i) {
        let temp = [...selectedClefs]
        temp[i] = (temp[i]+1)%2
        let tempRanges = []
        if (temp[0]) tempRanges.push("Treble");
        if (temp[1]) tempRanges.push("Bass");
        if (tempRanges.length == 0 ) tempRanges.push("Bass")
        setSelectedClefs(temp)
        setActiveRanges(tempRanges)
    }

    function getVariant(selected) {
        return ['outlined', 'contained'][selected]
    }

    

    function popStack() {
        let l = []
        if (noteStack.length == 3) {
            for (const r of activeRanges) {
                if (r == "Bass"){
                    for (let i = 0; i < bass_range[i]; i++) {
                        l.push([activeNotes[midi_to_index[bass_range[i]%12]], "/assets/StaffNotes/"+bass_range[i]+"-b.png"])
                    }
                }
                if (r == "Treble") {
                    for (let i = 0; i < treble_range.length; i++) {
                        l.push([activeNotes[midi_to_index[treble_range[i]%12]], "/assets/StaffNotes/"+treble_range[i]+"-t.png"])
                    }
                }
            }
            l = [...noteStack].concat(l)
            
        } else {
            l = [...noteStack]
        }
        let n = l.shift()
        l = shuffle(l)
        setNoteStack(l)
        setSolfegeAnswer(l[0][0])
        setImgPath(l[0][1])
    }

    function newKeyHandler() {
        let tempentries = []
        if(selectedModes[0]) tempentries = Object.entries(major_key_notes);
        if(selectedModes[1]) tempentries = [...tempentries, ...Object.entries(minor_key_notes)];
        if (tempentries.length == 0 ) tempentries = Object.entries(major_key_notes);

        let randomEntry = tempentries[Math.floor(Math.random()*tempentries.length)]
        let newKey = randomEntry[0]
        let newNotes = randomEntry[1]
        let l = []
        for (const r of activeRanges) {
            if (r == "Bass"){
                for (let i = 0; i < bass_range[i]; i++) {
                    l.push([newNotes[midi_to_index[bass_range[i]%12]], "/assets/StaffNotes/"+bass_range[i]+"-b.png"])
                }
            }
            if (r == "Treble") {
                for (let i = 0; i < treble_range.length; i++) {
                    l.push([newNotes[midi_to_index[treble_range[i]%12]], "/assets/StaffNotes/"+treble_range[i]+"-t.png"])
                }
            }
        }
        l = shuffle(l)
        setSolfegeAnswer(l[0][0])
        setImgPath(l[0][1])
        setNoteStack(l)
        setActiveKey(newKey)
        setActiveNotes(newNotes)
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
                            height: 321,
                            width: 273,
                            maxHeight: { xs: 321, md: 231 },
                            maxWidth: { xs: 273, md: 195 },
                        }}
                        src = {imgPath}
                    />
                    {activeKey}
                </Stack>
            </BorderedSection>
            <BorderedSection>
                <TextField 
                    label="Enter note as solfege" 
                    variant="standard"
                    onChange={(event)  => {
                        if (event.target.value == solfegeAnswer) {
                            event.target.value = ""
                            popStack()
                        }
                    }}
                ></TextField>
                <Button variant={"outlined"} onClick={() => newKeyHandler()}>New Key</Button>
            </BorderedSection>
            <BorderedSection title="Options">
                <Stack direction = 'row' justifyContent='space-around'>
                    <Stack
                        direction = 'column'
                        justifyContent='space-around'>
                        <Button variant={getVariant(selectedModes[0])} onClick={() => handleModeClick(0)}>Major</Button>
                        <Button variant={getVariant(selectedModes[1])} onClick={() => handleModeClick(1)}>Minor</Button>               
                    </Stack>
                    <Stack
                        direction = 'column'
                        justifyContent='space-around'>
                        <Button variant={getVariant(selectedClefs[0])} onClick={() => handleClefClick(0)}>Treble</Button>
                        <Button variant={getVariant(selectedClefs[1])} onClick={() => handleClefClick(1)}>Bass</Button>               
                    </Stack>
                </Stack>
                
            </BorderedSection>
        </>
    )
}