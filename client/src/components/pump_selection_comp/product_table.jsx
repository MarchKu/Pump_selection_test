import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useGetModels } from "../../contexts/getModelContext";
import pumpImg from "../../assets/pump.jpg";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "image", label: "Image", minWidth: 100 },
  { id: "model_name", label: "Models name", minWidth: 100 },
  { id: "model_size", label: "Size", minWidth: 100 },
  { id: "rpm", label: "RPM", minWidth: 100 },
  { id: "button", label: "More infomation", minWidth: 100 },
];

export default function Product_table() {
  const navigate = useNavigate();
  const { matchModels, matchModelsCount, isError, isLoading, getInRangeModel } =
    useGetModels();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "90%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 0,
                    minWidth: column.minWidth,
                    backgroundColor: "#2962ff",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {matchModels &&
              matchModels
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((model, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={model.model_name}
                    >
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyItems: "center",
                        }}
                      >
                        <img
                          src={pumpImg}
                          alt="pump"
                          style={{ maxHeight: 200 }}
                        />
                      </TableCell>
                      <TableCell>{model.model_name}</TableCell>
                      <TableCell>{model.model_size}</TableCell>
                      <TableCell>{model.rpm}</TableCell>
                      <TableCell>
                        <Button
                          id="fade-buttonF"
                          style={{ textTransform: "none" }}
                          variant="contained"
                          size="small"
                          color="inherit"
                          onClick={() => {
                            navigate(`/more-info/${model.model_id}`);
                          }}
                        >
                          More infomation
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={matchModels && matchModels.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
