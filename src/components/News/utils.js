import dayjs from "dayjs";
import { t } from "i18next";
import { either, isEmpty, isNil } from "ramda";

export const convertDate = dateStr => dayjs(dateStr).format("DD MMM YYYY");

export const isEmptyOrUndefined = either(isEmpty, isNil);

export const getNewsCategoryOptions = () => [
  { label: t("categories.business"), value: "business" },
  { label: t("categories.entertainment"), value: "entertainment" },
  { label: t("categories.general"), value: "general" },
  { label: t("categories.health"), value: "health" },
  { label: t("categories.science"), value: "science" },
  { label: t("categories.sports"), value: "sports" },
  { label: t("categories.technology"), value: "technology" },
];

export const getNewsSourceOptions = () => [
  { label: t("sources.bbcNews"), value: "bbc-news" },
  { label: t("sources.theVerge"), value: "the-verge" },
  { label: t("sources.businessInsider"), value: "business-insider" },
  { label: t("sources.time"), value: "time" },
  { label: t("sources.theNextWeb"), value: "the-next-web" },
  { label: t("sources.abcNews"), value: "abc-news" },
  { label: t("sources.engadget"), value: "engadget" },
  {
    label: t("sources.entertainmentWeekly"),
    value: "entertainmentWeekly",
  },
  { label: t("sources.espn"), value: "espn" },
  { label: t("sources.financialPost"), value: "financial-post" },
];

export const fallbackImage = poster => {
  if (poster === "N/A" || isNil(poster)) {
    return DEFAULT_IMAGE;
  }

  return `${poster}`;
};

export const DEFAULT_DESCRIPTION = t("default.description");

export const DEFAULT_TITLE = t("default.title");

export const DEFAULT_AUTHOR = t("default.author");

export const DEFAULT_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBGOs2225fFqTfnl5EKlrEUBn5-drby1x3Q&s";

export const tagsLabelValues = ({ searchTerm, dateTo, source, category }) => {
  const arr = [
    { label: t("tags.search"), value: searchTerm },
    { label: t("tags.date"), value: dateTo },
    { label: t("tags.source"), value: source },
    { label: t("tags.category"), value: category },
  ].filter(
    ({ value }) => value !== null && value !== "" && value !== undefined
  );

  return arr;
};
