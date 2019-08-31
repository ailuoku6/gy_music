package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

//歌手与歌曲关系
@DatabaseTable(tableName = "Singer_song")
public class Singer_song {
    @DatabaseField(columnName = "singerid",foreign = true,foreignColumnName = "singerId")
    private Singer singer;
    @DatabaseField(columnName = "songid",foreign = true,foreignColumnName = "songId")
    private Song song;

    public Song getSong() {
        return song;
    }

    public Singer getSinger() {
        return singer;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }

    public Singer_song() {
    }

    public Singer_song(Singer singer, Song song) {
        this.singer = singer;
        this.song = song;
    }
}
