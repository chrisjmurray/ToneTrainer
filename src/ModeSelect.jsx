import { ThemeProvider } from '@emotion/react';
import { Select, Grid, MenuItem, FormControl, InputLabel, Box, Typography, createTheme } from '@mui/material';
import * as React from 'react';

export function ModeSelect({mode, handleModeChange}) {
    const theme = createTheme();
    theme.typography.h3 = {
        fontSize: '1rem',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '2rem',
        },
      };
    return (
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }} padding={3}>
            <Grid item xs={6} display="flex" flexDirection="column" justifyContent="space-around" textAlign="center">
                <ThemeProvider theme={theme}>
                    <Typography variant="h3">Tone Trainer</Typography>
                </ThemeProvider>
                
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <Select 
                    fullWidth
                    value={mode}
                    onChange={handleModeChange}>
                        <MenuItem value={"Random Tones"}>Random Tones</MenuItem>
                        <MenuItem value={"Stepping Tones"}>Stepping Tones</MenuItem>
                        <MenuItem value={"Key Signatures"}>Key Signatures</MenuItem>
                        <MenuItem value={"Staff Notes"}>Staff Notes</MenuItem>
                    </Select>
                </FormControl>
                
            </Grid>
        </Grid>
    )
}