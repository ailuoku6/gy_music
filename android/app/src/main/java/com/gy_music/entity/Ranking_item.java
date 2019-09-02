package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "Ranking_item")
public class Ranking_item {
    @DatabaseField(columnName = "RankingItemId",id = true)
    private String RankingItemId;
    @DatabaseField(columnName = "rankingid",canBeNull = false,foreign = true,foreignColumnName = "rankingId")
    private Ranking ranking;
    @DatabaseField(columnName = "rankingSongid",foreign = true,foreignColumnName = "songId")
    private Song song;
    @DatabaseField(columnName = "hot")
    private int hot;

    public String getRankingItemId() {
        return RankingItemId;
    }

    public Ranking getRanking() {
        return ranking;
    }

    public Song getSong() {
        return song;
    }

    public int getHot() {
        return hot;
    }

    public void setRankingItemId(String rankingItemId) {
        RankingItemId = rankingItemId;
    }

    public void setRanking(Ranking ranking) {
        this.ranking = ranking;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public void setHot(int hot) {
        this.hot = hot;
    }

    public Ranking_item() {
    }

    public Ranking_item(String rankingItemId, Ranking ranking, Song song, int hot) {
        RankingItemId = rankingItemId;
        this.ranking = ranking;
        this.song = song;
        this.hot = hot;
    }
}
