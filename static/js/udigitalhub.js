
/* Hotjar Tracking Code for https://udigitalhub.ga */
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1477358,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

<!-- Quantcast Choice. Consent Manager Tag -->
var elem = document.createElement('script');
elem.src = 'https://quantcast.mgr.consensu.org/cmp.js';
elem.async = true;
elem.type = "text/javascript";
var scpt = document.getElementsByTagName('script')[0];
scpt.parentNode.insertBefore(elem, scpt);
(function() {
    var gdprAppliesGlobally = false;
    function addFrame() {
        if (!window.frames['__cmpLocator']) {
            if (document.body) {
                var body = document.body,
                    iframe = document.createElement('iframe');
                iframe.style = 'display:none';
                iframe.name = '__cmpLocator';
                body.appendChild(iframe);
            } else {
                // In the case where this stub is located in the head,
                // this allows us to inject the iframe more quickly than
                // relying on DOMContentLoaded or other events.
                setTimeout(addFrame, 5);
            }
        }
    }
    addFrame();
    function cmpMsgHandler(event) {
        var msgIsString = typeof event.data === "string";
        var json;
        if(msgIsString) {
            json = event.data.indexOf("__cmpCall") != -1 ? JSON.parse(event.data) : {};
        } else {
            json = event.data;
        }
        if (json.__cmpCall) {
            var i = json.__cmpCall;
            window.__cmp(i.command, i.parameter, function(retValue, success) {
                var returnMsg = {"__cmpReturn": {
                        "returnValue": retValue,
                        "success": success,
                        "callId": i.callId
                    }};
                event.source.postMessage(msgIsString ?
                    JSON.stringify(returnMsg) : returnMsg, '*');
            });
        }
    }
    window.__cmp = function (c) {
        var b = arguments;
        if (!b.length) {
            return __cmp.a;
        }
        else if (b[0] === 'ping') {
            b[2]({"gdprAppliesGlobally": gdprAppliesGlobally,
                "cmpLoaded": false}, true);
        } else if (c == '__cmp')
            return false;
        else {
            if (typeof __cmp.a === 'undefined') {
                __cmp.a = [];
            }
            __cmp.a.push([].slice.apply(b));
        }
    }
    window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
    window.__cmp.msgHandler = cmpMsgHandler;
    if (window.addEventListener) {
        window.addEventListener('message', cmpMsgHandler, false);
    }
    else {
        window.attachEvent('onmessage', cmpMsgHandler);
    }
})();

window.__cmp('init', {
    'Language': cmp_lang,
    //'Initial Screen Reject Button Text': 'I DO NOT ACCEPT',
    //'Initial Screen Accept Button Text': 'I ACCEPT',
    //'Purpose Screen Body Text': 'You can set your consent preferences and determine how you want your data to be used based on the purposes below. You may set your preferences for us independently from those of third-party partners. Each purpose has a description so that you know how we and partners use your data.',
    //'Purpose Screen Vendor Link Text': 'See Vendors',
    //'Purpose Screen Save and Exit Button Text': 'SAVE &amp; EXIT',
    //'Vendor Screen Body Text': 'You can set consent preferences for individual third-party partners we work with below. Expand each company list item to see what purposes they use data for to help make your choices. In some cases, companies may use your data without asking for your consent, based on their legitimate interests. You can click on their privacy policy links for more information and to object to such processing. ',
    //'Vendor Screen Accept All Button Text': 'ACCEPT ALL',
    //'Vendor Screen Reject All Button Text': 'REJECT ALL',
    //'Vendor Screen Purposes Link Text': 'Back to Purposes',
    //'Vendor Screen Save and Exit Button Text': 'SAVE &amp; EXIT',
    //'Initial Screen Body Text': 'We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site. ',
    'Initial Screen Body Text Option': 1,
    'Consent Scope': 'service',
    'Publisher Purpose IDs': [1,2,3,4,5],
    'Publisher Purpose Legitimate Interest IDs': [1,2,3,4,5],
    'Publisher Name': 'udigitalhub',
    'Publisher Logo': '/static/images/logo.png',
    'Display Persistent Consent Link': false
    //'UI Layout': 'banner',
});

__cmp('setConsentUiCallback', function (consent, isSuccess){

    //console.log(consent);
    //console.log(consent['uiShown']);

    if(consent['uiShown'] === false){
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
    let params = {}
    for(let entry of entries) { // each 'entry' is a [key, value] tupple
        const [key, value] = entry;
        params[key] = value;
    }

    if(Object.keys(params).length === 0){
        return;
    }

    let payload = {
        "consent" : '',
        "params" : params,
    };

    $.ajax({
        url: "/store-consent",
        type: "POST",
        data:  JSON.stringify(payload),
        contentType : 'application/json',
        headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
        cache: false,
        success: function(data) {
            if(data.status === "success"){

            }
        },
        error: function(data) {
            console.log("Error: "+JSON.stringify(data));
        }
    });
});


function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return letter.toUpperCase();
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
