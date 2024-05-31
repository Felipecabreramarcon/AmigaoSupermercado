import { buttonStyles } from "../../styles/buttonStyles";

interface ButtonProps {
  label: string;
  onClick?: any;
  style?: string;
}

export const Button = ({ label, onClick, style = "default" }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => onClick && onClick(e)}
      className={buttonStyles(style)}
    >
      {label}
    </button>
  );
};
