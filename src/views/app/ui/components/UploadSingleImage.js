/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import API from 'helpers/API';
import CropImage from './crop';

const headers = {
  'Content-Type': 'multipart/form-data',
};

const UploadSingleImage = ({
  image,
  setImage,
  images,
  i,
  isArray,
  setImageArray,
}) => {
  const [cropImage, setCropImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChangeImage(e) {
    e.stopPropagation();
    setCropImage(URL.createObjectURL(e.target.files[0]));
    setOpen(true);
  }

  const handleCancelImage = () => {
    if (isArray) {
      images[i] = { url: '', key: '' };
      setImageArray((oldState) => {
        return { ...oldState, image: images };
      });
    } else setImage({ url: '', key: '' });
    setCropImage(null);
    setLoading(false);
  };

  const CloudUpload = async (blob) => {
    setLoading(true);
    setOpen(false);
    setCropImage(null);
    const formData = new FormData();
    formData.append('image', blob);
    const {
      data: { data },
    } = await API.post('/image/upload', formData, {
      headers,
    });
    if (isArray) {
      images[i] = data;
      setImageArray((oldState) => {
        return { ...oldState, image: images };
      });
    } else setImage(data);
    setLoading(false);
  };

  return (
    <div>
      {image ? (
        <div style={{ position: 'relative' }}>
          <CancelIcon
            onClick={handleCancelImage}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              cursor: 'pointer',
            }}
          />
          <img
            src={image}
            alt="offer"
            style={{
              height: 250,
              width: '100%',
            }}
          />
        </div>
      ) : (
        <div>
          <IconButton
            aria-label="upload picture"
            component="label"
            style={{
              margin: 'auto',
              width: '100%',
              height: 250,
              border: '2px dotted',
              borderRadius: '6px',
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="loading" style={{ position: 'unset' }} />
            ) : (
              <>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  // ref={hiddenFileInput}
                  onChange={handleChangeImage}
                />
                <img
                  src="/assets/uploadicon.svg"
                  alt=""
                  style={{ height: '35px' }}
                />
              </>
            )}
          </IconButton>
        </div>
      )}
      <CropImage
        image={cropImage}
        CloudUpload={CloudUpload}
        open={open}
        setOpen={setOpen}
        setImage={setCropImage}
      />
    </div>
  );
};

export default UploadSingleImage;
