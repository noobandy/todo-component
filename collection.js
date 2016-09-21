"use strict";
(function() {
	angular.module("mkclCollection",["mkclLocalStorage"]);

	angular.module("mkclCollection").config(["localStorageProvider", function(localStorageProvider) {
		localStorageProvider.setNamespace("db");
	}]);

	angular.module("mkclCollection").factory("collection", ["localStorage", function(localStorage) {

			function collection(name) {
				//helper function
				function indexOf(items, id) {
					for(var i = 0; i < items.length; i++) {
						if(items[i].id == id) {
							return i;
						}
					}
					return -1;
				};
			
			

				var nextId = localStorage.getItem("nextId");

				if(!nextId) {
					nextId = 1;
				}

				return {
					list: function() {
						var items =  localStorage.getItem(name);
							if(!items) {
								items = [];
							} 

						return items;
					},
					add: function(item) {
						var items = this.list();
						item.id = nextId++;
						items.push(item);

						//save in local storage
						localStorage.setItem(name, items);
						localStorage.setItem("nextId", nextId);
					},
					update: function(item) {
						var items = this.list();
						if(item.id) {
							var index = indexOf(items, item.id);
							if(index > -1) {
								for(var prop in item) {
									items[index][prop] = item[prop];
								}
							}
						} else {
							this.add(item);
						}
							//save in local storage
						localStorage.setItem(name, items);
					},
					delete: function(item) {

						if(item.id) {
							var items = this.list();
							var index = indexOf(items, item.id);
							if(index > -1) {
								items.splice(index, 1);
							}
							//save in local storage
							localStorage.setItem(name, items);
						}
					}
				};
			}

			return collection;
	}]);
})();