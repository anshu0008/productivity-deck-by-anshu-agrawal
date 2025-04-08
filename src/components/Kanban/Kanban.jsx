import React, { useRef, useState } from "react";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import classNames from "classnames";
import { useSearchOnFocus } from "hooks/useSearchOnFocus";
import { AddCircle, Delete } from "neetoicons";
import { Button, Input, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useKanbanStore } from "stores/useKanbanStore";

import { formatText } from "./utils";

const Kanban = () => {
  const { columns, addTask, moveTask, deleteTask } = useKanbanStore.pick();

  const [input, setInput] = useState({ todo: "", inprogress: "", done: "" });

  const [isAddTasks, setIsAddTasks] = useState({
    todo: false,
    inprogress: false,
    done: false,
  });

  const { t } = useTranslation();

  const inputRef = useRef(null);
  useSearchOnFocus({ inputRef });

  const handleDragEnd = result => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  return (
    <div className="flex h-full w-full flex-col gap-10 p-7">
      <Typography style="h1" weight="bold">
        {t("kanban.title")}
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid h-full grid-cols-3 gap-4">
          {Object.entries(columns).map(([colId, tasks]) => (
            <div
              className="flex h-full flex-col justify-between rounded-xl border-2 bg-white p-4 shadow"
              key={colId}
            >
              <div>
                <Typography
                  className="mb-2 capitalize"
                  style="h2"
                  weight="bold"
                >
                  {colId}
                </Typography>
                <Droppable droppableId={colId}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="mt-10 max-h-80 overflow-y-scroll rounded bg-gray-50 p-2"
                    >
                      {tasks.map(({ id, text }, index) => (
                        <Draggable
                          draggableId={String(id)}
                          index={index}
                          key={id}
                        >
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 flex h-full w-full items-center justify-between overflow-hidden rounded bg-white px-3 py-2 text-sm shadow"
                            >
                              <Typography
                                className={classNames({
                                  "line-through": colId === "done",
                                })}
                              >
                                {formatText(text)}
                              </Typography>
                              <Button
                                icon={Delete}
                                style="text"
                                onClick={() => deleteTask(id, colId)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                {isAddTasks[colId] && (
                  <Input
                    className="mt-4 w-full px-2 py-1 text-sm"
                    placeholder={t("kanban.placeholder")}
                    ref={inputRef}
                    value={input[colId]}
                    onChange={e =>
                      setInput({ ...input, [colId]: e.target.value })
                    }
                    onKeyDown={({ key }) => {
                      if (key === "Enter" && input[colId].trim()) {
                        addTask(colId, input[colId]);
                        setInput({ ...input, [colId]: "" });
                        setIsAddTasks({ ...isAddTasks, [colId]: false });
                      }
                    }}
                  />
                )}
              </div>
              <Button
                className="flex cursor-pointer items-center justify-center rounded-lg border-2 p-2"
                icon={AddCircle}
                iconPosition="right"
                style="secondary"
                onClick={() =>
                  setIsAddTasks(previous => ({ [colId]: !previous[colId] }))
                }
              >
                {t("kanban.addTask")}
              </Button>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
