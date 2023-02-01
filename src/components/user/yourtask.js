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
import fire from "../../files/firebase";
import {useNavigate, useParams} from "react-router-dom";
import UserappBar from "../Navbar/User";
import apiService from "../../helpers/api";
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

const Yourtask = () => {
    const [data, setdata] = useState([]);
    const user = useSelector(state => state.user.value);
    const project = useSelector(state => state.project.value);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!params?.id) {
            alert('Invalid ID')
            navigate('/yourproject')
        }

        getData()
    }, []);

    const getData = async () => {
        try {
            const response = await apiService.get(`/projects/${params.id}/tasks/me`);
            const project = response.data.data;

            const newData = project.tasks?.map((p) => Object.assign({}, {
                id: p._id,
                data: {...p, projectname: project.projectname}
            }))
            setdata(newData)
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
            .where("projectname", "==", project.projectname)
            .where("email", "==", user.email)
            .where("status", "==", "ongoing")
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
    }

    const onUpdate = async (task_id) => {
        const newData = data.slice(0);
        const task_idx = newData.findIndex(o => task_id !== undefined && o.id === task_id);

        if (task_idx === -1) {
            alert('Task is not valid');
            return;
        }

        try {
            const response = await apiService.post(`/projects/${params.id}/tasks/${task_id}`, {
                status: 'completed'
            })

            newData[task_idx].data.status = 'completed';
            setdata(newData)

            alert("Task status updated.");
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
            .doc(row.id)
            .update({
                status: "completed"
            })
            .then(res => {
                alert("Task status updated.");
            });
        */
    }

    return (
        <Box>
            <UserappBar/>
            <br/>
            <Container>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h6">Task List :</Typography>
                </Box>
                <br/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Creation Date</StyledTableCell>
                                <StyledTableCell>ProjectName</StyledTableCell>
                                <StyledTableCell>Admin</StyledTableCell>
                                <StyledTableCell>Task</StyledTableCell>
                                <StyledTableCell>Deadline</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Update</StyledTableCell>
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

                                    <StyledTableCell>
                                        {row.data.admin}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.data.description}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.data.deadline}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.data.status}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                onUpdate(row.id)
                                            }}
                                        >
                                            Update
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

export default Yourtask;
