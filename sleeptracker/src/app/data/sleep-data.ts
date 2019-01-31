import * as shortid from 'shortid';

export class SleepData {
	public id: string;
	public loggedAt: Date;

	constructor( public idin: string = '') {
		// Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
		if (this.idin !== '') {
			this.id = this.idin;
		} else {
			this.id = shortid();
		}
		this.loggedAt = new Date();
	}

	summaryString(): string {
		return 'Unknown sleep data';
	}

	dateString(): string {
		return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}
