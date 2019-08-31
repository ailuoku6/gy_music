package com.gy_music.db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.gy_music.entity.Album;
import com.gy_music.entity.Comment;
import com.gy_music.entity.Ranking;
import com.gy_music.entity.Ranking_item;
import com.gy_music.entity.Singer;
import com.gy_music.entity.Singer_song;
import com.gy_music.entity.Song;
import com.gy_music.entity.SongList;
import com.gy_music.entity.Song_list_song;
import com.gy_music.entity.User;
import com.gy_music.entity.ArtsCompany;
import com.j256.ormlite.android.apptools.OrmLiteSqliteOpenHelper;
import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;

import java.sql.SQLException;

public class DatabaseHelper extends OrmLiteSqliteOpenHelper {

    private static final String DATA_BASE_NAME = "gyMusic.db";
    private static final int DATA_BASE_VERSION = 1;

    private Dao<Album,String> albumStringDao;
    private Dao<ArtsCompany,String> artsCompanyStringDao;
    private Dao<Comment,String> commentStringDao;
    private Dao<Ranking,String> rankingStringDao;
    private Dao<Ranking_item,String> rankingItemStringDao;
    private Dao<Singer,String> singerStringDao;
    private Dao<Singer_song,String> singerSongStringDao;
    private Dao<Song,String> songStringDao;
    private Dao<Song_list_song,String> songListSongStringDao;
    private Dao<SongList,String> songListStringDao;
    private Dao<User,String> userListStringDao;

    private DatabaseHelper(Context context){
        super(context,DATA_BASE_NAME,null,DATA_BASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase database, ConnectionSource connectionSource) {
        try {
            TableUtils.createTable(connectionSource, User.class);
            TableUtils.createTable(connectionSource, ArtsCompany.class);
            TableUtils.createTable(connectionSource, Singer.class);
            TableUtils.createTable(connectionSource,SongList.class);
            TableUtils.createTable(connectionSource, Album.class);
            TableUtils.createTable(connectionSource, Comment.class);
            TableUtils.createTable(connectionSource, Ranking.class);
            TableUtils.createTable(connectionSource, Ranking_item.class);
            TableUtils.createTable(connectionSource, Singer_song.class);
            TableUtils.createTable(connectionSource, Song.class);
            TableUtils.createTable(connectionSource, Song_list_song.class);

            Log.d("databaseonCreate", "onCreate: ");

        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    @Override
    public void onUpgrade(SQLiteDatabase database, ConnectionSource connectionSource, int oldVersion, int newVersion) {
        try {
            TableUtils.dropTable(connectionSource, Album.class,true);
            TableUtils.dropTable(connectionSource, ArtsCompany.class,true);
            TableUtils.dropTable(connectionSource, Comment.class,true);
            TableUtils.dropTable(connectionSource, Ranking.class,true);
            TableUtils.dropTable(connectionSource, Ranking_item.class,true);
            TableUtils.dropTable(connectionSource, Singer.class,true);
            TableUtils.dropTable(connectionSource, Singer_song.class,true);
            TableUtils.dropTable(connectionSource, Song.class,true);
            TableUtils.dropTable(connectionSource, Song_list_song.class,true);
            TableUtils.dropTable(connectionSource,SongList.class,true);
            TableUtils.dropTable(connectionSource, User.class,true);

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

    public Dao<Album, String> getAlbumStringDao() throws SQLException{
        if (albumStringDao == null)
            albumStringDao = getDao(Album.class);
        return albumStringDao;
    }

    public Dao<ArtsCompany, String> getArtsCompanyStringDao() throws SQLException{
        if (artsCompanyStringDao == null)
            artsCompanyStringDao = getDao(ArtsCompany.class);
        return artsCompanyStringDao;
    }

    public Dao<Comment, String> getCommentStringDao() throws SQLException{
        if (commentStringDao == null)
            commentStringDao = getDao(Comment.class);
        return commentStringDao;
    }

    public Dao<Ranking, String> getRankingStringDao() throws SQLException{
        if (rankingStringDao == null)
            rankingStringDao = getDao(Ranking.class);
        return rankingStringDao;
    }

    public Dao<Ranking_item, String> getRankingItemStringDao() throws SQLException{
        if (rankingItemStringDao == null)
            rankingItemStringDao = getDao(Ranking_item.class);
        return rankingItemStringDao;
    }

    public Dao<Singer, String> getSingerStringDao() throws SQLException{
        if (singerStringDao == null)
            singerStringDao = getDao(Singer.class);
        return singerStringDao;
    }

    public Dao<Singer_song, String> getSingerSongStringDao() throws SQLException{
        if (singerSongStringDao == null)
            singerSongStringDao = getDao(Singer_song.class);
        return singerSongStringDao;
    }

    public Dao<Song, String> getSongStringDao() throws SQLException{
        if (songStringDao == null)
            songStringDao = getDao(Song.class);
        return songStringDao;
    }

    public Dao<Song_list_song, String> getSongListSongStringDao() throws SQLException{
        if (songListSongStringDao == null)
            songListSongStringDao = getDao(Song_list_song.class);
        return songListSongStringDao;
    }

    public Dao<SongList, String> getSongListStringDao() throws SQLException{
        if (songListStringDao == null)
            songListStringDao = getDao(SongList.class);
        return songListStringDao;
    }

    public Dao<User, String> getUserListStringDao() throws SQLException{
        if (userListStringDao == null)
            userListStringDao = getDao(User.class);
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
