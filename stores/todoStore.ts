import { defineStore } from "pinia";
import { ToDoList } from "@/models/ToDo";
import _ from "lodash";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todoLists: {} as { [key: number]: ToDoList },
    nextListId: 0,
  }),
  getters: {
    getList: (state) => {
      return (listId: number) => {
        if (state.todoLists[listId] === undefined) {
          throw new Error(`[ToDos] List with ID ${listId} not found`);
        }
        return state.todoLists[listId];
      };
    },
  },
  actions: {
    newList(title: string) {
      this.todoLists[this.nextListId] = {
        id: this.nextListId,
        title: title,
        todos: {},
        nextTodoId: 0,
      };
      this.nextListId++;
    },
    editList(listId: number, title: string) {
      this.getList(listId).title = title;
    },
    removeList(listId: number) {
      if (this.todoLists[listId] === undefined) {
        throw new Error(`[ToDos] List with ID ${listId} not found`);
      }
      delete this.todoLists[listId];
    },
    newTodo(listId: number, title: string) {
      const list = this.getList(listId);
      list.todos[list.nextTodoId] = {
        id: list.nextTodoId,
        title: title,
        done: false,
      };
      list.nextTodoId++;
    },
    editTodo(listId: number, todoId: number, title: string, done: boolean) {
      const list = this.getList(listId);
      if (list.todos[todoId] === undefined) {
        throw new Error(
          `[ToDos] ToDo with ID ${todoId} not found in list ${list.title}`
        );
      }
      list.todos[todoId].title = title;
      list.todos[todoId].done = done;
    },
    removeTodo(listId: number, todoId: number) {
      const list = this.getList(listId);
      if (list.todos[todoId] === undefined) {
        throw new Error(
          `[ToDos] ToDo with ID ${todoId} not found in list ${list.title}`
        );
      }
      delete list.todos[todoId];
    },
    removeChecked(listId: number) {
      const list = this.getList(listId);

      for (const todoId of Object.keys(list.todos)) {
        const todoKey = Number(todoId);
        const todo = list.todos[todoKey];
        if (todo.done) {
          delete list.todos[todoKey];
        }
      }
    }
  },
  persist: true,
});
