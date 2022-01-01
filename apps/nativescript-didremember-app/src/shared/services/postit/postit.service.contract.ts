import { IPostit } from '../../interfaces/postit.interface';

export abstract class PostitServiceContract {
  abstract init(): void;
  abstract list(): IPostit[];
  abstract save(postits: IPostit[]): void;
  abstract add(postit: IPostit): void;
  abstract remove(id: string): void;
  abstract find(id: string): IPostit;
  abstract filter(name: string): IPostit[];
}
