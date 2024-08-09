import {
    Box, CircularProgress, Pagination,
    Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, TableSortLabel,
} from "@mui/material";
import {useSelector} from "react-redux";
import {Repo} from "../../../utils/types.ts";
import React from "react";

// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface RootState {
    repos: {
        items: Repo[];
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
        totalCount: number;
    };
}

interface SearchListProps {
    sortOrder?: "asc" | "desc" | undefined,
    sortField?: string | undefined,
    page?: number | undefined,
    selectedRepo?: Repo | null | undefined,
    handleSort?: ((field: string) => void) | undefined,
    handlePageChange?: ((_event: React.ChangeEvent<unknown>, value: number) => void) | undefined,
    setSelectedRepo?: ((value: (((prevState: (Repo | null)) => (Repo | null)) | Repo | null)) => void) | undefined
}

function SearchList({
                        sortOrder,
                        sortField,
                        page,
                        selectedRepo,
                        handleSort,
                        handlePageChange,
                        setSelectedRepo
                    }: SearchListProps) {
    const {items: repos, status, error, totalCount} = useSelector((state: RootState) => state.repos);
    return (
        <Box>
            {status === 'loading' ? (
                <CircularProgress/>
            ) : status === 'failed' ? (
                <p>Ошибка: {error}</p>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
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
                                            onClick={() => handleSort && handleSort('forks_count')}
                                        >
                                            Число звёзд
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortField === 'updated_at'}
                                            direction={sortOrder}
                                            onClick={() => handleSort && handleSort('forks_count')}
                                        >
                                            Дата обновления
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
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

                    <Pagination
                        count={Math.ceil(totalCount / 10)}
                        page={page}
                        onChange={handlePageChange}
                        sx={{mt: 2}}
                    />

                    {selectedRepo && (
                        <Box sx={{mt: 4}}>
                            <h3>Детали репозитория</h3>
                            <p><strong>Название:</strong> {selectedRepo.name}</p>
                            <p><strong>Описание:</strong> {selectedRepo.description || 'Нет описания'}</p>
                            <p><strong>Лицензия:</strong> {selectedRepo.license?.name || 'Нет лицензии'}</p>
                        </Box>
                    )}
                </>
            )}
        </Box>
    )
}

export default SearchList;