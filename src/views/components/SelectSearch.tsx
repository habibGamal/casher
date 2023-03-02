import { Select } from "antd";
import React, { useState } from "react";
import Product from "../../app/models/Product";
export type SetOptions = React.Dispatch<
  React.SetStateAction<
    {
      value: string;
      label: string;
    }[]
  >
>;
interface SelectSearchProps {
  onChange?: (value: string) => void;
  placeholder?: React.ReactNode;
  onSearch: (value: string, setOptions: SetOptions) => void;
  style?: React.CSSProperties;
}

export default function SelectSearch({
  onChange,
  onSearch,
  placeholder,
  style
}: SelectSearchProps) {
  const [options, setOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={(value) => onSearch(value, setOptions)}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      style={style}
    />
  );
}
