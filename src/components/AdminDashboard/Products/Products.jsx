import { useState } from "react";
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
  Tooltip,
  Typography,
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { createProductData } from "../../../constants/createTableData";
import useConfirmationModalStore from "../../../store/confirmationModalStore";
import useSnackbarStore from "../../../store/snackbarStore";
import { tableCellStyles } from "../../../constants/styles";
import useProductStore from "../../../store/productStore";
import ModalEditProduct from "./ModalEditProduct/ModalEditProduct";

const ITEMS_PER_PAGE = 6;

const ProductTableHead = () => (
  <TableHead sx={{ bgcolor: "#414141" }}>
    <TableRow>
      {[
        "Imagen",
        "Nombre",
        "Descripción",
        "Precio",
        "Marca",
        "Editar",
        "Eliminar",
      ].map((header) => (
        <TableCell key={header} align="center" sx={tableCellStyles}>
          {header}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const ProductTableRow = ({ row, onEdit, onDelete }) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell align="center">
      <Avatar
        src={row.image_url}
        variant="square"
        sx={{ width: 40, height: "100%" }}
      />
    </TableCell>
    <TableCell align="center" sx={{ height: 60, fontSize: 12 }}>
      {row.name}
    </TableCell>
    <TableCell align="center" sx={{ height: 60 }}>
      <Tooltip title={row.description} arrow>
        <Typography noWrap sx={{ fontSize: 12 }}>
          {row.description.slice(0, 30)}
          {row.description.length > 50 ? "..." : ""}
        </Typography>
      </Tooltip>
    </TableCell>
    <TableCell
      align="center"
      sx={{ height: 60, color: "green", fontWeight: "bold" }}
    >
      ${row.price}
    </TableCell>
    <TableCell align="center" sx={{ height: 60 }}>
      {row.brand.name}
    </TableCell>
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

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const { products, loading, deleteProduct } = useProductStore();
  const { showModal } = useConfirmationModalStore();
  const { showSnackbar } = useSnackbarStore();

  const rows = products?.map((product) =>
    createProductData(
      product._id,
      product.name,
      product.description,
      product.price,
      product.image_url,
      product.brand
    )
  );

  const handleDeleteProduct = async (id) => {
    showModal("¿Deseas eliminar este producto?", async () => {
      try {
        await deleteProduct(id);
        showSnackbar("El producto se eliminó correctamente", "success");
        if (products.length % ITEMS_PER_PAGE === 1 && page > 1) {
          setPage(page - 1);
        }
      } catch (error) {
        showSnackbar(error, "error");
      }
    });
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <Container maxWidth={false}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: 300, borderRadius: 2, minWidth: 400 }}
        />
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto", my: 2 }}>
          <Table
            aria-label="collapsible table"
            size="small"
            sx={{ minWidth: 400 }}
          >
            <ProductTableHead />
            <TableBody>
              {rows.length > 0 ? (
                rows
                  .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
                  .map((row) => (
                    <ProductTableRow
                      key={row._id}
                      row={row}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={8}>
                    No existen productos en la base de datos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Pagination
          count={Math.ceil(products.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}
        />
      </Box>

      {openModal && (
        <ModalEditProduct
          isOpen={openModal}
          product={selectedProduct}
          handleClose={() => setOpenModal(false)}
        />
      )}
    </Container>
  );
};

export default Products;
