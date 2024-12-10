import { createTheme } from '@mui/material';

export const getTheme = (mode:any) =>
    createTheme({
        palette: {
            mode,
            ...(mode === 'dark' && {
                background: {
                    default: '#121212',
                    paper: '#1e1e1e',
                },
                text: {
                    primary: '#ffffff',
                },
            }),
        },
    });
