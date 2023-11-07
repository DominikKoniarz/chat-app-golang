package models

import (
	"time"
)

type User struct {
	UserID    uint      `gorm:"primaryKey;autoIncrement:true;column:user_id"`
	Username  string    `gorm:"column:username;not null;type:varchar(128)"`
	Password  string    `gorm:"column:password;not null;type:varchar(512)"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
}
