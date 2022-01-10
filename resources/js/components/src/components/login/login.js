import React from 'react'
import LoginApi from "../../api/Login";
import {toast, ToastContainer} from 'react-toastify';
import {Card, CardMedia,CardContent, List,ListItem, Button, FormControlLabel, TextField} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    login = async () => {
        try {
            let responseLogin = await LoginApi.login(this.state.email, this.state.password);
            localStorage.setItem('token', responseLogin.data.access_token);
            localStorage.setItem('profile', JSON.stringify(responseLogin.data.user));
            window.location.reload();
        } catch (e) {
            toast.error("Error: Incorrect Email and Password")
        }
    }

    render() {
        return (
            <div style={{display: "flex",alignContent: "center",flexDirection: "column",overflow: "hide"}}>
                <CardMedia title="GILA" style={{textAlign: "center", margin: "50px"}} >
                    <h1>LOGIN</h1>
                </CardMedia>
                <Card style={{padding: "15px", alignSelf:"center", backgroundColor: "#fff", marginTop: "10%", boxShadow: "5px 5px 5px rgba(0,0,0,0.3)"}}>
                    <CardContent>
                        <List style={{justifyContent: "center", alignItems:"center"}}>
                            <ListItem  style={{marginBottom: "20", justifyContent: "center", alignItems:"center"}}>
                                <TextField fullWidth type={'email'} value={this.state.email} placeholder="Correo"
                                    onChange={(e) => {
                                        let state = { ...this.state };
                                        state.email = e.currentTarget.value;
                                        this.setState(state);
                                    }}
                                />
                            </ListItem>
                            <ListItem  style={{justifyContent: "center", alignItems:"center"}}>
                                <TextField fullWidth value={this.state.password} type="password" placeholder="Contraseña"
                                    onChange={(e) => {
                                        let state = { ...this.state };
                                        state.password = e.currentTarget.value;
                                        this.setState(state);
                                    }}
                                />
                            </ListItem>
                            <ListItem style={{justifyContent: "center", alignItems:"center"}}>
                    <Button
                        className="is-success button"
                        disabled={!this.state.password || !this.state.email}
                        onClick={() => this.login()}
                    >
                        Iniciar sesión
                    </Button>

                            </ListItem>
                        </List>

                    </CardContent>
                    <ToastContainer />
                </Card>
            </div>
        )
    }
}
