import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';
  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(350))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  public emitInputValue(value: string): void {
    this.onValue.emit(value);
  }

  public onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
