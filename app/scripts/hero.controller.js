'use strict';

angular.module('heroApp')

.controller('HeroController', function($scope, HeroService, $location){

	$scope.resetForm = function (){
		$scope.newHero = {
			hero_name:'',
			real_name:'',
			gender:'',
			attributes:[],
			powers:[],
			weaknesses:[]
		};
	};

	$scope.getHeroes = function(){
		HeroService.fetch().then(function(result){
			$scope.heroes = (result !== 'null') ? result :{};
		}, function(reason){
			console.log('ERROR', reason);
		});
	};

	$scope.createHero = function(hero){
		HeroService.create(hero.hero_name, hero.real_name, hero.gender, hero.attributes, hero.powers, hero.weaknesses).then(function (result){
			$scope.getHeroes();
			$location.path('/heroes');
		}, function (reason){
			console.log('ERROR', reason);
		});
	};

	$scope.updateHero = function(heroId , hero){
		HeroService.update(heroId , hero.hero_name, hero.real_name, hero.gender, hero.attributes, hero.powers, hero.weaknesses).then(function (result){
			$location.path('/heroes');
		}, function (reason){
			console.log('ERROR', reason);
		});
	};

	$scope.deleteHero = function(heroId){
		HeroService.destroy(heroId).then(function (result){
			$scope.getHeroes();
		}, function (reason){
			console.log('ERROR', reason);
		});
	};

	$scope.createMergedHero = function(hero){
		var mergedWeaknesses = $scope.combinedWeaknesses();
		var mergedPowers = $scope.powersSelected;

		console.log('MergedHero = '+hero.toSource());
		console.log('mergedWeaknesses = '+mergedWeaknesses.toSource());
		console.log('mergedPowers = '+mergedPowers.toSource());

		var mergedPowersArray = [];

		var keys = Object.keys(mergedPowers);
 		for (var i = 0; i < keys.length; i++) {
 			var val = mergedPowers[keys[i]];
 			if(val == true){
 				mergedPowersArray.push(keys[i]);
  			}
    	}

		HeroService.create(hero.hero_name, hero.real_name, hero.gender, hero.attributes, mergedPowersArray, mergedWeaknesses).then(function (result){
			$scope.getHeroes();
			$location.path('/heroes');
		}, function (reason){
			console.log('ERROR', reason);
		});
	};


	$scope.getHeroes();

	//Remove only for form testing
	$scope.newHero = {};

	$scope.getOptions = function () {
		var i, totalOptions = 100, res = [];
		
		for (i = 1; i <= totalOptions; i++) {
			res.push(i);
		}

		return res;
  	};

  	$scope.hero1={};
  	$scope.hero2={};

  	$scope.combinedWeaknesses = function(){
  		var combined = '';
  		var hero1Weaknesses = $scope.hero1.weaknesses;
  		var hero2Weaknesses = $scope.hero2.weaknesses;

  		if ((typeof hero1Weaknesses == "undefined")&&(typeof hero2Weaknesses == "undefined")){
  			combined ='Choose your heroes';
  		} else if (typeof hero1Weaknesses == "undefined"){
  			combined = hero2Weaknesses +'';
  		} else if (typeof hero2Weaknesses == "undefined"){
  			combined = hero1Weaknesses +'';
  		} else{
  			combined = hero1Weaknesses +', '+ hero2Weaknesses;
  		}

  		var combinedWeaknessArray = combined.split(',');
  		return combinedWeaknessArray;
    };

    $scope.combinedPowers =function(){
  		var combined = [];
		var hero1Powers = $scope.hero1.powers || [];
		var hero2Powers = $scope.hero2.powers || [];
  		
  		if ((typeof hero1Weaknesses == "undefined")&&(typeof hero2Weaknesses == "undefined")){
  			combined = [];
  		} else if (typeof hero1Weaknesses == "undefined"){
  			combined = hero2Powers;
  		} else if (typeof hero2Weaknesses == "undefined"){
  			combined = hero1Powers;
  		} else{
  			combined = hero1Powers.concat(hero2Powers); 
  		}

  		return combined;
  	}

  	$scope.powersSelected ={};

  	$scope.combinedPowers1 ={};

  	$scope.limit = 5;
    $scope.checked = 0;

    $scope.checkChanged = function(power){
    	if($scope.powersSelected[power]){
        	$scope.checked++;	
        } else {
        	$scope.checked--;	
        } 
    }
})
.controller('HeroDetailController', function($scope, HeroService,$routeParams ){
	var heroid = $routeParams.heroId;

	$scope.getHero = function(heroid){
		HeroService.getHero(heroid).then(function(result){
			$scope.hero = (result !== 'null') ? result :{};
			$scope.hero_attribs = $scope.hero.attributes;
	 		$scope.hero_powers = $scope.hero.powers;
	 		$scope.hero_weaknesses = $scope.hero.weaknesses;
		}, function(reason){
			console.log('ERROR', reason);
		});
	};

	$scope.getHero(heroid);
})
;