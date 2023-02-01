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
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
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

const Attachment = () => {
    const [data, setdata] = useState([]);
    const user = useSelector(state => state.user.value);
    const project = useSelector(state => state.project.value);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!params?.id) {
            alert('Invalid ID')
            navigate('/project')
        }

        getData()
    }, []);

    const getData = async () => {
        try {
            const response = await apiService.get(`/projects/${params.id}/attachments`);
            const tasks = response.data.data;

            const newData = tasks.map((p) => Object.assign({}, {id: p._id, data: p}))
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
            .collection("Attachments")
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

    const onDelete = async (attachment_id) => {
        const newData = data.slice(0);
        const attachment_idx = newData.findIndex(o => attachment_id !== undefined && o.id === attachment_id);

        if (attachment_idx === -1) {
            alert('Attachment is not valid');
            return;
        }

        try {
            const response = await apiService.delete(`/projects/${params.id}/attachments/${attachment_id}`)

            newData.splice(attachment_idx, 1);
            setdata(newData)

            alert("Attachment deleted successfully.");
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
            .collection("Attachments")
            .doc(row.id)
            .delete()
            .then(() => {
                alert("Attachment deleted successfully.");
            });
         */
    }

    return (
        <Box>
            <UserappBar/>
            <br/>
            <Container>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h6">Attachment List :</Typography>
                    <Box style={{display: "flex"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate(`/addattachment/${params.id}`);
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
                                <StyledTableCell>File</StyledTableCell>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row =>
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {moment(row.data.createdAt).format('DD MMM YYYY')}
                                    </StyledTableCell>
                                    <Link onClick={() => window.open(row.data.file)}>
                                        {" "}<StyledTableCell component="th" scope="row">
                                        {row.data.file}
                                    </StyledTableCell>{" "}
                                    </Link>
                                    <StyledTableCell>
                                        {row.data.type}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                onDelete(row.id)
                                            }}>
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

export default Attachment;
