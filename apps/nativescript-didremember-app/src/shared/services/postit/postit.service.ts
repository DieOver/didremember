import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { BehaviorSubject } from 'rxjs';
import { IPostit } from '../../interfaces/postit.interface';
import { PostitServiceContract } from './postit.service.contract';

@Injectable({ providedIn: 'root' })
export class PostitService implements PostitServiceContract {
  public postits = new BehaviorSubject<IPostit[]>([]);

  init(): void {
    const postits: IPostit[] = this.list();
    ApplicationSettings.setString('postits', JSON.stringify(postits));
    this.postits.next(this.list());
  }

  list = (): IPostit[] =>
    JSON.parse(ApplicationSettings.getString('postits', '[]')) as IPostit[];

  clear = (): void => this.save([]);

  save = (postits: IPostit[]): void => {
    ApplicationSettings.setString('postits', JSON.stringify(postits));
    console.log('save', postits);
    this.postits.next(postits);
  }

  add(postit: IPostit): void {
    const postits: IPostit[] = this.list();
    postits.push(postit);
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
