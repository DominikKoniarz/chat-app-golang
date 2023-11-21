package controllers

import (
	"chat-app-golang-backend/internal/initializers"
	"chat-app-golang-backend/internal/models"
	"chat-app-golang-backend/internal/utils"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func GetAllUsers(ctx *gin.Context) {
	db := initializers.GetDbInstance()

	authorizationHeader := ctx.GetHeader("Authorization")
	receivedToken := strings.Split(authorizationHeader, " ")[1]

	claims := &utils.UserClaims{}

	token, err := jwt.ParseWithClaims(receivedToken, claims, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("ACCESS_TOKEN_SECRET")), nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"message": "Token is invalid!",
			})
		}

		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Token expired!",
		})
	}

	if !token.Valid {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Token is invalid!",
		})
	}

	users := []models.User{}
	result := db.Find(&users)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal Server Error!",
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": users,
	})
}
