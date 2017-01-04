import { Component, OnInit } from '@angular/core';
import { Subscriber } from '../subscriber';
import { SubscriberService } from '../subscriber.service';
// import { Router } from '@angular/router'; // Brauche ich nur, wenn ich mit klick von hier aus woanders hinmöchte

@Component({
  // moduleId: module.id,
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})

export class SubscribersComponent implements OnInit {

  subscribers : Subscriber[];
  selectedSubscriber: Subscriber;

  constructor(
      // private router: Router, // s. oben
      private subscriberService: SubscriberService
    ) { }

  add(name: string, email: string): void {
    let Subscriber = {
      _id: "",
      name: name.trim(),
      email: email.trim(),
      missed_events: 0
    }
    if (!name || !email) { return; }
    this.subscriberService.create(Subscriber)
        .then(subscriber => {
          this.subscribers.push(subscriber);
          this.selectedSubscriber = null;
        });
  }

  update(_id: string, name: string, email: string, missed_events: number): void {
    let Subscriber = {
      _id: _id,
      name: name.trim(),
      email: email.trim(),
      missed_events: missed_events
    }
    if (!name && !email && !missed_events) { return; }
    this.subscriberService.update(Subscriber)
        .then(subscriber => {
          // FIXME - Not nice to first remove and then re-add, there must be a better way to update the view
          this.subscribers = this.subscribers.filter(h => h._id !== Subscriber._id);
          this.subscribers.push(Subscriber);
          this.selectedSubscriber = null;
        });
  }


  delete(subscriber: Subscriber): void {
    this.subscriberService
        .delete(subscriber._id)
        .then(() => {
          this.subscribers = this.subscribers.filter(h => h !== subscriber);
          if (this.selectedSubscriber === subscriber) { this.selectedSubscriber = null; }
        });
  }

  getSubscribers(): void {
    this.subscriberService.getSubscribers().then(subscribers => this.subscribers = subscribers);
  }
  
  ngOnInit(): void {
    this.getSubscribers();
  }; 
  
  onSelect(subscriber: Subscriber): void {
    this.selectedSubscriber = subscriber;
  }

  // gotoDetail(): void {
  //   this.router.navigate(['/detail', this.selectedHero.id]);
  // }
}




  

