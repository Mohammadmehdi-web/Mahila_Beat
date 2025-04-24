# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Keep Axios + network-related calls safe

-keep class com.facebook.react.** { *; }
-keep class com.facebook.** { *; }
-dontwarn com.facebook.react.**
-dontwarn okhttp3.**
-dontwarn okio.**

# Hermes support
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**
