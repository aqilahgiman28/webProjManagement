import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import UserappBar from "../Navbar/User";
import fire from "../../files/firebase";
import apiService from "../../helpers/api";
import {getUserData} from "../reducer/user";

const Profile = () => {
    const user = useSelector(state => state.user.value);
    const dispatch = useDispatch();
    const [name, setusername] = useState(user.name);
    const [email, setemail] = useState(user.email);
    const [password, setpassword] = useState(user.password);
    const [address, setaddress] = useState(user.address);
    const [mobile, setmobile] = useState(user.mobile);
    const navigate = useNavigate();

    const onSubmit = async () => {
        if (!name || !password || !address || !mobile) {
            alert('Please fill in the blanks.')
            return;
        }

        try {
            const response = await apiService.post('/me', {
                name,
                password,
                address,
                mobile
            });

            dispatch(
                getUserData({
                    name: name,
                    email: user.email,
                    password: password,
                    address: address,
                    mobile: mobile
                })
            );
            alert("profile updated successfully");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert(`Error: ${error.message}`);
            }
        }

        /*
        fire
            .firestore()
            .collection("users")
            .where("email", "==", user.email)
            .get()
            .then(snapshot => {
                console.log(snapshot);
                snapshot.forEach(ele => {
                    var key = ele.id;
                    fire
                        .firestore()
                        .collection("users")
                        .doc(key)
                        .update({
                            name: username,
                            email: email,
                            password: password,
                            address: address,
                            mobile: mobile
                        })
                        .then(res => {
                            alert("profile updated successfully");
                        });
                });
            });
        */
    }

    return (
        <Box>
            <UserappBar/>
            <Container>
                <Stack sx={{mt: 5}} spacing={4}>
                    <Typography variant="h5">YOUR PROFILE</Typography>

                    <TextField
                        fullWidth
                        label="Username"
                        id="fullWidth"
                        value={name}
                        onChange={e => setusername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        id="fullWidth"
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        id="fullWidth"
                        value={address}
                        onChange={e => setaddress(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Mobile"
                        id="fullWidth"
                        value={mobile}
                        onChange={e => setmobile(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            onSubmit()
                        }}
                    >
                        Update
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Profile;
