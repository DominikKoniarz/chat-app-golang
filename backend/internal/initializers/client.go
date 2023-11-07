package initializers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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
	hub           *Hub
	conn          *websocket.Conn
	messageToSend chan []PrivateMessage
	ID            string
}

type PrivateMessage struct {
	SenderID       string
	RecieverID     string `json:"receiverID"`
	Event          string `json:"event"`
	MessageContent string `json:"messageContent"`
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

		parsedMessage := PrivateMessage{}

		err = json.Unmarshal(message, &parsedMessage)
		if err != nil {
			fmt.Println("Json parsing error", err)
			continue
		}

		if len(parsedMessage.Event) == 0 || len(parsedMessage.RecieverID) == 0 || len(parsedMessage.MessageContent) == 0 {
			fmt.Println("Lack of data!")
			continue
		}

		parsedMessage.SenderID = c.ID

		c.hub.private <- parsedMessage

		// c.hub.broadcast <- message
	}
}

func (c *Client) writePipe() {
	defer c.unregisterAndClose()

	for {
		message, ok := <-c.messageToSend

		if !ok {
			return
		}

		fmt.Println(message, "message in write reader")
		// c.conn.WriteMessage(websocket.TextMessage, message)
	}
}

func WSHandler(hub *Hub, ctx *gin.Context) {
	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithStatus(http.StatusInternalServerError)
	}

	clientID := uuid.NewString()
	client := &Client{hub: hub, conn: conn, ID: clientID, messageToSend: make(chan []PrivateMessage)}

	client.hub.register <- client

	go client.readPipe()
	go client.writePipe()
}
