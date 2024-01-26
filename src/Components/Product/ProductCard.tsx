import React from "react";
import { IProductTshirt } from "../../Pages/Product/Product.types";
import "../../Pages/Product/Product.css";
interface ProductCardProps {
  cardDetails: IProductTshirt;
  // filterableValue:string[] 
}
const ProductCard: React.FC<ProductCardProps> = ({ cardDetails }) => {
   
  return (
    <div className="productcard">
      <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "600" }}>
        {cardDetails.name}
      </p>
      <img src={cardDetails.imageURL} className="product_image" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop:"5px"
        }}
      >
        <span style={{fontWeight:800}}>Rs {cardDetails.price}</span>
        <button style={{ backgroundColor: "#e4e4e4" }}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
