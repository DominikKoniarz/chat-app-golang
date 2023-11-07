package models

import (
	"gorm.io/gorm"
)

func MigrateAll(db *gorm.DB) {
	db.AutoMigrate(User{})
}
