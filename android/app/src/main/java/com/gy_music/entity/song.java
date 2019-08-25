package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "song")
public class song {
    @DatabaseField(columnName = "song_id")
    private String songId;
    @DatabaseField(columnName = "own_album_id",foreign = true,foreignColumnName = "album_id")
    private String ownAlbumId;
    @DatabaseField(columnName = "song_name")
    private String songName;
    @DatabaseField(columnName = "link")
    private String link;
    @DatabaseField(columnName = "song_cover")
    private String songCover;
    @DatabaseField(columnName = "price")
    private int price;

    public String getSongId() {
        return songId;
    }

    public String getOwnAlbumId() {
        return ownAlbumId;
    }

    public String getSongName() {
        return songName;
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

    public void setOwnAlbumId(String ownAlbumId) {
        this.ownAlbumId = ownAlbumId;
    }

    public void setSongName(String songName) {
        this.songName = songName;
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

    public song() {
    }

    public song(String songId, String ownAlbumId, String songName, String link, String songCover, int price) {
        this.songId = songId;
        this.ownAlbumId = ownAlbumId;
        this.songName = songName;
        this.link = link;
        this.songCover = songCover;
        this.price = price;
    }
}
