import React, { useState } from "react";

import { Filter as FilterIcon, MenuHorizontal } from "neetoicons";
import { Button, Tag, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import ChangeSourceModal from "./ChangeSourceModal ";
import Filter from "./Filter";
import SearchBar from "./SearchBar";

import { tagsLabelValues, isEmptyOrUndefined } from "../utils";

const Header = ({
  updateQueryParams,
  searchTerm,
  dateFrom,
  dateTo,
  source,
  category,
  totalResults = "10",
}) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [searchKey, setSearchKey] = useState(searchTerm || "");

  const { t } = useTranslation();

  const arr = tagsLabelValues({
    searchTerm,
    dateTo: dateTo || dateFrom,
    source,
    category,
  });

  const handleTagClose = item => {
    if (item.label === "search") {
      updateQueryParams({ searchTerm: "" });
      setSearchKey("");
    }

    if (item.label === "date") {
      updateQueryParams({ dateFrom: null, dateTo: null });
    }

    if (item.label === "source") {
      updateQueryParams({ source: null });
    }

    if (item.label === "category") {
      if (typeof category === "string") {
        updateQueryParams({
          category: null,
        });
      } else {
        updateQueryParams({
          category: category.filter(cat => cat !== item.value),
        });
      }
    }
  };

  const handleClearTag = () => {
    updateQueryParams({
      searchTerm: "",
      dateFrom: null,
      dateTo: null,
      source: null,
      category: null,
    });
    setSearchKey("");
  };

  return (
    <>
      <div className="my-4 flex h-20 items-center justify-between">
        <div className="flex flex-col gap-y-4">
          <div className="container flex items-center gap-x-2">
            <Typography style="h1" weight="bold">
              {t("news.title")}
            </Typography>
            <div className="mt-2 cursor-pointer text-gray-500">
              <MenuHorizontal size="20" onClick={() => setIsOpenModal(true)} />
              <ChangeSourceModal
                {...{ setIsOpenModal, isOpenModal, updateQueryParams }}
              />
            </div>
            <FilterIcon
              className="mt-2 cursor-pointer text-gray-500"
              size="20"
              onClick={() => setIsOpenFilter(true)}
            />
          </div>
          {!isEmptyOrUndefined(arr) && (
            <div className="flex items-center justify-center gap-x-2">
              <Typography className="text-gray-500" style="body1">
                {totalResults} results for :
              </Typography>
              {arr.map(item => {
                const isArray = Array.isArray(item.value);

                return isArray ? (
                  item.value.map(value => (
                    <Tag
                      className="cursor-pointer"
                      key={value}
                      label={value}
                      style="secondary"
                      onClose={() => handleTagClose({ ...item, value })}
                    />
                  ))
                ) : (
                  <Tag
                    className="cursor-pointer"
                    key={item.label}
                    label={item.value}
                    style="secondary"
                    onClose={() => handleTagClose(item)}
                  />
                );
              })}
              <Button
                className="text-gray-500"
                size="small"
                style="text"
                onClick={handleClearTag}
              >
                {t("news.clearAll")}
              </Button>
            </div>
          )}
        </div>
        <SearchBar {...{ updateQueryParams, setSearchKey, searchKey }} />
      </div>
      <Filter
        {...{
          setIsOpenFilter,
          updateQueryParams,
          setSearchKey,
          searchKey,
          isOpenFilter,
          dateFrom,
          dateTo,
        }}
      />
    </>
  );
};
export default Header;
