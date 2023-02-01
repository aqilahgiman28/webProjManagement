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
import {useNavigate} from "react-router-dom";
import UserappBar from "../Navbar/User";
import {getProjectData} from "../reducer/project";
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

const Yourproject = () => {
    const [data, setdata] = useState([]);
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await apiService.get('/me/projects');
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
        /*
        fire
            .firestore()
            .collection("Teams")
            .where("email", "==", user.email)
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

    return (
        <Box>
            <UserappBar/>
            <br/>
            <Container>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h6">Assigned Projects :</Typography>
                </Box>
                <br/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Creation Date</StyledTableCell>
                                <StyledTableCell>ProjectName</StyledTableCell>
                                <StyledTableCell>Admin</StyledTableCell>
                                <StyledTableCell>Tasks</StyledTableCell>
                                <StyledTableCell>Attachments</StyledTableCell>
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
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                navigate(`/yourtask/${row.id}`);
                                            }}
                                        >
                                            View Task
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                navigate(`/viewdocument/${row.id}`);
                                            }}
                                        >
                                            View Documents
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

export default Yourproject;
