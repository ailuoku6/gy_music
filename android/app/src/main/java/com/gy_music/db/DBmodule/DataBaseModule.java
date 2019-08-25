package com.gy_music.db.DBmodule;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import javax.annotation.Nonnull;

public class DataBaseModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;

    public DataBaseModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return "DataBaseModule";
    }
}
