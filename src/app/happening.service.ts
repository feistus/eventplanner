import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Happening } from './happening'

@Injectable()
export class HappeningService {
  
  private happeningsUrl = 'http://localhost:3000/eventplanner-api/happenings';  // URL to web api
  
  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  create(happening: Happening): Promise<Happening> {
    const url = `${this.happeningsUrl}/new`;
    return this.http
        .post(url, JSON.stringify({
            title: happening.title, 
            date: happening.date,
            location: happening.location, 
            slots_available: happening.slots_available,
            details: happening.details, 
        }), {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  update(happening: Happening): Promise<Happening> {
    const url = `${this.happeningsUrl}/${happening._id}`;
    const happeningJSON = JSON.stringify(happening);
    return this.http
        .put(url, `{"$set":${happeningJSON}}` , {headers: this.headers})
        .toPromise()
        .then(() => happening)
        .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
      const url = `${this.happeningsUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
  }

  getHappenings(): Promise<Happening[]> {
      return this.http.get(this.happeningsUrl)
          .toPromise()
          .then(response => response.json() as Happening[])
          .catch(this.handleError);
  }

  getHappening(id: number): Promise<Happening> {
      const url = `${this.happeningsUrl}/${id}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Happening)
          .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error('An Error occured:', error); //FIXME: Visualize error in frontend
      return Promise.reject(error.message || error);
  }

}
