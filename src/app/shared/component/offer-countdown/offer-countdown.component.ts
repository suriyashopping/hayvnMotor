import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CounterDirective } from "@HayvnShared/directive/counter.directive";
import { map, Observable, take, timer } from 'rxjs';

@Component({
  selector: 'hayvn-offer-countdown',
  templateUrl: './offer-countdown.component.html',
  styleUrls: ['./offer-countdown.component.scss'],
  providers: [CounterDirective]
})
export class OfferCountdownComponent implements OnInit {
  count!: any;
  counter$!: Observable<any>;
  @Input('exiryDate') exiryDate!: any;
  @Output('offerExpired') offerExpired = new EventEmitter();

   ngOnInit(): void {
    const remainingTime = (this.exiryDate) - Date.now();
    this.count = Math.floor((remainingTime/1000) << 0);
    //  console.log('hi uuuuuuuuuuuuuuuuuuuuuuuuu init',this.count);
     this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => {
        this.count = --this.count;
        // return this.count;
        this.offerExpired.emit(this.count);
        return new Date(this.count*1000).toISOString().slice(11,19);
      })
    );
   }

}
