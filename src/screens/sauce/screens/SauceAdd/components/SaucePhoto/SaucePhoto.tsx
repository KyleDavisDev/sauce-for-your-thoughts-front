import * as React from "react";
import DropNCrop from "@synapsestudios/react-drop-n-crop";

import { Button } from "../../../../../../components/Button/Button";
import {
  StyledRow,
  StyledDescriptor,
  StyledPhotoContainer,
  StyledImageButtonContainer
} from "../../SauceAddStyle";

export interface ISaucePhotoProps {
  onDropNCropChange: (val: any) => void;
  onImageLock: (lock: boolean) => void;
  onClearImageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  DropNCropValue: any;
  cropperOptions: {
    zoomOnWheel?: boolean;
    aspectRatio?: number;
    movable: boolean;
  };
  isImageLocked: boolean;
  photo?: string;
}

export default class SaucePhoto extends React.PureComponent<
  ISaucePhotoProps,
  any
> {
  public render() {
    return (
      <StyledRow>
        <StyledDescriptor title="Photo">
          If you have a picture of the bottle, please upload it! If the picture
          is unclear, blurry, or missing completely, an admin may replace it
          with a different one.
        </StyledDescriptor>
        <StyledPhotoContainer>
          {this.props.photo && (
            <div style={{ marginBottom: "15px" }}>
              <h5> Current image:</h5>
              <img src={this.props.photo} />
            </div>
          )}
          <DropNCrop
            ref="cropper"
            onChange={this.props.onDropNCropChange.bind(this)}
            value={this.props.DropNCropValue}
            canvasWidth={"100%"}
            cropperOptions={this.props.cropperOptions}
            maxFileSize={4145728}
          />

          <StyledImageButtonContainer>
            <Button onClick={this.onImageLock}>
              {this.props.isImageLocked ? "Unlock Image" : "Lock Image"}
            </Button>

            <Button onClick={this.props.onClearImageClick}>Clear Image</Button>
          </StyledImageButtonContainer>
        </StyledPhotoContainer>
      </StyledRow>
    );
  }

  private onImageLock = (event: React.MouseEvent<HTMLButtonElement>): void => {
    // Find out if locked or not
    const isLocked: boolean = this.props.isImageLocked;

    if (isLocked) {
      // Unlock Cropper component
      // @ts-ignore
      this.refs.cropper.cropperRef.cropper.enable();
    } else {
      // Lock component
      // @ts-ignore
      this.refs.cropper.cropperRef.cropper.disable();
    }

    this.props.onImageLock(!isLocked);
  };
}
