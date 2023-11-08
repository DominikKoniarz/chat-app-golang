package controllers

import (
	"github.com/gin-gonic/gin"
)

func SendNotFound(ctx *gin.Context) {
	ctx.JSON(404, gin.H{"message": "Not found!"})
}
