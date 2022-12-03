// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { useSelector} from 'react-redux'

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
    
    const user = useSelector(state => state.user)

    const displayUser = state.user ? state.user.currentUser.firstName : "User"

    return (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>{displayUser}</Box>;
    )
}

export default Search;
