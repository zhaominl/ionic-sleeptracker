import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Observable } from 'rxjs';
import { NativeService } from './native.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  dcollection: AngularFirestoreCollection;
  ncollection: AngularFirestoreCollection;

  constructor(public db: AngularFirestore,
    public nativeService: NativeService) {
    this.dcollection = db.collection('dayInput');
    this.ncollection = db.collection('nightInput');
  }

  addSleepLog(sleepLog: OvernightSleepData) {
    const sent = sleepLog.returnObject();
    // TODO: implement this function to add sleep logs
    this.ncollection.add(sent).then((reference) => {
      reference.update({'id': reference.id});
      console.log('night log success' + reference);
      this.nativeService.addNotify();
    });
  }

  addDayLog(sleepLog: StanfordSleepinessData) {
    const sent = sleepLog.returnObject();
    // TODO: implement this function to add sleep logs
    this.dcollection.add(sent).then((reference) => {
      reference.update({'id': reference.id});
      console.log('day log success' + reference);
      this.nativeService.addNotify();
    });
  }

  countLength(ifDay: boolean) {
    if (ifDay) {
      return this.dcollection.get();
    } else {
      return this.ncollection.get();
    }
  }

  getSleepLogs(): Observable<DocumentData[]> {
    // TODO: implement this function to retrieve sleep logs
    return undefined;
  }

  getDayData(): Observable<any[]> {
    return this.dcollection.valueChanges();
  }

  getNightData(): Observable<any[]> {
    return this.ncollection.valueChanges();
  }

  deleteDayData( reference: string) {
    // const reff = this.db.collection<any>('dayInput', ref => {
    //   return ref.where('id', '==', id);
    // }); // .where('id', '==', id);
    // console.log(reff.ref, id);
    // this.dcollection.doc()
    this.dcollection.doc(reference).delete().then(() => {
      console.log('The document at ' + reference + 'no longer exists');
      this.nativeService.deleteNotify();
      });
  }

  deleteNightData( reference: string) {
    this.ncollection.doc(reference).delete().then(() => {
      console.log('The document at ' + reference + 'no longer exists');
      this.nativeService.deleteNotify();
      });
  }
}
