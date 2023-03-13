import { Fragment, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import AddressForm from "@component/address/AddressForm";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import Address from "@models/address.model";
import api from "@utils/__api__/address";

// =============================================================
// type Props = { address: Address };
// =============================================================

const AddressDetails = () => {
  const [address, setAddress] = useState();
  const router = useRouter();;
  const handleGoBack = () => Router.push("/address");

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      handleAddressDetails();
    }
  }, [id]);

  const handleAddressDetails = async () => {
    try {
      const data: any = await api.getAddress(id as string);

      if (data) {
        setAddress(data);
      }
      console.log("Address Details: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  const HEADER_LINK = (
    <Button color="primary" bg="primary.light" px="2rem" onClick={handleGoBack}>
      Back to Address
    </Button>
  );

  return (
    <Fragment>
      <DashboardPageHeader iconName="pin_filled" title="Edit Address" button={HEADER_LINK} />

      <Card1>
        <AddressForm address={address} />
      </Card1>
    </Fragment>
  );
};

AddressDetails.layout = DashboardLayout;



export default AddressDetails;
