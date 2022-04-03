
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    // Consume our plugin
    // function success(result) {
    //     alert(result);
    // } 

    // setTimeout(function() {
    //     cordova.exec(success, null, "PluginDemo", "coolMethod", [50, 94]);
    // }, 5000);

    // Consume MSAL Plugin
    // setTimeout(function() {
    //     checkIfPluginLoadedProperly()
    // }, 5000);
    
}

var authButton = document.getElementById('authButton');
var textContainer = document.getElementById('textAreaContainer');
textContainer.style.visibility = "hidden";
authButton.onclick = function() {
    if (authButton.innerHTML == "Login") {
        checkIfPluginLoadedProperly()
    } else {
        signOut();
    }
};

function checkIfPluginLoadedProperly(result) {
        // check if plugin loaded properly
        let isAvailable = typeof(cordova.plugins.msalPlugin) !== "undefined";

        window.cordova.plugins.msalPlugin.msalInit(function() {
            signInSilent();
        },
        function (err) {
            console.log(err);
        });
    }

function signInSilent() {
        window.cordova.plugins.msalPlugin.signInSilent(
        function(resp) {
            // resp is an object containing information about the signed in user, see below.
            alert(resp.token);
            authButton.innerHTML = "Logout"
            textContainer.style.visibility = "visible"
            return;
        }, 
        function(err) {
            // err probably says "No accounts found" but maybe other debugging info
            // Don't show this to the user; just use it for debugging.
            // Here's where you either call the next prompt or wait for the user
            signInInteractive();
        });
}

function signInInteractive() {
    window.cordova.plugins.msalPlugin.signInInteractive(
    function(resp) {
        // resp is an object containing information about the signed in user, see below.
        alert(resp.token);
        authButton.innerHTML = "Logout";
        textContainer.style.visibility = "visible"
        return;
    }, 
    function(err) {
        // Usually if we get an error it just means the user cancelled the
        // signin process and closed the popup window. Handle this however
        // you want, depending again if you want guest access or not.
        alert(err);
        return;
    });
}

function signOut() {
    window.cordova.plugins.msalPlugin.signOut(
    function(msg) {
        // account is an object containing information about the signed in user, see below.
        alert('msg');
        authButton.innerHTML = "Login";
        textContainer.style.visibility = "hidden"

    }, 
    function(err) {
        // An error here usually either means you accidentally tried to
        // sign out someone who wasn't signed in, or there was a problem
        // communicating with the server.
        alert(err);
        return;
    }
);
}
