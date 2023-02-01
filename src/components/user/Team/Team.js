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
import {useSelector} from "react-redux";
import fire from "../../../files/firebase";
import UserappBar from "../../Navbar/User";
import {useLocation, useNavigate, useParams} from "react-router-dom";
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

const Team = () => {
    const [data, setdata] = useState([]);
    const user = useSelector(state => state.user.value);
    const project = useSelector(state => state.project.value);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (!params?.id) {
            alert('Invalid ID')
            navigate('/project')
        }

        getData()
    }, []);

    const getData = async() => {
        try {
            const response = await apiService.get(`/projects/${params.id}/members`);
            const teams = response.data.data;

            const newData = teams.map((p) => Object.assign({}, {id: p._id, data: p}))
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
            .where("projectname", "==", project.projectname)
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
    }

    const onDelete = async (member_id) => {
        const newData = data.slice(0);
        const member_idx = newData.findIndex(o => member_id !== undefined && o.id === member_id);

        if (member_idx === -1) {
            alert('Member is not valid');
            return;
        }

        try {
            const response = await apiService.delete(`/projects/${params.id}/members/${member_id}`)

            newData.splice(member_idx, 1);
            setdata(newData)

            alert("Member deleted successfully.");
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
            .doc(row.id)
            .delete()
            .then(() => {
                alert("Member deleted successfully.");
            });

         */
    }

    return (
        <Box>
            <UserappBar/>
            <br/>
            <Container>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h6">Team List :</Typography>
                    <Box style={{display: "flex"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate(`/addmember/${params.id}`);
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
                                <StyledTableCell>Email</StyledTableCell>
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
                                        {row.data.username}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {row.data.email}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                onDelete(row.id)
                                            }}
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

export default Team;
