package controllers

import (
	"chat-app-golang-backend/internal/initializers"
	"chat-app-golang-backend/internal/models"
	"chat-app-golang-backend/internal/utils"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func HandleRefreshToken(ctx *gin.Context) {
	db := initializers.GetDbInstance()

	cookieValue, err := ctx.Cookie("chat-app-golang-refresh-token")
	fmt.Println(cookieValue)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Refresh token cookie required!",
		})
		return
	}

	foundUser := models.User{}
	result := db.First(&foundUser, "refresh_token = ?", cookieValue)
	if result.Error != nil {
		ctx.AbortWithStatus(http.StatusForbidden)
		return
	}

	claims := &utils.UserClaims{}

	refreshToken, err := jwt.ParseWithClaims(cookieValue, claims, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("REFRESH_TOKEN_SECRET")), nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if !refreshToken.Valid {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	if claims.UserID != foundUser.UserID {
		ctx.AbortWithStatus(http.StatusForbidden)
		return
	}

	newAccessTokenClaims := utils.UserClaims{
		UserID: foundUser.UserID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(30 * time.Minute)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	newRefreshTokenClaims := utils.UserClaims{
		UserID: foundUser.UserID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	newAccessToken, err := utils.NewAccessToken(newAccessTokenClaims)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Access token generation error!"})
		return
	}

	newRefreshToken, err := utils.NewRefreshToken(newRefreshTokenClaims)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Refresh token generation error!"})
		return
	}

	foundUser.RefreshToken = newRefreshToken
	db.Save(&foundUser)

	ctx.SetCookie("chat-app-golang-refresh-token", newRefreshToken, 60*60*24, "/", "localhost", true, true)
	ctx.JSON(http.StatusOK, gin.H{
		"accessToken": newAccessToken,
	})
}
