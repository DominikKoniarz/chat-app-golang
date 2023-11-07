package main

import (
	"chat-app-golang-backend/internal/initializers"
	"chat-app-golang-backend/internal/models"
	"chat-app-golang-backend/internal/routes"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := initializers.GetDbInstance()
	models.MigrateAll(db)

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		// AllowOrigins:     []string{"https://foo.com"},
		// AllowMethods:     []string{"PUT", "PATCH"},
		// AllowHeaders:     []string{"Origin"},
		// ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
	}))

	routes.RegisterRoutes(router)

	log.Fatal(router.Run(":3000"))
}
