import {Box, Typography} from "@mui/material";

function StartPage() {
    // Стартовая страница
    return (
        <section>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h1" fontSize={'46px'} color={'#4f4f4f'}>
                    Добро пожаловать
                </Typography>
            </Box>
        </section>
    )
}

export default StartPage;