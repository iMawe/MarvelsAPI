import { Component, OnInit } from '@angular/core';
import { MarvelService } from './marvel.service';

interface Character {
  id: number;
  name: string;
}

interface DetailedCharacter {
  id: number;
  name: string;
  image: string;
  comic: string;
  power: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MarvelsAPI';
  characters: Character[] = [];
  selectedCharacters: Character[] = [];
  searchId: any;
  searchName: any;
  detailedCharacters: DetailedCharacter[] = [];

  constructor(private marvelService: MarvelService){}

  ngOnInit(): void {
    this.marvelService.getCharacters().subscribe((data: any) => {
      this.characters = data.data.results.map((result: any) => ({
        id: result.id,
        name: result.name
      }));
    });
  }

  addToSelectedCharacters(character: Character): void {
    if (!this.selectedCharacters.find((c) => c.id === character.id)) {
      this.selectedCharacters.push(character);
      this.marvelService.getCharacterById(character.id).subscribe((data: any) => {
        const detailedCharacter: DetailedCharacter = {
          id: character.id,
          name: character.name,
          image: data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension,
          comic: data.data.results[0].comics.items[0].name,
          power: data.data.results[0].power
        };
        this.detailedCharacters.push(detailedCharacter);
      });
    }
  }

  removeFromSelectedCharacters(character: Character): void {
    this.selectedCharacters = this.selectedCharacters.filter((c) => c.id !== character.id);
  }

  searchCharacterById(): void {
    if (this.searchId) {
      const parsedId = parseInt(this.searchId);
      if (!isNaN(parsedId)) {
        const foundCharacter = this.characters.find((c) => c.id === parsedId);
        if (foundCharacter) {
          this.addToSelectedCharacters(foundCharacter);
        }
      }
    }
  }

  searchCharacterByName() {
    if (this.searchName) {
      this.marvelService.getCharactersByName(this.searchName).subscribe((data: any) => {
        this.characters = data.data.results;
      });
    }
  }
  

}
