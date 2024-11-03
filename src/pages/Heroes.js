import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Box, Typography, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import LoadMoreButton from "../components/LoadMoreButton";
import { useRequest } from "ahooks";
import { fetchCharacters } from "../api/api";

function Heroes() {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    data,
    loading,
    error,
    run,
    params = [{ currentPage: 1 }],
  } = useRequest(({ currentPage }) => fetchCharacters(currentPage), {
    manual: true,
    paginated: true,
    defaultParams: [{ currentPage: 1 }],
  });

  useEffect(() => {
    run({ currentPage: 1 });
  }, [run]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const handleRowClick = (params) => {
    navigate(`${params.id}`);
  };

  const handleLoadMore = () => {
    if (params && params[0] && params[0].currentPage !== undefined) {
      run({ currentPage: params[0].currentPage + 1 });
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ flex: 1, height: 500, textAlign: "center", p: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error.message}
          </Typography>
        ) : (
          <DataGrid
            rows={data?.results || []}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            onRowClick={handleRowClick}
            disableSelectionOnClick
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "lightgreen",
              },
            }}
          />
        )}
        <LoadMoreButton
          onClick={handleLoadMore}
          show={
            !loading &&
            params &&
            params[0] &&
            params[0].currentPage < (data?.info?.pages || 1)
          }
        />
      </Box>
      <Box
        sx={{
          width: 300,
          p: 2,
          boxSizing: "border-box",
          overflowY: "auto",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Heroes;
