MpElDs = {
    "espanol.optimum.com": "es",
    "optimum.com": "en",
    "www.optimum.com": "en",
    "optimum.net": "en",
    "www.optimum.net": "en",
    "espanol.optimum.net": "es",
	"www.optimumbusiness.com": "en",
	"optimumbusiness.com": "en",
	"espanol.optimumbusiness.com": "es",
	"getstarted.optimum.net": "en",
	"freewheelwifi.com": "en",
	"www.freewheelwifi.com": "en",
	"espanol.freewheelwifi.com": "es"
};
if (!RegExp("MP_LANG=" + MpElDs[location.host]).test(document.cookie)) {
    
	if (location.host.toString().indexOf('optimum.com') != -1) {
       MpElD = "//espanol.optimum.com";
    } 
	if  (location.host.toString().indexOf('optimum.net') != -1) {
       MpElD = "//espanol.optimum.net";
    }
	if (location.host.toString().indexOf('optimumbusiness.com') != -1) {
       MpElD = "//espanol.optimumbusiness.com";
	}
	if (location.host.toString().indexOf('freewheelwifi.com') != -1) {
       MpElD = "//espanol.freewheelwifi.com";
	}
    MpL = navigator.browserLanguage;
    if (!MpL) MpL = navigator.language;
    document.write(decodeURIComponent("%3Cscript src='") + MpElD + "/mpel.js?href=" + encodeURIComponent(location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&lang=" + MpL + "' type='text/javascript'" + decodeURIComponent("%3E%3C/script%3E"))
};