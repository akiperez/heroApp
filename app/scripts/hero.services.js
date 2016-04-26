'use strict';

angular.module('heroApp')
	.factory('HeroService',function($http,$q){
		var apiKey = '2542dccc'; // To obtain a key, hit https://hero-merge.herokuapp.com/getApiKey. Replace 2542dccc with the key you get from the URL.
		var baseUrl = 'https://hero-merge.herokuapp.com/'+apiKey+'/heroes';

		var fetch = function(){
			var deferred = $q.defer();
			var url = baseUrl;

			$http.get(url).success(deferred.resolve).error(deferred.reject);

			return deferred.promise;

		};

		var getHero = function(heroId){
			var deferred = $q.defer();
			var url = baseUrl+'/'+heroId;
			$http.get(url).success(deferred.resolve).error(deferred.reject);

			return deferred.promise;

		};

		var create = function(hero_name, real_name, gender, attributes, powers, weaknesses){
			var deferred = $q.defer();
			var url = baseUrl;
			var params = {hero_name:hero_name, real_name:real_name, gender:gender, attributes:attributes, powers:powers, weaknesses:weaknesses};

			$http.post(url, params).success(deferred.resolve).error(deferred.reject);

			return deferred.promise;

		};

		var update = function(heroId, hero_name, real_name, gender, attributes, powers, weaknesses){
			var deferred = $q.defer();
			var url = baseUrl+'/'+heroId;
			var params = {hero_name:hero_name, real_name:real_name, gender:gender, attributes:attributes, powers:powers, weaknesses:weaknesses};

			$http.patch(url, params).success(deferred.resolve).error(deferred.reject);

			return deferred.promise;
		};

		var destroy = function(heroId){
			var deferred = $q.defer();
			var url = baseUrl+'/'+heroId;

			$http.delete(url).success(deferred.resolve).error(deferred.reject);

			return deferred.promise;

		};

		return{
			fetch:fetch,
			getHero:getHero,
			create:create,
			update:update,
			destroy:destroy
		};

	});

