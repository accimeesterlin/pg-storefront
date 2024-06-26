import { FC } from "react";
import NextImage from "next/legacy/image";
import Card from "@component/Card";
import { Chip } from "@component/Chip";
import HoverBox from "@component/HoverBox";

// ===========================================================================
type ProductCard6Props = {
  name: string;
  mainImageUrl: string;
  subtitle: string;
};
// ===========================================================================

const ProductCard6: FC<ProductCard6Props> = ({
  name,
  subtitle,
  mainImageUrl,
}) => {
  return (
    <Card position="relative">
      <Chip
        zIndex={2}
        p="4px 10px"
        color="white"
        top="0.875rem"
        left="0.875rem"
        fontSize="10px"
        fontWeight="600"
        bg="secondary.main"
        position="absolute"
      >
        {name}
      </Chip>

      <Chip
        zIndex={2}
        p="4px 10px"
        bg="gray.300"
        top="0.875rem"
        fontSize="10px"
        color="gray.800"
        fontWeight="600"
        right="0.875rem"
        position="absolute"
      >
        {subtitle}
      </Chip>

      <HoverBox position="relative" height="120px" borderRadius={8}>
        <NextImage src={mainImageUrl} layout="fill" objectFit="cover" />
      </HoverBox>
    </Card>
  );
};

export default ProductCard6;
