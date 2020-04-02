import * as React from "react";
import ReactCrop from "react-image-crop";
import { Button } from "../../../Button/Button";

import {
  StyledRow,
  StyledDescriptor,
  StyledPhotoContainer,
  StyledImageButtonContainer
} from "../../SauceAddStyle";
import { StyledOutline } from "./SaucePhotoStyle";

export interface ISaucePhotoProps {
  onImageLock: (lock: boolean) => void;
  onClearImageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onImageRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  cropperOptions: {
    zoomOnWheel?: boolean;
    aspectRatio?: number;
    movable: boolean;
  };
  isImageLocked: boolean;
  photo?: string;
}

const SaucePhoto: React.FunctionComponent<ISaucePhotoProps> = props => {
  const [crop, setCrop] = React.useState<any>({
    unit: "%",
    width: 30,
    aspect: 16 / 9
  });
  const [photo, setPhoto] = React.useState<any>();
  const [imgRef, setImgRef] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState("");

  return (
    <StyledRow>
      <StyledDescriptor title="Photo">
        If you have a picture of the bottle, please upload it! If the picture is
        unclear, blurry, or missing completely, an admin may replace it with a
        different one.
      </StyledDescriptor>
      <StyledPhotoContainer>
        {props.photo && (
          <div style={{ marginBottom: "15px" }}>
            <h5> Current image:</h5>
            <img src={props.photo} style={{ maxWidth: "200px" }} />
            <Button onClick={onImageRemove}>Remove image</Button>
          </div>
        )}
        {photo ? (
          <>
            <ReactCrop
              src={photo}
              crop={crop}
              ruleOfThirds
              onChange={newCrop => setCrop(newCrop)}
              onImageLoaded={onLoad}
              onComplete={makeClientCrop}
            />
            {previewUrl && <img alt="Crop preview" src={previewUrl} />}
          </>
        ) : (
          uploadSection()
        )}

        <StyledImageButtonContainer>
          <Button onClick={onImageLock}>
            {props.isImageLocked ? "Unlock Image" : "Lock Image"}
          </Button>

          <Button onClick={props.onClearImageClick}>Clear Image</Button>
        </StyledImageButtonContainer>
      </StyledPhotoContainer>
    </StyledRow>
  );

  function uploadSection(): JSX.Element {
    return (
      <StyledOutline htmlFor="fileUpload">
        <div>
          <div>Drag-n-drop a file or click to add an image</div>
          <div>Accepted file types: .jpeg, .jpg, .png</div>
          <div>
            Max file size: <strong>3MB</strong>
          </div>
        </div>
        <input
          type="file"
          id="fileUpload"
          accept="image/*"
          onChange={onSelectFile}
        />
      </StyledOutline>
    );
  }

  function onLoad(img) {
    setImgRef(img);
  }

  async function makeClientCrop() {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, "newFile.jpeg");
    }
  }

  async function createCropPreview(image, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        // blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  }

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setPhoto(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLock(event: React.MouseEvent<HTMLButtonElement>): void {
    // Find out if locked or not
    const isLocked: boolean = props.isImageLocked;

    if (isLocked) {
    } else {
    }

    props.onImageLock(!isLocked);
  }

  function onImageRemove(event: React.MouseEvent<HTMLButtonElement>): void {
    if (props.onImageRemove) {
      props.onImageRemove(event);
    }
  }
};

export default SaucePhoto;
