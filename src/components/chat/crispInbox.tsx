import { useEffect } from "react";

type Props = {
  websiteId: string;
};

const CrispChatBoxComponent = ({ websiteId }: Props) => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = websiteId;
    (() => {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("body")[0].appendChild(s);
    })();
  }, []);

  return null;
};

export default CrispChatBoxComponent;
