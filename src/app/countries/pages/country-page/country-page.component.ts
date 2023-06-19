import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.aRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByAlpha(id))
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }
        console.log(country);
        return;
      });
  }
}
