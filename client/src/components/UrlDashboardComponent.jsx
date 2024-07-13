import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";

const UrlDashboardComponent = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlData, setUrlData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const access_token = localStorage.getItem("access_token");

  // Fetch initial data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/api/shorten-url`, {
        headers: {
          Authorization: access_token,
        },
      });

      console.log(response.data.data);
      setUrlData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
    setIsDisabled(event.target.value === "");
  };

  const handleGetLink = async () => {
    try {
      setOpenDialog(true);
      const response = await axios.post(
        `${config.baseURL}/api/shorten-url`,
        {
          redirectUrl: url,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      console.log(response);
      setShortUrl(response.data.data.shortUrl);
      fetchData();
    } catch (err) {
      setOpenDialog(false);
      Swal.fire({
        title: "Error",
        text: err.response.data.errorDetails,
        icon: "question",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/shorten-url/${id}`,
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      console.log(response);
      fetchData(); // Refresh data after deletion
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCopy = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={5}
      >
        <TextField
          label="Enter URL"
          variant="outlined"
          margin="normal"
          fullWidth
          value={url}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetLink}
          disabled={isDisabled}
        >
          Get Link
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Shortened URL</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="outlined"
              value={shortUrl}
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <CopyToClipboard text={shortUrl} onCopy={handleCopy}>
              <Button color="primary">Copy</Button>
            </CopyToClipboard>
            <Button onClick={handleCloseDialog} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Link copied to clipboard"
        />
        {urlData.length > 0 && (
          <Box mt={5}>
            <Typography variant="h5" gutterBottom>
              URL Analytics
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Original URL</TableCell>
                    <TableCell>Shortened URL</TableCell>
                    <TableCell align="right">Total Clicks</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urlData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {typeof row.redirectUrl === "string" &&
                        row.redirectUrl.length > 50
                          ? `${row.redirectUrl.substring(0, 50)}...`
                          : row.redirectUrl}
                      </TableCell>
                      <TableCell>{row.shortUrl}</TableCell>
                      <TableCell align="right">{row.totalClicks}</TableCell>
                      <TableCell>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          sx={{ gap: "10px" }}
                        >
                          <CopyToClipboard text={row.shortUrl}>
                            <Button variant="contained" color="primary">
                              Copy
                            </Button>
                          </CopyToClipboard>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(row._id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UrlDashboardComponent;
