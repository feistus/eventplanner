import { Component, OnInit } from '@angular/core';

import { Happening } from '../happening';
import { Subscriber} from '../subscriber';

import { SubscriberService } from '../subscriber.service';
import { HappeningService } from '../happening.service';

@Component({
  selector: 'app-happenings-admin',
  templateUrl: './happenings-admin.component.html',
  styleUrls: ['./happenings-admin.component.css']
})

export class HappeningsAdminComponent implements OnInit {

  happenings: Happening[];
  selectedHappening: Happening;
  subscribers: Subscriber[];
  errorMessage: string;

  constructor(
    private happeningService: HappeningService,
    private subscriberService: SubscriberService
  ) { }

  add(title: string, date: string, location: string, slots_available: number, details: string, ): void {
    let Happening = {
      _id: "",
      title: title.trim(),
      date: date.trim(),
      location:location.trim(),
      slots_available: slots_available,
      details: details.trim()
    }
    if (!title || !date || !slots_available) { return; }
    this.happeningService.create(Happening)
        .then(happening => {
          this.happenings.push(happening);
          this.selectedHappening = null;
        });
  }

  update(_id: string, title: string, date: string, location: string, slots_available: number, details: string): void {
    let Happening = {
      _id: _id,
      title: title.trim(),
      date: date.trim(),
      location: location.trim(),
      slots_available: slots_available,
      details: details.trim()
    }
    // if (!name && !email && !missed_events) { return; }
    this.happeningService.update(Happening)
        .then(subscriber => {
          // FIXME - Not nice to first remove and then re-add, there must be a better way to update the view
          this.happenings = this.happenings.filter(h => h._id !== Happening._id);
          this.happenings.push(Happening);
          this.selectedHappening = null;
        });
  }

  delete(happening: Happening): void {
    this.happeningService
        .delete(happening._id)
        .then(() => {
          this.happenings = this.happenings.filter(h => h !== happening);
          if (this.selectedHappening === happening) { this.selectedHappening = null; }
        });
  }

  onSelect(happening: Happening): void {
    this.selectedHappening = happening;
  }

  onInvite(happening: Happening): void {
    // var subscribers = [];
    // this.subscriberService.getSubscribers().then(subscribers => this.subscribers = subscribers);
    this.subscriberService.getSubscribers().subscribe(
                     subscribers => this.subscribers = subscribers,
                     error =>  this.errorMessage = <any>error);
    console.log(this.subscribers);
    // this.selectedHappening = happening;
  }

  getHappenings(): void {
    this.happeningService.getHappenings().then(happenings => this.happenings = happenings);
  }

  ngOnInit() {
    this.getHappenings(); //show all happenings, plus access to CRUD methods. Also trigger invitations from here (first "invite all", later "selective invite")
  }
  
}
