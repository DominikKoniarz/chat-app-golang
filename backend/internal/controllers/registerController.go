package controllers

import (
	"chat-app-golang-backend/internal/initializers"
	"chat-app-golang-backend/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var db *gorm.DB = initializers.GetDbInstance()

type Register struct {
	Username string `json:"username" form:"username" binding:"required"`
	Password string `json:"password" form:"password" binding:"required"`
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}

func AddNewUser(ctx *gin.Context) {
	var json Register
	if err := ctx.ShouldBindJSON(&json); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Bad request!"})
		return
	}

	foundUser := db.First(&models.User{}, "username = ?", json.Username)

	if foundUser.Error == nil {
		ctx.JSON(http.StatusForbidden, gin.H{"message": "This user is already taken!"})
		return
	}

	hash, err := hashPassword(json.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error!"})
		return
	}

	newUser := models.User{Username: json.Username, Password: hash}

	db.Create(&newUser)

	ctx.Writer.WriteHeader(201)
}
