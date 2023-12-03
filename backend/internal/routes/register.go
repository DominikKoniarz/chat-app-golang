package routes

import (
	"chat-app-golang-backend/internal/controllers"
	"chat-app-golang-backend/internal/initializers"
	"log"
	"os"
	"path/filepath"

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

	htmlFilePath, err := filepath.Abs(filepath.Join("..", "frontend", "dist", "index.html"))
	if err != nil {
		log.Fatal(err)
	}

	assetsPath, err := filepath.Abs(filepath.Join("..", "frontend", "dist", "assets"))
	if err != nil {
		log.Fatal(err)
	}

	if os.Getenv("GO_ENV") == "production" {
		router.LoadHTMLFiles(htmlFilePath)

		router.GET("/", controllers.SendRootPage)
		router.GET("/chat", controllers.SendRootPage)
		router.GET("/chat/:id", controllers.SendRootPage)
		router.GET("/login", controllers.SendRootPage)

		router.Static("/assets", assetsPath)
	}

	router.NoRoute(controllers.SendNotFound)

}
