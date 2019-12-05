// Type definitions for react-country-region-selector 1.4.5 by <https://github.com/country-regions/react-country-region-selector>
// Project: https://github.com/country-regions/react-country-region-selector
// Definitions by: Kyle Davis <https://github.com/kyledavisdev>

declare module "@synapsestudios/react-drop-n-crop" {
  import * as React from "react";

  export class DropNCrop extends React.Component<DropNCropProps, any> {}

  export type cropperOptions = {
    zoomOnWheel?: boolean;
    aspectRatio?: number;
    movable: boolean;
  };

  export interface DropNCropProps {
    ref: string;
    onChange: (val: any) => void;
    value: string;
    canvasWidth: string;
    cropperOptions: cropperOptions;
    maxFileSize: number;
  }
}
