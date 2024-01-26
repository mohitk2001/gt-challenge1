import { useEffect, useState } from "react";
import { Filter } from "../../Components/Product/Filter";
import "./Product.css";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import { IProductTshirt, Tshirt,ISelectedFilter, IFilter } from "./Product.types";
import { Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// interface Tshirt{
//   data:IProductTshirt[],
//   isLoading:boolean
// }
const Product = () => {
  const [tshirts, setTshirt] = useState<Tshirt>({
    data: [],
    isLoading: true,
  });
  // const [tshirts, setTshirt] = useState<IProductTshirt[]>();
  const [unfilteredTshirt, setUnfilteredTshirt] = useState<IProductTshirt[]>();
  const [search, setSearch] = useState<string>("");
  const [selectedValuesFromFilterPane, setselectedValuesFromFilterPane] =
  useState<IFilter>({
    color: [],
    pricerange: [],
    type: [],
    gender: [],
  });
  const SuccessFailurMessage = {
    InvalidKeywordUsedToFilterData: "Sorry, Not Available",
    SearchSuccessfull: "Please find your results",
  };
  useEffect(() => {
    fetchTshirtDetails();
    setUnfilteredTshirt(tshirts.data);
  }, []);

  // useEffect(() => {
  //  console.log(selectedValuesFromFilterPane)
  // }, [selectedValuesFromFilterPane])

  const handleFilterChange = (newValues: IFilter) => {
     setselectedValuesFromFilterPane(newValues);
     console.log(newValues)
  };
  const fetchTshirtDetails = ():void => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((res) => {
        if (res.status === 200) {
          setTshirt({ data: res.data, isLoading: false });
          // console.log(tshirts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (search: string) => {
    if (tshirts) {
      const keywords: string[] = search
        .split(" ")
        .map((keyword) => keyword.trim().toLowerCase());

      const filteredTshirts = tshirts.data.filter((tshirt: IProductTshirt) => {
        return keywords.some(
          (keyword) =>
            tshirt.name.toLowerCase().includes(keyword.toLowerCase()) ||
            tshirt.color.toLowerCase().includes(keyword.toLowerCase()) ||
            tshirt.gender.toLowerCase().includes(keyword.toLowerCase()) ||
            JSON.stringify(tshirt.price)
              .toLowerCase()
              .includes(keyword.toLowerCase())
            // Add more criteria as needed
        );
      });
      setTshirt({
        data: filteredTshirts,
        isLoading: false,
      });
      console.log(filteredTshirts);
    } else {
      console.log("T-shirts data is undefined.");
    }
    // setSearch('')
  };
  const handleOnChange = (inputValue: string) => {
    setSearch(inputValue);

    // setTshirts(
    //   {
    //     data: unfilteredTshirt,
    //   isLoading: false,
    //   }
    // );
  };
  const handleOnBlur=()=>{
    if (search.trim() === '') {
      fetchTshirtDetails()
    }
  }
  return (
    <div className="product">
      <div className="productSearch">
        <input type="text"
          placeholder="Search for products"
          onChange={(e) => handleOnChange(e.target.value)}
          onBlur={handleOnBlur}
          className="productSearchInput"
          value={search}
          onKeyDown={(e)=>e.key==="Enter"?handleSearch(search):""}
        />
        <div
          className="search-button-container"
          onClick={() => handleSearch(search)}
        >
          <SearchOutlined />
        </div>
      </div>
      <div className="productView">
        <Filter
          tshirts={tshirts}
          setTshirt={setTshirt}
          selectedValuesFromFilterPane={selectedValuesFromFilterPane}
          setParentSelection={handleFilterChange}
          fetchTshirtDetails={fetchTshirtDetails}
        />
        {tshirts.isLoading ? (
          <Spin />
        ) : (
          <div className="product_container">
            { tshirts.data.length===0? <h1>Nothing</h1>: tshirts.data?.map((tshirtData, index) => (
              <ProductCard cardDetails={tshirtData} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
