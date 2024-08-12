import {Box} from "@mui/material";
import SearchList from "./search-list";
import SearchItem from "./search-item";
import {Repo} from "../../utils/types.ts";
import React, {useMemo} from "react";

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


    /**
     * Мемоизация стилей для SearchList, чтобы избежать ненужных ререндеров.
     */
    const searchListStyles = useMemo(() => ({
        flexBasis: '70%',
    }), []);

    /**
     * Мемоизация стилей для  SearchItem, чтобы избежать ненужных ререндеров.
     */
    const searchItemStyles = useMemo(() => ({
        flexBasis: '30%',
        backgroundColor: '#f2f2f2',
    }), []);


    return (
        <Box component={'section'} display="flex">
            <Box component={'div'} sx={searchListStyles}>
                <SearchList sortOrder={sortOrder} sortField={sortField} page={page}
                            handleSort={handleSort} handlePageChange={handlePageChange}
                            setSelectedRepo={setSelectedRepo}/>
            </Box>
            <Box component={'div'} sx={searchItemStyles}>
                <SearchItem selectedRepo={selectedRepo}/>
            </Box>
        </Box>
    )
}

export default SearchResults;
