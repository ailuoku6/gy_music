package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "Song")
public class Song {
    @DatabaseField(columnName = "songId",id = true)
    private String songId;
    @DatabaseField(columnName = "ownAlbumId",foreign = true,foreignColumnName = "albumId")
    private Album album;
    @DatabaseField(columnName = "songName")
    private String songName;
    @DatabaseField(columnName = "singerName",foreign = true,foreignColumnName = "singerName")
    private Singer singer;
    @DatabaseField(columnName = "link")
    private String link;
    @DatabaseField(columnName = "songCover")
    private String songCover;
    @DatabaseField(columnName = "price")
    private int price;

    public String getSongId() {
        return songId;
    }

    public Album getAlbum() {
        return album;
    }

    public String getSongName() {
        return songName;
    }

    public Singer getSinger() {
        return singer;
    }

    public String getLink() {
        return link;
    }

    public String getSongCover() {
        return songCover;
    }

    public int getPrice() {
        return price;
    }

    public void setSongId(String songId) {
        this.songId = songId;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setSongCover(String songCover) {
        this.songCover = songCover;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Song() {
    }

    public Song(String songId, Album album, String songName, Singer singer, String link, String songCover, int price) {
        this.songId = songId;
        this.album = album;
        this.songName = songName;
        this.singer = singer;
        this.link = link;
        this.songCover = songCover;
        this.price = price;
    }
}
