/* eslint-disable react/prop-types */
import { Checkbox } from "antd";
import { IoMdClose } from "react-icons/io";

const Filters = ({ setShowFilters, filters, setFilters }) => {
  const categories = [
    { name: "Electronics", value: "electronics" },
    { name: "Home", value: "home" },
    { name: "Fashion", value: "fashion" },
    { name: "Sports", value: "sports" },
    { name: "Books", value: "books" },
  ];

  const ages = [
    { name: "0-2 years", value: "0-2" },
    { name: "3-5 years", value: "3-5" },
    { name: "6-8 years", value: "6-8" },
    { name: "9-12 years", value: "9-12" },
    { name: "13+ years", value: "13-10000" },
  ];

  return (
    <div className="w-[12rem] flex flex-col gap-5">
      <div className="flex justify-between items-center mt-2">
        <h1 className="font-bold text-gray-500 text-2xl">Filters</h1>
        <IoMdClose
          onClick={() => setShowFilters(false)}
          className="text-3xl text-gray-500 cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-gray-500 font-bold text-lg">Category</h1>
        {categories.map((category) => (
          <Checkbox
            name="category"
            checked={filters.category.includes(category.value)}
            className="text-lg text-gray-700"
            onChange={(e) => {
              if (e.target.checked) {
                setFilters({
                  ...filters,
                  category: [...filters.category, category.value],
                });
              } else {
                setFilters({
                  ...filters,
                  category: filters.category.filter(
                    (item) => item !== category.value
                  ),
                });
              }
            }}
            key={category.value}
          >
            {category.name}
          </Checkbox>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-gray-500 font-bold text-lg">Age</h1>
        {ages.map((item) => (
          <Checkbox
            className="text-lg text-gray-700"
            checked={filters.age.includes(item.value)}
            onChange={(e) => {
              if (e.target.checked) {
                setFilters({
                  ...filters,
                  age: [...filters.age, item.value],
                });
              } else {
                setFilters({
                  ...filters,
                  age: filters.age.filter(
                    (ageValue) => ageValue !== item.value
                  ),
                });
              }
            }}
            key={item.value}
          >
            {item.name}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};

export default Filters;
