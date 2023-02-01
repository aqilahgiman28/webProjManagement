import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import UserappBar from "../../Navbar/User";
import fire from "../../../files/firebase";
import apiService from "../../../helpers/api";

const Addmember = () => {
    const location = useLocation();
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const user = useSelector(state => state.user.value);
    const project = useSelector(state => state.project.value);
    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (!params.id) {
            alert('Invalid ID')
            navigate('/project')
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username === "" || email === "") {
            alert("please fill all fields");
        } else {
            try {
                const response = await apiService.post(`/projects/${params.id}/members`, {
                    admin: user.email,
                    username,
                    email,
                })

                setusername('');
                setemail('')
                alert("Member added successfully");
                navigate(`/team/${params.id}`)
            } catch (error) {
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
                .collection("Teams")
                .add({
                    projectname: project.projectname,
                    admin: user.email,
                    username: username,
                    email: email,
                    creationdate: new Date().toISOString().slice(0, 10)
                })
                .then(() => {
                    alert("Member added successfully");
                    navigate("/team");
                });
             */
        }
    };
    return (
        <Box>
            <UserappBar/>
            <Container>
                <Stack sx={{mt: 5}} spacing={4}>
                    <Typography variant="h5">ADD MEMBER</Typography>

                    <TextField
                        fullWidth
                        label="User Name"
                        id="fullWidth"
                        value={username}
                        onChange={e => setusername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        id="fullWidth"
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />

                    <Button variant="contained" onClick={handleSubmit}>
                        Add
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Addmember;
