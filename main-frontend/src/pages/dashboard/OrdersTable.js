import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from "../../../node_modules/moment/moment";

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(txnID, receiveID, txnAmt, dateTime, comments) {
    let changedDate = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
    return { txnID, receiveID, txnAmt, changedDate, comments };
}

const rows = [
    createData(1, 621156213, 500.00, '2022-11-08T04:00:00.000Z', 'Monthly Pocket Money'.split("T")[0]),
    createData(2, 958945214, 8996.00, '2022-11-08T04:00:00.000Z', 'School Fees'),
    createData(3, 828120424, 3000.00, '2022-11-25T04:00:00.000Z', ' Driving Centre Top-Up'),
    createData(4, 353677039, 255.00, '2022-11-17T06:21:00.000Z', 'Tuition Fee Payment'),
    createData(5, 259555772, 32.00, '2022-11-08T04:00:00.000Z','Books Payment' )
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'txnID',
        align: 'left',
        disablePadding: false,
        label: 'Transaction ID'
    },
    {
        id: 'receiveID',
        align: 'left',
        disablePadding: true,
        label: 'Receiving ID'
    },
    {
        id: 'txnAmt',
        align: 'right',
        disablePadding: false,
        label: 'Transaction Amount (S$)'
    },
    {
        id: 'comments',
        align: 'left',
        disablePadding: false,
        label: 'Comments'
    },
    {
        id: 'dateTime',
        align: 'left',
        disablePadding: false,

        label: 'Date/Time'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('txnID');
    const [selected] = useState([]);

    const isSelected = (txnID) => selected.indexOf(txnID) !== -1;

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.txnID);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.txnID}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.txnID}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.receiveID}</TableCell>
                                    <TableCell align="right">
                                        <NumberFormat value={row.txnAmt} displayType="text" thousandSeparator />
                                    </TableCell>
                                    <TableCell align="left">{row.comments}</TableCell>
                                    <TableCell align="left">
                                        {row.changedDate}
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
