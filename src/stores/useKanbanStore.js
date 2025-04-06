import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useKanbanStore = create(
  persist(
    set => ({
      columns: {
        todo: [],
        inprogress: [],
        done: [],
      },
      addTask: (column, task) =>
        set(({ columns }) => ({
          columns: {
            ...columns,
            [column]: [...columns[column], { id: Date.now(), text: task }],
          },
        })),
      moveTask: (sourceCol, destCol, sourceIdx, destIdx) =>
        set(({ columns }) => {
          const sourceTasks = [...columns[sourceCol]];
          const [moved] = sourceTasks.splice(sourceIdx, 1);
          const destTasks = [...columns[destCol]];
          destTasks.splice(destIdx, 0, moved);

          return {
            columns: {
              ...columns,
              [sourceCol]: sourceTasks,
              [destCol]: destTasks,
            },
          };
        }),

      deleteTask: (id, colId) =>
        set(({ columns }) => ({
          columns: {
            ...columns,
            [colId]: columns[colId].filter(item => item.id !== id),
          },
        })),
    }),
    { name: "kanban-storage" }
  )
);
