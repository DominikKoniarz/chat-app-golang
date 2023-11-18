package utils

import (
	"os"

	"github.com/golang-jwt/jwt/v5"
)

type UserClaims struct {
	UserID uint `json:"userID"`
	jwt.RegisteredClaims
}

func NewAccessToken(claims UserClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(os.Getenv("ACCESS_TOKEN_SECRET")))
}

func NewRefreshToken(claims UserClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(os.Getenv("REFRESH_TOKEN_SECRET")))
}
