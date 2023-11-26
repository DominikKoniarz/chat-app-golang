type UserMessage = {
	timestamp: Date;
	senderUsername: string;
	messageString: string;
};

export type ChatUser = {
	userID: number;
	username: string;
	messages: UserMessage[];
};
