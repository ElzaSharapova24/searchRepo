import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import styles from './app-header.module.css';

interface FormValues {
    name: string;
}

function AppHeader() {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]:  value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form values:', formValues);
    };

    return (
        <header className={styles.header}>
            <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', gap: '10px'}}>
                <TextField label="Имя"
                           variant="outlined"
                           name="name"
                           value={formValues.name}
                           onChange={handleChange}
                           fullWidth
                           margin="dense"
                           size="medium"
                           sx={{
                               maxWidth: '100%',
                               width: '900px',
                               '& .MuiOutlinedInput-root': {
                                   backgroundColor: '#fff',
                               },
                               '&:hover .MuiOutlinedInput-notchedOutline': {
                                   borderColor: 'blue',
                               },
                               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                   borderColor: 'purple',
                               },
                               '& .MuiInputLabel-root': {
                                   color: 'black',
                               },
                               '& .MuiInputLabel-root.Mui-focused': {
                                   color: 'black',
                               },
                }}
                />
                <Button variant="contained" size="medium">Contained</Button>
            </Box>
        </header>
    )
}

export default AppHeader;
