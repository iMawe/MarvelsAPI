import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private publicKey = 'dba0382bbc39767bf8346f837ff3dd9f';
  private privateKey = 'bbb06449480c41f72ca9f7863539d4c1358da512';
  private baseUrl = 'https://gateway.marvel.com/v1/public';


  constructor(private http: HttpClient) { }

  getCharacters() {
    const ts = new Date().getTime();
    const hash = Md5.hashStr(ts + this.privateKey + this.publicKey);

    const params = new HttpParams()
      .set('apikey', this.publicKey)
      .set('ts', ts.toString())
      .set('hash', hash.toString());

    const headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}/characters`, { headers: headers, params: params });
  }

  getCharacterById(id: number){
    const ts = new Date().getTime();
    const hash = Md5.hashStr(ts + this.privateKey + this.publicKey);
    const params = new HttpParams()
      .set('ts', ts.toString())
      .set('hash', hash.toString())
      .set('apikey', this.publicKey);

    const headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}/characters/${id}`, { headers: headers, params: params });
  }

  getCharactersByName(name: string) {
    const ts = new Date().getTime();
    const hash = Md5.hashStr(ts + this.privateKey + this.publicKey);
  
    const params = new HttpParams()
      .set('apikey', this.publicKey)
      .set('ts', ts.toString())
      .set('hash', hash.toString())
      .set('nameStartsWith', name);
  
    const headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}/characters`, { headers: headers, params: params });
  }
}
