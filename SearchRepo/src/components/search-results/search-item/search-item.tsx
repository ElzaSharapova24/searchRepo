import {Repo} from "../../../utils/types.ts";
import {Box, Button, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import {useMemo} from "react";

interface SearchItemProps {
    selectedRepo?: Repo | null | undefined;
}

/**
 * Компонент `SearchItem` отображает информацию о выбранном репозитории.
 * Если репозиторий не выбран, отображает сообщение "Выберите репозиторий".
 */
function SearchItem({selectedRepo}: SearchItemProps) {
    /**
     * Мемоизация стилей для  Box=h2 (если репозиторий не выбран), чтобы избежать ненужных ререндеров.
     */
    const boxStyles = useMemo(() => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: '#4f4f4f',
        fontSize: '14px',
        fontWeight: '400'
    }), []);

    /**
     * Мемоизация стилей для  Typography=p (для лицензии и описния), чтобы избежать ненужных ререндеров.
     */
    const typographyStyles = useMemo(() => ({
        color: '#3d8ae4',
        fontSize: '18px'
    }), []);

    return (
        // Проверяем, выбран ли репозиторий. Если да, отображаем его данные.
        selectedRepo ? (
            <>
                <Typography variant="h1" fontSize={'32px'} sx={{mb: 2, p: 2, fontWeight: '400'}}>
                    {selectedRepo.name}
                </Typography>

                <Box component={'article'} sx={{p: 2, mb: '15px'}}>
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
                            <StarIcon sx={{color: '#FFD700', mr: 0.5}}/>
                            {selectedRepo.stargazers_count}
                        </Typography>
                    </Box>

                    <Box component={'div'}>
                        <Typography component={'p'} sx={typographyStyles}>Лицензия</Typography>
                        <Typography component={'p'}>
                            {selectedRepo.license?.name || 'Нет лицензии'}
                        </Typography>
                    </Box>

                    <Box component={'div'}>
                        <Typography component={'p'} sx={typographyStyles}>Описание</Typography>
                        <Typography component={'p'}>
                            {selectedRepo.description || 'Нет описания'}
                        </Typography>
                    </Box>
                </Box>
            </>
        ) : (
            // Если репозиторий не выбран, отображаем сообщение
            <Box component={'h2'}
                 sx={boxStyles}
            >
                Выберите репозиторий
            </Box>
        )
    );
}

export default SearchItem;
