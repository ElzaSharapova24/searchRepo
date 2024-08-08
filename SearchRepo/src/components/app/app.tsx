import Layout from "../layout";
import {Container} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// const theme = createTheme({
//     typography: {
//         fontFamily: 'Roboto, Arial, sans-serif',
//         fontWeightLight: 300,
//         fontWeightRegular: 400,
//         fontWeightMedium: 500,
//         fontWeightBold: 700,
//     },
// });

function App() {

    return (
        <Container fixed>
            <Layout/>
        </Container>
    )
}

export default App
