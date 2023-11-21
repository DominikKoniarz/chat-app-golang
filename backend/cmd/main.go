package main

import (
	"chat-app-golang-backend/internal/initializers"
	"chat-app-golang-backend/internal/models"
	"chat-app-golang-backend/internal/routes"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// random strings
	os.Setenv("ACCESS_TOKEN_SECRET", "2b7e151628aed2a6abf7158809cf4f3c")
	os.Setenv("REFRESH_TOKEN_SECRET", "8d48a0f9c56732b1e72d9e1362c789a5")

	db := initializers.GetDbInstance()
	models.MigrateAll(db)

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		// AllowOrigins:     []string{"https://foo.com"},
		// AllowMethods:     []string{"PUT", "PATCH"},
		AllowHeaders: []string{"Authorization"},
		// ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
	}))

	routes.RegisterRoutes(router)

	log.Fatal(router.Run(":3000"))
}
