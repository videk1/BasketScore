import { ScoreService } from "./../services/score.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  scores;
  constructor(
    private scoreService: ScoreService,
    private router: Router,
    public toastController: ToastController
  ) {}

  private reload() {
    this.scoreService.getAll().then((data: any) => {
      this.scores = data.reverse();
    });
  }

  ionViewDidEnter() {
    this.reload();
  }

  deleteScore(id) {
    this.scoreService.deleteById(id).then(data => {
      this.reload();
      this.toastController
        .create({
          message: "Score was deleted.",
          showCloseButton: true,
          duration: 4000
        })
        .then(ready => {
          ready.present();
        });
    });
  }

  openAddScore() {
    this.scoreService.addNewScore().then(data => {
      this.router.navigateByUrl("/score/" + data.id);
    });
  }
}
