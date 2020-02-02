import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class ScoreService {
  constructor(private storage: Storage) {}

  private getId() {
    return Math.random()
      .toString(36)
      .substring(7);
  }

  addNewScore() {
    var id = this.getId();
    var newScore = {
      firstTeam: {
        name: "Team A",
        score: 0,
        players: []
      },
      secondTeam: {
        name: "Team B",
        score: 0,
        players: []
      },
      createdDate: new Date().toLocaleString(),
      editDate: null,
      id: id,
      showPlayers: true
    };
    return this.storage.set(id, newScore);
  }

  getById(id) {
    return this.storage.get(id);
  }

  deleteById(id) {
    return this.storage.remove(id);
  }

  updateById(scoreData) {
    scoreData.editDate = new Date().toUTCString();
    return this.storage.set(scoreData.id, scoreData);
  }

  getAll() {
    var promise = new Promise((resolve, reject) => {
      var list = [];
      this.storage
        .forEach((value, key, index) => {
          list.push(value);
        })
        .then(d => {
          resolve(list);
        });
    });
    return promise;
  }
}
