import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
interface FormDataInfo{
    id?: number| null,
    titulo: string;
    estado: string;
    descripcion: string;
    fecha_limite:Date|null;
}

interface FormularioProps {
    open: boolean;
    onClose: () => void;
    tarea: FormDataInfo|null;
    onSubmit: (formInfo: FormDataInfo) => void;
}
const convertISOToDate = (isoString: string): Date => { 
    const date = new Date(isoString); 
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()); 
};
const FormTarea: React.FC<FormularioProps> = ({ onSubmit,onClose,open,tarea }) => {
    const [formInfo, setFormData] = useState<FormDataInfo>({
        id:null,
        titulo: '',
        descripcion: '',
        estado: '',
        fecha_limite: null
    });
    useEffect(() => { 
        
        if (tarea) { 
            setFormData({
                ...tarea, 
                fecha_limite: tarea.fecha_limite ? convertISOToDate(tarea.fecha_limite as unknown as string) : null,
                 });
                }
            // setFormData(tarea); 
        },[tarea]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formInfo);
    };

    return (
        <React.Fragment>
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={'sm'}
           fullWidth={true}
        >
            <DialogTitle>Tarea</DialogTitle>
            <DialogContent>

                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div style={{ marginTop: '16px' }}  className='col-12 col-sm-12 col-md-12 col-lg-12 col-xs-12'>
                                <TextField
                                    variant="filled"
                                    label="Titulo"
                                    name="titulo"
                                    value={formInfo.titulo}
                                    onChange={(e) => setFormData({ ...formInfo, titulo: e.target.value })}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div style={{ marginTop: '16px' }} className='col-12 col-sm-12 col-md-12 col-lg-12 col-xs-12'>
                                <FormControl fullWidth required variant="filled">
                                    <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        name="estado"
                                        label="Estado"
                                        value={formInfo.estado}
                                        onChange={(e) => setFormData({ ...formInfo, estado: e.target.value })}
                                    >
                                        <MenuItem value="1">En proceso</MenuItem>
                                        <MenuItem value="2">Completada</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ marginTop: '16px' }} className='col-12 col-sm-12 col-md-12 col-lg-12 col-xs-12'>
                                <TextField variant="filled"
                                    label="Descripcion"
                                    name="descripcion"
                                    value={formInfo.descripcion}
                                    onChange={(e) => setFormData({ ...formInfo, descripcion: e.target.value })}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div style={{ marginTop: '16px' }} className='col-12 col-sm-12 col-md-12 col-lg-12 col-xs-12'>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                    label="Fecha limite"
                                    value={formInfo.fecha_limite}
                                    onChange={(newDate) => { setFormData({ ...formInfo, fecha_limite: newDate }); }} 
                                    
                                />
                                </LocalizationProvider>
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </form>
            </DialogContent>
        </Dialog>
        </React.Fragment>
    );
};

export default FormTarea;
