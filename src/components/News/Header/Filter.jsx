import React, { useState } from "react";

import { Pane, Button, Input, DatePicker, Select } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { getNewsCategoryOptions } from "../utils";

const Filter = ({
  setIsOpenFilter,
  updateQueryParams,
  setSearchKey,
  searchKey,
  isOpenFilter,
  dateFrom,
  dateTo,
}) => {
  const [date, setDate] = useState({
    dateFrom: dateFrom || null,
    dateTo: dateTo || null,
  });

  const [newsCategory, setNewsCategory] = useState([]);

  const newsCategoryOptions = getNewsCategoryOptions();

  const { t } = useTranslation();

  const handleFilter = () => {
    updateQueryParams({
      searchTerm: searchKey,
      dateFrom: date.dateFrom,
      dateTo: date.dateTo,
      category: newsCategory.map(item => item.value),
      source: null,
    });

    handleClose();
  };

  const ClearFilter = () => {
    setSearchKey("");
    setDate({
      dateFrom: null,
      dateTo: "",
    });
    setNewsCategory([]);
  };

  const handleClose = () => {
    setIsOpenFilter(false);
  };

  return (
    <Pane isOpen={isOpenFilter} onClose={() => setIsOpenFilter(false)}>
      <Pane.Header>
        <h2 className="text-xl font-bold">{t("news.filter.title")}</h2>
      </Pane.Header>
      <Pane.Body>
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">
              {t("news.filter.keywordLabel")}
            </label>
            <Input
              required
              className="w-96"
              placeholder={t("news.filter.keyword")}
              value={searchKey}
              onChange={({ target: { value } }) => setSearchKey(value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">
              {t("news.filter.categoryLabel")}
            </label>
            <div className="flex space-x-2">
              <Select
                isClearable
                isMulti
                isSearchable
                className="w-96"
                options={newsCategoryOptions}
                placeholder={t("news.filter.category")}
                value={newsCategory}
                onChange={setNewsCategory}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">
              {t("news.filter.dateFrom")}
            </label>
            <DatePicker
              className="w-96"
              format={t("news.filter.datePlaceholder")}
              maxDate={dayjs()}
              placeholder={t("news.filter.datePlaceholder")}
              value={date.dateFrom}
              onChange={(_, dateStr) =>
                setDate(prev => ({
                  ...prev,
                  dateFrom: dateStr,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">
              {t("news.filter.dateTo")}
            </label>
            <DatePicker
              className="w-96"
              format={t("news.filter.datePlaceholder")}
              maxDate={dayjs()}
              minDate={dayjs(date.dateFrom, t("news.filter.datePlaceholder"))}
              placeholder={t("news.filter.datePlaceholder")}
              value={date.dateTo}
              onChange={(_, dateStr) => {
                setDate(prev => ({
                  ...prev,
                  dateTo: dateStr,
                }));
                console.log(dateStr);
              }}
            />
          </div>
        </div>
      </Pane.Body>
      <Pane.Footer className="flex space-x-2">
        <Button
          label={t("news.filter.done")}
          style="primary"
          onClick={handleFilter}
        />
        <Button
          label={t("news.filter.clear")}
          style="secondary"
          onClick={ClearFilter}
        />
      </Pane.Footer>
    </Pane>
  );
};

export default Filter;
