import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// third-party

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import Notification from 'utils/Notification';
import API from '../../../../API';

// assets
import { IconLogout, IconSettings, IconUser, IconKey, IconEye, IconEyeOff } from '@tabler/icons';

// ==============================|| PROFILE MENU ||============================== //

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    width: '90%',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4
};

const ProfileSection = ({ userDetails }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);

    const [popupState, setPopupState] = useState(false);

    // for change password modal pop
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (passwordType) => {
        if (passwordType === 'old') {
            setShowOldPassword(!showOldPassword);
        } else if (passwordType === 'new') {
            setShowNewPassword(!showNewPassword);
        } else if (passwordType === 'confirm') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/');
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    // change password functionality

    // const handlePasswordChange = () => {
    //     // Add your password validation logic here
    //     if (newPassword !== confirmPassword) {
    //         setError('New password and confirm password do not match');
    //         Notification('error', 'New Password and confirm password does not match');
    //     } else {
    //         // Call your password change API or function here
    //         // Reset the form and close the modal
    //         changePassword({ oldPassword, newPassword, email: userDetails.email });

    //         setShowChangePasswordPopup(false);
    //     }
    // };
    const handlePasswordChange = () => {
        // Check if any field is empty
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            Notification('error', 'Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            Notification('error', 'New Password and confirm password do not match');
        } else {
            changePassword({ oldPassword, newPassword, email: userDetails.email });

            setShowChangePasswordPopup(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
            setShowOldPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    };
    const changePassword = async (req) => {
        try {
            const res = await API.post('/user/change-password', req);
            const { status } = res; // Make API call
            console.log('response::>>', res.data); // Log the response
            if (status === 200) {
                // Handle successful signup
                Notification('success', 'Password changed successfully!');
                changePopupState(false);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setError('');
                setShowOldPassword(false);
                setShowNewPassword(false);
                setShowConfirmPassword(false);
                setShowChangePasswordPopup(false);
            } else {
                Notification('error', res.data.error);
                // Additional logic if needed
            }
            // Handle success or other logic based on the response
        } catch (error) {
            Notification('Error:', error.response.data);
            console.error('Error:', error.response.data); // Log any errors
            // Handle errors or display error messages to the user
        }
    };
    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.dark,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.contrastText,
                        '& svg': {
                            stroke: theme.palette.primary.contrastText
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={IconUser}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.contrastText} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                {/* <Typography variant="h4">Good Morning,</Typography> */}
                                                <Typography component="span" variant="h3">
                                                    {userDetails.name}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="h5" sx={{ fontWeight: 400 }}>
                                                {userDetails.email}
                                            </Typography>
                                        </Stack>
                                        {/* <OutlinedInput
                                            sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                                            id="input-search-profile"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="Search profile options"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                                </InputAdornment>
                                            }
                                            aria-describedby="search-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight'
                                            }}
                                        />
                                        <Divider /> */}
                                    </Box>
                                    {/* <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}> */}
                                    <Box sx={{ p: 2 }}>
                                        {/* <UpgradePlanCard />
                                            <Divider /> */}
                                        {/* <Card
                                                sx={{
                                                    bgcolor: theme.palette.primary.light,
                                                    my: 2
                                                }}
                                            >
                                                 <CardContent>
                                                    <Grid container spacing={3} direction="column">
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Start DND Mode</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        color="primary"
                                                                        checked={sdm}
                                                                        onChange={(e) => setSdm(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Allow Notifications</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        checked={notification}
                                                                        onChange={(e) => setNotification(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card> */}
                                        <Divider />
                                        <List
                                            component="nav"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 350,
                                                minWidth: 300,
                                                backgroundColor: theme.palette.background.paper,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                },
                                                '& .MuiListItemButton-root': {
                                                    mt: 0.5
                                                }
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                selected={selectedIndex === 4}
                                                onClick={() => setShowChangePasswordPopup(true)}
                                            >
                                                <ListItemIcon>
                                                    <IconKey stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography>Change Password</Typography>} />
                                            </ListItemButton>
                                        </List>
                                        <List
                                            component="nav"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 350,
                                                minWidth: 300,
                                                backgroundColor: theme.palette.background.paper,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                },
                                                '& .MuiListItemButton-root': {
                                                    mt: 0.5
                                                }
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                selected={selectedIndex === 4}
                                                onClick={() => setPopupState(true)}
                                            >
                                                <ListItemIcon>
                                                    <IconLogout stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography>Logout</Typography>} />
                                            </ListItemButton>
                                        </List>
                                    </Box>
                                    {/* </PerfectScrollbar> */}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
            <div>
                <Modal
                    open={popupState}
                    onClose={() => setPopupState(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h3">Are you sure to log out?</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '30px' }}>
                            <Button variant="outlined" color="error" sx={{ width: '45%' }} onClick={() => setPopupState(false)}>
                                No
                            </Button>
                            <Button variant="contained" color="secondary" sx={{ width: '45%' }} onClick={() => handleLogout()}>
                                Yes
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>

            {/* Modal Popup for change password */}
            {/* <div>
                <Modal
                    open={showChangePasswordPopup}
                    onClose={() => setShowChangePasswordPopup(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h5" gutterBottom>
                            Change Password
                        </Typography>

                        <TextField
                            label="Old Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />

                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={error !== ''}
                            helperText={error}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
                            <Button variant="outlined" color="secondary" onClick={() => handlePasswordChange()}>
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setShowChangePasswordPopup(false)}
                                sx={{ marginLeft: 1 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div> */}
            <div>
                <Modal
                    open={showChangePasswordPopup}
                    onClose={() => setShowChangePasswordPopup(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h3" gutterBottom align="center">
                            Change Password
                        </Typography>

                        <TextField
                            label="Old Password"
                            type={showOldPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={() => togglePasswordVisibility('old')} style={{ color: 'black' }}>
                                        {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </Button>
                                )
                            }}
                        />

                        <TextField
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={() => togglePasswordVisibility('new')} style={{ color: 'black' }}>
                                        {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </Button>
                                )
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            // error={error !== ''}
                            // helperText={error}
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={() => togglePasswordVisibility('confirm')} style={{ color: 'black' }}>
                                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </Button>
                                )
                            }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setShowChangePasswordPopup(false);
                                    setOldPassword('');
                                    setNewPassword('');
                                    setConfirmPassword('');
                                    setError('');
                                    togglePasswordVisibility('');
                                    setShowOldPassword(false);
                                    setShowNewPassword(false);
                                    setShowConfirmPassword(false);
                                }}
                                // sx={{ marginLeft: 1 }}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handlePasswordChange} sx={{ marginLeft: 1 }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

const mapStateToProps = ({ user }) => {
    const { userDetails } = user;
    return { userDetails };
};
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
