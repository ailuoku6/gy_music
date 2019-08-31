package com.gy_music.db.DBmodule;

import android.content.Context;
import android.content.SharedPreferences;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.gy_music.db.DatabaseHelper;
import com.gy_music.entity.User;
import com.gy_music.utils.Md5util;
import com.gy_music.utils.UUID_g;
import com.gy_music.utils.config;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;

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

    @ReactMethod
    public void Signin(String userName,String passWord,Promise promise){//登陆
        Promise mp = promise;
        DatabaseHelper databaseHelper = DatabaseHelper.getInstance(mContext);
        User user = null;
        try {
//            user = databaseHelper.getUserListStringDao().queryBuilder().queryForFirst();
            user = databaseHelper.getUserListStringDao().queryBuilder().where().eq("userName",userName).and().eq("password", Md5util.md5(passWord)).queryForFirst();
        }catch (SQLException e){
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        if (user!=null){
            SharedPreferences sp = mContext.getSharedPreferences("user", Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = sp.edit();
            editor.putString("userInfo", JSON.toJSONString(user));
            editor.apply();
            mp.resolve("succ");
        }else{
            mp.resolve("fail");
        }
    }

    @ReactMethod
    public void Signup(String userName,String passWord,boolean signupAsroot,Promise promise){//注册
        Promise mp = promise;
        DatabaseHelper databaseHelper = DatabaseHelper.getInstance(mContext);
        User user = null;
        try {
            user = databaseHelper.getUserListStringDao().queryBuilder().where().eq("userName",userName).and().eq("password",Md5util.md5(passWord)).queryForFirst();
        }catch (SQLException e){
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        if (user!=null){
            mp.resolve("existed");
        }else {
            User newuser = null;
            try {
                newuser = new User(UUID_g.randomUUID(),userName,Md5util.md5(passWord),signupAsroot?"0":"1", config.defaultAvatar,0);
                databaseHelper.getUserListStringDao().create(newuser);
            }catch (SQLException e){
                e.printStackTrace();
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if (newuser!=null){
                SharedPreferences sp = mContext.getSharedPreferences("user",Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sp.edit();
                editor.putString("userInfo",JSON.toJSONString(newuser));
                editor.apply();
                mp.resolve("succ");
            }else {
                mp.resolve("fail");
            }
        }
    }
}
