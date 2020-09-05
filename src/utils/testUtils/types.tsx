import { ButtonProps } from "../../components/Button/Button";

export interface MockLink {
  text: string;
  to: string;
  target: "_blank" | "_self";
}

export interface MockButton extends ButtonProps {}
