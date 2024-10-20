import { useState } from 'react';
import {
  Avatar,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Pagination,
  Box,
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { createBrandData } from "../../../constants/createTableData";
import useBrandStore from "../../../store/brandStore";
import ModalEditBrand from "./ModalEditBrand/ModalEditBrand";
import useConfirmationModalStore from "../../../store/confirmationModalStore";
import useSnackbarStore from "../../../store/snackbarStore";
import { tableCellStyles } from "../../../constants/styles";

const ROWS_PER_PAGE = 5;

const BrandTableHead = () => (
  <TableHead sx={{ bgcolor: "#414141" }}>
    <TableRow>
      <TableCell align="center" sx={tableCellStyles}>Imagen</TableCell>
      <TableCell align="center" sx={tableCellStyles}>Nombre</TableCell>
      <TableCell align="center" sx={tableCellStyles}>Editar</TableCell>
      <TableCell align="center" sx={tableCellStyles}>Eliminar</TableCell>
    </TableRow>
  </TableHead>
);

const BrandTableRow = ({ row, onEdit, onDelete }) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell align="center">
      <Avatar src={row.logo_url} variant="square" sx={{ width: 50, height: "100%" }} />
    </TableCell>
    <TableCell align="center" sx={{ height: 60 }}>{row.name}</TableCell>
    <TableCell align="center">
      <FaRegEdit
        size={30}
        style={{ cursor: "pointer", color: "#ff9800" }}
        onClick={() => onEdit(row)}
      />
    </TableCell>
    <TableCell align="center">
      <MdDeleteForever
        size={30}
        style={{ cursor: "pointer", color: "#d32f2f" }}
        onClick={() => onDelete(row._id)}
      />
    </TableCell>
  </TableRow>
);

const BrandTable = ({ brands, page, onEdit, onDelete }) => (
  <TableContainer component={Paper} sx={{ overflowX: "auto", my: 2 }}>
    <Table aria-label="collapsible table" size="small" sx={{ minWidth: 400 }}>
      <BrandTableHead />
      <TableBody>
        {brands.length > 0 ? (
          brands.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE).map((row, index) => (
            <BrandTableRow key={index} row={row} onEdit={onEdit} onDelete={onDelete} />
          ))
        ) : (
          <TableRow>
            <TableCell align="center" colSpan={4}>No existen marcas en la base de datos</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

const Brands = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [page, setPage] = useState(1);
  const { brands, loading, deleteBrand } = useBrandStore();
  const { showModal } = useConfirmationModalStore();
  const { showSnackbar } = useSnackbarStore();

  const rows = brands?.map(brand => createBrandData(brand._id, brand.name, brand.logo_url));

  const handleDeleteBrand = async (id) => {
    showModal("¿Deseas eliminar esta marca?", async () => {
      try {
        await deleteBrand(id);
        showSnackbar("La marca se eliminó correctamente", "success");
        if (brands.length % ROWS_PER_PAGE === 1 && page > 1) {
          setPage(page - 1);
        }
      } catch (error) {
        showSnackbar(error, "error");
      }
    });
  };

  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
    setOpenModal(true);
  };

  return (
    <Container maxWidth={false}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: 300, width: "100%", borderRadius: 2, minWidth: 400 }}
        />
      ) : (
        <BrandTable
          brands={rows}
          page={page}
          onEdit={handleEditBrand}
          onDelete={handleDeleteBrand}
        />
      )}

      <Box sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}>
        <Pagination
          count={Math.ceil(brands.length / ROWS_PER_PAGE)}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
        />
      </Box>

      {openModal && (
        <ModalEditBrand
          isOpen={openModal}
          brand={selectedBrand}
          handleClose={() => setOpenModal(false)}
        />
      )}
    </Container>
  );
};

export default Brands;