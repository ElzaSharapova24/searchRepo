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
import React from "react";

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
    handleSort?: ((field: string) => void) | undefined,
    handlePageChange?: ((_event: React.ChangeEvent<unknown>, value: number) => void) | undefined,
    setSelectedRepo?: ((value: (((prevState: (Repo | null)) => (Repo | null)) | Repo | null)) => void) | undefined
}

function SearchList({
                        sortOrder,
                        sortField,
                        page,
                        handleSort,
                        handlePageChange,
                        setSelectedRepo
                    }: SearchListProps) {
    const {items: repos, status, error, totalCount} = useSelector((state: RootState) => state.repos);

    return (
        <Box>
            <Typography variant="h1" fontSize={'46px'} sx={{mb: 2}}>
                Результаты поиска
            </Typography>
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
                <p>Ошибка: {error}</p>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
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

                    {totalCount > 0 && ( // Условный рендеринг для пагинации
                        <Pagination
                            count={Math.ceil(totalCount / 10)}
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
