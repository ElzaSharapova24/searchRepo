import {Repo} from "../../../utils/types.ts";
import {Box, Button, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface SearchItemProps {
    selectedRepo?: Repo | null | undefined,
}

function SearchItem({selectedRepo}: SearchItemProps) {

    return (
        selectedRepo ? (
            <>
                <Typography variant="h1" fontSize={'32px'} sx={{mb: 2, p: 2, fontWeight: '400'}}>
                    {selectedRepo.name}
                </Typography>
                <Box component={'article'} sx={{p: 2,}}>
                    <Box component={'div'} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                    }}>
                        {
                            selectedRepo.language && (
                                <Button variant="contained"
                                        sx={{
                                            borderRadius: '100px',
                                            backgroundColor: '#2196f3'
                                        }}>
                                    {selectedRepo.language}
                                </Button>
                            )
                        }
                        <Typography component={'p'} display={'flex'}>
                            <StarIcon sx={{ color: '#FFD700', mr: 0.5 }} />
                            {selectedRepo.stargazers_count}
                        </Typography>
                    </Box>
                    <Typography component={'p'}>
                        {selectedRepo.license?.name || 'Нет лицензии'}
                    </Typography>
                    <Typography component={'p'}>
                        {selectedRepo.description || 'Нет описания'}
                    </Typography>
                </Box>
            </>
        ) : <Box component={'h2'}
                 sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     height: '100vh',
                     color: '#4f4f4f',
                     fontSize: '14px',
                     fontWeight: '400'

                 }}
        >
            Выберите репозиторий
        </Box>
    );
}

export default SearchItem;