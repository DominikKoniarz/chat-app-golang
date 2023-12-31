package initializers

import "fmt"

type Hub struct {
	clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
	private    chan PrivateMessage
	// broadcast  chan []byte
}

func InitHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		private:    make(chan PrivateMessage),
		// broadcast:  make(chan []byte),
	}
}

func (h *Hub) Run() {
	fmt.Println("Starting ws hub")
	for {
		select {
		case client := <-h.register:
			// var filteredClientsIDs []uint

			// for registeredClient := range h.clients {
			// 	filteredClientsIDs = append(filteredClientsIDs, registeredClient.UserID)
			// }

			h.clients[client] = true

			// fmt.Println(filteredClientsIDs)
			// fmt.Println(h.clients, "client register")
		case client := <-h.unregister:
			_, ok := h.clients[client]
			if ok {
				delete(h.clients, client)
				close(client.messageToSend)
			}
		case privateMessage := <-h.private:
			for client := range h.clients {
				if client.UserID == privateMessage.RecieverID {
					// fmt.Println(client.UserID)
					client.messageToSend <- privateMessage
					break
				}
			}
		}
	}
}
