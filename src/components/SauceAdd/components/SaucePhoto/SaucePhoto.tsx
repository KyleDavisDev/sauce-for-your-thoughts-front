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
  const [crop, setCrop] = React.useState<any>({
    unit: "%",
    width: 30,
    aspect: 2 / 3
  });
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({ accept: "image/*" });
  const [imgRef, setImgRef] = React.useState(null);
  const { isImageLocked, setPhoto, setPhotoType } = props;
  const photo = props.photo ? URL.createObjectURL(props.photo) : undefined;

  React.useEffect(() => {
    async function getFile() {
      // const _file = await toBase64(acceptedFiles[0]);
      setPhoto(acceptedFiles[0]);
      setPhotoType(acceptedFiles[0].type);
    }

    if (acceptedFiles.length > 0) {
      getFile();
    }
  }, [acceptedFiles]);

  return (
    <StyledRow>
      <StyledDescriptor title="Photo">
        If you have a picture of the bottle, please upload it! If the picture is
        unclear, blurry, or missing completely, an admin may replace it with a
        different one.
      </StyledDescriptor>
      <StyledPhotoContainer>
        {photo ? (
          <>
            <StyledReactCrop
              src={photo}
              crop={crop}
              ruleOfThirds
              onChange={newCrop => setCrop(newCrop)}
              disabled={isImageLocked}
              onImageLoaded={onLoad}
            />
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

  function onLoad(img) {
    setImgRef(img);
  }

  function onImageLock(): void {
    props.onImageLock(!isImageLocked);
  }

  function toBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
};

export default SaucePhoto;
