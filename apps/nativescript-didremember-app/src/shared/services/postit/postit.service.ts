import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IPostit } from '../../interfaces/postit.interface';
import { PostitServiceContract } from './postit.service.contract';

@Injectable({ providedIn: 'root' })
export class PostitService implements PostitServiceContract {

  public postits = new BehaviorSubject<IPostit[]>([]);

  constructor() {
    const postits: IPostit[] = this.list();
    this.postits.next(postits);
  }

  clear = (): void => this.save([]);

  list(): IPostit[] {
    return JSON.parse(ApplicationSettings.getString(environment.name_postit_shared, '[]')) as IPostit[];
  }

  save(postits: IPostit[]): void {
    ApplicationSettings.setString(environment.name_postit_shared, JSON.stringify(postits));
    this.postits.next(postits);
  }

  add(postit: IPostit): void {
    const postits: IPostit[] = this.list();
    postits.push(postit);
    this.save(postits);
  }

  edit(postit: IPostit): void {
    const postits: IPostit[] = this.list();
    const index = postits.findIndex((postit) => postit.id === postit.id);
    postits[index] = postit;
    this.save(postits);
  }

  remove(id: string): void {
    const postits: IPostit[] = this.list();
    const index = postits.findIndex((postit) => postit.id === id);
    postits.splice(index, 1);
    this.save(postits);
  }

  find(id: string): IPostit {
    const postits: IPostit[] = this.list();
    return postits.find((postit) => postit.id === id);
  }

  filter(name: string): IPostit[] {
    const postits: IPostit[] = this.list();
    return postits.filter((postit) => postit.name.includes(name));
  }
}
