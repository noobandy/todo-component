"use strict";

(function() {
	angular.module("ToDoApp").config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
		
		$urlRouterProvider.otherwise("/");

		$stateProvider.state("home", {
			url: "/",
			template: '<todo-list></todo-list>'
		}).state("about", {
			url: "/about",
			templateUrl: "partials/about.html"
		}).state("contact", {
			url: "/contact",
			templateUrl: "partials/contact.html"
		});
	}]);
})();