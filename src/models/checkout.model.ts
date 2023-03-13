import Address from "./address.model";

interface Checkout {
    address?: Address;
    payment?: any;
    billingAddress?: Address;

}

export default Checkout;
