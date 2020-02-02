import { Router, ActivatedRoute } from "@angular/router";
import { ScoreService } from "./../services/score.service";
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  scoreData;

  showPlayers: true;
  showAddPlayer: false;
  addPlayerName: "";
  showAddPlayer2: false;
  addPlayerName2: "";

  constructor(
    private alertCtrl: AlertController,
    private scoreService: ScoreService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(data => {
      this.scoreService.getById(data.id).then(data => {
        this.scoreData = data;
      });
    });
  }

  ngOnInit() {}

  updateScoreData() {
    this.scoreService.updateById(this.scoreData);
  }

  score(team: string, points: number) {
    if (team === "first") this.scoreData.firstTeam.score += points;
    else this.scoreData.secondTeam.score += points;
    this.scoreService.updateById(this.scoreData);
  }

  scorePlayer(player, team, points) {
    player.points += points;
    this.score(team, points);
  }

  addPlayer(type) {
    if (type == "first") {
      this.scoreData.firstTeam.players.push({
        name: this.addPlayerName,
        points: 0,
        id: this.scoreData.firstTeam.players.length
      });
      this.addPlayerName = "";
      this.showAddPlayer = false;
    } else {
      this.scoreData.secondTeam.players.push({
        name: this.addPlayerName2,
        points: 0,
        id: this.scoreData.secondTeam.players.length
      });
      this.addPlayerName2 = "";
      this.showAddPlayer2 = false;
    }
    this.scoreService.updateById(this.scoreData);
  }

  openScoreEdit() {
    let alert = this.alertCtrl
      .create({
        header: "Edit team's score",

        inputs: [
          {
            name: "firstTeam",
            placeholder: "First team score",
            type: "number",
            label: "First team score",
            value: this.scoreData.firstTeam.score
          },
          {
            name: "secondTeam",
            placeholder: "Second team score",
            type: "number",
            label: "Second team score",
            value: this.scoreData.secondTeam.score
          }
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Update",
            handler: data => {
              this.scoreData.firstTeam.score = data.firstTeam
                ? Number(data.firstTeam)
                : 0;
              this.scoreData.secondTeam.score = data.secondTeam
                ? Number(data.secondTeam)
                : 0;
              this.scoreService.updateById(this.scoreData);
            }
          }
        ]
      })
      .then(ready => {
        ready.present();
      });
  }

  openNameEdit() {
    let alert = this.alertCtrl
      .create({
        header: "Edit team names",

        inputs: [
          {
            name: "firstTeam",
            placeholder: "Name first team",
            type: "text",
            label: "First team name",
            value: this.scoreData.firstTeam.name
          },
          {
            name: "secondTeam",
            placeholder: "Name second team",
            type: "text",
            label: "Second team name",
            value: this.scoreData.secondTeam.name
          }
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Update",
            handler: data => {
              this.scoreData.firstTeam.name = data.firstTeam;
              this.scoreData.secondTeam.name = data.secondTeam;
              this.scoreService.updateById(this.scoreData);
            }
          }
        ]
      })
      .then(ready => {
        ready.present();
      });
    //await alert.present();
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
