import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InjectService } from '../inject.service';

// const API_URL = environment.apiUrl;
// @Injectable({
//   providedIn: 'root'
// })
export class SuperService implements ISuperService {
  // public url = `${this.originUrl}/api`; //  || environment.apiUrl;
  // public controller = '';
  // @Inject(HttpClient) protected http: HttpClient;
  protected http = InjectService.injector.get(HttpClient);
  // protected baseUrl = InjectService.injector.get('BASE_URL');
  constructor(public controller: string) {
    // console.log(`asp: ${this.url}`);
  }

  get urlApi() {
    // return this.baseUrl !== 'http://localhost:4200' ? `${this.baseUrl}/api` : environment.apiUrl;
    return environment.apiUrl;
    // return `${this.baseUrl}/api`;
  }

  get url() { return environment.hubUrl; }

  getList(startIndex, pageSize, sortBy, sortDir) {
    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}`);
  }
  get = () => this.http.get(`${this.urlApi}/${this.controller}/get`);
  count = () => this.http.get(`${this.urlApi}/${this.controller}/count`);
  getOne = (id, controller = this.controller) => this.http.get(`${this.urlApi}/${controller}/get/${id}`);
  post = (o) => this.http.post(`${this.urlApi}/${this.controller}/post`, o);
  put = (id, o) => this.http.put(`${this.urlApi}/${this.controller}/put/${id}`, o);
  delete = (id) => this.http.delete(`${this.urlApi}/${this.controller}/delete/${id}`);
}

interface ISuperService {
  getList(startIndex, pageSize, sortBy, sortDir): Observable<any>;
  get(controller: string);
  getOne(id, controller: string);
  post(o);
  put(id, o);
  delete(id);
}
