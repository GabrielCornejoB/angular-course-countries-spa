import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchCountryByAlpha(alphaCode: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchByCapital(capital: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/capital/${capital}`)
      .pipe(catchError((error) => of([])));
  }

  searchByName(name: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/name/${name}`)
      .pipe(catchError((error) => of([])));
  }

  searchByRegion(region: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/region/${region}`)
      .pipe(catchError((error) => of([])));
  }
}
