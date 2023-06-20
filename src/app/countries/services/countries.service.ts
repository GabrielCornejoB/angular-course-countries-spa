import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountryByAlpha(alphaCode: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchByCapital(capital: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${capital}`);
  }

  searchByName(name: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${name}`);
  }

  searchByRegion(region: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`);
  }
}
