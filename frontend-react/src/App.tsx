import { useEffect, useState, useContext } from 'react'
 import React  from "react";
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { getInfo, sendData, updateData, getfilterTareas, deleteTarea, completeTarea } from './service';
import { 
  TextField,
  Table, 
  Container,
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, Button, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import './App.css'
import FormTarea from './components/FormTareaComponent';
import { ThemeBack } from './ThemeBack';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// import FirstPage from '@mui/icons-material/FirstPage'; 
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
 import { useTheme } from '@mui/material/styles';
// import FirstPage from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/ArrowBack';
import KeyboardArrowRight from '@mui/icons-material/ArrowForward';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

interface tareasType{
  id?: number | null,
  titulo: string;
  estado: string;
  descripcion: string;
  fecha_creacion?:string;
  fecha_limite: Date | null;
}

interface FormDataInfo {
  id?:number|null;
  titulo: string;
  estado: string;
  descripcion: string;
  fecha_limite: Date|null;
}
// const data = [
// 
// ];

function App() {
  const [data, setData] = useState<tareasType[]>([])
  const headers = ["Ajuste", "Titulo", "Descripcion", "Fecha creación", "Fecha limite", "Estado", "Acciones"];
  const [open, setOpen] = useState(false);
  const [tareaSelected, setTareaSelected] = useState<tareasType | null>(null);
  const [estatus, setEstatus] = useState('');
  const [searchTerm, setSearchterm] = useState('');


  const abrirForm=()=>{
    const tareaRefresh: FormDataInfo = {
      titulo: '',
      estado: '',
      descripcion:'',
      fecha_limite: null, // Convertimos undefined a null
    };
    setTareaSelected(tareaRefresh);
    setOpen(true);
  }
  const cerrarForm=()=>{
    setOpen(false);
  }
  const checktareaSelected=(tarea:tareasType)=>{
    const tareaNormalizada: FormDataInfo = {
      id: tarea.id,
      titulo: tarea.titulo,
      estado: tarea.estado,
      descripcion: tarea.descripcion,
      fecha_limite: tarea.fecha_limite || null, // Convertimos undefined a null
    };
    console.log(tareaNormalizada);
    setTareaSelected(tareaNormalizada);
    setOpen(true);
  }

  const sendInfo = async(formInfo: FormDataInfo)=>{
    // const response = await sendData('add-tarea',formInfo)
    if (tareaSelected && tareaSelected.id) {
      // upd
      await updateData(`update-tarea/${tareaSelected.id}`, formInfo); 
      console.log(`Actualizando tarea con ID ${tareaSelected.id}`);
    } else {
      // nuevo
      await sendData('add-tarea', formInfo);
      console.log('Creando nueva tarea');
    }
    fetchData();
    cerrarForm();
  }
  const completedTarea = async(id:any)=>{
    await completeTarea('complete-tarea',id); 
    fetchData();
  }
  const deletedTarea = async (id: any) => {
    await deleteTarea('delete-tarea', id);
    fetchData();
  }
  const fetchData = async () => {
    const result = await getInfo('get-tareas');
    if (result != null) {
      setData(result);
    }
  };

  const fetchDataWithFilter = async (event: any) => {
    console.log(event.target.value);
    setEstatus(event.target.value)
    const result = await getfilterTareas('filter-tareas',event.target.value);
    if (result != null) {
      setData(result.data);
    }
  };
  const refresh =()=>{
    setEstatus('');
    setSearchterm('');
    fetchData();
  }
  // para el input busq
  const busqueda = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const value = e.target.value; 
    setSearchterm(value); 
    const filtered = data.filter(item => item.titulo.toLowerCase().includes(value.toLowerCase())); 
    // filterData(value); 
    setData(filtered)
  }; 
  useEffect(() => {
    fetchData();
  }, []);
  const themeContext = useContext(ThemeBack);

  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeContextProvider');
  }
  const { themeMode, toggleTheme } = themeContext;

//// PAGINACION USANDO pagination de react mui --- :( algun punto y coma suelto..... xD
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // 
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  return (
    <>
      <div className='container'>
          <div className="row">
            <div className="col-12 col-sm-2 col-md-2 col-xs-12">
            <Button fullWidth style={{ marginTop: '16px' }} variant="contained" onClick={toggleTheme}>
                Tema:{themeMode === 'light' ? 'Oscuro' : 'Claro'}
              </Button>
            </div>
            <div className="co l-xs-12  col-sm-3 col-md-3 col-lg-3">
            <Button fullWidth style={{ marginTop: '16px' }}   variant="contained" onClick={abrirForm}>Nueva tarea</Button>
            </div>
          <div className="col-12 col-xs-7  col-sm-12 col-md-7 col-xl-7">
          </div>
            <div style={{ marginTop: '16px' }}  className="col-sm-3 col-md-3 col-lg-3 col-xs-12">
            <FormControl required variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  name="estado"
                  label="Estado"
                  value={estatus}
                  onChange={(e) => fetchDataWithFilter( e )}
                >
                  <MenuItem value="1">En proceso</MenuItem>
                  <MenuItem value="2">Completada</MenuItem>
                </Select>
              </FormControl>
            </div>
          <div style={{ marginTop: '16px' }}  className="col-12 col-sm-9 col-md-9 col-xs-12 col-lg-9 col-xl-9">
            <TextField fullWidth id="search-basic" label="Buscar por titulo" value={searchTerm}  onChange={busqueda} variant="filled" />
            </div>
          <div style={{ marginTop: '16px' }} className="col-12 col-sm-2 col-md-2 col-xs-12 col-lg-2 col-xl-2">
            <Button fullWidth color="success" startIcon={<ClearIcon />} variant="contained" onClick={refresh}>refresh</Button>
            </div>
          </div>
            <div  className="row col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12">
          <TableContainer component={Paper} sx={{
            width: '100%',
            overflowX: 'auto', // Habilita el desplazamiento horizontal
            '@media (max-width: 768px)': {
              width: '100vw', // Asegura que ocupe todo el ancho en pantallas pequeñas
            },
          }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                          {headers.map((header) => (
                            <TableCell align="center" key={header}>{header}</TableCell>
                          ))}
                        </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          { row.estado=='1'?
                          <Button color="success" startIcon={<CheckIcon />} onClick={() => completedTarea(row.id)}>
                          </Button>
                          :''
                          }

                        </TableCell>
                        <TableCell component="th" scope="row">{row.titulo}</TableCell>
                        <TableCell>{row.descripcion}</TableCell>
                        <TableCell>{row.fecha_creacion ? new Date(row.fecha_creacion).toLocaleDateString() : 'Sin fecha'}</TableCell>
                        <TableCell>{row.fecha_limite ? new Date(row.fecha_limite).toLocaleDateString() : 'Sin fecha'}</TableCell>
                        <TableCell>
                          {(row.estado == '1' || row.estado == null)?'En proceso':'Completada'}
                          </TableCell>
                        <TableCell>
                          <Button color="secondary" startIcon={<DeleteIcon />} onClick={() => deletedTarea(row.id)}>
                          </Button>
                          <Button onClick={() => checktareaSelected(row)} startIcon={<EditIcon/>}></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
                </Table>
              </TableContainer>
            </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <FormTarea open={open} onClose={cerrarForm} onSubmit={sendInfo} tarea={tareaSelected}/>
        </div>
      </div>
    </>
  )
}


function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPage />}
      </IconButton> */}
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {/* {theme.direction === 'rtl' ? <FirstPage /> : <LastPageIcon />} */}
      </IconButton>
    </Box>
  );
}
export default App
