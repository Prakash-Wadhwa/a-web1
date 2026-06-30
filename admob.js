(function () {
  async function showAppBanner() {
    try {
      const cap = window.Capacitor;
      const AdMob = cap && cap.Plugins && cap.Plugins.AdMob;

      if (!AdMob) {
        console.log("AdMob not available");
        return;
      }

      try {
        await AdMob.initialize();
      } catch (e) {
        console.log("AdMob may already be initialized", e);
      }

      try {
        await AdMob.showBanner({
          adId: 'ca-app-pub-8576378038310405/3100233215',
          adSize: 'BANNER',
          position: 'BOTTOM_CENTER',
          margin: 0,
          isTesting: true // Set to true to ensure test ads are forced on registered devices
        });
        console.log("Banner shown successfully");
      } catch (e) {
        console.error("Banner show failed, attempting to resume existing banner", e);
        // PROFESSOR WADHWA'S RESUME LOGIC: Prevents the ad from vanishing on new pages
        try {
          await AdMob.resumeBanner();
          console.log("Banner resumed successfully");
        } catch (resumeErr) {
          console.error("Banner resume failed", resumeErr);
        }
      }
    } catch (err) {
      console.error("AdMob global error", err);
    }
  }

  function startBannerWithDelay() {
    setTimeout(showAppBanner, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startBannerWithDelay);
  } else {
    startBannerWithDelay();
  }

  window.addEventListener('pageshow', startBannerWithDelay);
})();