import { useState } from 'react'
import { RandomTones } from './RandomTones'
import { SteppingTones } from './SteppingTones'

import './App.css'
import { ModeSelect } from './ModeSelect'


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
}

export default App
