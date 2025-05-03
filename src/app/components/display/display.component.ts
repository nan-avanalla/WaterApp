import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, 
          IonGrid, IonRow, IonCol, IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Zone {
  name: string;
  code: string;
}

interface Area {
  name: string;
  code: string;
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
  public selectedArea!: Area;

  zones: Zone[] = [
    {
      name: 'North Zone',
      code: 'NORTH_ZONE'
    },
    {
      name: 'South Zone',
      code: 'SOUTH_ZONE'
    }
  ];

  allAreas: Area[] = [
    {
      name: 'Amaya Nagar',
      code: 'AMY_NGR',
      zone_code: 'SOUTH_ZONE'
    }
  ];

  filteredAreas: Area[] = [];

  constructor(private router: Router) { 
    this.router.events.subscribe((e: any) => {
      this.clearFilters();
      this.clearResults();
    });
  }

  ngOnInit() {
    this.screenTitle = 'Display';    
  }

  zoneChanged(event: CustomEvent) {
    this.filteredAreas = this.allAreas.filter(area => area.zone_code == this.selectedZone.code);
    this.clearResults();
  }

  areaChanged(event: CustomEvent) {
    invokeMapLoader();
  }

  clearFilters() {
    this.selectedArea = {} as Area;
    this.selectedZone = {} as Zone;
    this.filteredAreas = [];
  }

  clearResults() {
    this.selectedArea = {} as Area;
    const dvMapContainer = document.getElementById('dvMapContainer');
    if (dvMapContainer) {
      dvMapContainer.innerHTML = '';
    }
  }

}
