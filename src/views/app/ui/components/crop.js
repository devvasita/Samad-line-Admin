/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-param-reassign */
import { makeStyles } from '@mui/styles';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// / This function is used to convert base64 encoding to mime type (blob)

const useStyles = makeStyles(() => ({
  react__crop: {
    '&>div': {
      '&>img': {
        // maxHeight: 113,
        // minHeight: 113,
        // width: 'fit-content',
        // margin: '0 auto',
      },
    },
  },
}));

function dataURItoBlob(dataURI) {
  const binary = atob(dataURI.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {
    type: 'image/jpeg',
    name: 'webp',
  });
}

function setCanvasImage(image, canvas, crop, setCropedImage) {
  if (!crop || !canvas || !image) {
    return;
  }
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext('2d');
  // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  const pixelRatio = window.devicePixelRatio;

  canvas.width = 240;
  canvas.height = 240;

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
  // ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  // ctx.imageSmoothingQuality = 'high';

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    240,
    240
  );
  if (canvas) {
    const dataURl = canvas.toDataURL('image/png', 'image/webp');
    const blobData = dataURItoBlob(dataURl);
    setCropedImage(blobData);
  }
}

export default function CropImage({ setCropedImage, upImg, setUpImg, src }) {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const classes = useStyles();

  const [crop, setCrop] = useState({
    unit: 'px',
    width: 240,
    height: 240,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  // on selecting file we set load the image on to cropper
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  let downloadedImg = '';

  function imageReceived() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;
    canvas.innerText = downloadedImg.alt;
    context.drawImage(downloadedImg, 0, 0);

    try {
      setUpImg(canvas.toDataURL('image/png'));
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  function startDownload() {
    const imageURL = src;
    const imageDescription = 'The Mozilla logo';
    downloadedImg = new Image();
    downloadedImg.crossOrigin = 'Anonymous';
    downloadedImg.addEventListener('load', imageReceived, false);
    downloadedImg.alt = imageDescription;
    downloadedImg.src = imageURL;
  }

  useEffect(() => {
    startDownload();
    return () => {
      imgRef.current = null;
      previewCanvasRef.current = null;
    };
  }, []);

  return (
    <>
      {src && src.length ? (
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          style={{
            maxHeight: 240,
            maxWidth: 240,
            width: '100%',
            height: '100%',
            margin: '0 auto',
          }}
          maxHeight={240}
          maxWidth={240}
          onComplete={(c) =>
            setCanvasImage(
              imgRef.current,
              previewCanvasRef.current,
              c,
              setCropedImage
            )
          }
          className={classes.react__crop}
        />
      ) : (
        <>
          {upImg ? (
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) =>
                setCanvasImage(
                  imgRef.current,
                  previewCanvasRef.current,
                  c,
                  setCropedImage
                )
              }
              style={{
                maxHeight: 240,
                maxWidth: 240,
                width: '100%',
                height: '100%',
                margin: '0 auto',
              }}
              maxHeight={240}
              maxWidth={240}
              className={classes.react__crop}
            />
          ) : (
            <img
              src="/assets/uploadicon.svg"
              alt=""
              style={{ height: '35px' }}
            />
          )}

          <input
            hidden
            required
            accept="image/*"
            requiredStar
            type="file"
            onChange={onSelectFile}
          />
        </>
      )}
      <div>
        {/* Canvas to display cropped image */}
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
            position: 'absolute',
            top: '-99999px',
          }}
        />
      </div>
    </>
  );
}
