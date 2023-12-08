import { FC } from "react";
import Grid from "@component/grid/Grid";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { Card2 } from "./showcase-cards";

// ===================================================
type Props = { bannerData: any[] };
// ===================================================

const Section3: FC<Props> = ({ bannerData }) => {
  let firstBanner;
  let secondBanner;

  if (bannerData?.length > 0) {
    [firstBanner, secondBanner] = bannerData;
  }

  return (
    <CategorySectionCreator>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <Card2
            productUrl="/"
            title={firstBanner?.title}
            mainImageUrl={firstBanner?.mainImageUrl}
            subtitle={firstBanner?.description}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Card2
            color="white"
            productUrl="/"
            bg="text.muted"
            subtitleColor="gray.400"
            title={secondBanner?.title}
            mainImageUrl={secondBanner?.mainImageUrl}
            subtitle={secondBanner?.description}
          />
        </Grid>
      </Grid>
    </CategorySectionCreator>
  );
};

export default Section3;
