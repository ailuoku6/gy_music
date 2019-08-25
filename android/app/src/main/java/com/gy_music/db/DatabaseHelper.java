package com.gy_music.db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import com.gy_music.entity.SongList;
import com.gy_music.entity.UserList;
import com.gy_music.entity.album;
import com.gy_music.entity.artsCompany;
import com.gy_music.entity.comment;
import com.gy_music.entity.ranking;
import com.gy_music.entity.ranking_item;
import com.gy_music.entity.singer;
import com.gy_music.entity.singer_song;
import com.gy_music.entity.song;
import com.gy_music.entity.song_list_song;
import com.j256.ormlite.android.apptools.OrmLiteSqliteOpenHelper;
import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;

import java.sql.SQLException;

public class DatabaseHelper extends OrmLiteSqliteOpenHelper {

    private static final String DATA_BASE_NAME = "gy_music.db";
    private static final int DATA_BASE_VERSION = 1;

    private Dao<album,String> albumStringDao;
    private Dao<artsCompany,String> artsCompanyStringDao;
    private Dao<comment,String> commentStringDao;
    private Dao<ranking,String> rankingStringDao;
    private Dao<ranking_item,String> rankingItemStringDao;
    private Dao<singer,String> singerStringDao;
    private Dao<singer_song,String> singerSongStringDao;
    private Dao<song,String> songStringDao;
    private Dao<song_list_song,String> songListSongStringDao;
    private Dao<SongList,String> songListStringDao;
    private Dao<UserList,String> userListStringDao;

    private DatabaseHelper(Context context){
        super(context,DATA_BASE_NAME,null,DATA_BASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase database, ConnectionSource connectionSource) {
        try {
            TableUtils.createTable(connectionSource,album.class);
            TableUtils.createTable(connectionSource,artsCompany.class);
            TableUtils.createTable(connectionSource,comment.class);
            TableUtils.createTable(connectionSource,ranking.class);
            TableUtils.createTable(connectionSource,ranking_item.class);
            TableUtils.createTable(connectionSource,singer.class);
            TableUtils.createTable(connectionSource,singer_song.class);
            TableUtils.createTable(connectionSource,song.class);
            TableUtils.createTable(connectionSource,song_list_song.class);
            TableUtils.createTable(connectionSource,SongList.class);
            TableUtils.createTable(connectionSource,UserList.class);
        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    @Override
    public void onUpgrade(SQLiteDatabase database, ConnectionSource connectionSource, int oldVersion, int newVersion) {
        try {
            TableUtils.dropTable(connectionSource,album.class,true);
            TableUtils.dropTable(connectionSource,artsCompany.class,true);
            TableUtils.dropTable(connectionSource,comment.class,true);
            TableUtils.dropTable(connectionSource,ranking.class,true);
            TableUtils.dropTable(connectionSource,ranking_item.class,true);
            TableUtils.dropTable(connectionSource,singer.class,true);
            TableUtils.dropTable(connectionSource,singer_song.class,true);
            TableUtils.dropTable(connectionSource,song.class,true);
            TableUtils.dropTable(connectionSource,song_list_song.class,true);
            TableUtils.dropTable(connectionSource,SongList.class,true);
            TableUtils.dropTable(connectionSource,UserList.class,true);

            onCreate(database,connectionSource);
        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    private static DatabaseHelper instance;

    public static synchronized DatabaseHelper getInstance(Context context){
        if (instance==null){
            synchronized (DatabaseHelper.class){
                if (instance==null){
                    instance = new DatabaseHelper(context);
                }
            }
        }
        return instance;
    }

    //获得Dao

    public Dao<album, String> getAlbumStringDao() throws SQLException{
        if (albumStringDao == null)
            albumStringDao = getDao(album.class);
        return albumStringDao;
    }

    public Dao<artsCompany, String> getArtsCompanyStringDao() throws SQLException{
        if (artsCompanyStringDao == null)
            artsCompanyStringDao = getDao(artsCompany.class);
        return artsCompanyStringDao;
    }

    public Dao<comment, String> getCommentStringDao() throws SQLException{
        if (commentStringDao == null)
            commentStringDao = getDao(comment.class);
        return commentStringDao;
    }

    public Dao<ranking, String> getRankingStringDao() throws SQLException{
        if (rankingStringDao == null)
            rankingStringDao = getDao(ranking.class);
        return rankingStringDao;
    }

    public Dao<ranking_item, String> getRankingItemStringDao() throws SQLException{
        if (rankingItemStringDao == null)
            rankingItemStringDao = getDao(ranking_item.class);
        return rankingItemStringDao;
    }

    public Dao<singer, String> getSingerStringDao() throws SQLException{
        if (singerStringDao == null)
            singerStringDao = getDao(singer.class);
        return singerStringDao;
    }

    public Dao<singer_song, String> getSingerSongStringDao() throws SQLException{
        if (singerSongStringDao == null)
            singerSongStringDao = getDao(singer_song.class);
        return singerSongStringDao;
    }

    public Dao<song, String> getSongStringDao() throws SQLException{
        if (songStringDao == null)
            songStringDao = getDao(song.class);
        return songStringDao;
    }

    public Dao<song_list_song, String> getSongListSongStringDao() throws SQLException{
        if (songListSongStringDao == null)
            songListSongStringDao = getDao(song_list_song.class);
        return songListSongStringDao;
    }

    public Dao<SongList, String> getSongListStringDao() throws SQLException{
        if (songListStringDao == null)
            songListStringDao = getDao(SongList.class);
        return songListStringDao;
    }

    public Dao<UserList, String> getUserListStringDao() throws SQLException{
        if (userListStringDao == null)
            userListStringDao = getDao(UserList.class);
        return userListStringDao;
    }

    public void close(){
        super.close();
        albumStringDao = null;
        artsCompanyStringDao = null;
        commentStringDao = null;
        rankingStringDao = null;
        rankingItemStringDao = null;
        singerStringDao = null;
        singerSongStringDao = null;
        songStringDao = null;
        songListSongStringDao = null;
        songListStringDao = null;
        userListStringDao = null;
    }
}
