angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItems);//should disply found list
function FoundItems(){
   var ddo={
    templateUrl:'foundItems.html',
    scope:{
      items: '<',
      onRemove: '&'
    }
     controller: FoundItemsController,
        controllerAs: 'ctrl',
        bindToController: true
  };
  return ddo;
}

NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService)
{
 var menu = this;
 menu.getMatchedMenuItems=function(searchTerm){
  var promise=MenuSearchService.getMatchedMenuItems(menu.searchTerm);
  promise.then( function(response){
    console.log(response);
    menu.found=response;
    console.log(menu.found);
  });

};
menu.removeitem=function(index){
menu.found.splice(index,1);
};
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
var service = this;
service.getMatchedMenuItems = function (searchTerm) {
  return $http({method:"GET", url: ("https://davids-restaurant.herokuapp.com/menu_items.json")})
  .then(function(response){
    var menu=response.data;
    var foundItems1=[];
    console.log(menu.menu_items.length);
    console.log(searchTerm);
    for(var i=0;i<menu.menu_items.length;i++){
      
      if((searchTerm!= null) && (searchTerm!=" ") && (menu.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1))
      {
        console.log(menu.menu_items[i].description.toLowerCase());
        console.log(searchTerm.toLowerCase());
        foundItems1.push(menu.menu_items[i]);
      }
  }
  console.log(foundItems1);
  return foundItems1;
  })
  .catch(function(error){
    console.log("Something went terribly wrong.");
  });
  
  };

}
