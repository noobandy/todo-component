"use strict";
(function(ls) {
	angular.module("mkclLocalStorage", []);

	angular.module("mkclLocalStorage").provider("localStorage", function() {

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
})(window.localStorage);