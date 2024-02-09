// material-ui
import { styled } from '@mui/material/styles';
import bg from '../../../assets/images/auth/bg.jpg';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    position: 'relative', // Ensure proper positioning of the pseudo-element
    minHeight: '100vh',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)) , url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        filter: 'grayscale(100%)' // Apply filter only to the background image
    }
}));

export default AuthWrapper1;
