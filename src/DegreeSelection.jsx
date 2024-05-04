import { Stack, Button } from "@mui/material";
import { BorderedSection } from "./BorderedSection";
import { useState } from "react";

export function DegreeSelection({selectedDegrees, setSelectedDegrees}) {
    
    function handleDegreeClick(i) {
        let temp = [...selectedDegrees]
        temp[i] = (temp[i]+1)%2
        setSelectedDegrees(temp)
    }

    function getVariant(selected) {
        return ['outlined', 'contained'][selected]
    }

    return (
        <BorderedSection title="Active Degrees">
            <Stack
                direction='row'
                justifyContent='space-around'>
                <Button variant={getVariant(selectedDegrees[0])} onClick={() => handleDegreeClick(0)}>1</Button>
                <Button variant={getVariant(selectedDegrees[1])} onClick={() => handleDegreeClick(1)}>♭2</Button>
                <Button variant={getVariant(selectedDegrees[2])} onClick={() => handleDegreeClick(2)}>2</Button>
                <Button variant={getVariant(selectedDegrees[3])} onClick={() => handleDegreeClick(3)}>♭3</Button>
            </Stack>
            <Stack
                direction='row'
                justifyContent='space-around'>
                <Button variant={getVariant(selectedDegrees[4])} onClick={() => handleDegreeClick(4)}>3</Button>
                <Button variant={getVariant(selectedDegrees[5])} onClick={() => handleDegreeClick(5)}>4</Button>
                <Button variant={getVariant(selectedDegrees[6])} onClick={() => handleDegreeClick(6)}>♭5</Button>
                <Button variant={getVariant(selectedDegrees[7])} onClick={() => handleDegreeClick(7)}>5</Button>
            </Stack>
            <Stack
                direction='row'
                justifyContent='space-around'>
                <Button variant={getVariant(selectedDegrees[8])} onClick={() => handleDegreeClick(8)}>♭6</Button>
                <Button variant={getVariant(selectedDegrees[9])} onClick={() => handleDegreeClick(9)}>6</Button>
                <Button variant={getVariant(selectedDegrees[10])} onClick={() => handleDegreeClick(10)}>♭7</Button>
                <Button variant={getVariant(selectedDegrees[11])} onClick={() => handleDegreeClick(11)}>7</Button>
            </Stack>
        </BorderedSection>
    )
}