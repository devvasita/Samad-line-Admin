/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-param-reassign */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// / This function is used to convert base64 encoding to mime type (blob)
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

  canvas.width = crop.width * pixelRatio * scaleX;
  canvas.height = crop.height * pixelRatio * scaleY;

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );
  if (canvas) {
    const dataURl = canvas.toDataURL('image/png', 'image/webp');
    const blobData = dataURItoBlob(dataURl);
    console.log({ blobData });
    setCropedImage(blobData);
  }
}

export default function CropImage({ setCropedImage, upImg, setUpImg }) {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [crop, setCrop] = useState({ unit: 'px', width: 30, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  // on selecting file we set load the image on to cropper
  const onSelectFile = (e) => {
    console.log({ e });
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      console.log({ reader: reader.result });
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    setCanvasImage(
      imgRef.current,
      previewCanvasRef.current,
      completedCrop,
      setCropedImage
    );
  }, [completedCrop]);

  console.log({ upImg });
  return (
    <>
      {/* <img src="/assets/uploadicon.svg" alt="" style={{ height: '35px' }} /> */}

      {upImg ? (
        <img src="/assets/uploadicon.svg" alt="" style={{ height: '35px' }} />
      ) : (
        <label>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            maxHeight={113}
            maxWidth={113}
            style={{ height: 113, width: 238 }}
          />
          <input
            hidden
            required
            accept="image/*"
            requiredStar
            type="file"
            onChange={onSelectFile}
          />
          <img src="/assets/uploadicon.svg" alt="" style={{ height: '35px' }} />
        </label>
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