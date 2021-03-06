import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clientService from 'api/services/clientService';
import {
  Box,
  Button,
  IconButton,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import { Client } from 'models/Client';
import { useAppDispatch } from 'hooks';
import { showError } from 'redux/slices/snackbarSlice';

interface Column {
  id: 'id' | 'firstName' | 'lastName' | 'dateOfBirth' | 'phone' | 'email';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const Clients = () => {
  const navigate = useNavigate();

  const [clients, setClients]: [Client[], any] = useState([]);
  const [allClients, setAllClients]: [Client[], any] = useState([]);

  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [t] = useTranslation();

  const columns: Column[] = [
    { id: 'firstName', label: t('clients:firstName'), minWidth: 100 },
    {
      id: 'lastName',
      label: t('clients:lastName'),
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'dateOfBirth',
      label: t('clients:dateOfBirth'),
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'phone',
      label: t('clients:phone'),
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'email',
      label: t('clients:email'),
      minWidth: 170,
      align: 'right',
    },
  ];

  const loadClients = () => {
    clientService
      .getClients()
      .then((fetchedClients: Client[]) => {
        setClients(fetchedClients);
        setAllClients(fetchedClients);
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
        navigate('/login');
      });
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeFilter = (e: any) => {
    const value: string = e.target.value.toLowerCase();
    const newClients = allClients.filter((client: any) => {
      return (
        client.firstName.toLowerCase().includes(value) ||
        client.lastName.toLowerCase().includes(value)
      );
    });
    setClients(newClients);
  };

  const styles = (theme: any) => ({
    tableRow: {
      hover: {
        cursor: 'pointer',
      },
    },
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">{t('clients:listOfClients')}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            size="small"
            label={t('search')}
            onChange={changeFilter}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Button
            sx={{ ml: 3 }}
            style={{ height: 40, color: 'white' }}
            variant="contained"
            href="clients/form"
          >
            <AddIcon />
          </Button>
        </Box>
      </Box>
      <Paper sx={{ mt: 3, width: '100%' }}>
        <TableContainer>
          <Table aria-label="clients">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client, i) => {
                  return (
                    <TableRow
                      onClick={() =>  navigate('/clients/' + client.id)}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={i}
                    >
                      {columns.map((column) => {
                        const value =
                          column.id == 'dateOfBirth'
                            ? new Date(client[column.id]).toLocaleDateString(
                                'cs-CZ'
                              )
                            : client[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Clients;
