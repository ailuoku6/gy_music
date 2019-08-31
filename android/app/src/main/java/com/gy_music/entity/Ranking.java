package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

import java.util.Date;

@DatabaseTable(tableName = "Ranking")
public class Ranking {
    @DatabaseField(columnName = "rankingId",id = true)
    private String rankingId;
    @DatabaseField(columnName = "rankingName")
    private String rankingName;
    @DatabaseField(columnName = "updateDate")
    private Date updateDate;

    public String getRankingId() {
        return rankingId;
    }

    public String getRankingName() {
        return rankingName;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setRankingId(String rankingId) {
        this.rankingId = rankingId;
    }

    public void setRankingName(String rankingName) {
        this.rankingName = rankingName;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Ranking() {
    }

    public Ranking(String rankingId, String rankingName, Date updateDate) {
        this.rankingId = rankingId;
        this.rankingName = rankingName;
        this.updateDate = updateDate;
    }
}
