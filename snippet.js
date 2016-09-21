
var ctrl = this;
		ctrl.todo = {
			task: "some task",
			dueDate: new Date()
		};

		ctrl.todos = collection("todos", true);

		//list
		ctrl.todoList = ctrl.todos.list();

		console.log(ctrl.todoList);
		//add
		ctrl.todos.add(ctrl.todo);

		ctrl.todoList = ctrl.todos.list();

		console.log(ctrl.todoList);

		ctrl.todo.completedAt = new Date();
		//update
		ctrl.todos.update(ctrl.todo);

		ctrl.todoList = ctrl.todos.list();

		console.log(ctrl.todoList);

		//delete
		ctrl.todos.delete(ctrl.todo);

		ctrl.todoList = ctrl.todos.list();

		console.log(ctrl.todoList);