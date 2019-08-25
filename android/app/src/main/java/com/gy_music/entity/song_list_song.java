package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

//歌单与歌曲关系
@DatabaseTable(tableName = "song_list_song")
public class song_list_song {
    @DatabaseField(columnName = "songlist_id",foreign = true,foreignColumnName = "song_list_id")
    private String songlistId;
    @DatabaseField(columnName = "songid",foreign = true,foreignColumnName = "song_id")
    private String songid;

    public String getSongid() {
        return songid;
    }

    public String getSonglistId() {
        return songlistId;
    }

    public void setSongid(String songid) {
        this.songid = songid;
    }

    public void setSonglistId(String songlistId) {
        this.songlistId = songlistId;
    }

    public song_list_song() {
    }

    public song_list_song(String songlistId, String songid) {
        this.songlistId = songlistId;
        this.songid = songid;
    }
}
