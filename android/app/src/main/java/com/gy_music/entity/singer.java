package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "singer")
public class singer {
    @DatabaseField(columnName = "singer_id",id = true)
    private String singerId;
    @DatabaseField(columnName = "company_id",foreign = true,foreignColumnName = "arts_company_id")
    private String companyId;
    @DatabaseField(columnName = "singer_name")
    private String singerName;
    @DatabaseField(columnName = "singer_sex")
    private String singerSex;
    @DatabaseField(columnName = "singer_avatar")
    private String singerAvatar;
    @DatabaseField(columnName = "singer_intro")
    private String singerIntro;

    public String getSingerId() {
        return singerId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public String getSingerName() {
        return singerName;
    }

    public String getSingerSex() {
        return singerSex;
    }

    public String getSingerAvatar() {
        return singerAvatar;
    }

    public String getSingerIntro() {
        return singerIntro;
    }

    public void setSingerId(String singerId) {
        this.singerId = singerId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public void setSingerName(String singerName) {
        this.singerName = singerName;
    }

    public void setSingerSex(String singerSex) {
        this.singerSex = singerSex;
    }

    public void setSingerAvatar(String singerAvatar) {
        this.singerAvatar = singerAvatar;
    }

    public void setSingerIntro(String singerIntro) {
        this.singerIntro = singerIntro;
    }

    public singer() {
    }

    public singer(String singerId, String companyId, String singerName, String singerSex, String singerAvatar, String singerIntro) {
        this.singerId = singerId;
        this.companyId = companyId;
        this.singerName = singerName;
        this.singerSex = singerSex;
        this.singerAvatar = singerAvatar;
        this.singerIntro = singerIntro;
    }
}
