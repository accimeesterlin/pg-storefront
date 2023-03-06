import { FC } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Modal from "@component/Modal";
import Icon from "@component/icon/Icon";
import ProductIntro from "./ProductIntro";
import Shop from "@models/shop.model";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  product: {
    slug: string;
    title: string;
    price: number;
    images: string[];
    id: string | number;
    shop?: Shop
  };
};
// ===================================================

const ProductQuickView: FC<Props> = (props) => {
  const { open, onClose, product } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <Card p="1rem" position="relative" maxWidth="800px" width="100%">
        <ProductIntro
          id={product.id}
          title={product.title}
          rating={4}
          shop={product.shop}
          price={product.price}
          images={product.images}
        />

        <Box position="absolute" top="0.75rem" right="0.75rem" cursor="pointer">
          <Icon className="close" color="primary" variant="small" onClick={onClose}>
            close
          </Icon>
        </Box>
      </Card>
    </Modal>
  );
};

export default ProductQuickView;
