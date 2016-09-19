"use strict";
(function() {
	angular.module("mkclNavbar", []);

	angular.module("mkclNavbar").component("navbar", {
		bindings: {
			brand: '<',
			menus: "<",
			inverse: "<?inverse"
		},
		templateUrl: "components/navbar/navbar.html",
		controller : function() {
			var ctrl = this;

			ctrl.onMenuClick = function(menu) {
				ctrl.activeMenu = menu;
			}
		}
	});
})();