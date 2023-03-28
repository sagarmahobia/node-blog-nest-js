import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

//no cache
@Controller("todo")
export class TodoController {
  todos: { id, title, completed }[] = [
    { id: 1, title: "Todo 1", completed: false },
    { id: 2, title: "Todo 2", completed: false },
    { id: 3, title: "Todo 3", completed: false },
    { id: 4, title: "Todo 4", completed: false }
  ];

  lastId: number = this.todos.length;


  // GET //todo item

  @Get("/")
  listTodos() {
    return { message: "Todo list", status: true, data: this.todos };
  }

  @Get("/:id")
  getTodoById(@Param("id") id: string) {

    let find = this.todos.find(todo => todo.id.toString() === id);
    if (!find) {
      return {
        message: "Todo not found",
        status: false
      };
    }
    return { message: "Todo found", status: true, data: find };

  }

  // post  createTodo with json body
  @Post("/")
  createTodo(@Body() body) {

    let { title, completed } = body;
    this.lastId = this.lastId + 1;
    let id = this.lastId;
    let todo = { id, title, completed };
    this.todos.push(todo);
    return { message: "Todo created", status: true };
  }


  // put updateTodo with json body
  @Put("/:id")
  updateTodoById(@Param("id") id: string, @Body() body) {
    let { title, completed } = body;
    let find = this.todos.find(todo => todo.id.toString() === id);
    if (!find) {
      return {
        message: "Todo not found",
        status: false
      };
    }
    find.title = title;
    find.completed = completed;
    return { message: "Todo updated", status: true };
  }

  @Put("/complete/:id")
  completeTodoById(@Param("id") id: string) {
    let find = this.todos.find(todo => todo.id.toString() === id);
    if (!find) {
      return {
        message: "Todo not found",
        status: false
      };
    }
    find.completed = true;
    return { message: "Todo completed", status: true };
  }

  @Delete("/:id")
  deleteTodoById(@Param("id") id: string) {
    let find = this.todos.find(todo => todo.id.toString() === id);
    if (!find) {
      return {
        message: "Todo not found",
        status: false
      };
    }
    this.todos = this.todos.filter(todo => todo.id.toString() !== id);
    return { message: "Todo deleted", status: true };
  }

}
