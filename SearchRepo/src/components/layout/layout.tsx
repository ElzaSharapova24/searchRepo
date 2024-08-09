import AppHeader from "../app-header";
import SearchResults from "../search-results";
import {Box} from "@mui/material";
import {Repo} from "../../utils/types.ts";
import React from "react";


interface LayoutProps {
    sortOrder?: "asc" | "desc" ,
    sortField?: string,
    page?: number,
    selectedRepo?: Repo | null,
    handleSort?: (field: string) => void,
    handlePageChange?: (_event: React.ChangeEvent<unknown>, value: number) => void,
    setSelectedRepo?: (value: (((prevState: (Repo | null)) => (Repo | null)) | Repo | null)) => void
}

function Layout({
                    sortOrder,
                    sortField,
                    page,
                    selectedRepo,
                    handleSort,
                    handlePageChange,
                    setSelectedRepo
                }: LayoutProps) {

    return (
        <>
            <AppHeader sortOrder={sortOrder} sortField={sortField} page={page}/>
            <Box component={'main'}>
                {/*<StartPage/>*/}
                <SearchResults sortOrder={sortOrder} sortField={sortField} page={page} selectedRepo={selectedRepo}
                               handleSort={handleSort} handlePageChange={handlePageChange}
                               setSelectedRepo={setSelectedRepo}/>
            </Box>
        </>
    )
}

export default Layout;