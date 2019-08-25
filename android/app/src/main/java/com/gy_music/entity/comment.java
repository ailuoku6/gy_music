package com.gy_music.entity;


import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

import java.sql.Date;

@DatabaseTable(tableName = "comment")
public class comment {
    @DatabaseField(columnName = "userid",foreign = true,foreignColumnName = "user_id")
    private String userid;
    @DatabaseField(columnName = "target_id")
    private String targetId;
    @DatabaseField(columnName = "target_type")
    private int targetType;//评论类型，1为歌曲，2为专辑，3为歌单
    @DatabaseField(columnName = "comment_text",canBeNull = true)
    private String commentText;
    @DatabaseField(columnName = "comment_date")
    private Date commentDate;

    public String getUserid() {
        return userid;
    }

    public String getTargetId() {
        return targetId;
    }

    public int getTargetType() {
        return targetType;
    }

    public String getCommentText() {
        return commentText;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }

    public void setTargetType(int targetType) {
        this.targetType = targetType;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

    public comment() {
    }

    public comment(String userid, String targetId, int targetType, String commentText, Date commentDate) {
        this.userid = userid;
        this.targetId = targetId;
        this.targetType = targetType;
        this.commentText = commentText;
        this.commentDate = commentDate;
    }
}
