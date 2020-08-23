import * as React from "react";
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
  onImageLock: (lock: boolean) => void;
  onClearImageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onImageRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setPhoto: (e: File) => void;
  setPhotoType: (e: string) => void;

  isImageLocked: boolean;
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

  // Initialize params for Dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({ accept: "image/*" });

  // get params from props
  const { isImageLocked, setPhoto, setPhotoType, photo } = props;

  // When file(s) are uploaded, update state
  React.useEffect(() => {
    async function getFile() {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(acceptedFiles[0]);
    }

    // if file uploaded, we go here
    if (acceptedFiles.length > 0) {
      getFile();
    }

    // if file provided from parent, go here
    if (photo && photo !== null && acceptedFiles.length === 0 && !upImg) {
      acceptedFiles[0] = photo;
      getFile();

      setCrop({
        unit: "%",
        width: 100,
        height: 100
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

    canvas.toBlob(
      blob => {
        // var _file = blobToFile(blob, "image.jpg");
        var _file = new File([blob], "name", { type: "image/png" });
        setPhoto(_file);
      },
      "image/png",
      1
    );
  }, [completedCrop]);

  const onLoad = React.useCallback(img => {
    imgRef.current = img;
  }, []);

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
              crop={crop}
              ruleOfThirds
              onChange={(c: any) => setCrop(c)}
              disabled={isImageLocked}
              onImageLoaded={onLoad}
              onComplete={c => setCompletedCrop(c)}
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
              <div>
                Max file size: <strong>3MB</strong>
              </div>
            </StyledOutline>
          </div>
        )}

        <StyledImageButtonContainer>
          <Button onClick={onImageLock}>
            {isImageLocked ? "Unlock Image" : "Lock Image"}
          </Button>

          <Button onClick={props.onClearImageClick}>Clear Image</Button>
        </StyledImageButtonContainer>
      </StyledPhotoContainer>
    </StyledRow>
  );

  function onImageLock(): void {
    props.onImageLock(!isImageLocked);
  }

  function blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return theBlob as File;
  }
};

export default SaucePhoto;
