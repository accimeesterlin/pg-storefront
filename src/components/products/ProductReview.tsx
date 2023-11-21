import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import { H2, H5 } from "@component/Typography";
import ProductComment from "./ProductComment";

const ProductReview: FC = () => {
  const initialValues = {
    rating: "",
    comment: "",
    date: new Date().toISOString(),
  };

  const validationSchema = yup.object().shape({
    rating: yup.number().required("required"),
    comment: yup.string().required("required"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log("Values: ", values);
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  const isEnabled = false;

  if (!isEnabled) {
    return <p>No Reviews at this moment</p>;
  }

  return (
    <Box>
      {commentList.map((item, ind) => (
        <ProductComment {...item} key={ind} />
      ))}

      <H2 fontWeight="600" mt="55px" mb="20">
        Write a Review for this product
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb="20px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              Your Rating
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            outof={5}
            color="warn"
            size="medium"
            readonly={false}
            value={values.rating || 0}
            onChange={(value) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb="24px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              Your Review
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextArea
            fullwidth
            rows={8}
            name="comment"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.comment || ""}
            placeholder="Write a review here..."
            errorText={touched.comment && errors.comment}
          />
        </Box>

        <Button
          size="small"
          type="submit"
          color="primary"
          variant="contained"
          disabled={!(dirty && isValid)}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

const commentList = [
  {
    name: "Jannie Schumm",
    mainImageUrl: "/assets/images/faces/7.png",
    rating: 4.7,
    date: "2021-02-14",
    comment:
      "I recently purchased a new item, and I'm incredibly satisfied with my purchase. It exceeded my expectations in terms of performance and quality. The user experience is smooth and intuitive, and I love the sleek design. It's become an essential part of my daily routine, and I can't imagine life without it now.",
  },
  {
    name: "Joe Kenan",
    mainImageUrl: "/assets/images/faces/6.png",
    rating: 4.7,
    date: "2019-08-10",
    comment:
      "I've been on the lookout for a product like this for a while, and I'm glad I finally found it. The value for the price is outstanding, and it offers versatility that I've been looking for. I've already recommended it to my friends and family. It's truly a game-changer!",
  },
  {
    name: "Jenifer Tulio",
    mainImageUrl: "/assets/images/faces/8.png",
    rating: 4.7,
    date: "2021-02-05",
    comment:
      "This product aligns perfectly with my values of sustainability and eco-friendliness. It's made a positive impact on my lifestyle by reducing waste and promoting a greener way of living. The quality is remarkable, and it's built to last. I appreciate companies that prioritize the environment, and this purchase has been a small step in the right direction.",
  },
];

export default ProductReview;
