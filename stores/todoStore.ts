import { ToDo, ToDoList } from "@/models/ToDo";
import { definePersistedStore } from "~/tools/persistedPinia";

export const useTodoStore = definePersistedStore("todos", {
  state: () => ({
    todoLists: new Map<number, ToDoList>(),
    nextListId: 0,
  }),
  getters: {
    getList: (state) => {
      return (listId: number) => {
        if (!state.todoLists.has(listId)) {
          throw new Error(`[ToDos] List with ID ${listId} not found`);
        }
        return state.todoLists.get(listId)!;
      };
    },
  },
  actions: {
    newList(title: string) {
      this.todoLists.set(this.nextListId, {
        id: this.nextListId,
        title: title,
        todos: new Map<number, ToDo>(),
        nextTodoId: 0,
      });
      this.nextListId++;
    },
    editList(listId: number, title: string) {
      this.getList(listId).title = title;
    },
    removeList(listId: number) {
      if (!this.todoLists.delete(listId)) {
        throw new Error(`[ToDos] List with ID ${listId} not found`);
      }
    },
    newTodo(listId: number, title: string) {
      const list = this.getList(listId);
      list.todos.set(list.nextTodoId, {
        id: list.nextTodoId,
        title: title,
        done: false,
        index: list.todos.size,
      });
      list.nextTodoId++;
    },
    editTodo(listId: number, todoId: number, title: string, done: boolean) {
      const list = this.getList(listId);
      if (!list.todos.has(todoId)) {
        throw new Error(
          `[ToDos] ToDo with ID ${todoId} not found in list ${list.title}`
        );
      }
      list.todos.get(todoId)!.title = title;
      list.todos.get(todoId)!.done = done;
    },
    removeTodo(listId: number, todoId: number) {
      const list = this.getList(listId);
      if (!list.todos.delete(todoId)) {
        throw new Error(
          `[ToDos] ToDo with ID ${todoId} not found in list ${list.title}`
        );
      }
    },
    orderTodos(listId: number, todos: ToDo[]) {
      const list = this.getList(listId);
      todos.forEach((todo, index) => {
        if (!list.todos.has(todo.id)) {
          throw new Error(
            `[ToDos] ToDo with ID ${todo.id} not found in list ${list.title}`
          );
        }

        list.todos.get(todo.id)!.index = index;
      });
    },
    removeChecked(listId: number) {
      const list = this.getList(listId);

      for (const todoId of list.todos.keys()) {
        const todo = list.todos.get(todoId)!;
        if (todo.done) {
          list.todos.delete(todoId);
        }
      }
    },
  },
});
