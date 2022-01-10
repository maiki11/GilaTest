import React from 'react'
import SimpleService from '../../api/SimpleService';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {toast} from 'react-toastify';
import {Card, CardContent, Button, Container, Grid, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TableContainer, Table, TableHead, TableRow, TableCell, TablePagination, TableBody, Slide, List, ListItem, FormControlLabel, TextField, Select, MenuItem} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import "./home.css";
import { makeStyles } from '@mui/styles';

const styles = {
    textField: {
      width: "100%",
      alignContent: "left",
      alignSelf: "left"
    },
  };

const initialState = {
    vehicles: [],
    typeVehicles: [],
    data:{
        year: '',
        brand: '',
        model: '',
        color: '',
        plate: '',
        tyres: '',
        engine_power: '',
        type_vehicle_id: 0,
    },
    selected: [],
};

const useStyles = makeStyles(styles);

export default function Home() {
    const classes = useStyles();
    const [state,setState] = React.useState({...initialState});
    const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
    const [openShowDialog, setOpenShowDialog] = React.useState(false);
    const VehicleService = new SimpleService("vehicles");
    const TypeVehicleService = new SimpleService("typeVehicles");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    React.useEffect(()=>{
        const init = async () => {
            try {
                const response = await VehicleService.getAll();
                const responseTypeVehicle = await TypeVehicleService.getAll();
                let profile = JSON.parse(localStorage.getItem("profile"));
                setState({ ...state, data: [], vehicles: response.data, typeVehicles: responseTypeVehicle.data});
            } catch (e) {
                toast.warn('There´s no vehicles to show. Add a vehicle in "add vehicle" button.');
            }
        }
        init();
    },[]);

    const reload = async () => {
        try {
            const response = await VehicleService.getAll();
            setState({ ...state, data: [], vehicles: response.data});
        } catch (e) {
            toast.warn('There´s no vehicles to show. Add a vehicle in "add vehicle" button.');
        }
    }

    const handleCloseSaveDialog = async () => {
        setOpenSaveDialog(false)
    }

    const handleCloseShowDialog = async () => {
        setOpenShowDialog(false)
    }

    const save = async () => {
        if(!state.data.year ){
            toast.error("Year is required");
            return
        }
        if(state.data.year>new Date().getFullYear() ){
            toast.error("Range Year incorrect");
            return
        }
        if(!state.data.brand || state.data.brand==''){
            toast.error("Brand is required");
            return
        }
        if(!state.data.model || state.data.model==''){
            toast.error("Model is required");
            return
        }
        if(!state.data.color ){
            toast.error("Color is required");
            return
        }
        if(!state.data.plate || state.data.plate==''){
            toast.error("Plate is required");
            return
        }
        if(!state.data.tyres || state.data.tyres==''){
            toast.error("Tyres is required");
            return
        }
        if(!state.data.engine_power){
            toast.error("Invalid Engine power");
            return
        }
        if(!state.data.type_vehicle_id || state.data.type_vehicle_id==''){
            toast.error("Type vehicle is required");
            return
        }

        const res = await VehicleService.create(state.data)
        if(res.data.Estatus==400){
            toast.error(res.data.Message);
            return
        }
        toast.success("The vehicle was added");
        reload();
        setOpenSaveDialog(false)

    }

    const showVehicle = async (row) =>{
        console.log(row)
        setState({...state, selected: row})
        console.log(state.selected)
        setOpenShowDialog(true)
    }

    console.log(state.vehicles)

    return (
        <>
            <Container>
                <Grid>
                    <Card>
                        <CardContent>
                        <Button
                            className="addButton"
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            style={{float: "right"}}
                            onClick={()=>{
                                setOpenSaveDialog(true);
                            }}
                        >
                            Add vehicle
                        </Button>
                            
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={7}>
                                                    Vehicles
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"center"} style={{ top: 57 }}>
                                                    Brand
                                                </TableCell>
                                                <TableCell align={"center"} style={{ top: 57 }}>
                                                    Model
                                                </TableCell>
                                                <TableCell align={"center"} style={{ top: 57 }}>
                                                    Year
                                                </TableCell>
                                                <TableCell align={"center"} style={{ top: 57 }}>
                                                    Type
                                                </TableCell>
                                                <TableCell align={"center"} style={{ top: 57 }}>
                                                    Tyres
                                                </TableCell>
                                                <TableCell align={"center"} style={{ top: 57 }}>
                                                    Engine power
                                                </TableCell>
                                                <TableCell align={"center"} style={{ top: 57 }}>
                                                    Show more
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {state.vehicles
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                        <TableCell align={"center"} style={{ top: 57 }}>
                                                            {row.brand}
                                                        </TableCell>
                                                        <TableCell align={"center"} style={{ top: 57 }}>
                                                            {row.model}
                                                        </TableCell>
                                                        <TableCell align={"center"} style={{ top: 57 }}>
                                                            {row.year}
                                                        </TableCell>
                                                        <TableCell align={"center"} style={{ top: 57 }}>
                                                            {row.type}
                                                        </TableCell>
                                                        <TableCell align={"center"} style={{ top: 57 }}>
                                                            {row.tyres}
                                                        </TableCell>
                                                        <TableCell align={"center"} style={{ top: 57 }}>
                                                            {row.engine_power}
                                                        </TableCell>
                                                        <TableCell align={"center"} style={{ top: 57 }}>
                                                        <Button
                                                            className="showMore"
                                                            variant="contained"
                                                            size="small"
                                                            startIcon={<VisibilityIcon />}
                                                            onClick={()=>{
                                                                showVehicle(row);
                                                            }}
                                                        />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={state.vehicles.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={openSaveDialog}
                onClose={handleCloseSaveDialog}
            >
                <DialogTitle>{"Add Vehicle"}</DialogTitle>
                <DialogContent>
                    <List className="form">
                        <ListItem>
                            <FormControlLabel
                                className="textForm"
                                placeholder='Year'
                                value={state.data?.year}
                                onChange={(e)=> setState({...state, data: {...state.data, year: e.target.value}})}
                                label="Year:"
                                labelPlacement='top'
                                control={<TextField type="number" className={classes.textField} />}
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                className="textForm"
                                value={state.data?.brand}
                                onChange={(e)=> setState({...state, data: {...state.data, brand: e.target.value}})}
                                label="Brand:"
                                labelPlacement="top"
                                control={<TextField />}
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                className="textForm"
                                value={state.data?.model}
                                onChange={(e)=> setState({...state, data: {...state.data, model: e.target.value}})}
                                label="Model:"
                                labelPlacement="top"
                                control={<TextField/>}
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                className="textForm"
                                value={state.data?.color}
                                onChange={(e)=> setState({...state, data: {...state.data, color: e.target.value}})}
                                label="Color:"
                                labelPlacement="top"
                                control={<TextField />}
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                className="textForm"
                                value={state.data?.plate}
                                onChange={(e)=> setState({...state, data: {...state.data, plate: e.target.value}})}
                                label="Plate:"
                                labelPlacement="top"
                                control={<TextField />}
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                className="textForm"
                                defaultValue={state.data?.tyres}
                                onChange={(e)=> setState({...state, data: {...state.data, tyres: e.target.value}})}
                                label="Tyres:"
                                labelPlacement="top"
                                control={
                                    <Select>
                                        <MenuItem key="0" value="2">2</MenuItem>
                                        <MenuItem key="1" value="4">4</MenuItem>
                                    </Select>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                className="textForm"
                                defaultValue={state.data?.engine_power}
                                onChange={(e)=> setState({...state, data: {...state.data, engine_power: e.target.value}})}
                                label="Engine Power:"
                                labelPlacement="top"
                                control={<TextField />}
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                defaultValue={state.data?.type_vehicle}
                                onChange={(e)=> setState({...state, data: {...state.data, type_vehicle_id: e.target.value}})}
                                label="Type Vehicle:"
                                labelPlacement="top"
                                className="elementForm textForm"
                                control={
                                    <Select>
                                        {state.typeVehicles.map(i => {
                                            return (
                                                <MenuItem key={i.id} value={i.id}>{i.type}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                }
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                                    setState({ ...state, data: []})
                                    handleCloseSaveDialog();
                                }} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={()=> save()} color="primary" autoFocus>
                    Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openShowDialog}
                onClose={handleCloseShowDialog}
            >
                <DialogTitle>{"Vehicle"}</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <b>Brand:</b> 
                            {state.selected.brand}
                        </ListItem>
                        <ListItem>
                            <b>Model:</b> 
                            {state.selected.model}
                        </ListItem>
                        <ListItem>
                            <b>Year:</b> 
                            {state.selected.year}
                        </ListItem>
                        <ListItem>
                            <b>Color:</b> 
                            {state.selected.color}
                        </ListItem>
                        <ListItem>
                            <b>Type:</b> 
                            {state.selected.type}
                        </ListItem>
                        <ListItem>
                            <b>Engine Power:</b> 
                            {state.selected.engine_power}
                        </ListItem>
                        <ListItem>
                            <b>Tyres:</b> 
                            {state.selected.tyres}
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                            setState({ ...state, data: []})
                            handleCloseShowDialog();
                        }} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

}