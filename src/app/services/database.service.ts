import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getDBData(dmaCode: string, areaCode: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseApiUrl}db/data?dmaCode=${dmaCode}&areaCode=${areaCode}`
    );
  }
}
