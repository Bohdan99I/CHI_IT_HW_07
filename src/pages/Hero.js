import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress, useTheme } from "@mui/material";
import { useRequest } from "ahooks";
import { fetchHero } from "../api/api";

function Hero() {
  const { id } = useParams();
  const theme = useTheme();

  const { data, loading, error } = useRequest(() => fetchHero(id), {
    refreshDeps: [id],
  });

  return (
    <Box sx={{ textAlign: "center", mt: 4, color: theme.palette.text.primary }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error.message}
        </Typography>
      ) : (
        <Box>
          <img src={data?.image} alt={data?.name} width="100%" />
          <Typography variant="h4">{data?.name}</Typography>
          <Typography variant="body1">Status: {data?.status}</Typography>
          <Typography variant="body1">Species: {data?.species}</Typography>
          <Typography variant="body1">Gender: {data?.gender}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Hero;
