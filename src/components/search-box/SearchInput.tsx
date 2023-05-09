import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import Box from "../Box";
import Card from "../Card";
import Icon from "../icon/Icon";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import { Span } from "../Typography";
import TextField from "../text-field";
import SearchBoxStyle from "./styled";
import axios from "axios";
import { useAppContext } from "@context/AppContext";

const SearchInput: FC = () => {
  const [, setQuery] = useState("");
  const { dispatch } = useAppContext();
  const [resultList, setResultList] = useState([]);

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) setResultList([]);
    else {

      searchProducts(value);
    }
  }, 200);

  const searchProducts = async (value) => {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/user/algolia/productsearch",
        params: { query: value },
      });

      const data = response?.data?.map((item) => item?.name);

      dispatch({
        type: "LOAD_PRODUCTS",
        payload: response?.data
      });

      setResultList(data);
    } catch (error) {
      console.log("Error searching products", error);
    }
  }


  const hanldeSearch = useCallback((event) => {
    event.persist();
    setQuery(event.target.value);
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <SearchBoxStyle>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          onChange={hanldeSearch}
          className="search-field"
          placeholder="Search and hit enter..."
        />

        <Button className="search-button" variant="contained" color="primary">
          Search
        </Button>

        <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box>
      </SearchBoxStyle>

      {!!resultList?.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
          {resultList?.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>
                <Span fontSize="14px">{item}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

const dummySearchResult = ["Macbook Air 13", "Ksus K555LA", "Acer Aspire X453", "iPad Mini 3"];

export default SearchInput;
