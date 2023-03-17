import Address from "./address.model";

interface Checkout {
    address?: Address;
    paymentMethod?: string;
    billingAddress?: Address;

}

export default Checkout;
