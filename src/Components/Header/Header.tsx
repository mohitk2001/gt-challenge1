import React from "react";
import "./Header.css";
import { iconStyle, mainText } from "../../global/global.style";
import { ShoppingCartOutlined } from "@ant-design/icons";
const Header = () => {
  return (
    <div className="header">
      <div className="header_title" style={mainText}>
        TeeRex Store
      </div>
      <div className="header_nav">
        <span style={{...mainText,"marginRight":"10px"}}>Product</span>
        <div className="header_shopping_cart">
          <ShoppingCartOutlined style={iconStyle} />
        </div>
      </div>
    </div>
  );
};

export default Header;
