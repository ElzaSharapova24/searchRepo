import { Box, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { clearRepos, fetchRepos } from "../../services/slices/repositoriesSlice.ts";
import { AppDispatch } from "../../services/store.ts";
import { useDispatch } from "react-redux";
import { FetchReposParams } from "../../utils/types.ts";

interface AppHeaderProps {
    sortOrder?: "asc" | "desc" | undefined;
    sortField?: string;
    page?: number;
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Пропс для передачи события изменения ввода
}

/**
 * Компонент AppHeader отвечает за отображение заголовка приложения,
 * включая поле ввода для поиска репозиториев.
 * Выполняет поиск при изменении текста в поле ввода.
 */
function AppHeader({ sortOrder, sortField, page, onInputChange }: AppHeaderProps) {
    // Инициализация диспетчера для работы с Redux store
    const dispatch: AppDispatch = useDispatch();

    // Локальное состояние для хранения значения запроса
    const [query, setQuery] = useState<string>('');

    /**
     * Эффект, который выполняется при изменении значения query, sortField, sortOrder или page.
     * Отправляет запрос на получение репозиториев или очищает результаты, если запрос пуст.
     */
    useEffect(() => {
        if (query) {
            // Если есть запрос, выполняется запрос на получение репозиториев
            dispatch(fetchRepos({ query, sortField, sortOrder, page } as FetchReposParams));
        } else {
            // Если запрос пуст, очищаем список репозиториев
            dispatch(clearRepos());
        }
    }, [query, sortField, sortOrder, page, dispatch]);

    /**
     * Обработчик изменения значения в поле ввода.
     * Обновляет локальное состояние запроса и вызывает функцию onInputChange,
     * если она передана через пропсы.
     * @param e - Событие изменения ввода
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        // Если поле ввода очищено, вызываем clearRepos для очистки результатов
        if (!newQuery) {
            dispatch(clearRepos());
        }

        // Вызов onInputChange для передачи изменения ввода в родительский компонент
        if (onInputChange) {
            onInputChange(e);
        }
    };

    /**
     * Мемоизация стилей для TextField, чтобы избежать ненужных ререндеров.
     */
    const textFieldStyles = useMemo(() => ({
        maxWidth: '100%',
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
            color: '#000',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#000',
        },
    }), []);

    /**
     * Рендеринг компонента AppHeader.
     * Включает поле ввода для поиска репозиториев с соответствующими стилями.
     */
    return (
        <Box component={'header'} sx={{ backgroundColor: '#00838f', p: 2 }}>
            <TextField
                label="Введите название репозитория"
                variant="outlined"
                fullWidth
                value={query}
                onChange={handleInputChange}
                size="medium"
                sx={textFieldStyles}
            />
        </Box>
    );
}

export default AppHeader;
