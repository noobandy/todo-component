"use strict";

(function() {

	angular.module("ToDoApp").component("todoList", {
		templateUrl: "components/todo-list/todo-list.html",
		controller: ["collection", function(collection) {

			var ctrl = this;
			var todoTemplate = {
				completed : false
			};

			ctrl.$onInit = function() {
				ctrl.todoCollection = collection("todos");
				ctrl.todos = ctrl.todoCollection.list();
				ctrl.activeFilter = 'all';
				ctrl.now = new Date();
				ctrl.clear();
				/*for(var i = 0; i < ctrl.todos.length; i++) {
					ctrl.to
				}*/
			}
			

			ctrl.clear = function(form) {
				ctrl.todo = angular.copy(todoTemplate);
			}

			ctrl.addTask = function(form) {
				ctrl.todoCollection.add(ctrl.todo);
				ctrl.todos = ctrl.todoCollection.list();
				ctrl.clear(form);
			}

			ctrl.completeTask = function(todo) {
				ctrl.todoCollection.update(todo);
				ctrl.todos = ctrl.todoCollection.list();
			}

			ctrl.changeFilter = function(filterValue) {
				ctrl.activeFilter = filterValue;
			}

			ctrl.filteredCount = function(filterValue) {
				if(filterValue === 'all') {
					return ctrl.todos.length;
				}

				var count = 0;

				for(var i = 0; i < ctrl.todos.length; i++) {
					if(ctrl.todos[i].completed === filterValue) {
						count++;
					}
				}

				return count;
			}

			ctrl.filter = function(value, index, array) {
				if(ctrl.activeFilter == 'all') {
					return true;
				} else {
					return ctrl.activeFilter === value.completed;
				}
			}
			
		}]
	});
})();