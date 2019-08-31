package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "Singer")
public class Singer {
    @DatabaseField(columnName = "singerId",id = true)
    private String singerId;
    @DatabaseField(columnName = "companyId",foreign = true,foreignColumnName = "artsCompanyId")
    private ArtsCompany artsCompany;
    @DatabaseField(columnName = "singerName")
    private String singerName;
    @DatabaseField(columnName = "singerSex")
    private String singerSex;
    @DatabaseField(columnName = "singerAvatar")
    private String singerAvatar;
    @DatabaseField(columnName = "singerIntro")
    private String singerIntro;

    public String getSingerId() {
        return singerId;
    }

    public ArtsCompany getArtsCompany() {
        return artsCompany;
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

    public void setArtsCompany(ArtsCompany artsCompany) {
        this.artsCompany = artsCompany;
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

    public Singer() {
    }

    public Singer(String singerId, ArtsCompany artsCompany, String singerName, String singerSex, String singerAvatar, String singerIntro) {
        this.singerId = singerId;
        this.artsCompany = artsCompany;
        this.singerName = singerName;
        this.singerSex = singerSex;
        this.singerAvatar = singerAvatar;
        this.singerIntro = singerIntro;
    }
}
