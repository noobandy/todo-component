"use strict";
(function() {
	angular.module("ToDoApp").controller("NavbarController", [function() {
		this.brand = {
			name: "MKCL",
			url:"#/",
			logo: "assets/img/MKCL-Logo.jpg"
		};
		this.menus = [{
			name: "About",
			url: "#/about"
		},{
			name: "Contact",
			url: "#/contact"
		}];
	}]);

	angular.module("ToDoApp").controller("ToDoListController", ["collection", function(collection) {
		
	}]);
})();