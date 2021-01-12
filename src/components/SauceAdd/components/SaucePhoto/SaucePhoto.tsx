import * as React from "react";
import Compressor from "compressorjs";
import { useDropzone } from "react-dropzone";

import { Button } from "../../../Button/Button";

import {
  StyledRow,
  StyledDescriptor,
  StyledPhotoContainer,
  StyledImageButtonContainer
} from "../../SauceAddStyle";
import { StyledOutline, StyledReactCrop } from "./SaucePhotoStyle";

export interface ISaucePhotoProps {
  onImageRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setPhoto: (e: File | undefined) => void;
  setPhotoType: (e: string) => void;
  enabled?: boolean;
  photo?: File;
}

const SaucePhoto: React.FunctionComponent<ISaucePhotoProps> = props => {
  // Initialize internal state
  const [crop, setCrop] = React.useState<any>({
    unit: "%",
    width: 100,
    aspect: 2 / 3
  });
  const [completedCrop, setCompletedCrop] = React.useState<any>(null);

  const [upImg, setUpImg] = React.useState<any>();
  const imgRef = React.useRef(null);
  const previewCanvasRef = React.useRef(null);
  const [isImageLocked, setIsImageLocked] = React.useState(!!props.enabled);

  // Initialize params for Dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    accept: "image/*"
  });

  // get params from props
  const { setPhoto, photo } = props;

  // When file(s) are uploaded, update state
  React.useEffect(() => {
    async function assignFileToState() {
      const file = acceptedFiles[0] as File;

      new Compressor(file, {
        quality: 0.6,
        convertSize: 2000000,
        success(result) {
          // Correcting package's type as per documentation
          const res = result as File | Blob;
          const objectURL = URL.createObjectURL(res);
          setUpImg(objectURL);
        },
        error(err) {
          console.log(err.message);
        }
      });
    }

    // if file uploaded, we go here
    if (acceptedFiles.length > 0) {
      assignFileToState();
    }

    // if file provided from parent, go here
    if (photo && acceptedFiles.length === 0 && !upImg) {
      acceptedFiles[0] = photo;
      assignFileToState();

      setCrop({
        unit: "%",
        width: 100,
        height: 100,
        aspect: 2 / 3
      });
    }
  }, [acceptedFiles, photo]);

  // When the crop area has changed, update canvas
  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image: any = imgRef.current;
    const canvas: any = previewCanvasRef.current;
    const crop: any = completedCrop;
    const dpr = window.devicePixelRatio || 1;

    // Quick sanity check
    if (!image || !canvas) {
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * dpr;
    canvas.height = crop.height * dpr;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * dpr,
      crop.height * dpr
    );
  }, [completedCrop]);

  const onImageLoaded = React.useCallback(
    img => {
      if (isImageLocked) return;
      imgRef.current = img;

      setCrop({
        unit: "%",
        width: 100,
        height: 100,
        aspect: 2 / 3
      });

      return false; // Return false if you set crop state in here.
    },
    [isImageLocked]
  );

  return (
    <StyledRow>
      <StyledDescriptor title="Photo">
        If you have a picture of the bottle, please upload it! If the picture is
        unclear, blurry, or missing completely, an admin may replace it with a
        different one.
      </StyledDescriptor>
      <StyledPhotoContainer>
        {upImg ? (
          <>
            <StyledReactCrop
              src={upImg}
              onImageLoaded={onImageLoaded}
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
              ruleOfThirds
              disabled={isImageLocked}
            />
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: completedCrop?.width ?? 0,
                  height: completedCrop?.height ?? 0,
                  display: "none"
                }}
              />
            </div>
          </>
        ) : (
          <div className="container">
            <StyledOutline
              {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            >
              <input {...getInputProps()} />
              <div>Drag-n-drop a file or click to add an image</div>
              <div>Accepted file types: .jpeg, .jpg, .png, .webp</div>
              {/*<div>*/}
              {/*  Max file size: <strong>1.5MB</strong>*/}
              {/*</div>*/}
            </StyledOutline>
          </div>
        )}

        {upImg && (
          <StyledImageButtonContainer>
            {isImageLocked ? (
              <Button displayType="solid" onClick={onImageRemove}>
                Remove Image
              </Button>
            ) : (
              <Button displayType="solid" onClick={onImageLock}>
                Save Image
              </Button>
            )}

            <Button displayType="outline" onClick={onClearImageClick}>
              Clear Image
            </Button>
          </StyledImageButtonContainer>
        )}
      </StyledPhotoContainer>
    </StyledRow>
  );

  function onImageLock(): void {
    sendBlobToParent();
    setIsImageLocked(!isImageLocked);
  }

  function sendBlobToParent(): void {
    const canvas: any = previewCanvasRef.current;
    canvas.toBlob(
      blob => {
        const _file = new File([blob], "name", { type: "image/png" });
        setPhoto(_file); // send on up!
      },
      "image/png",
      1
    );
  }

  function onImageRemove(): void {
    setUpImg(undefined);
    setIsImageLocked(!isImageLocked);
  }

  function onClearImageClick(): void {
    setIsImageLocked(false);
    setPhoto(undefined);
    setUpImg(undefined);
  }
};

export default SaucePhoto;
