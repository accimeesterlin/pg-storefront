import { FC } from "react";
import NextImage from "next/legacy/image";
import styled from "styled-components";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import Typography from "../Typography";

const StyledImage = styled(NextImage)`
  border-radius: 5px;
`;

type MobileCategoryImageBoxProps = {
  icon?: string;
  title: string;
  mainImageUrl?: string;
};

const MobileCategoryImageBox: FC<MobileCategoryImageBoxProps> = ({
  title,
  mainImageUrl,
  icon,
}) => {
  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      {mainImageUrl ? (
        <StyledImage
          src={mainImageUrl}
          width={100}
          height={100}
          objectFit="cover"
        />
      ) : (
        icon && <Icon size="48px">{icon}</Icon>
      )}

      <Typography
        className="ellipsis"
        textAlign="center"
        fontSize="11px"
        lineHeight="1"
        mt="0.5rem"
      >
        {title}
      </Typography>
    </FlexBox>
  );
};

export default MobileCategoryImageBox;
