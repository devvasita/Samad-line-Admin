import React, { useState } from 'react';
import { Autocomplete, TextField, Chip, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useFormikContext } from 'formik';

function MultipleSelectWithRemove({ otherProductsData = [], productOptions = [], title, ...rest }) {
    const { setFieldValue } = useFormikContext();
    // State to track the selected options
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        setSelectedOptions(otherProductsData);
    }, [otherProductsData]);
    // Function to remove a selected option
    const handleDelete = (optionToDelete) => () => {
        setSelectedOptions((options) => options.filter((option) => option.id !== optionToDelete.id));
    };

    // Function to update the selected options
    const handleChange = (event, newValue) => {
        setSelectedOptions(newValue);
        setFieldValue('otherProductsData', newValue);
    };

    return (
        <Stack spacing={1}>
            <label style={{ fontWeight: 'bold' }}>{title}</label>
            <Autocomplete
                multiple
                id="tags-filled"
                options={productOptions}
                getOptionLabel={(option) => option.title}
                value={selectedOptions}
                onChange={handleChange}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="contained"
                            color="secondary"
                            label={option.title}
                            onDelete={handleDelete(option)}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                variant="outlined"
                renderInput={(params) => <TextField {...params} placeholder="Options" variant="outlined" {...rest} />}
            />
        </Stack>
    );
}

export default MultipleSelectWithRemove;
