package models

import (
	"time"
)

type User struct {
	UserID       uint      `gorm:"primaryKey;autoIncrement:true;column:user_id" json:"userID"`
	Username     string    `gorm:"column:username;not null;type:varchar(128)" json:"username"`
	Password     string    `gorm:"column:password;not null;type:varchar(512)" json:"-"`
	RefreshToken string    `gorm:"column:refresh_token;type:varchar(512)" json:"-"`
	CreatedAt    time.Time `gorm:"column:created_at" json:"-"`
	UpdatedAt    time.Time `gorm:"column:updated_at" json:"-"`
}
