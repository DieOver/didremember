import { Component, OnInit } from '@angular/core';
import { IPostit } from '../../shared/interfaces/postit.interface';
import { PostitServiceContract } from '../../shared/services/postit/postit.service.contract';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {

  postit: IPostit = {} as IPostit;

  constructor(
    private postitService: PostitServiceContract,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.postit = this.postitService.find(id);
  }
}
