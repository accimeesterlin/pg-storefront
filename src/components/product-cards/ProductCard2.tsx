import { FC } from "react";
import Link from "next/link";
import NextImage from "next/legacy/image";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";
import { currency } from "@utils/utils";

// ========================================================
type ProductCard2Props = {
  slug: string;
  name: string;
  price: number;
  mainImageUrl: string;
};
// ========================================================

const ProductCard2: FC<ProductCard2Props> = ({
  mainImageUrl,
  name,
  price,
  slug,
}) => {
  return (
    <Link href={`/product/${slug}`}>
      <HoverBox borderRadius={8} mb="0.5rem">
        <NextImage
          src={mainImageUrl}
          width={100}
          height={100}
          layout="responsive"
          alt={name}
        />
      </HoverBox>

      <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
        {name}
      </H4>

      <H4 fontWeight="600" fontSize="14px" color="primary.main">
        {currency(price)}
      </H4>
    </Link>
  );
};

export default ProductCard2;
