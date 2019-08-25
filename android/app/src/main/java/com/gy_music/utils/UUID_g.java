package com.gy_music.utils;

import java.util.UUID;

public class UUID_g {
    public static String randomUUID(){
        return UUID.randomUUID().toString().replace("-","");
    }
}
