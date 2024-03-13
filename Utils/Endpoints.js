export class Endpoints {
	static api = "https://pure-forest-56731-05910aa4d1e9.herokuapp.com/api"
	static listPolls = this.api + "/polls"
	static vote = (id) => this.api + "/polls/" + id
	static newPoll = this.api + "/polls"
}
