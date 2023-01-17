import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

export default function Tblhead(props) {
  const { HeadCells, order, setOrder, setOrderBy, orderBy } = props;

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  return (
    <TableHead
      sx={{
        backgroundColor: "#faebd7",
      }}
    >
      <TableRow>
        {HeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.disableSorting ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => {
                  handleSortRequest(headCell.id);
                }}
              >
                {headCell.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
