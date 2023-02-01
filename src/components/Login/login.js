import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import HomeappBar from "../Navbar/Home";
import {useDispatch} from "react-redux";
import axios from "axios";
import {getUserData} from "../reducer/user";
import fire from "../../files/firebase";
import apiService from "../../helpers/api";

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("please enter email and password");
        } else {
            try {
                const response = await apiService.post('/auth/login', {
                    email,
                    pass: password
                })

                const data = response.data;

                localStorage.setItem('userToken', data.token);

                dispatch(getUserData({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    address: data.address,
                    mobile: data.mobile,
                    password: data.password,
                }))

                navigate('/project')
            } catch (error) {
                console.log(error)
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert(`Error: ${error.message}`);
                }
            } finally {
            }
            /*
            fire
                .firestore()
                .collection("users")
                .where("email", "==", email)
                .where("password", "==", password)
                .get()
                .then(snapshot => {
                    if (snapshot.docs.length == 0) {
                        alert("user not found");
                    } else {
                        snapshot.forEach(ele => {
                            var data = ele.data();
                            console.log(data);

                            dispatch(
                                getUserData({
                                    name: data.name,
                                    email: data.email,
                                    password: data.password,
                                    address: data.address,
                                    mobile: data.mobile
                                })
                            );
                            navigate("/project");
                        });
                    }
                })
                .catch(err => {
                    alert(err);
                });

             */
        }
    };
    return (
        <Box>
            <HomeappBar/>
            <Container>
                <Stack sx={{mt: 5}} spacing={4}>
                    <Typography variant="h5">USER LOGIN</Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        id="fullWidth"
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        id="fullWidth"
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Login
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Login;
