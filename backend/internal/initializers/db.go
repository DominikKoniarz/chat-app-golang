package initializers

import (
	"fmt"
	"log"
	"os"
	"sync"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var host string = "127.0.0.1:3306"
var user string = "root"
var password string = ""
var dbname string = "chat-app-golang"

var db *gorm.DB
var once sync.Once

func GetDbInstance() *gorm.DB {
	once.Do(func() {
		if os.Getenv("GO_ENV") == "production" {
			host = os.Getenv("DB_HOST")
			user = os.Getenv("DB_USER")
			password = os.Getenv("DB_PASSWORD")
			dbname = os.Getenv("DB_NAME")
		}

		dsn := fmt.Sprintf("%v:%v@tcp(%v)/%v?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, dbname)

		dbConnection, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Fatal(err)
		}

		db = dbConnection
	})

	return db
}
