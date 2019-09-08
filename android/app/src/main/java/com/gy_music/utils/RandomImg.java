package com.gy_music.utils;

import java.util.ArrayList;
import java.util.List;

public class RandomImg {
    public static List<String> imgs = new ArrayList<>();

    static {
        imgs.add("http://qukufile2.qianqian.com/data2/pic/6a6489bd9627769702ac6c9a056b7446/556061188/556061188.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/2cf39709978f5cecadc257f14da8b3b5/266873157/266873157.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/99a5bf60c03889f6ca4a9a167397ac4f/589856599/589856599.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/2aab7f572717cf88df051d42b0719625/123239995/123239995.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/3354ca69b56f3fb571cff0360a5d74f3/557335383/557335383.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/624163a92e6998c275ce74f56f094dc8/613447586/613447586.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/5149a06287d4e65a6a9977e3992ed2f3/65230/65230.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/885b9da145a6533ac5ae9e3995668629/268109412/268109412.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/2dffe0b4cc05e1b3fac0e2647974f9f1/579850759/579850759.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/dae145577a464bd6615492588089ecb1/242206127/242206127.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/2501de32f83f5aa9c56b677b9789b91b/579849714/579849714.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/8516eec6380c1f98188369d034c774d5/13749337/13749337.jpeg");
        imgs.add("http://qukufile2.qianqian.com/data2/music/26EF6DDFDE3915E7A5DBF35E3251639B/252192347/252192347.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/470f52bdcc76af79ce5a5b3bee3bf93f/544692851/544692851.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/1a4c14e99a7504383c7b06b623da57e2/568695363/568695363.jpg");
        imgs.add("http://qukufile2.qianqian.com/data2/pic/cc770c9167f460a9c1dbbf2d3d65a457/257512889/257512889.jpg");
    }

    public static String getRandomImg(){
        int index = (int) Math.random()*imgs.size();
        return imgs.get(index);
    }
}
