package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "album")
public class album {
    @DatabaseField(columnName = "album_id")
    private String albumId;
    @DatabaseField(columnName = "owner_id",foreign = true,foreignColumnName = "singer_id") //专辑拥有者 （歌手）
    private String ownerId;
    @DatabaseField(columnName = "album_name")
    private String albumName;
    @DatabaseField(columnName = "album_cover")
    private String albumCover;
    @DatabaseField(columnName = "album_intro")
    private String albumIntro;

    public String getAlbumId() {
        return albumId;
    }

    public String getOwnerId() {
        return ownerId;
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

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
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

    public album() {
    }

    public album(String albumId, String ownerId, String albumName, String albumCover, String albumIntro) {
        this.albumId = albumId;
        this.ownerId = ownerId;
        this.albumName = albumName;
        this.albumCover = albumCover;
        this.albumIntro = albumIntro;
    }
}
