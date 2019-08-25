package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "ranking_item")
public class ranking_item {
    @DatabaseField(columnName = "rankingid",foreign = true,foreignColumnName = "ranking_id")
    private String rankingid;
    @DatabaseField(columnName = "ranking_songid",foreign = true,foreignColumnName = "song_id")
    private String rankingSongid;
    @DatabaseField(columnName = "hot")
    private int hot;

    public String getRankingid() {
        return rankingid;
    }

    public String getRankingSongid() {
        return rankingSongid;
    }

    public int getHot() {
        return hot;
    }

    public void setRankingid(String rankingid) {
        this.rankingid = rankingid;
    }

    public void setRankingSongid(String rankingSongid) {
        this.rankingSongid = rankingSongid;
    }

    public void setHot(int hot) {
        this.hot = hot;
    }

    public ranking_item() {
    }

    public ranking_item(String rankingid, String rankingSongid, int hot) {
        this.rankingid = rankingid;
        this.rankingSongid = rankingSongid;
        this.hot = hot;
    }
}
