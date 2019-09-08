package com.gy_music.spider;

import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.gy_music.entity.Album;
import com.gy_music.entity.Singer;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class AlbumSpider {
    public List<Album> excuTask(List<Singer> singers) throws IOException {
        List<Album> albums = new ArrayList<>();
        for (Singer singer:singers){
            Connection connection = Jsoup.connect(Api.SingerApi+"/"+singer.getSingerId());
            connection.timeout(6*1000)
                    .method(Connection.Method.GET);
            Connection.Response res = connection.execute();
            Document document = res.parse();

            try {
                Elements albumWrap = document.select(".album-wrap");
                for (Element item:albumWrap){
                    String albumCover = item.select("img").attr("src");
                    String albumName = item.selectFirst(".album-name").selectFirst("a").text();
                    String albumIntro = albumName+"是一张很棒的专辑";
                    String[] albumIds = item.selectFirst("a").attr("href").split("/");
                    String albumId = albumIds[albumIds.length-1];
                    Album album = new Album(albumId,singer,albumName,albumCover,albumIntro);
                    albums.add(album);
                    Log.d("AlbumSpider", "excuTask: "+ JSON.toJSONString(album));
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }


        return albums;
    }
}
