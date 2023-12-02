package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SendRootPage(ctx *gin.Context) {
	ctx.HTML(http.StatusAccepted, "index.html", nil)
}
