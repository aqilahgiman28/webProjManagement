import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import UserappBar from "../../Navbar/User";
import fire from "../../../files/firebase";
import apiService from "../../../helpers/api";

const Createproject = () => {
    const [projectname, setprojectname] = useState("");
    const [description, setdescription] = useState("");
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (projectname === "" || description === "") {
            alert("please fill all fields");
        } else {
            try {
                const response = await apiService.post('/projects', {
                    name: projectname,
                    description
                })

                // reset state
                setprojectname('')
                setdescription('')
                alert("Project created successfully");
                navigate("/project");
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
                //to add data into firestore under projects
                .firestore()
                .collection("projects")
                .add({
                    projectname: projectname,
                    description: description,
                    creationdate: new Date().toISOString().slice(0, 10),
                    admin: user.email
                })
                //if data has been added successfully
                .then(() => {
                    alert("Project created successfully");
                    navigate("/project");
                });

             */
        }
    };
    return (
        <Box>
            <UserappBar/>
            <Container>
                <Stack sx={{mt: 5}} spacing={4}>
                    <Typography variant="h5">CREATE PROJECT</Typography>

                    <TextField
                        fullWidth
                        label="Project Name"
                        id="fullWidth"
                        value={projectname}
                        onChange={e => setprojectname(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        id="fullWidth"
                        value={description}
                        onChange={e => setdescription(e.target.value)}
                    />

                    <Button variant="contained" onClick={handleSubmit}>
                        Create
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Createproject;
