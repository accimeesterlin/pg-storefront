// import { ButtonHTMLAttributes, FC } from "react";
// import { SpaceProps } from "styled-system";
import { colorOptions } from "../../interfaces";
import StyledIcon from "./styles";

export interface IconProps {
  size?: string;
  children?: string;
  transform?: string;
  color?: colorOptions;
  variant?: "small" | "medium" | "large";
  defaultcolor?: "currentColor" | "auto";
}

// type ComponentProps = IconProps & SpaceProps & ButtonHTMLAttributes<IconProps>;
// ex: FC<ComponentProps>

const Icon: any = ({ children, ...props }) => {
  return (
    <StyledIcon
      src={`/assets/images/icons/${children}.svg`}
      fallback={() => <span>{children?.trim()}</span>}
      {...props}
    />
  );
};

Icon.defaultProps = { variant: "medium", defaultcolor: "currentColor", children: "", size: "1em", transform: "",  color: "primary" };

export default Icon;
