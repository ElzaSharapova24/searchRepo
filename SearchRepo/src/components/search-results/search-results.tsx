import {Box, Typography} from "@mui/material";
import SearchList from "./search-list";
import SearchItem from "./search-item";
import {Repo} from "../../utils/types.ts";
import React from "react";

interface SearchResultsProps {
    sortOrder?: "asc" | "desc" | undefined,
    sortField?: string | undefined,
    page?: number | undefined,
    selectedRepo?: Repo | null | undefined,
    handleSort?: ((field: string) => void) | undefined,
    handlePageChange?: ((_event: React.ChangeEvent<unknown>, value: number) => void) | undefined,
    setSelectedRepo?: ((value: (((prevState: (Repo | null)) => (Repo | null)) | Repo | null)) => void) | undefined
}

function SearchResults({
                           sortOrder,
                           sortField,
                           page,
                           selectedRepo,
                           handleSort,
                           handlePageChange,
                           setSelectedRepo
                       }: SearchResultsProps) {

    return (
        <Box component={'section'} display="flex">
            <Box component={'div'} sx={{flexBasis: '70%'}}>
                {/*<Typography variant="h1" fontSize={'48px'} sx={{mb: 3}}>*/}
                {/*    Результаты поиска*/}
                {/*</Typography>*/}
                <SearchList sortOrder={sortOrder} sortField={sortField} page={page} selectedRepo={selectedRepo}
                            handleSort={handleSort} handlePageChange={handlePageChange}
                            setSelectedRepo={setSelectedRepo}/>
            </Box>
            <Box component={'div'} sx={{flexBasis: '30%'}}>
                <Typography variant="h2" fontSize={'32px'} sx={{mb: 5}}>
                    Название репозитория
                </Typography>
                <SearchItem/>
            </Box>
        </Box>
    )
}

export default SearchResults;
