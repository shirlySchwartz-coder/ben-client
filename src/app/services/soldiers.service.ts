import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Job} from '../model/Job';
import {JobToSoldier} from '../model/JobToSoldier';
import {Soldier} from '../model/Soldier';

@Injectable({
  providedIn: 'root',
})
export class SoldiersService {
  constructor(private http: HttpClient) {}
  public getAllSoldiers(): Observable<Soldier[]> {
    return this.http.get<Soldier[]>('http://localhost:3000/soldiers');
  }
  public getSoldiersOnTheJob(jobId: number): Observable<Soldier[]> {
    return this.http.get<Soldier[]>(`http://localhost:3000/jobs/${jobId}`);
  }
  public getFreeSoldiersForTheJob(jobId: number): Observable<Soldier[]> {
    return this.http.get<Soldier[]>(`http://localhost:3000/jobs/${jobId}/freesoldiers`);
  }
  public addSoldiersToTheJob(newSoldierToJob: JobToSoldier): Observable<JobToSoldier[]> {
    return this.http.post<JobToSoldier[]>(`http://localhost:3000/jobs/${newSoldierToJob.jobId}/add/${newSoldierToJob.soldierId}`, newSoldierToJob);
  }

}
