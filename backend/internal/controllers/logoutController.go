package controllers

import (
	"chat-app-golang-backend/internal/initializers"
	"chat-app-golang-backend/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleLogout(ctx *gin.Context) {
	db := initializers.GetDbInstance()

	cookieValue, err := ctx.Cookie("chat-app-golang-refresh-token")
	if err != nil {
		ctx.AbortWithStatus(http.StatusNoContent)
		return
	}

	foundUser := models.User{}
	result := db.First(&foundUser, "refresh_token = ?", cookieValue)
	if result.Error != nil {
		ctx.AbortWithStatus(http.StatusForbidden)
		return
	}

	foundUser.RefreshToken = ""
	db.Save(&foundUser)

	ctx.SetCookie("chat-app-golang-refresh-token", "", -1, "/", "localhost", true, true)
	ctx.AbortWithStatus(http.StatusNoContent)
}
