package com.gy_music.db.DBmodule;

import android.content.Context;
import android.content.SharedPreferences;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.gy_music.db.DatabaseHelper;
import com.gy_music.entity.Ranking;
import com.gy_music.entity.Ranking_item;
import com.gy_music.entity.Song;
import com.gy_music.entity.SongList;
import com.gy_music.entity.User;
import com.gy_music.utils.Md5util;
import com.gy_music.utils.UUID_g;
import com.gy_music.utils.config;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
    @ReactMethod
    public void getSongList(Promise promise){
        Promise mp = promise;
        List<SongList> songList = new ArrayList<>();
        DatabaseHelper databaseHelper = DatabaseHelper.getInstance(mContext);
        try {
            songList = databaseHelper.getSongListStringDao().queryBuilder().query();
        }catch (SQLException e){
            e.printStackTrace();
        }

        mp.resolve(JSON.toJSONString(songList));

    }

    @ReactMethod
    public void getRanking(Promise promise){ //获取排行榜
        Promise mp = promise;
        List<Ranking> rankings = new ArrayList<>();
        List<List<Ranking_item>> returndata = new ArrayList<>();
//        List<Map<String,Object>> returnmap = new ArrayList<>();
        DatabaseHelper databaseHelper = DatabaseHelper.getInstance(mContext);
        try {
            rankings = databaseHelper.getRankingStringDao().queryBuilder().query();
        }catch (SQLException e){
            e.printStackTrace();
        }
        if (rankings.size()==0){
            mp.resolve("fail");
            return;
        }
        for (int i = 0;i<6&&i<rankings.size();i++){
            List<Ranking_item> ranking_items = new ArrayList<>();
            try {
                 ranking_items = databaseHelper.getRankingItemStringDao().queryBuilder().where().eq("rankingid",rankings.get(i).getRankingId()).query();
            }catch (SQLException e){
                e.printStackTrace();
            }
            returndata.add(ranking_items);
        }
        mp.resolve(JSON.toJSONString(returndata));
    }

    @ReactMethod
    public void searchSong(String keyword,Promise promise){
        Promise mp = promise;
        List<Song> songs = new ArrayList<>();
        DatabaseHelper databaseHelper = DatabaseHelper.getInstance(mContext);
        try {
            songs = databaseHelper.getSongStringDao().queryBuilder().where().like("songName",keyword).query();
        }catch (SQLException e){
            e.printStackTrace();
        }
        mp.resolve(JSON.toJSONString(songs));
    }
}
