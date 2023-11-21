package initializers

import (
	"chat-app-golang-backend/internal/utils"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:    1024,
	WriteBufferSize:   1024,
	EnableCompression: true,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Client struct {
	hub             *Hub
	conn            *websocket.Conn
	messageToSend   chan PrivateMessage
	UserID          uint
	isAuthenticated bool
}

type PrivateMessage struct {
	SenderID      uint   `json:"senderID,omitempty"`
	RecieverID    uint   `json:"receiverID"`
	Event         string `json:"event,omitempty"`
	MessageString string `json:"messageString"`
}

type ErrorResponse struct {
	Event       string `json:"event"`
	ErrorString string `json:"errorString"`
}

type AuthResponseMessage struct {
	Event         string `json:"event"`
	Authenticated bool   `json:"authenticated"`
	AuthStatus    string `json:"authStatus,omitempty"`
}

type AuthRequestMessage struct {
	Token string `json:"token"`
}

func handleWSAuth(message []byte) (uint, error) {
	parsedAuthMessage := AuthRequestMessage{}

	err := json.Unmarshal(message, &parsedAuthMessage)
	if err != nil {
		return 0, errors.New("no token found in message")
	}

	claims := &utils.UserClaims{}

	token, err := jwt.ParseWithClaims(parsedAuthMessage.Token, claims, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("ACCESS_TOKEN_SECRET")), nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return 0, errors.New("auth token is invalid")
		} else if err == jwt.ErrTokenExpired {
			return 0, errors.New("auth token expired")
		}

		return 0, errors.New("auth token parsing error")
	}

	if !token.Valid {
		return 0, errors.New("auth token is invalid")
	}

	return claims.UserID, nil
}

func (c *Client) unregisterAndClose() {
	c.hub.unregister <- c
	c.conn.Close()
}

func (c *Client) readPipe() {
	defer c.unregisterAndClose()

	for {
		_, message, err := c.conn.ReadMessage()

		if err != nil {
			fmt.Println(err)

			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				fmt.Println("Connection unexpected error!", err)
			}

			break
		}

		fmt.Println(string(message))

		if !c.isAuthenticated {
			authResponseMessage := AuthResponseMessage{Authenticated: false, Event: "auth"}

			userID, err := handleWSAuth(message)
			if err != nil {
				authResponseMessage.AuthStatus = err.Error()

				jsonAuthResponseMessage, err := json.Marshal(&authResponseMessage)

				if err != nil {
					fmt.Println(err)
					break
				}

				c.conn.WriteMessage(websocket.TextMessage, []byte(jsonAuthResponseMessage))
				break
			}
			c.UserID = userID
			authResponseMessage.Authenticated = true

			c.isAuthenticated = true
			c.conn.WriteJSON(&authResponseMessage)
		} else {
			parsedMessage := PrivateMessage{RecieverID: 6}

			err = json.Unmarshal(message, &parsedMessage)
			if err != nil {
				jsonErrorResponse, err := json.Marshal(&ErrorResponse{Event: "error", ErrorString: err.Error()})

				if err != nil {
					fmt.Println(err)
					break
				}

				c.conn.WriteMessage(websocket.TextMessage, jsonErrorResponse)
				continue
			}

			if len(parsedMessage.MessageString) == 0 {
				jsonErrorResponse, err := json.Marshal(&ErrorResponse{Event: "error", ErrorString: "Message string is required!"})

				if err != nil {
					fmt.Println(err)
					break
				}

				c.conn.WriteMessage(websocket.TextMessage, jsonErrorResponse)
				continue
			}

			if parsedMessage.RecieverID == 0 {
				jsonErrorResponse, err := json.Marshal(&ErrorResponse{Event: "error", ErrorString: "Receiver ID is required!"})

				if err != nil {
					fmt.Println(err)
					break
				}

				c.conn.WriteMessage(websocket.TextMessage, jsonErrorResponse)
				continue
			}

			parsedMessage.SenderID = c.UserID
			parsedMessage.Event = "message"

			c.hub.private <- parsedMessage
		}

	}
}

func (c *Client) writePipe() {
	defer c.unregisterAndClose()

	for {
		message, ok := <-c.messageToSend

		if !ok {
			return
		}

		jsonMessage, err := json.Marshal(&message)
		if err != nil {
			fmt.Println(err)
		}
		c.conn.WriteMessage(websocket.TextMessage, jsonMessage)
	}
}

func WSHandler(hub *Hub, ctx *gin.Context) {
	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	client := &Client{hub: hub, conn: conn, messageToSend: make(chan PrivateMessage), isAuthenticated: false}

	client.hub.register <- client

	go client.readPipe()
	go client.writePipe()
}
