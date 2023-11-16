import { CircularProgress, FormHelperText, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import API from 'API';
import ImageCropper from './ImageCropper';
import { useEffect, useState, useCallback } from 'react';

const headers = {
    'Content-Type': 'multipart/form-data'
};

export const Upload = ({ imgData, updateImage, index, disabled = false, error, values }) => {
    const { url } = imgData;
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (url) setImage(url);
        else setImage(null);
    }, [imgData, url]);

    const changeImage = useCallback((file) => {
        setOpen(true);
        setImage(URL.createObjectURL(file));
    }, []);

    const CloudUpload = useCallback(
        async (file) => {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('image', file);
                const {
                    data: { data }
                } = await API.post('/product/image', formData, { headers });
                updateImage((prevState) => {
                    const imgs = [...prevState.images];
                    imgs.splice(index, 1, data);
                    return { ...prevState, ...values, images: imgs };
                });
            } finally {
                setOpen(false);
                setLoading(false);
            }
        },
        [index, updateImage, values]
    );

    const removeImage = useCallback(() => {
        setImage(null);
        setLoading(true);
        // Additional API call for removing the image can be made here
        updateImage((prevState) => {
            const imgs = [...prevState.images];
            imgs.splice(index, 1, { key: '', url: null });
            return { ...prevState, ...values, images: imgs };
        });
        setLoading(false);
    }, [index, updateImage, values]);

    return (
        <>
            {image ? (
                <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                    {!disabled && (
                        <IconButton
                            aria-label="delete"
                            sx={{ position: 'absolute', right: 0, zIndex: 1, color: '#FFFFFF' }}
                            onClick={removeImage}
                        >
                            <CancelIcon sx={{ path: { stroke: 'black' } }} />
                        </IconButton>
                    )}
                    <img src={image} style={{ height: '100%', width: '100%', borderRadius: 6, border: '2px solid' }} alt="img" />
                </div>
            ) : (
                <IconButton
                    aria-label="upload"
                    sx={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 6,
                        border: '2px solid'
                    }}
                    component="label"
                    color={index === 0 && error ? 'error' : 'secondary'}
                    variant="filledTonal"
                    disabled={disabled}
                >
                    <input hidden accept="image/*" type="file" onChange={(e) => changeImage(e.target.files[0])} disabled={loading} />
                    {loading ? (
                        <CircularProgress color="secondary" />
                    ) : (
                        <CloudUploadIcon
                            sx={{
                                height: '30%',
                                width: '100%'
                            }}
                        />
                    )}
                </IconButton>
            )}
            {index === 0 && (
                <FormHelperText error={error} id="standard-weight-helper-text-email-login">
                    {error ? 'Cover Image is Required' : 'Cover Image*'}
                </FormHelperText>
            )}
            <ImageCropper image={image} CloudUpload={CloudUpload} open={open} setOpen={setOpen} setImage={setImage} />
        </>
    );
};
