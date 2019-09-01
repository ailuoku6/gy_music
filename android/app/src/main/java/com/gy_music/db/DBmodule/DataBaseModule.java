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
import com.gy_music.utils.RandomImg;
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
            mp.resolve(JSON.toJSONString(user));
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
            SongList songList = null;
            try {
                newuser = new User(UUID_g.randomUUID(),userName,Md5util.md5(passWord),signupAsroot?"1":"0", config.defaultAvatar,0);
                songList = new SongList(UUID_g.randomUUID(),user,"我喜欢的音乐",user.getUserName()+"喜欢的音乐", RandomImg.getRandomImg());
                databaseHelper.getUserListStringDao().create(newuser);
                databaseHelper.getSongListStringDao().create(songList);
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
                mp.resolve(JSON.toJSONString(newuser));
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
            songs = databaseHelper.getSongStringDao().queryBuilder().where().like("songName",keyword).or().like("singerName",keyword).query();
        }catch (SQLException e){
            e.printStackTrace();
        }
        mp.resolve(JSON.toJSONString(songs));
    }

    @ReactMethod
    public void getMySongList(String userinfo,Promise promise){
        Promise mp = promise;
        User user = null;
        user = JSON.parseObject(userinfo,User.class);
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        List<SongList> songLists = new ArrayList<>();
        try {
            songLists = helper.getSongListStringDao().queryBuilder().where().eq("userId",user.getUserId()).query();
        }catch (SQLException e){
            e.printStackTrace();
        }
        mp.resolve(JSON.toJSONString(songLists));
    }

    @ReactMethod
    public void Recharge(String userInfo,Integer chargeNum,Promise promise){
        Promise mp = promise;
        User user = null;
        user = JSON.parseObject(userInfo,User.class);
        user.setBalance(user.getBalance()+chargeNum);
        DatabaseHelper helper  = DatabaseHelper.getInstance(mContext);
        try {
            helper.getUserListStringDao().update(user);
            mp.resolve(JSON.toJSONString(user));
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
    }

    @ReactMethod
    public void ChangePassword(String userInfo,String oldpassword,String newpassword,Promise promise){
        Promise mp = promise;
        User user = null;
        user = JSON.parseObject(userInfo,User.class);
        DatabaseHelper helper  =DatabaseHelper.getInstance(mContext);
        try {
            if (user.getPassword().equals(Md5util.md5(oldpassword))){
                user.setPassword(Md5util.md5(newpassword));
                helper.getUserListStringDao().update(user);
                mp.resolve(JSON.toJSONString(user));
            }else {
                mp.resolve("fail");
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            mp.resolve("fail");
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
    }

}
