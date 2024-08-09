import {Box, Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {fetchRepos} from "../../services/slices/repositoriesSlice.ts";
import {AppDispatch} from "../../services/store.ts";
import {useDispatch} from "react-redux";
import {FetchReposParams} from "../../utils/types.ts";


interface AppHeaderProps {
    sortOrder?: "asc" | "desc" | undefined,
    sortField?: string,
    page?: number,
}

function AppHeader({sortOrder, sortField, page}: AppHeaderProps) {
    const dispatch: AppDispatch = useDispatch();
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        if (query) {
            dispatch(fetchRepos({query, sortField, sortOrder, page} as FetchReposParams));
        }
    }, [query, sortField, sortOrder, page, dispatch]);

    return (
        <Box component={'header'} sx={{backgroundColor: '#00838f', p: 2}}>
            <TextField
                label="Введите название репозитория"
                variant="outlined"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
    )
}

export default AppHeader;
