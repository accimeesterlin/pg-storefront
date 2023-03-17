import { FC } from "react";
import Link from "next/link";
import NextImage from "next/image";
import HoverBox from "@component/HoverBox";
import Card from "../Card";
import FlexBox from "../FlexBox";
import { H6, SemiSpan } from "../Typography";
import { calculateDiscount, currency } from "@utils/utils";

// ==============================================================
type ProductCard8Props = {
  id: string;
  off: number;
  slug: string;
  price: number;
  name: string;
  mainImageUrl: string;
  [key: string]: unknown;
};
// ==============================================================

const ProductCard8: FC<ProductCard8Props> = ({ id, price, name, off, slug, mainImageUrl, ...props }) => {
  return (
    <Card p="1rem" {...props}>
      <Link href={`/product/${slug}`}>
        <a>
          <HoverBox mb="0.75rem" borderRadius={8} overflow="hidden">
            <NextImage
              src={mainImageUrl || "/assets/images/products/Rectangle 116.png"}
              width={500}
              height={500}
              layout="responsive"
              objectFit="contain"
              objectPosition="center"
            />
          </HoverBox>

          <SemiSpan title={name} mb="0.25rem" color="inherit" ellipsis display="block">
            {name}
          </SemiSpan>

          <FlexBox alignItems="center">
            <H6 color="primary.main" mr="0.25rem">
              {calculateDiscount(price, off)}
            </H6>

            <SemiSpan>
              <del>{currency(price)}</del>
            </SemiSpan>
          </FlexBox>
        </a>
      </Link>
    </Card>
  );
};

export default ProductCard8;
