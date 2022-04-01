
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    // Consume our plugin
    function success(result) {
        alert(result);
    } 

    setTimeout(function() {
        cordova.exec(success, null, "PluginDemo", "coolMethod", [50, 94]);
    }, 10000);
}
