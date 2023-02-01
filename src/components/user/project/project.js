import React, {useState, useEffect} from "react";
import {Box, Container, Typography} from "@material-ui/core";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import fire from "../../../files/firebase";
import UserappBar from "../../Navbar/User";
import {useNavigate} from "react-router-dom";
import {getProjectData} from "../../reducer/project";
import apiService from "../../../helpers/api";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0
    }
}));

const Project = () => {
    const [data, setdata] = useState([]);
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
        /*
        fire
            .firestore()
            .collection("projects")
            .where("admin", "==", user.email)
            .get()
            .then(snapshot =>
                snapshot.forEach(ele => {
                    console.log(ele);
                    var data = {id: ele.id, data: ele.data()};
                    setdata(arr => [...arr, data]);
                    console.log(data);
                })
            );
         */
    }, []);

    const getData = async () => {
        try {
            const response = await apiService.get('/projects');
            const projects = response.data.data;

            const newData = projects.map((p) => Object.assign({}, {id: p._id, data: p}))
            setdata(newData)
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    }

    const onDelete = async (id) => {
        if (!id) {
            alert('Invalid ID')
            return;
        }

        try {
            const response = await apiService.delete(`/projects/${id}`);

            let newData = data.slice(0);
            newData = newData.filter(n => n.id !== id);

            setdata(newData)
            alert("project deleted successfully");
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
            .collection("projects")
            .doc(row.id)
            .delete()
            .then(() => {
                fire
                    .firestore()
                    .collection("Tasks")
                    .where("projectname", "==", row.data.projectname)
                    .get()
                    .then(snapshot => {
                        snapshot.forEach(ele => {
                            var key = ele.id;

                            fire
                                .firestore()
                                .collection("Tasks")
                                .doc(key)
                                .delete()
                                .then(() => {
                                    fire
                                        .firestore()
                                        .collection("Attachments")
                                        .where(
                                            "projectname",
                                            "==",
                                            row.data.projectname
                                        )
                                        .get()
                                        .then(snapshot => {
                                            snapshot.forEach(ele => {
                                                var key = ele.id;
                                                fire
                                                    .firestore()
                                                    .collection("Attachments")
                                                    .doc(key)
                                                    .delete()
                                                    .then(() => {
                                                        fire
                                                            .firestore()
                                                            .collection("Teams")
                                                            .where(
                                                                "projectname",
                                                                "==",
                                                                row.data.projectname
                                                            )
                                                            .get()
                                                            .then(snapshot => {
                                                                snapshot.forEach(ele => {
                                                                    var key = ele.id;

                                                                    fire
                                                                        .firestore()
                                                                        .collection("Teams")
                                                                        .doc(key)
                                                                        .delete()
                                                                        .then(() => {
                                                                            alert(
                                                                                "project deleted successfully"
                                                                            );
                                                                        });
                                                                });
                                                            });
                                                    });
                                            });
                                        });
                                });
                        });
                    });
            });

         */
    }

    return (
        <Box>
            <UserappBar/>
            <br/>
            <Container>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h6">Project List :</Typography>
                    <Box style={{display: "flex"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate("/createproject");
                            }}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
                <br/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Creation Date</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Member</StyledTableCell>
                                <StyledTableCell>Task</StyledTableCell>
                                <StyledTableCell>Attachment</StyledTableCell>
                                <StyledTableCell>Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row =>
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {moment(row.data.createdAt).format('DD MMM YYYY')}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.data.projectname}
                                    </StyledTableCell>

                                    <StyledTableCell align="right">
                                        {row.data.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                navigate(`/team/${row.id}`);
                                            }}
                                        >
                                            Add Member
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/task/${row.id}`)}
                                        >
                                            Add Task
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/attachment/${row.id}`)}
                                        >
                                            Add Attachment
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onDelete(row.id)}
                                        >
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default Project;
