"use strict";
(function(ls) {
	angular.module("mkclCollection",[]);

	angular.module("mkclCollection").provider("localStorage", function() {

		function LocalStorage(namespace) {
			this.namespace = namespace;
		}

		LocalStorage.prototype.getItem = function(key) {
			
			var itemValueAsString = ls.getItem(this.namespace+"."+key);
			if(itemValueAsString) {
				return JSON.parse(itemValueAsString);
			}
			return itemValueAsString;
		};

		LocalStorage.prototype.setItem = function(key, item) {
			var itemValueAsString = JSON.stringify(item);

			ls.setItem(this.namespace+"."+key, itemValueAsString);

		};
		//default namespace
		this.namespace = "app";

		this.setNamespace = function(namespace) {
			this.namespace = namespace;
		};

		this.$get = function() {
			return new LocalStorage(this.namespace);
		}
	});

	angular.module("mkclCollection").config(["localStorageProvider", function(localStorageProvider) {
		localStorageProvider.setNamespace("collections");
	}]);

	angular.module("mkclCollection").factory("collection", ["localStorage", function(localStorage) {
				
		function collection(name, persistent) {
			var items = [];
			var lastId = 1;
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

				lastId = localStorage.getItem("lastId");
				if(!lastId) {
					lastId = 1;
				}

			}

			return {
				list: function() {
					return angular.copy(items);
				},
				add: function(item) {
					item.id = lastId++;
					items.push(item);
					this.sync();
				},
				update: function(id, changes) {
					var index = indexOf(items, id);
					if(index > -1) {
						for(var prop in changes) {
							items[index][prop] = changes[prop];
						}
					}
					this.sync();
				},
				delete: function(id) {
					var index = indexOf(items, id);
					if(index > -1) {
						items.splice(index, 1);
					}
					this.sync();
				},
				sync: function() {
					if(persistent) {
						localStorage.setItem(name, items);
						localStorage.setItem("lastId", lastId);
					}
				}
			};
		};

		return collection;
	}]);
})(window.localStorage);