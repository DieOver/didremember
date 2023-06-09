import { Component, Input, OnInit } from '@angular/core';
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
  nameImageAnimated = '';

  constructor(
    private postitService: PostitServiceContract,
    private activatedRoute: ActivatedRoute
  ) {
    this.nameImageAnimated = this.activatedRoute.snapshot.queryParamMap.get('nameImageAnimated');
    console.log("nameImageAnimated", this.nameImageAnimated);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.postit = this.postitService.find(id);
  }
}
