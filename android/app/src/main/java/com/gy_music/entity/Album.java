package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "Album")
public class Album {
    @DatabaseField(columnName = "albumId",id = true)
    private String albumId;
    @DatabaseField(columnName = "ownerId",canBeNull = true,foreign = true,foreignColumnName = "singerId") //专辑拥有者 （歌手）
    private Singer singer;
    @DatabaseField(columnName = "albumName")
    private String albumName;
    @DatabaseField(columnName = "albumCover")
    private String albumCover;
    @DatabaseField(columnName = "albumIntro")
    private String albumIntro;

    public String getAlbumId() {
        return albumId;
    }

    public Singer getSinger() {
        return singer;
    }

    public String getAlbumName() {
        return albumName;
    }

    public String getAlbumCover() {
        return albumCover;
    }

    public String getAlbumIntro() {
        return albumIntro;
    }

    public void setAlbumId(String albumId) {
        this.albumId = albumId;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public void setAlbumCover(String albumCover) {
        this.albumCover = albumCover;
    }

    public void setAlbumIntro(String albumIntro) {
        this.albumIntro = albumIntro;
    }

    public Album() {
    }

    public Album(String albumId, Singer singer, String albumName, String albumCover, String albumIntro) {
        this.albumId = albumId;
        this.singer = singer;
        this.albumName = albumName;
        this.albumCover = albumCover;
        this.albumIntro = albumIntro;
    }
}
