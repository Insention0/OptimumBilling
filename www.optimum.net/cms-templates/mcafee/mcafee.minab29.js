/*! optimus v0.1.0 Built at 2023-03-20 14:20 EDT */
var app=angular.module("mcafee",["config","platformPlayer","alertBanner","modal","panel","spinner","oolCookie","lightBox"]);app.controller("McafeeCtrlV2",["$scope","Config","$http","$window","ooluser","$location","User","$rootScope","Cookies",function(a,b,c,d,e,f,g,h,i){function j(){$("#headerNotShown").css({display:"none"}),$("#mega-menu-container").css({display:"none"}),$("#menubutton").css({display:"none"}),$("#menusearch").css({display:"none"})}function k(){$("#headerNotShown").css({display:"block"}),$("#mega-menu-container").css({display:"block"}),$("#menubutton").css({display:"table-cell"}),$("#menusearch").css({display:"table-cell"})}function l(){a.button=c.get(n+"status"+"?randomNum="+(new Date).getTime()).then(function(b){return a.userLogedIn=!0,a.buttonEnabled=!1,a.showErrMsg=!1,a.mcafeeStatus=b.data.status,a.errorCode=b.data.errorCode,"GET_MCAFEE"===a.mcafeeStatus?("/internet/mcafee/mcafee-submit/"===d.location.pathname&&(a.userLogedIn=!0,m()),a.buttonEnabled=!0,$("#download").html("Get Started"),a.managedevicesenabled=!1):"GO_TO_MCAFEE"===a.mcafeeStatus?"OPT-MC-002"===a.errorCode?("/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/"),a.showErrMsg=!0,a.errorMessageConfig.type="minor",a.errorMessageConfig.message="Account Status is 'Disconnect'"):"OPT-MC-000"===a.errorCode?("/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/"),a.buttonEnabled=!0,a.userLogedIn=!1,$("#download").html("Sign in to Get Started")):"OPT-MC-003"===a.errorCode?("/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/"),a.showErrMsg=!0,a.errorMessageConfig.type="minor",a.errorMessageConfig.message="Account Status is 'Service Downgrade'"):(a.buttonEnabled=!0,$("#download").html("Manage Devices"),a.managedevicesenabled=!0,"/internet/mcafee/mcafee-submit/"===d.location.pathname&&(a.userLogedIn=!0,m())):"NOT_ELIGIBLE"===a.mcafeeStatus?("/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/"),"201"===a.errorCode||"204"===a.errorCode?(reporting.setAttrs({prop35:"Non-OOL error"}),reporting.sendAttrs(!0),a.showErrMsg=!0,a.errorMessageConfig.type="major",a.errorMessageConfig.message="Optimum Online service is required to download Optimum Internet Protection.  To become an Optimum Online customer call: 866-200-7092.",$("#download").html("")):"202"===a.errorCode?(a.buttonEnabled=!0,$("#download").html("Get Started")):"150"===a.errorCode?(a.systemFailError=!0,$("#download").html("")):"OPT-MC-001"===a.errorCode?(reporting.setAttrs({prop35:"Non-pay error"}),reporting.sendAttrs(!0),a.showErrMsg=!0,a.errorMessageConfig.type="major",a.errorMessageConfig.message="Your account appears to be past due. <a href='"+a.hostUrl+"/pay-bill' class='inherited' >Click here</a>  to make a payment.  Once complete, please return to this page to download Optimum Internet Protection.",$("#download").html("")):"205"===a.errorCode?(a.showErrMsg=!0,a.errorMessageConfig.type="major",a.errorMessageConfig.message="Account Status is Service Downgrade."):"206"===a.errorCode?(a.showErrMsg=!0,a.errorMessageConfig.type="major",a.errorMessageConfig.message="Account Status is Disconnect."):"OPT-MC-002"===a.errorCode?(a.showErrMsg=!0,a.errorMessageConfig.type="major",a.errorMessageConfig.message="Account Status is 'Disconnect'",$("#download").html("")):"OPT-MC-000"===a.errorCode?(a.buttonEnabled=!0,a.userLogedIn=!1,$("#download").html("Sign in to Get Started")):(a.systemFailError=!0,$("#download").html(""))):("/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/"),a.systemFailError=!0,$("#download").html("")),a.targetUrl=b.data.target,("true"===a.mcafeeRcErr||a.mcafeeRcErr===!0)&&(a.errorMessageConfig.type="major",a.errorMessageConfig.message="Error processing your request.",a.showErrMsg=!0),{text:a.text,enabled:a.buttonEnabled}},function(){"/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/")})}function m(){return a.userLogedIn===!1&&(reporting.trackClick(this,"Internet Security | McAfee | Sign in to Get Started"),d.location="/login/?referer="+d.location.origin+"/internet/mcafee/mcafee-submit/"),"202"===a.errorCode?(reporting.setAttrs({prop35:"No email in CPC error"}),reporting.sendAttrs(!0),"/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/"),a.emailError=!0,!1):("150"===a.errorCode?("/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/"),a.systemFailError=!0,$("#download").html("")):(angular.element("#download").attr("disabled","disabled"),"GET_MCAFEE"===a.mcafeeStatus?reporting.trackClick(this,"Internet Security | McAfee | Get Started"):"GO_TO_MCAFEE"===a.mcafeeStatus&&reporting.trackClick(this,"Internet Security | McAfee | Manage Devices"),c.get(a.targetUrl).success(function(b){"PASS"===b.result&&(angular.element("form#formGetMcafee").attr("action",b.url),angular.element("#SAMLResponse").attr("value",b.samlRequest),angular.element("form#formGetMcafee").submit()),"FAIL"===b.result&&(a.systemFailError=!0,$("#download").html(""),angular.element("#download").removeAttr("disabled"))}).error(function(){angular.element("#download").removeAttr("disabled")})),k(),a.newmcafeeSucs=!1,void 0)}var n=b.getValuesBySelector("endpoint.api.mcafee");a.accountInfoLoaded=!1,a.userLogedIn=e.hasOOLSession,a.isAAIUser=e.hasOOLSession&&e.internet&&"3UP30DWN"===e.internet.entitlement?!0:!1,a.newmcafeeSucs=i.getCookie("newmcafeeSucs"),a.oldmcafeeSucs=i.getCookie("oldmcafeeSucs"),a.mcafeeRcErr=i.getCookie("mcafeeRcErr"),a.inProgress=!0,a.errorMessageConfig={type:"major",message:""},a.mcafeeRcSucs={type:"success",message:"Thank you for your order"};var o=function(b){var c=new Date;c.setTime(c.getTime()+3e4);var d=c.toGMTString();i.setCookie(b,JSON.stringify({isPromoPrd:a.isPromoPrd,isNewOfrPrd:a.isNewOfrPrd}),{expires:d,path:"/"})};a.newmcafeeSucs&&j(),a.emailErrorValueToggle=function(){a.emailError=!1},a.systemFailErrorValueToggle=function(){a.systemFailError=!1},a.managedevicesenabled=!1,a.displayContent=function(){a.displayContentBlock=a.displayContentBlock===!0?!1:!0},a.signin=function(){d.location="/login/?referer="+d.location.origin+"/protect"},a.toggleMcafeeSucs=function(){a.newmcafeeSucs=!1},a.activate=function(){l(),m()},a.activateLater=function(){l(),k(),a.newmcafeeSucs=!1,a.oldmcafeeSucs=!0},a.hostUrl=f.protocol()+"://"+f.host()+(window.location.port?":"+window.location.port:""),e.hasOOLSession?i.getCookie("mcafeeOrderSucs")?(a.mcafeeCustomer=!0,a.accountInfoLoaded=!0,a.newmcafeeSucs||l()):g.getAccountInfo(e.optimumId).success(function(b){var c=b.FastRates;(-1!==c.indexOf("0T")||-1!==c.indexOf("EX")||-1!==c.indexOf("CF")||-1!==c.indexOf("4M"))&&(a.mcafeeCustomer=!0),-1!==c.indexOf("0T")&&-1===c.indexOf("EX")&&(a.promoElgble=!0),a.mcafeeCustomer?(a.accountInfoLoaded=!0,l()):d.location="/upgrades/#/offer/mcafee"}).error(function(){a.accountInfoLoaded=!0}):("/internet/mcafee/mcafee-submit/"===d.location.pathname&&(d.location="/cms-templates/mcafee/"),a.button={enabled:!0},a.buttonEnabled=!0,a.userLogedIn=!1,$("#download").html("Sign in to Get Started")),a.getMcafee=function(){o("mcafeeUpgrade"),d.location="/upgrades/#/checkout/contact-info"}}]),app.controller("McafeeCtrl",function(){}),app.directive("descr",["$timeout",function(a){return{restrict:"C",transclude:!0,template:'<div class="auto-folded" style="display: block;"><div  ng-transclude></div></div>',scope:!0,link:function(b,c){function d(){s=m.wrapInner("<div/>").children(),s.contents().detach().end().append(p.clone(!0)).find("br").replaceWith("<br />").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var b=!1,c=!1;r.afterElement&&(b=r.afterElement.clone(!0),b.show(),r.afterElement.detach()),i(s,q)&&(c=g(s,m,s,q,b)),s.replaceWith(s.contents()),s=null,r.isTruncated=c,a(function(){l.find("a.readmore").css("float","right")})}function e(a){for(var b=a.innerHeight(),c=["paddingTop","paddingBottom"],d=0,e=c.length;e>d;d++){var f=parseInt(a.css(c[d]),10);isNaN(f)&&(f=0),b-=f}return b}function f(a,b){return"string"==typeof a?(a=$(a,b),a.length?a:!1):a.jquery?a:!1}function g(a,b,c,d,e){var f=!1;return a.contents().detach().each(function(){var g=this,j=$(g);return f?!0:(a.append(j),e&&a.append(e),i(c,d)&&3===g.nodeType&&(f=h(j,b,c,d,e)),void 0)}),f}function h(a,b,c,d){for(var e=a[0],f=k(e),g=-1!==f.indexOf(" ")?" ":"　",h="letter"===d.wrap?"":g,l=f.split(h),m=-1,n=-1,o=0,p=l.length-1;p>=o&&(0!==o||0!==p);){var q=Math.floor((o+p)/2);if(q===n)break;n=q,j(e,l.slice(0,n+1).join(h)+d.ellipsis),i(c,d)?p=n:(m=n,o=n)}return!0}function i(a,b){return a.innerHeight()>b.maxHeight}function j(a,b){a.textContent=b}function k(a){return a.textContent?a.textContent:""}var l=c.children("div").children("div"),m=l;l.find("span").replaceWith(function(){return $(this).contents()});var n={after:"a.readmore"},o={ellipsis:"...",wrap:"word",lastCharacter:{},after:null},p=l.contents(),q=$.extend(!0,{},o,n),r={},s=null;r.afterElement=f(q.after,m),r.isTruncated=!1,a(function(){if(l.outerHeight()>45){console.log("elem:"+l+"->"+l.outerHeight()+","+l.innerHeight()+":"+e(l)),l.addClass("setHeight");var a="Read more";l.append('<a class="more-link readmore">'+a+'<i class="icon-caret-down"></i></a>'),p=l.contents(),b.prevContent=l.contents()[0].textContent,r.afterElement=f(q.after,m)}q.maxHeight=e(m),d()},1e3),l.on("click",".readmore",function(){-1!==l.find("a").text().indexOf("Read more")?(l[0].childNodes[0].textContent=b.prevContent,l.css("height","auto"),l.removeClass("setHeight"),l.find("a.readmore").text("  Read less"),l.find("a.readmore").addClass("readless"),l.find("a.readmore").append('<i class="icon-caret-up"></i>')):(l.css("height",q.maxHeight),l.addClass("setHeight"),l.find("a.readmore").text("  Read more"),l.find("a.readmore").append('<i class="icon-caret-down"></i>'),l.find("a.readmore").removeClass("readless"),d())})}}}]);