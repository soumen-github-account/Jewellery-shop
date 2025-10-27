// import React, { useEffect, useState } from 'react'

// const AppDownload = () => {
//     const [installPrompt, setInstallPrompt] = useState(null);
//   const [showInstallButton, setShowInstallButton] = useState(false);
//   const [isInstalled, setIsInstalled] = useState(false);

//   useEffect(() => {
//     // 1. Detect if app is already installed
//     const checkInstalled = () => {
//       const isStandalone =
//         window.matchMedia('(display-mode: standalone)').matches ||
//         window.navigator.standalone === true;
//       setIsInstalled(isStandalone);
//     };

//     checkInstalled();

//     // 2. Listen for beforeinstallprompt to show custom button
//     const handleBeforeInstallPrompt = (e) => {
//       e.preventDefault();
//       setInstallPrompt(e);
//       if (!isInstalled) {
//         setShowInstallButton(true);
//       }
//     };

//     // 3. Listen for appinstalled event
//     const handleAppInstalled = () => {
//       console.log('App installed');
//       setIsInstalled(true);
//       setInstallPrompt(null);
//       setShowInstallButton(false);
//     };

//     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//     window.addEventListener('appinstalled', handleAppInstalled);

//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//       window.removeEventListener('appinstalled', handleAppInstalled);
//     };
//   }, [isInstalled]);

//   const handleInstallClick = () => {
//     if (installPrompt) {
//       installPrompt.prompt();
//       installPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the install prompt');
//         } else {
//           console.log('User dismissed the install prompt');
//         }
//         setInstallPrompt(null);
//         setShowInstallButton(false);
//       });
//     }
//   };

//   return !isInstalled && showInstallButton &&  (
//     <div className='flex items-center justify-center py-3'>
//       <div class="bg-white text-sm border border-gray-500/30 p-8 rounded-md m-2 max-w-xl w-full">
//             <p onClick={handleInstallClick} class="font-medium text-blue-600 mb-1 cursor-pointer">Download Now!</p>
//             <h2 class="text-2xl font-semibold text-gray-800">Download our mobile app.</h2>
//             <p class="text-gray-800/80 mt-1">Mobile banking app for IOS & Android to<br />manage your online money.</p>
//             <div class="flex items-center gap-4 mt-6">
//                 <button class="active:scale-95 transition-all" type="button">
//                     <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtnBlack.svg"
//                         alt="googlePlayBtnBlack" />
//                 </button>
//                 <button class="active:scale-95 transition-all" type="button">
//                     <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtnBlack.svg"
//                         alt="appleStoreBtnBlack" />
//                 </button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AppDownload

import React, { useEffect, useState } from 'react';

const AppDownload = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
      setIsInstalled(isStandalone);
    };

    checkInstalled();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      if (!isInstalled) setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('✅ App installed');
      setIsInstalled(true);
      setInstallPrompt(null);
      setShowInstallButton(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Optional: detect display-mode changes dynamically
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e) => setIsInstalled(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isInstalled]);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted the install prompt');
        } else {
          console.log('❌ User dismissed the install prompt');
        }
        setInstallPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    !isInstalled &&
    showInstallButton && (
      <div className="flex items-center justify-center py-3">
        <div className="bg-white text-sm border border-gray-500/30 p-8 rounded-md m-2 max-w-xl w-full">
          <p
            onClick={handleInstallClick}
            className="font-medium text-blue-600 mb-1 cursor-pointer"
          >
            Download Now!
          </p>
          <h2 className="text-2xl font-semibold text-gray-800">
            Download our mobile app.
          </h2>
          <p className="text-gray-800/80 mt-1">
            Mobile banking app for iOS & Android to<br />manage your online
            money.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <button className="active:scale-95 transition-all" type="button">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtnBlack.svg"
                alt="googlePlayBtnBlack"
              />
            </button>
            <button className="active:scale-95 transition-all" type="button">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtnBlack.svg"
                alt="appleStoreBtnBlack"
              />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AppDownload;
