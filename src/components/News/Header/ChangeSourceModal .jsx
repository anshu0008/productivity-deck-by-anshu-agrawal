import React, { useState } from "react";

import { Modal, Select, Button, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import { getNewsSourceOptions } from "../utils";

const ChangeSourceModal = ({
  setIsOpenModal,
  isOpenModal,
  updateQueryParams,
}) => {
  const [newsSource, setNewsSource] = useState({});
  const newsSourceOptions = getNewsSourceOptions();

  const { t } = useTranslation();

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleSave = () => {
    updateQueryParams({ source: newsSource.value, category: null });
    handleCancel();
  };

  return (
    <Modal
      closeOnEsc
      closeOnOutsideClick
      isOpen={isOpenModal}
      size="medium"
      onClose={() => setIsOpenModal(false)}
    >
      <Modal.Header>
        <Typography style="h2" weight="bold">
          {t("news.list.changeSource")}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Select
          label={t("news.list.newSource")}
          options={newsSourceOptions}
          placeholder={t("news.list.selectSource")}
          value={newsSource}
          onChange={setNewsSource}
        />
      </Modal.Body>
      <Modal.Footer className="flex justify-start">
        <Button
          label={t("news.list.save")}
          style="primary"
          onClick={handleSave}
        />
        <Button
          label={t("news.list.cancel")}
          style="text"
          onClick={handleCancel}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeSourceModal;
