import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Link } from '../../../../libs/shared';
import { MOCK_USER } from '../mocks/mock-user';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private linksSubject = new BehaviorSubject<Link[]>([...MOCK_USER.links]);
  private title = MOCK_USER.title;
  private username = MOCK_USER.username;

  getUsername(): string {
    return this.username;
  }

  getTitle(): string {
    return this.title || '';
  }

  updateTitle(newTitle: string): Observable<string> {
    this.title = newTitle;
    return of(this.title).pipe(delay(100));
  }

  getLinks(): Observable<Link[]> {
    return this.linksSubject.asObservable().pipe(delay(200)); // simulates latency
  }

  addLink(): Observable<Link[]> {
    const updated = [...this.linksSubject.value, { label: '', url: '', isEditing:true }];
    this.linksSubject.next(updated);
    return of(updated).pipe(delay(100));
  }

  updateLink(index: number, newLink: Link): Observable<Link[]> {
    const updated = [...this.linksSubject.value];
    updated[index] = newLink;
    this.linksSubject.next(updated);
    return of(updated).pipe(delay(100));
  }

  deleteLink(index: number): Observable<Link[]> {
    const updated = [...this.linksSubject.value];
    updated.splice(index, 1);
    this.linksSubject.next(updated);
    return of(updated).pipe(delay(100));
  }

  reorderLinks(previousIndex: number, currentIndex: number): Observable<Link[]> {
    const links = [...this.linksSubject.value];
    const [movedItem] = links.splice(previousIndex, 1);
    links.splice(currentIndex, 0, movedItem);
    this.linksSubject.next(links);
    return of(links).pipe(delay(100)); // Simulate API delay
  }
}