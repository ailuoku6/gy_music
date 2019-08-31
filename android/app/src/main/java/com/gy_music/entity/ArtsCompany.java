package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "arts_company")
public class ArtsCompany {
    @DatabaseField(columnName = "artsCompanyId",id = true)
    private String artsCompanyId;
    @DatabaseField(columnName = "owner") //公司法人
    private String owner;
    @DatabaseField(columnName = "artsCompanyIntro")
    private String artsCompanyIntro;
    @DatabaseField(columnName = "artsCompanyName")
    private String artsCompanyName;

    public String getArtsCompanyId() {
        return artsCompanyId;
    }

    public String getOwner() {
        return owner;
    }

    public String getArtsCompanyIntro() {
        return artsCompanyIntro;
    }

    public String getArtsCompanyName() {
        return artsCompanyName;
    }

    public void setArtsCompanyId(String artsCompanyId) {
        this.artsCompanyId = artsCompanyId;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setArtsCompanyIntro(String artsCompanyIntro) {
        this.artsCompanyIntro = artsCompanyIntro;
    }

    public void setArtsCompanyName(String artsCompanyName) {
        this.artsCompanyName = artsCompanyName;
    }

    public ArtsCompany() {
    }

    public ArtsCompany(String artsCompanyId, String owner, String artsCompanyIntro, String artsCompanyName) {
        this.artsCompanyId = artsCompanyId;
        this.owner = owner;
        this.artsCompanyIntro = artsCompanyIntro;
        this.artsCompanyName = artsCompanyName;
    }
}
