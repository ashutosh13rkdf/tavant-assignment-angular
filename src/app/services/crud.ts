import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl="http://localhost:8080/loans"//
  getConfig() {
    return this.http.get(this.configUrl);
  }
  postConfig(status, loans){
    return this.http.post(this.configUrl+"/"+status,loans,httpOptions);
  }
  
}