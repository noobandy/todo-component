"use strict";
(function() {
	angular.module("mkclCollection",["mkclLocalStorage"]);

	angular.module("mkclCollection").config(["localStorageProvider", function(localStorageProvider) {
		localStorageProvider.setNamespace("db");
	}]);

	angular.module("mkclCollection").factory("collection", ["localStorage", function(localStorage) {
				
		function collection(name, persistent) {
			var items = [];
			var nextId = 1;
			//helper function
			function indexOf(items, id) {
				for(var i = 0; i < items.length; i++) {
					if(items[i].id == id) {
						return i;
					}
				}
				return -1;
			};
			
			if(persistent) {
				items = localStorage.getItem(name);

				if(!items) {
					items = [];
				} 

				nextId = localStorage.getItem("nextId");
				if(!nextId) {
					nextId = 1;
				}

			}

			return {
				list: function() {
					return angular.copy(items);
				},
				add: function(item) {
					item.id = nextId++;
					items.push(item);
					this.sync();
				},
				update: function(item) {
					if(item.id) {
						var index = indexOf(items, item.id);

						if(index > -1) {
							for(var prop in item) {
								items[index][prop] = item[prop];
							}
						}
						this.sync();
					} else {
						this.add(item);
					}
				},
				delete: function(item) {
					if(item.id) {
						
						var index = indexOf(items, item.id);
						if(index > -1) {
							items.splice(index, 1);
						}
						this.sync();
					}
				},
				sync: function() {
					if(persistent) {
						localStorage.setItem(name, items);
						localStorage.setItem("nextId", nextId);
					}
				}
			};
		};

		return collection;
	}]);
})();