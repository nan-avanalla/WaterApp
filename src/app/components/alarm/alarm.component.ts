import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
          IonGrid, IonRow, IonCol, IonList, IonItem, IonSelect, IonSelectOption
 } from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MasterService } from 'src/app/services/master.service';
import { AlarmService } from 'src/app/services/alarm.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

 interface Zone {
  Name: string;
  Code: string;
}

interface DMA {
  Name: string;
  Code: string;
  zone_code: string;
}

interface Area {
  Name: string;
  Code: string;
}

interface AlarmData {
  DMA: string;
  Area: string;
  Instance: string;
  Tagname: string;
  DateTime: string;
  Value: string;
}

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
            IonGrid, IonRow, IonCol, IonList, IonItem, IonSelect, IonSelectOption, FormsModule, NgFor, NgIf, NgClass
  ],
})
export class AlarmComponent  implements OnInit {
  public screenTitle!: string;
  public selectedZone!: Zone;
  public selectedDMA!: DMA;
  public selectedArea!: Area;
  public resultData!: AlarmData[];

  zones: Zone[] = [];
  filteredDMAs: DMA[] = [];
  filteredAreas: Area[] = [];

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private masterService: MasterService,
    private alarmService: AlarmService
  ) { 
    this.router.events.subscribe((e: any) => {
      this.clearFilters();
      this.clearResults();
    });
  }

  ngOnInit() {
    this.screenTitle = 'Alarms';
    this.loadFilters();
  }

  loadFilters() {
    this.loadZoneList();
  }

  async loadZoneList() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.masterService.getZonesList().subscribe(
      {
        next: res => { this.zones.push(... res); loading.dismiss(); },
        error: err => { console.log(err); loading.dismiss(); }
      }
    );
  }

  async loadDMAList() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.masterService.getDMAList(this.selectedZone.Code).subscribe(
      {
        next: res => { this.filteredDMAs = []; this.filteredDMAs.push(... res); loading.dismiss(); },
        error: err => { console.log(err); loading.dismiss(); }
      }
    );
  }

  async loadAreaList() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.masterService.getAreaAList(this.selectedDMA.Code).subscribe(
      {
        next: res => { this.filteredAreas = []; this.filteredAreas.push(... res); loading.dismiss(); },
        error: err => { console.log(err); loading.dismiss(); }
      }
    );
  }

  async loadAlarmData() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.alarmService.getAlarmData(this.selectedDMA.Code, this.selectedArea.Code).subscribe(
      {
        next: res => { this.resultData = []; this.resultData.push(... res); loading.dismiss(); },
        error: err => { console.log(err); loading.dismiss(); }
      }
    );
  }

  zoneChanged(event: CustomEvent) {
    this.selectedDMA = {} as DMA;
    this.selectedArea = {} as Area;
    this.filteredDMAs = [];
    this.filteredAreas = [];

    this.clearResults();
    this.loadDMAList();
  }

  dmaChanged(event: CustomEvent) {
    this.selectedArea = {} as Area;
    this.filteredAreas = [];

    this.clearResults();
    this.loadAreaList();
  }

  areaChanged(event: CustomEvent) {
    this.clearResults();
    this.loadAlarmData();
  }

  clearFilters() {
    this.selectedZone = {} as Zone;
    this.selectedDMA = {} as DMA;
    this.selectedArea = {} as DMA;

    this.filteredDMAs = [];
    this.filteredAreas = [];
  }

  clearResults() {
    this.resultData = [];
  }
}
