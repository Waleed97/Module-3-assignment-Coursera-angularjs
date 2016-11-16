angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItems);//should disply found list
function FoundItems(){
	var ddo={
		templateUrl:'foundItems.html',
		scope:{
			items: '<',
			myTitle: '@title'
		},
		// controller: FoundItemsDirectiveController,
		// controllerAs: 'list',
		// bindToController: true
	};
	return ddo;
}


NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService)
{
 var menu = this;
 var found=[];
menu.getMatchedMenuItems=function(searchTerm){
 menu.found=MenuSearchService.getMatchedMenuItems(menu.searchTerm);
console.log(menu.found);
}
menu.removeitem=function(index){
menu.found.splice(index,1);
}
}
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
var service = this;
service.getMatchedMenuItems = function (searchTerm) {
  return $http({method:"GET", url: ("https://davids-restaurant.herokuapp.com/menu_items.json")})
  .then(function(response){
  	var menu=response.data;
  	var foundItems=[];
  	console.log(menu.menu_items.length);
  	console.log(searchTerm);
  	for(var i=0;i<menu.menu_items.length;i++){
  		
  		if((searchTerm!= null) && (searchTerm!=" ") && (menu.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1))
  		{
  			console.log(menu.menu_items[i].description.toLowerCase());
  			console.log(searchTerm.toLowerCase());
  			foundItems.push(menu.menu_items[i]);
  		}
	}
	console.log(foundItems);
	return foundItems;
	})
	.catch(function(error){
 		console.log("Something went terribly wrong.");
 	});
  
  };

}

function foundItems(foundItems){


}

//getMatchedMenuItems(searchTerm)
//$https to get from server
//return using promise found list[ then function itself returns a promise]
// return $http(...).then(function (result) {
//     // process result and only keep items that match
//     var foundItems...

//     // return processed items
//     return foundItems;
// });