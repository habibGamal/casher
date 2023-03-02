import { Button, Input, Select } from "antd";
import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

interface TableComponentProps {
  options?:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
  defaultValue?: string | null | undefined;
  addButtonText?: string;
  addButtonAction?: () => void;
  searchButtonAction: () => void;
  setSearch: (value: string) => void;
  setAttribute: (value: string) => void;
  showSearchCancelButton: boolean;
  exitSearchMode: () => void;
}

export default function TableController({
  options,
  defaultValue,
  addButtonText,
  addButtonAction,
  searchButtonAction,
  setSearch,
  setAttribute,
  showSearchCancelButton,
  exitSearchMode,
}: TableComponentProps) {
  return (
    <div className="grid grid-cols-5 2xl:grid-cols-6 gap-6 mb-6">
      <Input placeholder="بحث" onChange={(e) => setSearch(e.target.value)} />
      {options && (
        <Select
          defaultValue={defaultValue}
          onChange={(value) => setAttribute(value)}
          options={options}
        />
      )}
      <Button onClick={searchButtonAction}>بحث</Button>
      {showSearchCancelButton && (
        <Button danger onClick={exitSearchMode}>
          الغاء البحث
        </Button>
      )}
      {addButtonAction && (
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={addButtonAction}
        >
          {" "}
          {addButtonText}{" "}
        </Button>
      )}
    </div>
  );
}
