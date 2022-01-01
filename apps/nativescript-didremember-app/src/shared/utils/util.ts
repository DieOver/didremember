import { Application, Color, Device, isIOS } from '@nativescript/core';

export const Utils = {
  getVersionName(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        if (isIOS) {
          resolve(
            NSBundle.mainBundle.infoDictionary.objectForKey(
              'CFBundleShortVersionString'
            )
          );
        } else {
          const _resolve = () => {
            const packageManager =
              Application.android.context.getPackageManager();
            resolve(
              packageManager.getPackageInfo(
                Application.android.context.getPackageName(),
                0
              ).versionName
            );
          };
          if (Application.android.context) {
            _resolve();
          } else {
            Application.on(Application.launchEvent, _resolve);
          }
        }
      } catch (exception) {
        console.error('Error in getVersionName: ' + exception);
        reject(exception);
      }
    });
  },

  /**
   * generate groups of 4 random characters
   * @example getUniqueId(1) : 607f
   * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
   */
  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  },

  replaceUrl: (url: string, data: object = undefined) => {
    if (!data) return url;
    const regex = new RegExp(':(' + Object.keys(data).join('|') + ')', 'g');
    return url.replace(regex, (m, $1) => data[$1] || m);
  },

  setStatusBarColor(
    color: 'light' | 'dark',
    tintColor?: string /* android only */
  ) {
    if (isIOS) {
      // ios status-bar background color is set via the .action-bar class
      UIApplication.sharedApplication.setStatusBarStyleAnimated(
        color === 'light'
          ? UIStatusBarStyle.LightContent
          : UIStatusBarStyle.DarkContent,
        false
      );
    } else {
      const sdkVersion = parseInt(Device.sdkVersion);
      if (sdkVersion >= 21) {
        // android status-bar background color is set via additional programmatic api access
        // api level 21+ can programmatically change the status bar
        const activity: android.app.Activity =
          Application.android.foregroundActivity ||
          Application.android.startActivity;
        activity
          .getWindow()
          .clearFlags(
            android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS
          );
        activity
          .getWindow()
          .addFlags(
            android.view.WindowManager.LayoutParams
              .FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS
          );
        activity.getWindow().setStatusBarColor(new Color(tintColor).android);
        if (sdkVersion >= 23) {
          // api level 23+ can programmatically change the text color of the status bar
          // see here: https://developer.android.com/reference/android/view/View#SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
          activity
            .getWindow()
            .getDecorView()
            .setSystemUiVisibility(
              (<any>android.view.View).SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
            );
        }
      }
    }
  },
};
