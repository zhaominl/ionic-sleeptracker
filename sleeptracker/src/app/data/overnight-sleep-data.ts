import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart: Date;
	private sleepEnd: Date;

	constructor(sleepStart: Date, sleepEnd: Date, id: string = '') {
		super(id);
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	get start(): Date {
		return this.sleepStart;
	}

	get end(): Date {
		return this.sleepEnd;
	}
	summaryString(): string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;

		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000 * 60 * 60)) + " hours, " + Math.floor(difference_ms / (1000 * 60) % 60) + " minutes.";
	}

	dateString(): string {
		return this.sleepStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
	}

	returnObject() {
		const sent = {
			'start': this.sleepStart,
			'end': this.sleepEnd,
			'logAt': this.loggedAt,
			'id': this.id
		};
		return sent;
	}
}
