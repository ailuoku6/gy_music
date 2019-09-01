package com.gy_music.utils;

import java.util.ArrayList;
import java.util.List;

public class RandomImg {
    public static List<String> imgs = new ArrayList<>();

    static {
        imgs.add("http://qukufile2.qianqian.com/data2/pic/6a6489bd9627769702ac6c9a056b7446/556061188/556061188.jpg");
    }

    public static String getRandomImg(){
        int index = (int) Math.random()*imgs.size();
        return imgs.get(index);
    }
}
