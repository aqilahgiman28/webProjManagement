import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import UserappBar from "../../Navbar/User";
import fire from "../../../files/firebase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import apiService from "../../../helpers/api";

const Addattachment = () => {
    const [file, setfile] = useState("");
    const [type, settype] = useState("");
    const [isLoading, setLoading] = useState(false);

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

    const handleSubmit = e => {
        e.preventDefault();
        if (file === "" || type === "") {
            alert("please fill all fields");
        } else {
            var currentdate = new Date().toISOString().slice(0, 10);
            if (type == "PDF") {
                fire
                    .storage()
                    .ref("documents")
                    .child(currentdate.toString() + ".pdf")
                    .put(file)
                    .then(() => {
                        fire
                            .storage()
                            .ref("documents")
                            .child(currentdate.toString() + ".pdf")
                            .getDownloadURL()
                            .then(url => {
                                apiService.post(`/projects/${params.id}/attachments`, {
                                    file: url,
                                    type: type,
                                }).then(() => {
                                    alert('File upload successfully.')
                                    navigate(`/attachment/${params.id}`)
                                }).catch((error) => {
                                    if (error.response) {
                                        alert(error.response.data.message);
                                    } else {
                                        alert(`Error: ${error.message}`);
                                    }
                                })

                                /*
                                fire
                                    .firestore()
                                    .collection("Attachments")
                                    .add({
                                        projectname: project.projectname,
                                        admin: user.email,
                                        file: url,
                                        type: type,
                                        creationdate: new Date().toISOString().slice(0, 10)
                                    })
                                    .then(() => {
                                        alert("File uploaded successfully");
                                        navigate("/attachment");
                                    });
                                 */
                            })
                            .catch((err) => {
                                alert(`Failed to upload file. ${err}`)
                            });
                    })
                    .catch((err) => {
                        alert(`Failed to upload file. ${err}`)
                    });
            } else {
                fire
                    .storage()
                    .ref("documents")
                    .child(currentdate.toString() + ".jpg")
                    .put(file)
                    .then(() => {
                        fire
                            .storage()
                            .ref("documents")
                            .child(currentdate.toString() + ".jpg")
                            .getDownloadURL()
                            .then(url => {
                                apiService.post(`/projects/${params.id}/attachments`, {
                                    file: url,
                                    type: type,
                                }).then(() => {
                                    alert('File upload successfully.')
                                    navigate(`/attachment/${params.id}`)
                                }).catch((error) => {
                                    if (error.response) {
                                        alert(error.response.data.message);
                                    } else {
                                        alert(`Error: ${error.message}`);
                                    }
                                })

                                /*
                                fire
                                    .firestore()
                                    .collection("Attachments")
                                    .add({
                                        projectname: project.projectname,
                                        admin: user.email,
                                        file: url,
                                        type: type,
                                        creationdate: new Date().toISOString().slice(0, 10)
                                    })
                                    .then(() => {
                                        alert("File uploaded successfully");
                                        navigate("/attachment");
                                    });
                                 */
                            })
                            .catch((err) => {
                                alert(`Failed to upload file. ${err}`)
                            });
                    })
                    .catch((err) => {
                        alert(`Failed to upload file. ${err}`)
                    });
                ;
            }
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
                        type="file"
                        id="fullWidth"
                        onChange={e => setfile(e.target.files[0])}
                    />
                    <FormControl sx={{m: 1, minWidth: 80}}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                            Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={type}
                            onChange={e => settype(e.target.value)}
                            autoWidth
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="PDF">PDF</MenuItem>
                            <MenuItem value="IMG">IMG</MenuItem>
                        </Select>
                    </FormControl>
                    <Button disabled={isLoading} variant="contained" onClick={handleSubmit}>
                        {isLoading ? 'Loading...' : 'Upload'}
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Addattachment;
