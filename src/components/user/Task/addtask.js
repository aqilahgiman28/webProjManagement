import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import UserappBar from "../../Navbar/User";
import fire from "../../../files/firebase";
import apiService from "../../../helpers/api";

const Addtask = () => {
    const [email, setemail] = useState("");
    const [description, setdescription] = useState("");
    const [deadline, setdeadline] = useState("");
    const user = useSelector(state => state.user.value);
    const project = useSelector(state => state.project.value);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (!params.id) {
            alert('Invalid ID')
            navigate('/project')
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || description === "") {
            alert("please fill all fields");
        } else {

            try {
                const response = await apiService.post(`/projects/${params.id}/tasks`, {
                    admin: user.email,
                    email: email,
                    deadline: deadline.toString(),
                    description,
                    status: 'ongoing'
                });

                setemail('')
                setdescription('')
                setdeadline('')

                alert("Task assigned successfully");
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
                .collection("Tasks")
                .add({
                    projectname: project.projectname,
                    admin: user.email,
                    email: email,
                    deadline: deadline,
                    creationdate: new Date().toISOString().slice(0, 10),
                    description: description,
                    status: "ongoing"
                })
                .then(() => {
                    alert("Task assigned successfully");
                    navigate("/task");
                });
             */
        }
    };

    return (
        <Box>
            <UserappBar/>
            <Container>
                <Stack sx={{mt: 5}} spacing={4}>
                    <Typography variant="h5">ASSIGN TASK</Typography>

                    <TextField
                        fullWidth
                        label="Email"
                        id="fullWidth"
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        id="fullWidth"
                        value={description}
                        onChange={e => setdescription(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        type="date"
                        id="fullWidth"
                        value={deadline}
                        onChange={e => setdeadline(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Assign
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Addtask;
