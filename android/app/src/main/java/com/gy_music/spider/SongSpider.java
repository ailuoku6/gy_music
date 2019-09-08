package com.gy_music.spider;

import android.content.Context;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.gy_music.db.DatabaseHelper;
import com.gy_music.entity.Album;
import com.gy_music.entity.Singer_song;
import com.gy_music.entity.Song;
import com.j256.ormlite.dao.Dao;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SongSpider {
    public List<Song> excuTask(List<Album> albums, Context context) throws IOException, SQLException {
        List<Song> songs = new ArrayList<>();
        DatabaseHelper helper = DatabaseHelper.getInstance(context);
        Dao<Song,String> songDao = helper.getSongStringDao();
        Dao<Singer_song,String> singerSongStringDao = helper.getSingerSongStringDao();
        for (Album album:albums){

            try {
                Connection connection = Jsoup.connect(Api.albumApi+"/"+album.getAlbumId());
                connection.timeout(6*1000)
                        .method(Connection.Method.GET);
                Connection.Response res = connection.execute();
                Document document = res.parse();

                Elements songWrap = document.select(".songlist-item");
                for (Element item:songWrap){
                    Element song_a = item.selectFirst(".songlist-title").selectFirst("a");
                    String songName = song_a.attr("title");
                    String[] songIds = song_a.attr("href").split("/");
                    String songId = songIds[songIds.length-1];

                    Connection connection1 = Jsoup.connect(Api.SongLink+"?kw="+songName+"&lx=qq");
                    connection1.timeout(6*1000)
                            .method(Connection.Method.GET);

                    Connection.Response response = connection1.execute();

                    Document document1 = response.parse();

                    Element link_a = document1.selectFirst(".song-bitrate > a");

                    String link = link_a.attr("href");

                    Song song = new Song(songId,album,songName,link, album.getAlbumCover(),0);

                    songDao.createOrUpdate(song);
                    singerSongStringDao.createOrUpdate(new Singer_song(album.getSinger().getSingerId()+song.getSongId(),album.getSinger(),song));

                    songs.add(song);

                    Log.d("SongSpider", "excuTask: "+ JSON.toJSONString(song));


//                    String albumCover = item.select("img").attr("src");
//                    String albumName = item.selectFirst(".album-name").selectFirst("a").text();
//                    String albumIntro = albumName+"是一张很棒的专辑";
//                    String[] albumIds = item.selectFirst("a").attr("href").split("/");
//                    String albumId = albumIds[albumIds.length-1];
//                    Album album = new Album(albumId,singer,albumName,albumCover,albumIntro);
//                    albums.add(album);
//                    Log.d("AlbumSpider", "excuTask: "+ JSON.toJSONString(album));
                }
            }catch (Exception e){
                e.printStackTrace();
            }

        }

        return songs;
    }
}
