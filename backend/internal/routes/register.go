package routes

import (
	"chat-app-golang-backend/internal/controllers"
	"chat-app-golang-backend/internal/initializers"
	"os"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	hub := initializers.InitHub()
	go hub.Run()

	router.GET("/ws", func(ctx *gin.Context) {
		initializers.WSHandler(hub, ctx)
	})

	router.POST("/register", controllers.AddNewUser)
	router.POST("/login", controllers.HandleLogin)
	router.GET("/refresh-token", controllers.HandleRefreshToken)
	router.GET("/logout", controllers.HandleLogout)
	router.GET("/users", controllers.GetAllUsers)
	// gin release
	if os.Getenv("GO_ENV") == "production" {
		router.LoadHTMLFiles("../frontend/dist/index.html")

		router.GET("/", controllers.SendRootPage)
		router.GET("/chat", controllers.SendRootPage)
		router.GET("/login", controllers.SendRootPage)

		router.Static("/assets", "../frontend/dist/assets")
	}

	router.NoRoute(controllers.SendNotFound)

}
