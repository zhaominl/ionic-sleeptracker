import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private static LoadDefaultData = true;
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor() {
    if (SleepService.LoadDefaultData) {
      this.addDefaultData();
      SleepService.LoadDefaultData = false;
    }
  }

  private addDefaultData() {
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 01:03:00'), new Date('November 12, 2018 09:25:00')));
    this.logOvernightData(new OvernightSleepData(new Date('November 13, 2018 01:00:00'), new Date('November 13, 2018 09:00:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('November 12, 2018 14:38:00')));
    this.logSleepinessData(new StanfordSleepinessData(2, new Date('November 13, 2018 14:38:00')));
    this.logSleepinessData(new StanfordSleepinessData(7, new Date('November 14, 2018 14:38:00')));
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 23:11:00'), new Date('November 13, 2018 08:03:00')));
  }

  public logOvernightData(sleepData: OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
  }

  public deleteOvernightData(deleteData: OvernightSleepData) {
    for (let i = 0; i < SleepService.AllOvernightData.length; i++) {
      if (SleepService.AllOvernightData[i].id === deleteData.id) {
        SleepService.AllOvernightData.splice(i, 1);
        break;
      }
    }
  }

  public deleteSleppinessData(deleteData: StanfordSleepinessData) {
    for (let i = 0; i < SleepService.AllSleepinessData.length; i++) {
      if (SleepService.AllSleepinessData[i].id === deleteData.id) {
        SleepService.AllSleepinessData.splice(i, 1);
        break;
      }
    }
  }
}
