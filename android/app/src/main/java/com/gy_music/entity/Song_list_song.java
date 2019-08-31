package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

//歌单与歌曲关系
@DatabaseTable(tableName = "Song_list_song")
public class Song_list_song {
    @DatabaseField(columnName = "songlistId",foreign = true,foreignColumnName = "songListId")
    private SongList songList;
    @DatabaseField(columnName = "songid",foreign = true,foreignColumnName = "songId")
    private Song song;

    public Song getSong() {
        return song;
    }

    public SongList getSongList() {
        return songList;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public void setSongList(SongList songList) {
        this.songList = songList;
    }

    public Song_list_song() {
    }

    public Song_list_song(SongList songList, Song song) {
        this.songList = songList;
        this.song = song;
    }
}
