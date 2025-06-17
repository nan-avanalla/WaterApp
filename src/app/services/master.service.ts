import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  // Add later --> ?&api_key=${environment.apiKey}
  getZonesList(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseApiUrl}master/zones`
    );
  }
  
  getDMAList(zoneCode: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseApiUrl}master/dma/list?zoneCode=${zoneCode}`
    );
  }

  getAreaAList(dmaCode: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseApiUrl}master/area/list?dmaCode=${dmaCode}`
    );
  }
}
