// material-ui
import { styled } from '@mui/material/styles';
// import bg from "../../../assets/images/auth/bgl.png";

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    // backgroundImage: bg,
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
}));

export default AuthWrapper1;
