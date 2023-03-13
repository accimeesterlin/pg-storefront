import { Fragment, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import { Button } from "@component/buttons";
import Pagination from "@component/pagination";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import Address from "@models/address.model";
import api from "@utils/__api__/address";
import { useAppContext } from "@context/AppContext";

// =======================================================
// type AddressListProps = { addressList: Address[] };
// =======================================================

const AddressList = () => {
  const { dispatch, state } = useAppContext();
  const handleNavigate = () => Router.push("/address/create");
  
  const addressList = state?.user?.addresses;

  useEffect(() => {
    handleAddressList();  
  }, []);

  const handleAddressList = async () => {
    try {
      const data = await api.getAddressList();
      dispatch({ type: "SET_ADDRESS", payload: data });
      console.log("Address List: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  const HEADER_LINK = (
    <Button color="primary" bg="primary.light" px="2rem" onClick={handleNavigate}>
      Add New Address
    </Button>
  );

  return (
    <Fragment>
      <DashboardPageHeader title="My Addresses" iconName="pin_filled" button={HEADER_LINK} />

      {addressList?.map((item) => (
        <TableRow my="1rem" padding="6px 18px" key={item.id}>
          <Typography className="pre" m="6px" textAlign="left">
            {item.name}
          </Typography>

          <Typography flex="1 1 260px !important" m="6px" textAlign="left">
            {`${item.street}, ${item.city}, ${item.country}`}
          </Typography>

          <Typography className="pre" m="6px" textAlign="left">
            {item.phone}
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/address/${item.id}`} passHref>
              <Typography as="a" color="inherit">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>

            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
          </Typography>
        </TableRow>
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          onChange={(data) => console.log(data)}
          pageCount={Math.ceil(addressList?.length / 5)}
        />
      </FlexBox>
    </Fragment>
  );
};

AddressList.layout = DashboardLayout;

export default AddressList;
