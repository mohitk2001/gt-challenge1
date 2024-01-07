import { useEffect, useState } from "react";
import { Filter } from "../../Components/Product/Filter";
import "./Product.css";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import { IProductTshirt } from "./Product.types";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const Product = () => {
  const [tshirts, setTshirt] = useState<IProductTshirt[]>();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    fetchTshirtDetails();
  }, []);
  const fetchTshirtDetails = () => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((res) => {
        if (res.status === 200) {
          setTshirt(res.data);
          // console.log(tshirts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (search:string) => {
    if(tshirts){
      const keywords: string[] = search.split(' ').map((keyword) => keyword.trim().toLowerCase());
      
      const filteredTshirts = tshirts.filter((tshirt:IProductTshirt) =>{
      return keywords.some((keyword) => (
        tshirt.name.toLowerCase().includes(keyword.toLowerCase()) ||
        tshirt.color.toLowerCase().includes(keyword.toLowerCase()) ||
        tshirt.gender.toLowerCase().includes(keyword.toLowerCase()) || 
        JSON.stringify(tshirt.price).toLowerCase().includes(keyword.toLowerCase()) 
        // Add more criteria as needed
      ));
    }
    );
    console.log(filteredTshirts)
    
    }
    else{
       console.log('T-shirts data is undefined.');
    }

  };
  return (
    <div className="product">
      <div className="productSearch">
        <Input
          placeholder="Search for products"
          onChange={(e) => setSearch(e.target.value)}
          className="productSearchInput"
        />
        <div className="search-button-container" onClick={()=>handleSearch(search)}>
          <SearchOutlined />
        </div>
      </div>
      <div className="productView">
        <Filter />
        <div className="product_container">
          {tshirts?.map((tshirtData, index) => (
            <ProductCard cardDetails={tshirtData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
