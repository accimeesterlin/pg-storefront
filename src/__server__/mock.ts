import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const Mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

axios.interceptors.request.use((config: any) => {
    // check if the useMock flag is set in the request config
    if (config.useMock) {
      // use the mock adapter for this request
      config.adapter = Mock.adapter();
    }
    // return the updated config object
    return config;
  });

export default Mock;
