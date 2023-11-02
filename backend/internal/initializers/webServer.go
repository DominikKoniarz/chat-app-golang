package initializers

import "github.com/gofiber/fiber/v2"

func InitFiber() *fiber.App {
	app := fiber.New(fiber.Config{
		Prefork: true,
	})

	return app
}
