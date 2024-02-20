import { Subject, fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');

const counter$ = new Subject();
const incrementClick$ = fromEvent(incrementButton, 'click');
const decrementClick$ = fromEvent(decrementButton, 'click');

const state$ = counter$.pipe(
    scan((count, change) => count + change, 0)
);

state$.subscribe(count => {
    counterElement.textContent = count;
});

incrementClick$.subscribe(() => counter$.next(1));
decrementClick$.subscribe(() => counter$.next(-1));
