import { FC } from "react";
import Link from "next/link";
import NextImage from "next/legacy/image";
import styled from "styled-components";
// import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
// import Typography from "@component/Typography";
import CategorySectionHeader from "@component/CategorySectionHeader";
import Category from "@models/category.model";

const StyledImage = styled(NextImage)`
  border-radius: 8px;
`;

// ============================================================
type Props = { categories: Category[] };
// ============================================================

const Section10: FC<Props> = ({ categories }) => {
  return (
    <Container mb="70px">
      <CategorySectionHeader
        title="Categories"
        iconName="categories"
        seeMoreLink="#"
      />

      <Grid container spacing={6}>
        {categories.map((item) => (
          <Grid item lg={2} md={3} sm={4} xs={12} key={item.id}>
            <Link href="/">
              <StyledImage
                width={52}
                alt="fashion"
                height={52}
                src={item.image}
                objectFit="contain"
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section10;
