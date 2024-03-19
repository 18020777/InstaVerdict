export class Endpoints {
	// The API base endpoint - Click on the link to see the documentation
	static api = "https://pure-forest-56731-05910aa4d1e9.herokuapp.com/api"
	// The endpoint to list all the polls - GET request
	static listPolls = this.api + "/polls"
	// The endpoint to vote for a poll - PATCH request
	static vote = (id, index) => `${this.api}/polls/${id}/vote/${index}`
	// The endpoint to create a new poll - POST request
	static newPoll = this.api + "/polls"
}
