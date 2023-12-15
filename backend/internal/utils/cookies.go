package utils

import "os"

func GetRefreshTokenCookieDomain() string {
	if os.Getenv("GO_ENV") != "production" {
		return "localhost"
	} else {
		return os.Getenv("RT_COOKIE_DOMAIN")
	}
}
