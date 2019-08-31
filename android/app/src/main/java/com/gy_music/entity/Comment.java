package com.gy_music.entity;


import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

import java.sql.Date;

@DatabaseTable(tableName = "Comment")
public class Comment {
    @DatabaseField(columnName = "userid",foreign = true,foreignColumnName = "userId")
    private User user;
    @DatabaseField(columnName = "targetId")
    private String targetId;
    @DatabaseField(columnName = "targetType")
    private int targetType;//评论类型，1为歌曲，2为专辑，3为歌单
    @DatabaseField(columnName = "commentText",canBeNull = true)
    private String commentText;
    @DatabaseField(columnName = "commentDate")
    private Date commentDate;

    public User getUser() {
        return user;
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

    public void setUser(User user) {
        this.user = user;
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

    public Comment() {
    }

    public Comment(User user, String targetId, int targetType, String commentText, Date commentDate) {
        this.user = user;
        this.targetId = targetId;
        this.targetType = targetType;
        this.commentText = commentText;
        this.commentDate = commentDate;
    }
}
