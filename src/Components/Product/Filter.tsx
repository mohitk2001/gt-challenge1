import React from "react";
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import "../../Pages/Product/Product.css"
export const Filter = () => {
  const FilterData = [
    {
      tittle: "Color",
      values: ["Red", "Blue", "Green"],
    },
    {
      tittle: "Gender",
      values: ["Men", "Women"],
    },
    {
      tittle: "Price",
      values: ["0-Rs250", "Rs250-450", "Rs400"],
    },
    {
      tittle: "Type",
      values: ["Polo", "Hoodie", "Basic"],
    },
  ];
 const handleCheck=(checkedValue:string)=>{
    console.log(checkedValue)
 }
  return (
    <div className="FilterPane">
      {FilterData.map((data) => (
        <dl>
          <dt>{data.tittle}</dt>
          {data.values.map((childValues,index) => (
            <dd key={index}><Checkbox onChange={() => handleCheck(childValues)}>{childValues}</Checkbox></dd>
          ))}
          
        </dl>
      ))}
    </div>
  );
};
