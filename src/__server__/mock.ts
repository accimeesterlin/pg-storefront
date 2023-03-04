import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// const API_URL = process.env.NEXT_PUBLIC_SELLER_BASE_URL;

const Mock = new MockAdapter(axios, { onNoMatch: "passthrough" });


export default Mock;
