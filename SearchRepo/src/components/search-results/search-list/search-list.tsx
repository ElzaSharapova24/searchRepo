import {
    Box, Skeleton, Pagination,
    Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, TableSortLabel, Typography,
} from "@mui/material";
import {useSelector} from "react-redux";
import {Repo} from "../../../utils/types.ts";
import {ChangeEvent} from "react";

interface RootState {
    repos: {
        items: Repo[];  // Список репозиториев
        status: 'idle' | 'loading' | 'succeeded' | 'failed';  // Статус загрузки данных
        error: string | null;  // Ошибка, если есть
        totalCount: number;  // Общее количество репозиториев
    };
}

interface SearchListProps {
    sortOrder?: "asc" | "desc" | undefined;
    sortField?: string | undefined;
    page?: number | undefined;
    handleSort?: ((field: string) => void) | undefined;
    handlePageChange?: ((_event: ChangeEvent<unknown>, value: number) => void) | undefined;
    setSelectedRepo?: ((value: (((prevState: (Repo | null)) => (Repo | null)) | Repo | null)) => void) | undefined;
}

/**
 * Компонент `SearchList` отображает результаты поиска в виде таблицы.
 * Если данные загружаются, отображает скелетон загрузки.
 * Если загрузка данных завершилась ошибкой, отображает сообщение об ошибке.
 */
function SearchList({
                        sortOrder,
                        sortField,
                        page,
                        handleSort,
                        handlePageChange,
                        setSelectedRepo
                    }: SearchListProps) {
    // Используем `useSelector` для получения состояния репозиториев из Redux store.
    const {
        items: repos,
        status,
        error,
        totalCount} = useSelector((state: RootState) => state.repos);

    return (
        <Box>
            <Typography component={'h1'} fontSize={'46px'} sx={{mb: 2}}>
                Результаты поиска
            </Typography>
            {/* Показать скелетон, если данные еще загружаются */}
            {status === 'loading' ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Skeleton variant="text" width={100}/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={80}/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={80}/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={80}/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={120}/>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Отображение скелетона для каждой строки */}
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="rectangular" height={40}/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="rectangular" height={40}/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="rectangular" height={40}/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="rectangular" height={40}/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="rectangular" height={40}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : status === 'failed' ? (
                // Показать сообщение об ошибке, если загрузка данных завершилась неудачно
                <Typography component={'h1'} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red'}}>
                    {error}
                </Typography>
            ) : (
                <>
                    {/* Показать таблицу с результатами поиска, если данные успешно загружены */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/* Заголовки таблицы с возможностью сортировки */}
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortField === 'name'}
                                            direction={sortOrder}
                                            onClick={() => handleSort && handleSort('name')}
                                        >
                                            Название
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Язык</TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortField === 'forks_count'}
                                            direction={sortOrder}
                                            onClick={() => handleSort && handleSort('forks_count')}
                                        >
                                            Число форков
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortField === 'stargazers_count'}
                                            direction={sortOrder}
                                            onClick={() => handleSort && handleSort('stargazers_count')}
                                        >
                                            Число звёзд
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortField === 'updated_at'}
                                            direction={sortOrder}
                                            onClick={() => handleSort && handleSort('updated_at')}
                                        >
                                            Дата обновления
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Отображение каждой записи (репозитория) */}
                                {repos.map((repo) => (
                                    <TableRow
                                        key={repo.id}
                                        onClick={() => setSelectedRepo && setSelectedRepo(repo)}
                                        sx={{cursor: 'pointer'}}
                                    >
                                        <TableCell>{repo.name}</TableCell>
                                        <TableCell>{repo.language}</TableCell>
                                        <TableCell>{repo.forks_count}</TableCell>
                                        <TableCell>{repo.stargazers_count}</TableCell>
                                        <TableCell>{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Показать пагинацию, если количество результатов больше 0 */}
                    {totalCount > 0 && (
                        <Pagination
                            count={Math.ceil(totalCount / 10)}  // Вычисляем количество страниц
                            page={page}
                            onChange={handlePageChange}
                            sx={{mt: 2, mb: 4}}
                        />
                    )}
                </>
            )}
        </Box>
    );
}

export default SearchList;
