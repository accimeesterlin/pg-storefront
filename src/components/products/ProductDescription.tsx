import { FC } from "react";
import Box from "@component/Box";
import Typography from "@component/Typography";
// import Typography, { H3 } from "@component/Typography";

type Props = {
  description: string;
};

const ProductDescription: FC<Props> = ({ description }) => {
  return (
    <Box>
      {/* <H3 mb="1rem">Specification:</H3> */}
      <Typography>
        {description}
      </Typography>
    </Box>
  );
};

export default ProductDescription;
