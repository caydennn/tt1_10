import { useState } from 'react';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import NewTransaction from './NewTransaction';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const [des_accNo, setDesAccNo] = useState();
    const [des_bal, setDesBal] = useState();
    const [des_type, setDesType] = useState();

    function clickCurr() {
        setDesAccNo("123-4-56789");
        setDesBal("$23012")
        setDesType("Current Account")
    }

    function clickMulti() {
        setDesAccNo("112-9-12345");
        setDesBal("$12312")
        setDesType("Multipler Account")
    }

    function clickSave() {
        setDesAccNo("666-1-23698");
        setDesBal("$234")
        setDesType("Saving Account")
    }

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 - Cards Summary*/}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Account Number" description={des_accNo} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Balance Available" description={des_bal}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Account Type" description={des_type} isLoss color="warning" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button fullWidth="true" size="small" variant="outlined" onClick={clickCurr}>Current Account</Button>
                <Button fullWidth="true" size="small" variant="outlined" onClick={clickMulti}>Multipler Account</Button>
                <Button fullWidth="true" size="small" variant="outlined" onClick={clickSave}>Savings Account</Button>
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            <Grid item xs={12} md={7} lg={8}>
                <NewTransaction />
            </Grid>
            {/* row 3  - Transactions */}
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Recent Orders</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;