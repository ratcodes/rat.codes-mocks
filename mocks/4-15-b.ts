type Token = "plaintext" | "url" | "emoji" | "spoiler";

type Update = {
	tokens: Token[];
	message: string;
	user: User;
	date: Date; // current date of this update
};

type User = {
	id: number;
	name: string;
};

///

class UserUpdates {
	constructor() {
		this.userUpdates = {};
	}

	addUserUpdate(update: Update) {
		this.userUpdates[update.user.name].postCount++;
	}

	createUser(update: Update) {
		let postCount = 1;
		const m = update.message;
		const d = update.date;
		this.userUpdates[update.user.name] = { postCount, m, d };
	}
}

const updates = new UserUpdates();

// All unique strings
const badWords: string[] = [];

// Runs whenever something happens in the server
function onUpdateReceived(update: Update) {
	if (!updates.userUpdates[update.user.name]) {
		updates.createUser(update);
	} else {
		updates.addUserUpdate(update);
	}
}
