package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "arts_company")
public class artsCompany {
    @DatabaseField(columnName = "arts_company_id")
    private String artsCompanyId;
    @DatabaseField(columnName = "owner")
    private String owner;
    @DatabaseField(columnName = "arts_company_intro")
    private String artsCompanyIntro;
    @DatabaseField(columnName = "arts_company_name")
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

    public artsCompany() {
    }

    public artsCompany(String artsCompanyId, String owner, String artsCompanyIntro, String artsCompanyName) {
        this.artsCompanyId = artsCompanyId;
        this.owner = owner;
        this.artsCompanyIntro = artsCompanyIntro;
        this.artsCompanyName = artsCompanyName;
    }
}
