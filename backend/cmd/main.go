package main

import (
	"chat-app-golang-backend/internal/initializers"
	"chat-app-golang-backend/internal/models"
	"chat-app-golang-backend/internal/routes"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	db := initializers.GetDbInstance()
	models.MigrateAll(db)

	router := gin.Default()

	var AllowedOrigins []string

	if os.Getenv("GO_ENV") != "production" {
		AllowedOrigins = []string{"http://localhost:5173", "http://127.0.0.1:5173"}
	} else {
		AllowedOrigins = []string{"https://chatappgolang.dominikkoniarz.pl/"}
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins: AllowedOrigins,
		// AllowMethods:     []string{"PUT", "PATCH"},
		AllowHeaders: []string{"Authorization"},
		// ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
	}))

	routes.RegisterRoutes(router)

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "3000"
	}

	log.Fatal(router.Run(":" + port))
	fmt.Println("Web server started on port:", port)
}
