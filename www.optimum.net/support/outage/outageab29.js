
var outageNotify = angular.module('outage', ['config', 'drawer', 'outageService', 'alertsService', 'alertBanner', 'ctaArrowLink','ngSanitize', 'onetCookies']);
  outageNotify.controller('OutageCtrl', ['Outage', 'Alerts', '$rootScope','$scope','$location', 'Cookies', 'ooluser', '$http','Config','$window',
function (Outage, Alerts, $rootScope,$scope,$location, Cookies, ooluser, $http, Config,$window,$routeProvider) {

	Alerts.getCombinedAlertsAndOutageLink().then(function(alerts_and_outage) {
		var outage_link = alerts_and_outage.outage_link;
		var current_link = $window.location.pathname + $window.location.hash;
		if(outage_link.indexOf("/support/outage/#/") === 0 && outage_link !== current_link) {
			$window.location.href = outage_link;
		}
	});
    $scope.allOk = true;
    $scope.notAuthIcon = true;
    $scope.outageIcon="";
    $scope.ooluser=ooluser;
    $scope.outageMessage="";
    $scope.primaryNonPayMsg="";
    $scope.secondaryNonPayMsg="";
    $scope.expectedOutageTime="Not available";
    $scope.declaredOutageOrNotColor="primary";
    $scope.labox = ooluser.hasOOLSession ? ooluser.laBoxUser : (Cookies.getCookie("labox") === 'true');
    $scope.imageBaseURL = Config.getValuesBySelector("link.cdn.images")+ '/';
	$scope.plannedMaintenanceIcon= $scope.imageBaseURL + "icon_cone.png";
	$scope.nodeInDistressIcon= $scope.imageBaseURL + "icon_node.png";
	$scope.refererStr = '?referer=' + escape(window.location.href);
	var mapUrl = 'https://www.optimum.com/outage-map';
	$scope.mapURL = mapUrl;
	$scope.outageMapLink = '<a href="' + mapUrl+ '" class="primary cta-link" target="_blank" style="font-size:15px; color:#fff;">View the outage map</a> <span><i class="icon-arrow-right" style="background-color:#FFF; color: #D6091A; border-radius:8px; padding:3px; font-size:12px;"></i></span>';
	$(document).ready(function ()
	{

		$scope.displayNextButton = false;
	});
	$scope.reportSymp = function() {
		$scope.displayNextButton = true;
	};
	$scope.selectedTroubleshoot = function() {

		$window.location = "/support/troubleshoot/";

	};
	var chatLink = Config.getValuesBySelector('link.supportLiveChat');
	var twitterLink = Config.getValuesBySelector('link.twitterURL');
	$scope.onLiveChat = function() {
		$window.location = chatLink;
	};
	//Email is removed from the site
	$scope.onEmailUs = function() {
		//$window.location = "http://optimum.custhelp.com/app/ask";
		$window.location = chatLink;
	};
	$scope.onCallUs = function() {
		$window.location = "/support/phone-list/";
	};

	$scope.onTweetUs = function() {
		$window.location = twitterLink;
	};
	$scope.billPay = function() {
		window.event.returnValue = false; //adding this line as IE 9 does not redirect without this.
		$window.location = "/pay-bill/payment-options/";
	};

	$(".sympChk").live(
			"click",
			function() {
					$(".sympChk").attr('disabled', false);
					$(".sympChk").each(function() {
						if ($(this).hasClass("is-checked")) {
							$scope.displayNextButton = true;
							return false;
						} else {
							$scope.displayNextButton = false;
						}
						/* not-checked */
					});

			});

	$(".sympChk").live("click", function(){
		if($(".sympChk").first().hasClass("is-checked")){
			$(".sympChk").attr('disabled', true);
			$(".sympChk").each(function() {
				$(this).removeClass("is-checked");
			});
			$(".sympChk").first().addClass("is-checked").attr('disabled', false);
		}
		else {
			$(".sympChk").attr('disabled', false);
		}
	});

	$scope.selectedDeclaredOutageSC = function(value){
			selectedSymptoms='N/A';
			selectedServices='N/A';
		Outage.logNotificationData(selectedSymptoms, selectedServices,value).then(function(response){
			if(value)
			{
				$window.location = "/support/outage/#/DeclaredOutageSC";
			}
		else
			{
				//$window.location = "http://optimum.custhelp.com/app/ask";
				$window.location = chatLink;
			}

		},function(response){
			if(value)
			{
				$window.location = "/support/outage/#/DeclaredOutageSC";
			}
		else
			{
				//$window.location = "http://optimum.custhelp.com/app/ask";
				$window.location = chatLink;
			}
		});



	};

	$scope.selectedplannedNodeInDistressSymptoms = function(value){
		$scope.symptomsSelectedList="";
		$scope.selectedService="";
		$(".sympChk").each(function(){
			if($(this).hasClass("is-checked")){
				if($scope.selectedService.indexOf("All")===0)
				{
					//dont populate list if checkbox for all services is selected
				}
				else if($scope.selectedService==="")
				{
					$scope.selectedService=$scope.selectedService +$(this).attr("id");
					$scope.symptomsSelectedList=$scope.symptomsSelectedList + $('#'+ $(this).attr("id") + 'Text').text();
				}
				else
				{
					$scope.selectedService=$scope.selectedService +" , "+$(this).attr("id");
					$scope.symptomsSelectedList=$scope.symptomsSelectedList + " , "+ $('#'+ $(this).attr("id") + 'Text').text();
				}

			}
		});
		var currentLocation= $(location).attr('href');
		//console.log("currentLocation "+currentLocation);
		if(currentLocation.indexOf("/NodeInDistress")===-1)
		{
				$scope.outageIcon=$scope.plannedMaintenanceIcon;
				$window.location = "/support/outage/#/plannedNodeInDistressSymptomsSub";//for going to symptom submit page on button
		}
		else
		{
				$scope.outageIcon=$scope.nodeInDistressIcon;
				$window.location = "/support/outage/#/NodeInDistressSymptomsSub";//for going to symptom submit page on button
		}
		$scope.displayNextButton = false;
		Outage.logNotificationData($scope.symptomsSelectedList, $scope.selectedService,"N/A");

	};

        $scope.processedOutage = Outage.getProcessedOutagePromise();
        var bannerTypeMapping = {
          RECENTLY_CLEARED: 'primary',
          OFFLINE: 'primary',
          OUTAGE_ON_ACCOUNT: 'major',
          NO_OUTAGE: 'primary',
          'USER NOT LOGGED IN': 'primary',
          PLANNED_MAINTENANCE:'primary',
          NODE_DISTRESS:'primary',
          ERROR: 'primary' // Uncertain. Avoid scaring people?s
        };
        $scope.outageAlertConfig = $scope.processedOutage.then(function(processedOutage) {
        $scope.outageMessage=processedOutage.outageMessage;
        $scope.allOkMessage="Your service is up and running.";
        $scope.actionText ="Our technical teams are working to resolve the issue and we will have service restored as soon as possible. We'll keep you posted on our progress. Thanks for your patience.";
        if(null!==$scope.outageMessage && ""!==$scope.outageMessage)
        {
         $scope.actionText=$scope.outageMessage;
         $scope.allOkMessage=$scope.outageMessage;
        }
        var status=processedOutage.outageStatus;
        if(processedOutage.outageStatus!==undefined)
        {
            status=processedOutage.outageStatus.toUpperCase();

            $scope.outageIcon=Outage.outageIcon(status);
            //console.log("outageIcon "+$scope.outageIcon);
            if('User not logged in'!==status && processedOutage.accountSummary!=null)
            {


             if(processedOutage.accountSummary.accountPaymentStatus==='NON_PAY')
              {
                status='NON_PAY';
              }
             else if(processedOutage.accountSummary.serviceOutageReported && 'RECENTLY_CLEARED'!==status)
             {
                status='OUTAGE_ON_ACCOUNT';
             }
              else if(processedOutage.accountSummary.accountPaymentStatus==='VOD_HOLD')
              {
                 status='VOD_HOLD';
              }
              else if( processedOutage.accountSummary.plannedMaintenance && processedOutage.accountSummary.nodeInDistress && processedOutage.accountSummary.devicesOffline)
              {
                  status='PLANNED_MAINTENANCE';
              }
              else if(  processedOutage.accountSummary.plannedMaintenance && !processedOutage.accountSummary.nodeInDistress && processedOutage.accountSummary.devicesOffline)
              {
                  status='PLANNED_MAINTENANCE';
              }
              else if( !processedOutage.accountSummary.plannedMaintenance && processedOutage.accountSummary.nodeInDistress && processedOutage.accountSummary.devicesOffline)
              {
                  status='OFFLINE';
              }
              else if(  !processedOutage.accountSummary.plannedMaintenance && !processedOutage.accountSummary.nodeInDistress && processedOutage.accountSummary.devicesOffline)
              {
                  status='OFFLINE';
              }
              else if(  processedOutage.accountSummary.plannedMaintenance && processedOutage.accountSummary.nodeInDistress && !processedOutage.accountSummary.devicesOffline)
              {
                  status='PLANNED_MAINTENANCE';
              }

              else if(  !processedOutage.accountSummary.plannedMaintenance && processedOutage.accountSummary.nodeInDistress && !processedOutage.accountSummary.devicesOffline)
              {
                  status='NODE_DISTRESS';
              }
              else if( !processedOutage.accountSummary.nodeInDistress && !processedOutage.accountSummary.devicesOffline && processedOutage.accountSummary.plannedMaintenance )
              {
                  status='PLANNED_MAINTENANCE';
              }

            }
            if(!processedOutage.accountSummary.serviceOutageReported ||(processedOutage.accountSummary.serviceOutageReported && processedOutage.outageStatus ==="RECENTLY_CLEARED"))
            {
              if(processedOutage.accountSummary!=null && (!processedOutage.accountSummary.nodeInDistress && !processedOutage.accountSummary.devicesOffline && processedOutage.accountSummary.plannedMaintenance))
              {
                 $scope.outageIcon=$scope.plannedMaintenanceIcon;
              }
               else if (processedOutage.accountSummary!=null && ( processedOutage.accountSummary.nodeInDistress && !processedOutage.accountSummary.devicesOffline && !processedOutage.accountSummary.plannedMaintenance))
               {
                $scope.outageIcon=$scope.nodeInDistressIcon;
                }
            }
            if(processedOutage.plannedMaintenance!=null)
            {
              var start = moment(processedOutage.plannedMaintenance.startTime,'YYYY-MM-DD hh:mm:ss');
              startDate = start.format('MMMM Do, h:mm A');
              var end = moment(processedOutage.plannedMaintenance.endTime,'YYYY-MM-DD hh:mm:ss');
              endDate = end.format('MMMM Do, h:mm A');
              $scope.expectedOutageTime = startDate+' to '+endDate;
            }
        }
          return ({
            type: bannerTypeMapping[status],
            img: $scope.outageIcon,
            message: Outage.outageCopy('banner', status)
          });
        });
        $scope.isStatusOneOf = function() {
          return false; // Don't display anything until service returns.
        };
        $scope.processedOutage.then(function(result) {
          $scope.isStatusOneOf = function() {
            // Returns whether one of its arguments is the current status
            return _.contains(arguments, result.outageStatus);
          };
        });
        var currentBlurb = "";
        $scope.blurb = function(blurb) {
            if(blurb === currentBlurb) {
                delete $scope.blurb[blurb];
                currentBlurb = "";
            } else {
                delete $scope.blurb[currentBlurb];
                $scope.blurb[blurb] = true;
                currentBlurb = blurb;
            }
        };

        var makeBlurbFunction = function(closed, open) {
          // Makes a function that takes an argument, the blurb name, and returns one value if the blurb is closed, and the other if the blurb is open
          // makeBlurbFunction :: (a, a) -> (String -> a)
          return function(blurb) {
            if($scope.blurb[blurb]) {
              return open;
            } else {
              return closed;
            }
          };
        };

				$scope.icon = makeBlurbFunction("icon-caret-down boxy-icon tips-icon-padding", "icon-caret-up boxy-icon tips-icon-padding");
        $scope.class_ = makeBlurbFunction("primary", "secondary");

  }]);


outageNotify.config([ '$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$routeProvider.when('/DeclaredOutageSC', {
		templateUrl : 'templates/declaredOutageSC.html',
		controller : 'DeclaredOutageSCCtrl'
	}).when('/PmKnownOutage', {
		templateUrl : 'templates/declaredOutage.html',
		controller : 'DeclaredOutageCtrl'
	}).when('/PmModemsOnline', {
		templateUrl : 'templates/pmModemsOnline.html',
		controller : 'PlannedMaintenanceCtrl'
	}).when('/NodeInDistressSymptomsSub', {
		templateUrl : 'templates/declaredOutageSC.html',
		controller : 'NodeInDistressSymptomsSubCtrl'
	}).when('/PmNodeInDistress', {
		templateUrl : 'templates/pmNodeInDistress.html',
		controller : 'PlannedMaintenanceCtrl'
	}).when('/PendingNonPayVOD', {
		templateUrl : 'templates/pmRfOutageModemsOnline.html',
		controller : 'PendingNonPayVODCtrl'
	}).when('/PendingVOD', {
		templateUrl : 'templates/pmRfOutageModemsOnline.html',
		controller : 'PendingVODCtrl'
	}).when('/plannedNodeInDistressSymptomsSub', {
		templateUrl : 'templates/declaredOutageSC.html',
		controller : 'plannedNodeInDistressSymptomsSubCtrl'
	}).when('/NodeInDistress', {
		templateUrl : 'templates/pmKnownOutage.html',
		controller : 'plannedNodeInDistressSymptomsSubCtrl'
	}).when('/UndeclaredOutage', {
		templateUrl : 'templates/undeclaredOutage.html',
		controller : 'DeclaredOutageCtrl'
	}).when('/UnauthenticatedUserOutage', {
		templateUrl : 'templates/pmModemsOnline.html',
		controller : 'UnauthenticatedUserOutageCtrl'
	}).when('/NoServiceStatus', {
		templateUrl : 'templates/pmModemsOnline.html',
		controller : 'NoServiceStatusCtrl'
	});
	$locationProvider.html5Mode(false);
} ]);

outageNotify.controller('PendingNonPayVODCtrl', ['$scope','Config', function($scope,Config) {
    $scope.imageBaseURL = Config.getValuesBySelector("link.cdn.images")+ '/';
    $scope.pendingBillColor="alert";
    $scope.primaryNonPayMsg="Your service has been interrupted and is scheduled to be disconnected because your account is past due.";
    $scope.secondaryNonPayMsg="To restore your service and avoid disconnection, you need to pay your account balance.";
}]);
outageNotify.controller('PendingVODCtrl', ['$scope','Config', function($scope,Config) {
	$scope.imageBaseURL = Config.getValuesBySelector("link.cdn.images")+ '/';
    $scope.pendingBillColor="secondary";
    $scope.primaryNonPayMsg="You no longer have access to Pay Per View and On Demand services because your account is past due.";
    $scope.secondaryNonPayMsg="To restore access to these services you need to pay your account balance.";
}]);
outageNotify.controller('DeclaredOutageCtrl', ['$scope','Config', function($scope,Config) {

	$scope.imageBaseURL = Config.getValuesBySelector("link.cdn.images")+ '/';
	$scope.message = "We're aware of an outage in your area that may be affecting your service.";
	$scope.noBGClass = 'otg-no-bg';
	$scope.otgImgClass = 'otg-image-icon';
}]);
outageNotify.controller('UnauthenticatedUserOutageCtrl',  ['$scope','Config', function($scope,Config) {

	$scope.imageBaseURL = Config.getValuesBySelector("link.cdn.images")+ '/';
	$scope.message = '<a href="/login/' + $scope.refererStr + '" style="color: #fff; text-decoration:underline;">Sign in</a> to check your service status';
	$scope.allOk = false;
	$scope.notAuthIcon = false;

}]);
outageNotify.controller('NoServiceStatusCtrl',  ['$scope','Config', function($scope,Config) {

	$scope.imageBaseURL = Config.getValuesBySelector("link.cdn.images")+ '/';
	$scope.message = 'Your service status is not available at this time. Please try again later.';
	$scope.notAuthIcon = false;
	$scope.allOk = false;

}]);
outageNotify.controller('PlannedMaintenanceCtrl',  ['$scope','Config', function($scope,Config) {
    $scope.imageBaseURL = Config.getValuesBySelector("link.cdn.images")+ '/';
	if($scope.outageIcon===$scope.plannedMaintenanceIcon)
	{
		$scope.message = "We're doing some maintenance in your area that may be causing brief service interruptions.";
	}
	else
	{
		$scope.message = 'There are no outages reported at this time.';
	}
	$scope.noBGClass = 'otg-no-bg';
	$scope.otgImgClass = 'otg-image-icon';
}]);

outageNotify.controller('NodeInDistressCtrl', function($scope) {

	$scope.message = 'This is Show orders screen';

});
outageNotify.controller(
				'DeclaredOutageSCCtrl',
				function($scope) {
					$scope.myValue = false;
					$scope.exclamationText = "We're aware of an outage in your area that may be affecting your service.";
					$scope.detailNotificationText = "Our technical teams are working to resolve the issue and we will have service restored as soon as possible. We'll keep you posted on our progress. Thanks for your patience. ";
					$scope.grayDivTextOne = 'Thanks for letting us know. We appreciate your patience.';
					$scope.grayDivTextTwo = '';
					$scope.declaredOutageOrNotColor="alert";
				});
outageNotify.controller(
				'NodeInDistressSymptomsSubCtrl',
				function($scope) {
					$scope.myValue = true;
					$scope.exclamationText = "We're aware you may be experiencing brief service interruptions.";
					$scope.boldNotificationText = "We're aware you may be experiencing brief service interruptions.";
					$scope.actionText = "Our technical teams are working on it right now and will fix the issue as soon as possible. We'll keep you posted on our progress. Thanks for your patience.";
					$scope.grayDivTextOne = '';
					$scope.grayDivTextTwo = 'We expect to complete our work and have your service fully restored during the estimated timeframe below.';
					$scope.TimeText = 'Estimated timeframe:';
					$scope.outageMapLink = false;
					$scope.noBGClass = 'otg-no-bg';
					$scope.otgImgClass = 'otg-image-icon';
				});

outageNotify.controller(
				'plannedNodeInDistressSymptomsSubCtrl',
				function($scope) {
					$scope.myValue = true;
					$scope.exclamationText = "We're doing some maintenance in your area that may be affecting your service.";
					$scope.boldNotificationText = "To continue to bring you the best experience with our services, we're doing some routine maintenance in your area.";
					$scope.actionText = 'This may be causing brief interruptions to your service. Our technical teams are working as quickly as possible to complete this work and restore your service. We appreciate your patience. ';
					$scope.grayDivTextOne = '';
					$scope.grayDivTextTwo = 'We expect to complete our work and have your service fully restored during the estimated timeframe below. ';
					$scope.TimeText = 'Estimated timeframe:';
					$scope.outageMapLink = false;
					$scope.noBGClass = 'otg-no-bg';
					$scope.otgImgClass = 'otg-image-icon';
				});


