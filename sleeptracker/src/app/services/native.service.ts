import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

// If a plugin is not implemented with Ionic Native, it may use this cordova variable.
declare var cordova;

@Injectable({
 providedIn: 'root'
})
export class NativeService {

	constructor(private platform: Platform, private deviceMotion: DeviceMotion) {
		this.platform.ready().then(() => {
			if (this.platform.is('cordova')) {
				return;
			}
		});
	}

	addNotify() {
		// this.localNotifications.schedule({
		cordova.plugins.notification.local.schedule({
			id: 2,
			text: 'Just added data at ' + new Date().toLocaleDateString('en-US'),
			data: { secret: 'No idea why i need a secret data' }
		});
	}

	deleteNotify() {
		// this.localNotifications.schedule({
		cordova.plugins.notification.local.schedule({
			id: 2,
			text: 'Just delete data at ' + new Date().toLocaleDateString('en-US'),
			data: { secret: 'No idea why i need a secret data' }
		});
	}
}
