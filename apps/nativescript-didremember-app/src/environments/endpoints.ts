import { environment } from "./environment";

export const endpoints = {
  items: {
    todos: `${environment.jsonplaceholder}/todos`,
    todo: `${environment.jsonplaceholder}/todos/:id`,
  },
};
