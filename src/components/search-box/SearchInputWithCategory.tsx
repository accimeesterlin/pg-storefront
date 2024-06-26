import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import Box from "../Box";
import Menu from "../Menu";
import Card from "../Card";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import MenuItem from "../MenuItem";
import { Span } from "../Typography";
import TextField from "../text-field";
import StyledSearchBox from "./styled";
import { useAppContext } from "@context/AppContext";

const SearchInputWithCategory: FC = () => {
  const [resultList, setResultList] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const { state } = useAppContext();

  const handleCategoryChange =
    ({ title }) =>
    () =>
      setCategory(title);

  const products = state?.products;

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) setResultList([]);
    else {
      const searchResult = products?.filter((item) =>
        item?.title?.toLowerCase().includes(value?.toLowerCase())
      );

      setResultList(searchResult?.map((item) => item?.title));
    }
  }, 200);

  const hanldeSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  const categories = state?.category;

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          onChange={hanldeSearch}
          className="search-field"
          placeholder="Search and hit enter..."
        />

        <Menu
          direction="right"
          className="category-dropdown"
          handler={
            <FlexBox className="dropdown-handler" alignItems="center">
              <span>{category}</span>
              <Icon variant="small">chevron-down</Icon>
            </FlexBox>
          }
        >
          {categories?.map(({ id, title }) => (
            <MenuItem key={id} onClick={handleCategoryChange({ title })}>
              {title}
            </MenuItem>
          ))}
        </Menu>
      </StyledSearchBox>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
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

export default SearchInputWithCategory;
