import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { OvernightSleepData } from '../../data/overnight-sleep-data';

import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

  public dayResult: Observable<any> = undefined;
  public nightResult: Observable<any> = undefined;

  public haveDay: boolean;
  public haveNight: boolean;

  public palette = ['success', 'success', 'secondary', 'primary', 'tertiary', 'warning', 'danger'];
  public datestring: string;
  public firsttime: Date;
  public customPickerOptions: any;
  constructor(public modalController: ModalController,
  public liveService: FirebaseService) { }

  ngOnInit() {
    this.firsttime = new Date((new Date()).toISOString());
    this.datestring = this.firsttime.toISOString();
    this.haveDay = false;
    this.haveNight = false;
  }

  dismiss() {
    this.modalController.dismiss('cancel');
  }

  searchAll() {
    this.searchNightDate();
    this.searchDayDate();
  }

  searchDayDate() {
    this.dayResult = this.liveService.getDayData().pipe(map(array =>
      // return array.reverse();
      array.reverse().map(ele => {
        return new StanfordSleepinessData(ele.scale,
          new Date(ele.logAt.seconds * 1000),
          ele.id);
      }).filter( entry => {
        return entry.loggedAt.toLocaleDateString('en-US') === (new Date(this.datestring)).toLocaleDateString('en-US');
      })
    ), tap(array => {
      this.haveDay = array.length > 0;
    }));
  }

  searchNightDate() {
    this.nightResult = this.liveService.getNightData().pipe(map(array =>
      // return array.reverse();
      array.reverse().map(ele => {
        return new OvernightSleepData(new Date(ele.start.seconds * 1000),
          new Date(ele.end.seconds * 1000),
          ele.id);
      }).filter( entry => {
        return entry.start.toLocaleDateString('en-US') === (new Date(this.datestring)).toLocaleDateString('en-US');
      })
    ), tap(array => {
      this.haveNight = array.length > 0;
    }));
  }

}
