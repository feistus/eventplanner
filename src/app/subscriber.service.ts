import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Subscriber } from './subscriber'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SubscriberService {
  
  private subscribersUrl = 'http://localhost:3000/eventplanner-api/subscribers';  // URL to web api
  
  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  create(subscriber: Subscriber): Promise<Subscriber> {
    const url = `${this.subscribersUrl}/new`;
    return this.http
			.post(url, JSON.stringify({
				name: subscriber.name, 
				email: subscriber.email, 
				missed_events: subscriber.missed_events
			}), {headers: this.headers})
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
  }

  update(subscriber: Subscriber): Promise<Subscriber> {
    const url = `${this.subscribersUrl}/${subscriber._id}`;
    const subscriberJSON = JSON.stringify(subscriber);
    return this.http
        .put(url, `{"$set":${subscriberJSON}}` , {headers: this.headers})
        .toPromise()
        .then(() => subscriber)
        .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
      const url = `${this.subscribersUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
  }

  getSubscribers(): Observable<Subscriber[]> {
		return this.http.get(this.subscribersUrl)
			.map(this.extractData)
			// .then(response => response.json() as Subscriber[])
			.catch(this.handleError);
  }

  private extractData(res: Response){
      let body = res.json();
      return body.data || {};
  }

  getSubscriber(id: number): Promise<Subscriber> {
      const url = `${this.subscribersUrl}/${id}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Subscriber)
          .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error('An Error occured:', error); //FIXME: Visualize error in frontend
      return Promise.reject(error.message || error);
  }

}
