import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import Tblhead from "./Tblhead";

import { nanoid } from "nanoid";
import Input from "./Input";
import Button from "./Button";
import Popup from "./Popup";
import ConfirmDialog from "./ConfirmDialog";
import ActionButtons from "./ActionButtons";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const HeadCells = [
  { id: "fullName", label: "Name" },
  { id: "address", label: "Address", disableSorting: true },
  { id: "phoneNumber", label: "Phone number", disableSorting: true },
  { id: "email", label: "Email" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const initialValue = {
  fullName: "",
  address: "",
  phoneNumber: "",
  email: "",
};

export default function Employee() {
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [values, setValues] = useState(initialValue);
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [filterFn, setFilterFn] = useState("");
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [formState, setFormState] = useState(null);

  const baseURL = "http://localhost:3004/users";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(baseURL).then((response) => {
      setRecords(response.data);
    });
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const insertEmployee = () => {
    const newContact = {
      id: nanoid(),
      fullName: values.fullName,
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
    };

    axios.post(baseURL, newContact).then((response) => {
      setRecords(response.data);
    });

    resetForm();
    setOpenPopup(false);
  };

  const updateEmployee = (updateValues) => {
    setRecords((state) =>
      state.map((record) => {
        if (record.id === updateValues.id) {
          return updateValues;
        }
        return record;
      })
    );
    resetForm();
    setOpenPopup(false);
  };

  const onDelete = (recordId) => {
    setConfirmDialog({
      isOpen: false,
    });

    axios.delete(`${baseURL}/${recordId}`).then((response) => {
      setRecords((state) => state.filter((record) => record.id !== recordId));
    });
  };

  const resetForm = () => {
    setValues(initialValue);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  }

  const recordsAfterPagingandSorting = () => {
    return stableSort(records, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  return (
    <>
      <Paper>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            label="Search Empolyees"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => setFilterFn(event.target.value)}
          />
          <Button
            text="Add new"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setFormState("create");
              setOpenPopup(true);
            }}
          />
        </Toolbar>

        <Table sx={{ marginTop: "24px" }}>
          <Tblhead
            HeadCells={HeadCells}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
          <TableBody>
            {recordsAfterPagingandSorting()
              .filter((val) => {
                if (filterFn === "") {
                  return val;
                } else if (
                  val.fullName.toLowerCase().includes(filterFn.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <ActionButtons color="primary">
                      <ModeEditOutlineIcon
                        fontSize="small"
                        onClick={() => openInPopup(item)}
                      />
                    </ActionButtons>
                    <ActionButtons color="error">
                      <CloseIcon
                        fontSize="small"
                        onClick={() =>
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure?",
                            subTitle: "You cant undo this!",
                            onConfirm: () => {
                              onDelete(item.id);
                            },
                          })
                        }
                      />
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TablePagination
                page={page}
                rowsPerPageOptions={pages}
                rowsPerPage={rowsPerPage}
                count={records.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </Table>
        <Popup
          title="Employee Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          resetForm={resetForm}
        >
          <EmployeeForm
            recordForEdit={recordForEdit}
            insertEmployee={insertEmployee}
            handleInputChange={handleInputChange}
            resetForm={resetForm}
            values={values}
            setValues={setValues}
            updateEmployee={updateEmployee}
            formState={formState}
          />
        </Popup>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Paper>
    </>
  );
}
