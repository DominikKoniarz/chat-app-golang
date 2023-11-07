package main

import (
	"chat-app-golang-backend/internal/initializers"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	hub := initializers.InitHub()
	go hub.Run()

	router.GET("/ws", func(ctx *gin.Context) {
		initializers.WSHandler(hub, ctx)
	})

	log.Fatal(router.Run(":3000"))
}
