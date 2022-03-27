import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  csCZ,
  enUS,
} from '@mui/x-data-grid';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ClientList = () => {
  let navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'sex', headerName: 'Sex' },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'date_of_birth', headerName: 'Date of Birth', type: 'Date' },
    { field: 'phone', headerName: 'Phone', type: 'string' },
    { field: 'email', headerName: 'Email', type: 'string' },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const navigateToDetail = (props: any) => navigate('/clients/' + props.id);

  const theme = createTheme({}, csCZ);

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        onRowClick={navigateToDetail}
        autoHeight
      />
    </ThemeProvider>
  );
};

export default ClientList;
