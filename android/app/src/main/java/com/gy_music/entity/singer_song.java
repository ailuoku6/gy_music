package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

//歌手与歌曲关系
@DatabaseTable(tableName = "singer_song")
public class singer_song {
    @DatabaseField(columnName = "singerid",foreign = true,foreignColumnName = "singer_id")
    private String singerid;
    @DatabaseField(columnName = "songid",foreign = true,foreignColumnName = "song_id")
    private String songid;

    public String getSongid() {
        return songid;
    }

    public String getSingerid() {
        return singerid;
    }

    public void setSongid(String songid) {
        this.songid = songid;
    }

    public void setSingerid(String singerid) {
        this.singerid = singerid;
    }

    public singer_song() {
    }

    public singer_song(String singerid, String songid) {
        this.singerid = singerid;
        this.songid = songid;
    }
}
