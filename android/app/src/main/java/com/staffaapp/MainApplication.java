package com.staffaapp;

import android.annotation.SuppressLint;
import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.rumax.reactnative.pdfviewer.PDFViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @SuppressLint("MissingPermission")
    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new RNFirebaseAuthPackage());
      packages.add(new RNFirebaseFirestorePackage());
      packages.add(new RNFirebaseStoragePackage());
      packages.add(new RNFirebaseMessagingPackage());
      packages.add(new RNFirebaseFunctionsPackage());
      packages.add(new RNFirebaseNotificationsPackage());

      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
