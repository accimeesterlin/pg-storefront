import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@component/Box";
import Stepper from "../Stepper";
import AppLayout from "./AppLayout";
import Navbar from "../navbar/Navbar";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const CheckoutNavLayout: FC<Props> = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const { pathname } = router;

  const handleStepChange = (_step, ind) => {
    switch (ind) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/checkout");
        break;
      case 2:
        router.push("/payment");
        break;
      case 3:
        router.push("/review");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);
        break;
      case "/payment":
        setSelectedStep(3);
        break;

      case "/review":
        setSelectedStep(4);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <AppLayout navbar={<Navbar />}>
      <Container my="2rem">
        <Box mb="14px">
          <Grid container spacing={6}>
            <Grid item lg={8} md={8} xs={12}>
              <Stepper
                stepperList={stepperList}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>
        {children}
      </Container>
    </AppLayout>
  );
};

const stepperList = [
  { title: "Cart", disabled: false },
  { title: "Details", disabled: false },
  { title: "Payment", disabled: false },
  { title: "Review", disabled: false },
];

export default CheckoutNavLayout;
