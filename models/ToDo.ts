export interface ToDo {
  id: number;
  title: string;
  done: boolean;
  index: number;
}

export interface ToDoList {
  id: number;
  title: string;
  todos: Map<number, ToDo>;
  nextTodoId: number;
}
