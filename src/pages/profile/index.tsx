import { Fragment, useEffect } from "react";
import Router from "next/router";
import { format } from "date-fns";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import User from "@models/user.model";
import api from "@utils/__api__/users";
import { useAppContext } from "@context/AppContext";

// ============================================================
// type ProfileProps = { user: User };
// ============================================================

const Profile = () => {
  const { dispatch, state } = useAppContext();
  const handleEdit = () => Router.push("/profile/edit");

  useEffect(() => {
    handleUserProfile();
  }, []);

  const user = state?.user;

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  const handleUserProfile = async () => {
    try {
      const data = await api.getMe();
      dispatch({ type: "SET_USER", payload: data });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const HEADER_LINK = (
    <Button color="primary" bg="primary.light" px="2rem" onClick={handleEdit}>
      Edit Profile
    </Button>
  );

  const infoList = [
    { title: `${user?.orders?.length}`, subtitle: "All Orders" },
    { title: "02", subtitle: "Awaiting Payments" },
    { title: "00", subtitle: "Awaiting Shipment" },
    { title: "01", subtitle: "Awaiting Delivery" },
  ];

  return (
    <Fragment>
      <DashboardPageHeader
        iconName="user_filled"
        title="My Profile"
        button={HEADER_LINK}
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              <Avatar src={user?.profileImageUrl} size={64} />

              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{`${firstName} ${lastName}`}</H5>

                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>

                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        ${user?.balance?.amount}
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    SILVER USER
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList?.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item?.subtitle}>
                  <FlexBox
                    as={Card}
                    height="100%"
                    p="1rem 1.25rem"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item?.title}
                    </H3>

                    <Small color="text.muted" textAlign="center">
                      {item?.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow p="0.75rem 1.5rem">
        {firstName && (
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px" textAlign="left">
              First Name
            </Small>

            <span>{firstName}</span>
          </FlexBox>
        )}

        {lastName && (
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px" textAlign="left">
              Last Name
            </Small>

            <span>{lastName}</span>
          </FlexBox>
        )}

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Email
          </Small>

          <span>{user?.email}</span>
        </FlexBox>

        {user?.phone && (
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px" textAlign="left">
              Phone
            </Small>

            <span>{user?.phone}</span>
          </FlexBox>
        )}

        {user?.birthDay && (
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Birth date
            </Small>

            <span className="pre">
              {format(
                user?.birthDay ? new Date(user?.birthDay) : new Date(),
                "dd MMM, yyyy"
              )}
            </span>
          </FlexBox>
        )}
      </TableRow>
    </Fragment>
  );
};

Profile.layout = DashboardLayout;

export default Profile;
