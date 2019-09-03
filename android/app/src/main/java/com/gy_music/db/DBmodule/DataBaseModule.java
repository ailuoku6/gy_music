package com.gy_music.db.DBmodule;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.gy_music.db.DatabaseHelper;
import com.gy_music.entity.Album;
import com.gy_music.entity.Ranking;
import com.gy_music.entity.Ranking_item;
import com.gy_music.entity.Singer;
import com.gy_music.entity.Singer_song;
import com.gy_music.entity.Song;
import com.gy_music.entity.SongList;
import com.gy_music.entity.Song_list_song;
import com.gy_music.entity.User;
import com.gy_music.utils.Md5util;
import com.gy_music.utils.RandomImg;
import com.gy_music.utils.UUID_g;
import com.gy_music.utils.config;
import com.j256.ormlite.stmt.QueryBuilder;
import com.j256.ormlite.stmt.Where;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
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
                songList = new SongList(UUID_g.randomUUID(),newuser,"我喜欢的音乐",newuser.getUserName()+"喜欢的音乐", RandomImg.getRandomImg());
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

            QueryBuilder songQueryBuilder = databaseHelper.getSongStringDao().queryBuilder();
            QueryBuilder albumQuerybuilder = databaseHelper.getAlbumStringDao().queryBuilder();
            QueryBuilder singerQueryBuild = databaseHelper.getSingerStringDao().queryBuilder();

            Where songWhere = songQueryBuilder.where();
            songWhere.like("songName","%"+keyword+"%");

            Where albumWhere = albumQuerybuilder.where();
            albumWhere.like("albumName","%"+keyword+"%");

            Where singerWhere = singerQueryBuild.where();
            singerWhere.like("singerName","%"+keyword+"%");

            QueryBuilder resultBuilder = songQueryBuilder.joinOr(albumQuerybuilder.joinOr(singerQueryBuild));

            songs = resultBuilder.query();


//            songs = databaseHelper.getSongStringDao().queryBuilder().where().like("songName","%"+keyword+"%").query();
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



    @ReactMethod
    public void AddSinger(String singerName,String singerSex,String singerAvatar,String singerIntro,Promise promise){//添加歌手
        Promise mp = promise;
        Singer singer = null;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        try {
            singer = new Singer(UUID_g.randomUUID(),singerName,singerSex,singerAvatar,singerIntro);
            helper.getSingerStringDao().create(singer);
        }catch (SQLException e){
            e.printStackTrace();
        }
        mp.resolve("succ");
    }

    @ReactMethod
    public void getAllSinger(Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        List<Singer> singers = new ArrayList<>();
        try {
            singers = helper.getSingerStringDao().queryForAll();
        }catch (SQLException e){
            e.printStackTrace();
        }

        mp.resolve(JSON.toJSONString(singers));
    }

    @ReactMethod
    public void AddAlbum(String singerId,String albumName,String albumCover,String albumIntro,Promise promise){//添加专辑
        Promise mp = promise;
        Album album = null;
        Singer singer = null;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        try {
            singer = helper.getSingerStringDao().queryForId(singerId);
            if (singer==null){
                mp.resolve("fail");
                return;
            }
            album = new Album(UUID_g.randomUUID(),singer,albumName,albumCover,albumIntro);
            helper.getAlbumStringDao().create(album);
            mp.resolve("succ");
        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void getAllAlbum(Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        List<Album> albums = new ArrayList<>();
        try {
            albums = helper.getAlbumStringDao().queryForAll();
        }catch (SQLException e){
            e.printStackTrace();
        }

        mp.resolve(JSON.toJSONString(albums));
    }

    @ReactMethod
    public void getAllSong(Promise promise){
        Promise mp = promise;
        List<Song> songs = new ArrayList<>();
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        try {
            songs = helper.getSongStringDao().queryForAll();
        }catch (SQLException e){
            e.printStackTrace();
        }
        mp.resolve(JSON.toJSONString(songs));
    }

    @ReactMethod
    public void AddSong(String albumId,String songName,String singerId,String link,String songCover,Integer price,Promise promise){//添加歌曲
        Promise mp = promise;
        Album album = null;
        Singer singer = null;
        Singer_song singer_song = null;
        Song song = null;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        try {
            album = helper.getAlbumStringDao().queryForId(albumId);
            singer = helper.getSingerStringDao().queryForId(singerId);
            if (album==null||singer==null){
                mp.resolve("fail");
                return;
            }
            song = new Song(UUID_g.randomUUID(),album,songName,link,songCover,price);
            singer_song = new Singer_song(singer,song);
            helper.getSongStringDao().create(song);
            helper.getSingerSongStringDao().create(singer_song);
            mp.resolve("succ");
        }catch (SQLException e){
            e.printStackTrace();
        }
    }



    @ReactMethod
    public void AddSongList(String userId,String songListTitle,String songListIntro,String songListCover,Promise promise){//创建歌单，包括官方推荐歌单
        Promise mp = promise;
        User user = null;
        SongList songList = null;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        try {
            if (!"".equals(userId)){
                user = helper.getUserListStringDao().queryForId(userId);
            }
            songList = new SongList(UUID_g.randomUUID(),user,songListTitle,songListIntro,songListCover);
            if (helper.getSongListStringDao().queryBuilder().where().eq("userId",user.getUserId()).and().eq("songListTitle",songListTitle).queryForFirst()!=null){
                mp.resolve("exited");
                return;
            }
            helper.getSongListStringDao().create(songList);
            mp.resolve("succ");
        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void getAllSonglist(Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        List<SongList> songLists = new ArrayList<>();
        try {
            //songLists = helper.getSongListStringDao().queryBuilder().where().not().like("songListTitle","我喜欢的音乐").
            QueryBuilder songlistQueryBuilder = helper.getSongListStringDao().queryBuilder();
            QueryBuilder userQueryBuilder = helper.getUserListStringDao().queryBuilder();

            Where songlistWhere = songlistQueryBuilder.where();
            songlistWhere.not().like("songListTitle","%我喜欢的音乐%");

            Where userWhere = userQueryBuilder.where();
            userWhere.not().eq("role","0");

            QueryBuilder resultQueryBuilder = songlistQueryBuilder.join(userQueryBuilder);

            songLists = resultQueryBuilder.query();

        }catch (SQLException e){
            e.printStackTrace();
        }
        mp.resolve(JSON.toJSONString(songLists));
    }

    @ReactMethod
    public void AddSonglistSong(String songlistId,String songId,Promise promise){//往歌单里添加歌曲
        Promise mp = promise;
        SongList songList = null;
        Song song = null;
        Song_list_song song_list_song = null;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        try {
            songList = helper.getSongListStringDao().queryForId(songlistId);
            song = helper.getSongStringDao().queryForId(songId);
            song_list_song = helper.getSongListSongStringDao().queryBuilder().where().eq("songlistId",songList.getSongListId()).and().eq("songid",song.getSongId()).queryForFirst();
            if (song_list_song==null){
                song_list_song = new Song_list_song(UUID_g.randomUUID(),songList,song);
            }
            helper.getSongListSongStringDao().createOrUpdate(song_list_song);
            mp.resolve("succ");
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
    }

    @ReactMethod
    public void AddRanking(String rankingName,Promise promise){//添加排行榜
        Promise mp = promise;
        Ranking ranking = null;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        try {
            ranking = helper.getRankingStringDao().queryBuilder().where().eq("rankingName",rankingName).queryForFirst();
            if (ranking==null){
                ranking = new Ranking(UUID_g.randomUUID(),rankingName,new Date());
                helper.getRankingStringDao().create(ranking);
            }
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
        mp.resolve("succ");
    }

    @ReactMethod
    public void AddRankingitem(String rankingId,String songId,Integer hot,Promise promise){//添加排行榜中的歌曲
        Promise mp = promise;
        Ranking_item rankingItem = null;
        Ranking ranking = null;
        Song song = null;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);

        Log.d("AddRankingitem", "AddRankingitem: "+rankingId+"    "+songId+"     "+hot);
        try {
            ranking = helper.getRankingStringDao().queryForId(rankingId);
            song = helper.getSongStringDao().queryForId(songId);
            if (ranking==null||song==null){
                mp.resolve("fail");
                return;
            }

            rankingItem = helper.getRankingItemStringDao().queryBuilder().where().eq("rankingid",rankingId).and().eq("rankingSongid",songId).queryForFirst();

            if (rankingItem!=null){
                rankingItem.setHot(hot);
            }else {
                rankingItem = new Ranking_item(UUID_g.randomUUID(),ranking,song,hot);
            }
            helper.getRankingItemStringDao().createOrUpdate(rankingItem);

            mp.resolve("succ");

        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
    }

    @ReactMethod
    public void getAllRanking(Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        List<Ranking> rankings = new ArrayList<>();
        try {
            rankings = helper.getRankingStringDao().queryForAll();
        }catch (SQLException e){
            e.printStackTrace();
        }

        mp.resolve(JSON.toJSONString(rankings));
    }

    @ReactMethod
    public void getSongByListId(String listId,Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        List<Song> songs = new ArrayList<>();
        List<Song_list_song> songListSongs = new ArrayList<>();

        try {
            songListSongs = helper.getSongListSongStringDao().queryBuilder().where().eq("songlistId",listId).query();
            for (Song_list_song item:songListSongs) {
                Song song = helper.getSongStringDao().queryForId(item.getSong().getSongId());
                songs.add(song);
            }
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
        mp.resolve(JSON.toJSONString(songs));
    }

    @ReactMethod
    public void getSongListById(String listId,Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        SongList songList = null;
        try {
            songList = helper.getSongListStringDao().queryForId(listId);
        }catch (SQLException e){
            e.printStackTrace();
        }
        mp.resolve(JSON.toJSONString(songList));
    }

    @ReactMethod
    public void deleteSongList(String songListInfo,Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        SongList songList = JSON.parseObject(songListInfo,SongList.class);
        try {
            List<Song_list_song> songListSongs = new ArrayList<>();
            songListSongs = helper.getSongListSongStringDao().queryBuilder().where().eq("songlistId",songList.getSongListId()).query();
            helper.getSongListSongStringDao().delete(songListSongs);
            helper.getSongListStringDao().delete(songList);
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
        mp.resolve("succ");
    }

    @ReactMethod
    public void editSonglist(String songlistInfo,Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        SongList songList = JSON.parseObject(songlistInfo,SongList.class);
        try {
            helper.getSongListStringDao().update(songList);
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
        mp.resolve("succ");
    }

    @ReactMethod
    public void getrecommendSongList(Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        List<SongList> songLists = new ArrayList<>();

        try {//联表查询，只返回管理员创建的，且名称不是%喜欢的音乐%
            QueryBuilder songListBuilder = helper.getSongListStringDao().queryBuilder();
            QueryBuilder userBuilder = helper.getUserListStringDao().queryBuilder();

            Where songlistWhere = songListBuilder.where();
            songlistWhere.not().like("songListTitle","%喜欢的音乐%");

            Where userWhere = userBuilder.where();
            userWhere.eq("role","1");

            QueryBuilder resultBuilder = songListBuilder.join(userBuilder);

            songLists = resultBuilder.query();
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
        mp.resolve(JSON.toJSONString(songLists));
    }

    @ReactMethod
    public void getRankings(Promise promise){
        Promise mp = promise;
        DatabaseHelper helper = DatabaseHelper.getInstance(mContext);
        List<Ranking> rankings = new ArrayList<>();
        JSONArray jsonArray = new JSONArray();

        try {
            rankings = helper.getRankingStringDao().queryForAll();
            for (Ranking ranking:rankings){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("ranking",ranking);
                List<Ranking_item> ranking_items = helper.getRankingItemStringDao().queryBuilder().orderBy("hot",false).where().eq("rankingid",ranking.getRankingId()).query();
                jsonObject.put("items",ranking_items);
                jsonArray.add(jsonObject);
            }
        }catch (SQLException e){
            e.printStackTrace();
            mp.resolve("fail");
        }
        mp.resolve(JSON.toJSONString(jsonArray));
    }

}
