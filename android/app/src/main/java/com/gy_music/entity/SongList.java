package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "song_list")
public class SongList {
    @DatabaseField(columnName = "song_list_id",id = true)
    private String songListId;
    @DatabaseField(columnName = "user_id",canBeNull = true,foreign = true,foreignColumnName = "user_id")
    private String userId;
    @DatabaseField(columnName = "song_list_title")
    private String songListTitle;
    @DatabaseField(columnName = "song_list_intro")
    private String songListIntro;
    @DatabaseField(columnName = "song_list_cover")
    private String songListCover;

    public String getSongListId() {
        return songListId;
    }

    public String getUserId() {
        return userId;
    }

    public String getSongListTitle() {
        return songListTitle;
    }

    public String getSongListIntro() {
        return songListIntro;
    }

    public String getSongListCover() {
        return songListCover;
    }

    public void setSongListId(String songListId) {
        this.songListId = songListId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setSongListTitle(String songListTitle) {
        this.songListTitle = songListTitle;
    }

    public void setSongListIntro(String songListIntro) {
        this.songListIntro = songListIntro;
    }

    public void setSongListCover(String songListCover) {
        this.songListCover = songListCover;
    }

    public SongList() {
    }

    public SongList(String songListId, String userId, String songListTitle, String songListIntro, String songListCover) {
        this.songListId = songListId;
        this.userId = userId;
        this.songListTitle = songListTitle;
        this.songListIntro = songListIntro;
        this.songListCover = songListCover;
    }
}
