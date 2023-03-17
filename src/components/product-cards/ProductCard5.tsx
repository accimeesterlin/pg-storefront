import { FC } from "react";
import NextImage from "next/image";
import Box from "@component/Box";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";

// ====================================================================
type ProductCard5Props = { mainImageUrl: string; name: string };
// ====================================================================

const ProductCard5: FC<ProductCard5Props> = ({ mainImageUrl, name }) => {
  return (
    <Box>
      <HoverBox borderRadius={5} mb="0.5rem">
        <NextImage
          width={260}
          alt={name}
          src={mainImageUrl}
          height={175}
          objectFit="cover"
          layout="responsive"
        />
      </HoverBox>

      <H4 fontSize="14px" fontWeight="600">
        {name}
      </H4>
    </Box>
  );
};

export default ProductCard5;
