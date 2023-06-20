import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

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
    return this.getCountriesRequest(`${this.apiUrl}/capital/${capital}`).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = { term: capital, countries })
      )
    );
  }

  searchByName(name: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${name}`).pipe(
      tap(
        (countries) => (this.cacheStore.byCountries = { term: name, countries })
      )
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries }))
    );
  }
}
