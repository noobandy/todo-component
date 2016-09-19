"use strict";

(function() {
	angular.module("ToDoApp").config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
		
		$urlRouterProvider.otherwise("/");

		$stateProvider.state("home", {
			url: "/",
			template: '<h4>Home</h4>',
			controller: "ToDoListController"
		}).state("about", {
			url: "/about",
			templateUrl: "partials/about.html"
		}).state("contact", {
			url: "/contact",
			templateUrl: "partials/contact.html"
		});
	}]);
})();