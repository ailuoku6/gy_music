package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "song_list")
public class SongList {
    @DatabaseField(columnName = "songListId",id = true)
    private String songListId;
    @DatabaseField(columnName = "userId",canBeNull = true,foreign = true,foreignColumnName = "userId")
    private User user;
    @DatabaseField(columnName = "songListTitle")
    private String songListTitle;
    @DatabaseField(columnName = "songListIntro")
    private String songListIntro;
    @DatabaseField(columnName = "songListCover")
    private String songListCover;

    public String getSongListId() {
        return songListId;
    }

    public User getUser() {
        return user;
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

    public void setUser(User user) {
        this.user = user;
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

    public SongList(String songListId, User user, String songListTitle, String songListIntro, String songListCover) {
        this.songListId = songListId;
        this.user = user;
        this.songListTitle = songListTitle;
        this.songListIntro = songListIntro;
        this.songListCover = songListCover;
    }
}
