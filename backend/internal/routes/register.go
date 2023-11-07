package routes

import (
	"chat-app-golang-backend/internal/controllers"
	"chat-app-golang-backend/internal/initializers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	hub := initializers.InitHub()
	go hub.Run()

	router.GET("/ws", func(ctx *gin.Context) {
		initializers.WSHandler(hub, ctx)
	})

	router.POST("/register", controllers.AddNewUser)
}
