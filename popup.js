
var ngApp = angular.module('app', []);

ngApp.controller('myController', function ($scope) {

		// Basic
		$scope.activeTab = 2;
		$scope.version = 1.1;
		$scope.fullName = "Xing Automation"
		$scope.name = "Xing Automation"
		$scope.short_name = "scet";

		// Developer Info
		$scope.developer = {};
		$scope.developer.name = "Ritesh Phogat";
		$scope.developer.github = "https://github.com/ritesh221b";
		$scope.developer.upwork = "https://www.upwork.com/fl/ritesh221b";
		$scope.developer.linkedin = "https://www.linkedin.com/in/ritesh-phogat/";
		$scope.developer.website = "https://foxoyo.com/";
		$scope.developer.facebook = "https://www.facebook.com/foxoyo.phogat.7";
		$scope.developer.mail = "riteshphogat11@gmail.com";

		//Bookmarks
		$scope.bookmarkTitle = "";
		$scope.bookmarkUrl = "";
		$scope.bookmarkList = [];
		chrome.storage.local.get('uhh_',function(fromChromeStorage){
			fromChromeStorage = fromChromeStorage.uhh_;
			$scope.bookmarkList = fromChromeStorage? fromChromeStorage.bookmarkList: [];
			console.log(fromChromeStorage);
		});

		//Page Number
		$scope.pageNumber = 2;

		$scope.freelancer = {}
		$scope.freelancer.settings = {}
		$scope.freelancer.settings.infiniteScroll = true;

		$scope.isClient = false;

		$scope.sendChromeMessage = function (data) {
			chrome.tabs.query({
				currentWindow: true,
				active: true
			}, function (tabs) {
				console.log('Sending Chrome Message');
				chrome.tabs.sendMessage(tabs[0].id, data)
			});
		};

		$scope.saveToChromeStorage = function(data){
			console.log(data);
			chrome.storage.local.set({
				'uhh_': data
			}, function () {
				console.log('Settings updated to chrome storage');
			});
		};

		$scope.saveSettings = function (activeTab) {
			this.activeTab = activeTab ? activeTab : this.activeTab;

			let data = {
				activeTab: this.activeTab,
			}
			console.log(data);
			// this.saveToChromeStorage(data);
		};

		$scope.sendInvite = function(){
			let data = {
				action: 'sendInvite',
			};
			this.sendChromeMessage(data);
		}
		
		$scope.sendInviteForAllPages = function(pageNumber){
			let data = {
				action: 'sendInviteForAllPages',
				pageNumber : pageNumber
			};
			this.sendChromeMessage(data);
		}

		$scope.storeBookmark = function(title,url){
			let data = {
				title:title,
				url:url,
				random : Math.random()
			};
			$scope.bookmarkList.push(data);
			$scope.saveToChromeStorage({bookmarkList:$scope.bookmarkList});
			this.bookmarkTitle = "";
			this.bookmarkUrl = "";
			return $scope.bookmarkList;
		}

		$scope.getBookmarkList = function(){
			console.log($scope.bookmarkList);
			return $scope.bookmarkList;
		}

		$scope.deleteBookmark = function(toDelete){
			let collect = $scope.bookmarkList.filter(function(each){
				return each.random != toDelete;
			});

			$scope.bookmarkList = collect;
			$scope.saveToChromeStorage({bookmarkList:$scope.bookmarkList});
			return collect;
		}

	});

