package main

import (
	"chat-app-golang/internal/initializers"
	"chat-app-golang/internal/routes"
	"log"
)

func main() {
	app := initializers.InitFiber()

	routes.RegisterRoutes(app)

	log.Fatal(app.Listen(":3000"))

}
