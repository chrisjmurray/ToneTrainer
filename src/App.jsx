import { useState } from 'react'
import { RandomTones } from './RandomTones'
import { SteppingTones } from './SteppingTones'
import { Melodies } from './Melodies'
import './App.css'
import { ModeSelect } from './ModeSelect'
import { KeySignatures } from './KeySignatures'
import { StaffNotes } from './StaffNotes'


function App() {
  const [mode, setMode] = useState("Random Tones")

  const handleModeChange = (event) => {
    setMode(event.target.value);
  }
  if (mode == "Random Tones") {
    return(
      <>
        <ModeSelect
            mode={mode}
            handleModeChange={handleModeChange}
          />
        <RandomTones/>
      </>
    )
  } else if (mode == "Stepping Tones") {
    return(
      <>
        <ModeSelect
            mode={mode}
            handleModeChange={handleModeChange}
          />
        <SteppingTones/>
      </>
    )
  }
  else if (mode == "Melodies") {
    return (
      <>
        <ModeSelect
            mode={mode}
            handleModeChange={handleModeChange}
          />
        <Melodies/>
      </>
    )
  }
  else if (mode == "Key Signatures") {
    return (
      <>
        <ModeSelect
          mode={mode}
          handleModeChange={handleModeChange}
        />
        <KeySignatures/>
      </>
    )
  }
  else if (mode == "Staff Notes") {
    return (
      <>
        <ModeSelect
          mode={mode}
          handleModeChange={handleModeChange}
        />
        <StaffNotes/>
      </>
    )
  }
}

export default App
