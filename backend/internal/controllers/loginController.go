package controllers

import (
	"chat-app-golang-backend/internal/initializers"
	"chat-app-golang-backend/internal/models"
	"chat-app-golang-backend/internal/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginData struct {
	Username string `json:"username" form:"username" binding:"required"`
	Password string `json:"password" form:"password" binding:"required"`
}

func HandleLogin(ctx *gin.Context) {
	var db *gorm.DB = initializers.GetDbInstance()

	var jsonData LoginData
	if err := ctx.ShouldBindJSON(&jsonData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Bad request!"})
		return
	}

	foundUser := models.User{}
	result := db.First(&foundUser, "username = ?", jsonData.Username)

	if result.Error != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "This username dosen't exist!"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(jsonData.Password))
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Password is not correct!"})
		return
	}

	accessTokenClaims := utils.UserClaims{
		UserID: foundUser.UserID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(30 * time.Minute)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	refreshTokenClaims := utils.UserClaims{
		UserID: foundUser.UserID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	accessToken, err := utils.NewAccessToken(accessTokenClaims)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Access token generation error!"})
		return
	}

	refreshToken, err := utils.NewRefreshToken(refreshTokenClaims)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Refresh token generation error!"})
		return
	}

	foundUser.RefreshToken = refreshToken
	db.Save(&foundUser)

	var domain string = utils.GetRefreshTokenCookieDomain()

	ctx.SetCookie("chat-app-golang-refresh-token", refreshToken, 60*60*24, "/", domain, true, true)
	ctx.JSON(http.StatusOK, gin.H{
		"accessToken": accessToken,
	})
}
