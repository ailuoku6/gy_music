package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

//歌手与歌曲关系
@DatabaseTable(tableName = "Singer_song")
public class Singer_song {
    @DatabaseField(columnName = "SingersongId",id = true)
    private String SingersongId;
    @DatabaseField(columnName = "singerid",foreign = true,foreignColumnName = "singerId")
    private Singer singer;
    @DatabaseField(columnName = "songid",foreign = true,foreignColumnName = "songId")
    private Song song;

    public String getSingersongId() {
        return SingersongId;
    }

    public Song getSong() {
        return song;
    }

    public Singer getSinger() {
        return singer;
    }

    public void setSingersongId(String singersongId) {
        SingersongId = singersongId;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }

    public Singer_song() {
    }

    public Singer_song(String singersongId, Singer singer, Song song) {
        SingersongId = singersongId;
        this.singer = singer;
        this.song = song;
    }
}
