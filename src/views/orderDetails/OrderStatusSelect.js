import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import API from 'API';
import Notification from 'utils/Notification';

const OrderStatusSelect = ({ value, handleUpdate, _id }) => {
    const [status, setStatus] = useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
        (async () => {
            const res = await API.put(`/order/${_id}/status`, { status: event.target.value });
            if (res && res.status) Notification('success', 'Status Updated');
        })();
    };
    useEffect(() => {
        setStatus(value);
    }, [value]);
    return (
        <FormControl fullWidth>
            <InputLabel id="order-status-label">Order Status</InputLabel>
            <Select
                labelId="order-status-label"
                id="order-status-select"
                value={status}
                label="Order Status"
                onChange={handleChange}
                variant="outlined"
            >
                <MenuItem value="Order Placed">Order Placed</MenuItem>
                <MenuItem value="Order Confirmed">Order Confirmed</MenuItem>
                <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
                <MenuItem value="Order Delivered">Order Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
        </FormControl>
    );
};

export default OrderStatusSelect;
