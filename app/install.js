// Initialize variables.
var deferredInstallPrompt = null;
var installButton = document.getElementById('btn_install');
if(installButton) {
  installButton.addEventListener('click', installPWA);
}

// Add event listener for beforeinstallprompt event.
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
  // Add code to save event & show the install button.
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}


function installPWA(evt) {
  // Add code show install prompt, and hide the install button (it can't be called twice).
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute('hidden', true);

  // Log user response to prompt.
  deferredInstallPrompt.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      console.log('[Installation] User accepted the A2HS prompt', choice);
    } else {
      console.log('[Installation] User dismissed the A2HS prompt', choice);
    }
    deferredInstallPrompt = null;
  });
}

// Add event listener for appinstalled event.
window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(evt) {
  // Add code to log the event
  console.log('[Installation] Web Fonts Comparator was installed.', evt);
}