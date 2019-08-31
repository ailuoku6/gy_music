package com.gy_music.entity;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "user_list")
public class User {
    @DatabaseField(columnName = "userId",id = true)
    private String userId;
    @DatabaseField(columnName = "userName")
    private String userName;
    @DatabaseField(columnName = "password")
    private String password;
    @DatabaseField(columnName = "role") //0为普通用户，1为管理员用户
    private String role;
    @DatabaseField(columnName = "avatar")
    private String avatar;
    @DatabaseField(columnName = "balance")
    private int balance;


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public User() {
    }

    public User(String userId, String userName, String password, String role, String avatar, int balance) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.avatar = avatar;
        this.balance = balance;
    }
}
