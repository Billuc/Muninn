export interface ToDo {
  id: number;
  title: string;
  done: boolean;
}

export interface ToDoList {
  id: number;
  title: string;
  todos: { [id: number]: ToDo };
  nextTodoId: number;
}
