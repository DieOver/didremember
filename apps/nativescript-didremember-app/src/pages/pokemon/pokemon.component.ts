import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageTransition, SharedTransition, knownFolders } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import * as Https from '@nativescript-community/https';

@Component({
  selector: 'ns-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {

  pokemons = [];

  constructor(
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    Https.request({
      url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15',
      method: 'GET',
      timeout: 30,
      body: {},
      headers: {}
    }).then( async (response) => {
      const baseListPokemons = [];
      const listPokemons = JSON.parse(response.content.toString());
      for await (const result of listPokemons.results) {
        const element = result;
        const pokemon = await Https.request({
          url: element.url,
          method: 'GET',
          timeout: 30,
          body: {},
          headers: {}
        });
        baseListPokemons.push(JSON.parse(pokemon.content.toString()));
      }
      this.pokemons = baseListPokemons;
    }).catch((error) => {
      console.error('Https.request error', error);
    });
  }

  openDetail(pokemon: any) {
    this.routerExtensions.navigate(['/pokemon-detail/', pokemon.id], {
      queryParams: {
        nameImageAnimated: 'pokemon-'+pokemon.id,
        imageSrc: pokemon.sprites.other['official-artwork'].front_default,
        name: pokemon.name,
        colorBg: this.chooseColor(pokemon)
      },
      transition: SharedTransition.custom(new PageTransition(), {
        pageEnd: {
          spring: {
            tension: 140,
            friction: 16
          }
        },
        pageReturn: {
          spring: {
            tension: 140,
            friction: 16
          }
        }
      })
    });
  }

  chooseColor(pokemon: any) {
    return {
      'grass': '#15a283',
      'fire': '#e22822',
      'water': '#1b9dcf'
    }[pokemon.types[0].type.name] || 'gray';
  }
}
