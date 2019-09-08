package com.gy_music.spider;

import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.gy_music.entity.Singer;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class SingerSpider {
    public List<Singer> excuTask() throws IOException {
        List<Singer> singers = new ArrayList<>();
        Connection connection = Jsoup.connect(Api.SingerApi);
        connection.timeout(6*1000)
                .method(Connection.Method.GET);
        Connection.Response res = connection.execute();
        Document document = res.parse();

        try {
            Element hotSinger  = document.selectFirst(".hot-head");
            Elements hotsingers = hotSinger.select(".cover-item");
            for (Element element:hotsingers){
                Element cover = element.selectFirst("img");
                Element singerDetail = element.selectFirst("dd > a");
                String[] ids = singerDetail.attr("href").split("/");
                String id = ids[ids.length-1];
                Singer singer = new Singer();
                singer.setSingerId(id);
                singer.setSingerName(singerDetail.text());
                singer.setSingerIntro(singerDetail.text()+"是一个很有菜花的歌手");
                singer.setSingerSex("M");
                singer.setSingerAvatar(cover.attr("src"));
                singers.add(singer);
                Log.d("SingerSpider", "excuTask: "+ JSON.toJSONString(singer));
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return singers;
    }
}
