import React, { useState, useEffect } from "react";
import "../../Pages/Product/Product.css";
import {
  Tshirt,
  ISelectedFilter,
  IFilter,
} from "../../Pages/Product/Product.types";
interface ChildComponentProps {
  tshirts: Tshirt;
  setTshirt: React.Dispatch<React.SetStateAction<Tshirt>>;
  selectedValuesFromFilterPane: IFilter;
  setParentSelection: (newValues: IFilter) => void;
  fetchTshirtDetails: () => void;
}
export const Filter = ({
  tshirts,
  setTshirt,
  selectedValuesFromFilterPane,
  setParentSelection,
  fetchTshirtDetails,
}: ChildComponentProps) => {
  const [selectedValues, setSelectedValue] = useState<IFilter>({
    color: [],
    pricerange: [],
    type: [],
    gender: [],
  });
  const FilterData = [
    {
      tittle: "color",
      values: ["Red", "Blue", "Green"],
    },
    {
      tittle: "gender",
      values: ["Men", "Women"],
    },
    {
      tittle: "price",
      values: ["0-Rs250", "Rs250-450", "Rs400"],
    },
    {
      tittle: "type",
      values: ["Polo", "Hoodie", "Basic"],
    },
  ];
  useEffect(() => {
    console.log(selectedValuesFromFilterPane);
  }, [selectedValuesFromFilterPane]);

  const handleCheck = (checkedValue: string, title: string) => {
    if (title === "color") {
      const isColorValuesSelected = selectedValues.color.includes(checkedValue);
      if (isColorValuesSelected) {
        setSelectedValue((prevValues) => ({
          ...prevValues,
          color: prevValues.color.filter((color) => color !== checkedValue),
        }));
      } else {
        setSelectedValue((prevValues) => ({
          ...prevValues,
          color: [...prevValues.color, checkedValue],
        }));
      }
    } else if (title === "price") {
      const isPricerValuesSelected =
        selectedValues.pricerange.includes(checkedValue);
      if (isPricerValuesSelected) {
        setSelectedValue((prevValues) => ({
          ...prevValues,
          pricerange: prevValues.pricerange.filter(
            (price) => price !== checkedValue
          ),
        }));
      } else {
        setSelectedValue((prevValues) => ({
          ...prevValues,
          pricerange: [...prevValues.pricerange, checkedValue],
        }));
      }
    } else if (title === "gender") {
      const isGenderValuesSelected =
        selectedValues.gender.includes(checkedValue);
      if (isGenderValuesSelected) {
        setSelectedValue((prevValues) => ({
          ...prevValues,
          gender: prevValues.gender.filter((gender) => gender !== checkedValue),
        }));
      } else {
        setSelectedValue((prevValues) => ({
          ...prevValues,
          gender: [...prevValues.gender, checkedValue],
        }));
      }
    } else if (title === "type") {
      const isTypeValuesSelected = selectedValues.type.includes(checkedValue);
      if (isTypeValuesSelected) {
        setSelectedValue((prevValues) => ({
          ...prevValues,
          type: prevValues.type.filter((type) => type !== checkedValue),
        }));
      } else {
        setSelectedValue((prevValues) => ({
          ...prevValues,
          type: [...prevValues.type, checkedValue],
        }));
      }
    }

    setParentSelection(selectedValues);

    //  console.log(filteredTshirtsData)
  };
  const applyFilter = () => {
    try {
      const filteredTshirtsData = tshirts.data.filter(
        (tshirt) =>
          // Filter by color
          (selectedValues.color.length === 0 ||
            selectedValues.color.includes(tshirt.color)) &&
          // Filter by pricerange
          // (selectedValues.pricerange.length === 0 ||
          //   selectedValues.pricerange.includes(tshirt.price)) &&
          // Filter by type
          (selectedValues.type.length === 0 ||
            selectedValues.type.includes(tshirt.type)) &&
          // Filter by gender
          (selectedValues.gender.length === 0 ||
            selectedValues.gender.includes(tshirt.gender))
      );
      console.log(filteredTshirtsData);
      setTshirt({
        data: filteredTshirtsData,
        isLoading: false,
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching or processing T-shirt details:", error);
      setTshirt({
        data: [],
        isLoading: false,
      });
    }
  };
  const clearFilter = () => {
    fetchTshirtDetails();
  };
  return (
    <div className="FilterPane">
      {FilterData.map((data) => (
        <dl>
          <dt style={{ textTransform: "capitalize" }}>{data.tittle}</dt>
          {data.values.map((childValues, index) => (
            <dd key={index}>
              <input
                type="checkbox"
                onChange={() => handleCheck(childValues, data.tittle)}
                id={childValues}
              />
              <label htmlFor={childValues}>{childValues}</label>
            </dd>
          ))}
        </dl>
      ))}
      <button onClick={applyFilter}>Apply</button>
      <button onClick={clearFilter}>Clear</button>
    </div>
  );
};
