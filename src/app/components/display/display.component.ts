import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, 
          IonGrid, IonRow, IonCol, IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

interface Zone {
  Name: string;
  Code: string;
}

interface DMA {
  Name: string;
  Code: string;
  zone_code: string;
}

declare var invokeMapLoader: any;

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, 
            IonGrid, IonRow, IonCol, IonList, IonItem, IonSelect, IonSelectOption, FormsModule],
})
export class DisplayComponent  implements OnInit {
  public screenTitle!: string;
  public selectedZone!: Zone;
  public selectedDMA!: DMA;
  private mapApiUrl!: string;

  zones: Zone[] = [];
  filteredDMAs: DMA[] = [];

  constructor(
    private router: Router,
    private masterService: MasterService,
    private loadingCtrl: LoadingController
  ) { 
    this.router.events.subscribe((e: any) => {
      this.clearFilters();
      this.clearResults();
    });
  }

  ngOnInit() {
    this.screenTitle = 'Displays';
    this.mapApiUrl = environment.baseApiUrl + 'ppdata/list';
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
  
  zoneChanged(event: CustomEvent) {
    // this.filteredDMAs = this.allDMAs.filter(dma => dma.zone_code == this.selectedZone.Code);
    this.clearResults();
    this.loadDMAList();
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

  dmaChanged(event: CustomEvent) {
    invokeMapLoader(this.mapApiUrl + '?dmaCode=' + this.selectedDMA.Code);
  }

  clearFilters() {
    this.selectedDMA = {} as DMA;
    this.selectedZone = {} as Zone;
    this.filteredDMAs = [];
  }

  clearResults() {
    this.selectedDMA = {} as DMA;
    const dvMapContainer = document.getElementById('dvMapContainer');
    if (dvMapContainer) {
      dvMapContainer.innerHTML = '';
    }
  }

}
