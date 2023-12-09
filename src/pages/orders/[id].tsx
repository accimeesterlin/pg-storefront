import { Fragment, useEffect, useState } from "react";
import isEmpty from "lodash.isempty";
import Router from "next/router";
import { format } from "date-fns";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import { Button } from "@component/buttons";
import DashboardLayout from "@component/layout/customer-dashboard";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import useWindowSize from "@hook/useWindowSize";
import api from "@utils/__api__/orders";
import Order from "@models/order.model";
import { currency } from "@utils/utils";

type OrderStatus = "packaging" | "shipping" | "delivering" | "complete";

// =============================================================
// type Props = { order: Order };
// =============================================================

const initialOrder = {
  id: "",
  description: "",
  orderId: "",
  sender: "",
  status: "",
  paymentStatus: "",
  transactionType: "",
  amount: 0,
  customerId: "",
  quantity: 0,
  userID: "",
  products: [],
  receiver: "",
  platform: "",
  operatorId: "",
  redirectUrl: "",
  shopId: "",
  shippingRate: 0,
  paymentId: "",
  shippingAddress: {},
  channel: "",
  totalPrice: 0,
  comparePrice: 0,
  isDelivered: false,
  deliveredAt: "",
  paymentMethod: "",
  updatedAt: `${new Date()}`,
  createdAt: `${new Date()}`,
};

const OrderDetails = () => {
  const [order, setOrder] = useState<Order>(initialOrder);
  const width = useWindowSize();
  const orderStatus: OrderStatus = "shipping";
  const stepIconList = ["package-box", "truck-1", "delivery"];
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];

  const id = Router?.query?.id;

  useEffect(() => {
    handleOrder();
  }, [id]);

  const handleOrder = async () => {
    try {
      const userOrder: Order = await api.getOrder(String(id));

      setOrder(userOrder);
    } catch (error) {
      // No order found
    }
  };

  const breakpoint = 350;
  const statusIndex = orderStatusList.indexOf(orderStatus);

  const handleGoBack = () => Router.push("/orders");

  const HEADER_LINK = (
    <Button color="primary" bg="primary.light" px="2rem" onClick={handleGoBack}>
      Order List
    </Button>
  );

  if (isEmpty(order)) {
    return (
      <Typography
        p="0.5rem 1rem"
        bg="primary.light"
        textAlign="center"
        borderRadius="300px"
        color="primary.main"
      >
        No order found
      </Typography>
    );
  }

  return (
    <Fragment>
      <DashboardPageHeader
        title="Order Details"
        iconName="bag_filled"
        button={HEADER_LINK}
      />

      <Card p="2rem 1.5rem" mb="30px">
        <FlexBox
          my="2rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={width < breakpoint ? "column" : "row"}
        >
          {stepIconList.map((item, ind) => (
            <Fragment key={item}>
              <Box position="relative">
                <Avatar
                  size={64}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
                  color={ind <= statusIndex ? "gray.white" : "primary.main"}
                >
                  <Icon size="32px" defaultcolor="currentColor">
                    {item}
                  </Icon>
                </Avatar>

                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="gray.200" color="success.main">
                      <Icon size="12px" defaultcolor="currentColor">
                        done
                      </Icon>
                    </Avatar>
                  </Box>
                )}
              </Box>

              {ind < stepIconList.length - 1 && (
                <Box
                  height={width < breakpoint ? 50 : 4}
                  minWidth={width < breakpoint ? 4 : 50}
                  flex={width < breakpoint ? "unset" : "1 1 0"}
                  bg={ind < statusIndex ? "primary.main" : "gray.300"}
                />
              )}
            </Fragment>
          ))}
        </FlexBox>

        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            bg="primary.light"
            textAlign="center"
            borderRadius="300px"
            color="primary.main"
          >
            Estimated Delivery Date <b>4th October</b>
          </Typography>
        </FlexBox>
      </Card>

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Order ID:
            </Typography>

            <Typography fontSize="14px">
              #{order?.id?.substring(0, 8)}
            </Typography>
          </FlexBox>

          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Placed on:
            </Typography>

            <Typography fontSize="14px">
              {format(new Date(order.createdAt), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>

          {order.isDelivered && (
            <FlexBox className="pre" m="6px" alignItems="center">
              <Typography fontSize="14px" color="text.muted" mr="4px">
                Delivered on:
              </Typography>

              <Typography fontSize="14px">
                {format(new Date(order.deliveredAt), "dd MMM, yyyy")}
              </Typography>
            </FlexBox>
          )}
        </TableRow>

        <Box py="0.5rem">
          {order.products.map((item, ind) => (
            <FlexBox
              px="1rem"
              py="0.5rem"
              flexWrap="wrap"
              alignItems="center"
              key={ind}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src={item.mainImageUrl} size={64} />

                <Box ml="20px">
                  <H6 my="0px">{item.name}</H6>
                  <Typography fontSize="14px" color="text.muted">
                    {currency(item.price)} x {item.inventory}
                  </Typography>
                </Box>
              </FlexBox>

              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Product properties: Black, L
                </Typography>
              </FlexBox>

              <FlexBox flex="160px" m="6px" alignItems="center">
                <Button variant="text" color="primary">
                  <Typography fontSize="14px">Write a Review</Typography>
                </Button>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Shipping Address
            </H5>

            <Paragraph fontSize="14px" my="0px" mb="1rem">
              {order.shippingAddress?.line1}
            </Paragraph>
            <Paragraph fontSize="14px" my="0px" mb="1rem">
              {order.shippingAddress?.apartment}
            </Paragraph>
            <Paragraph fontSize="14px" my="0px" mb="1rem">
              {order.shippingAddress?.city}
            </Paragraph>
            <Paragraph fontSize="14px" my="0px" mb="1rem">
              {order.shippingAddress?.state}
            </Paragraph>

            <Paragraph fontSize="14px" my="0px" mb="1rem">
              {order.shippingAddress?.country}
            </Paragraph>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Total Summary
            </H5>

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Subtotal:
              </Typography>

              <H6 my="0px">{currency(order.totalPrice)}</H6>
            </FlexBox>

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Shipping fee:
              </Typography>

              <H6 my="0px">$0</H6>
            </FlexBox>

            {order?.comparePrice && (
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="0.5rem"
              >
                <Typography fontSize="14px" color="text.hint">
                  comparePrice:
                </Typography>

                <H6 my="0px">-${order.comparePrice}</H6>
              </FlexBox>
            )}

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px">Total</H6>
              <H6 my="0px">{currency(order.totalPrice)}</H6>
            </FlexBox>

            {order?.paymentMethod && (
              <Typography fontSize="14px">
                Paid by {order?.paymentMethod}
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

OrderDetails.layout = DashboardLayout;

export default OrderDetails;
