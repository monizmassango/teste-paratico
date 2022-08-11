import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rate } from '../_model/Rate';

@Injectable({
  providedIn: 'root',
})
export class ExchangerateService {
  constructor(private http: HttpClient) { }

  getExchangerate(currency: string): Observable<Rate> {
    return this.http.get<Rate>(`${environment.api}/${currency}`).pipe(
      take(1),
      map((data: any) => {
        const currency: Rate = {
          base_code: data.base_code,
          rates: data.rates,
        };
        return currency;
      })
    );
  }
}
