import { JobsService } from './services/jobs.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import {Job} from './model/Job';
import {Soldier} from './model/Soldier';
import { SoldiersService } from './services/soldiers.service';
import {JobToSoldier} from './model/JobToSoldier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public jobList: Job[] = [];
  public soldiersList: Soldier[] = [];
  public freeSoldiers: Soldier[] = [];
 
  public selectedJobFromDrop:any;
  public jobSelectedId: any ;
  public jobSelectedName: string = '';
  newAddedAssign:any
  
  public soldierSelected = <Soldier>{};
  public newSoldierToJobData = <JobToSoldier>{};
  selectedSoldierFromDrop:any

  constructor(
    private JobsService: JobsService,
    private SoldiersService: SoldiersService
  ) {
    this.initJobs();
    this.initSoldiers();
  }

  onJobSelected(event: any): void {
    
    this.jobSelectedId = +this.selectedJobFromDrop;
    let newJobSelected = new Job(this.jobSelectedId, this.jobSelectedName)
   
    this.initSoldiersOnTheJob(this.jobSelectedId);
    this.initFreeSoldierForJob(this.jobSelectedId);
  }

  private initJobs(): void {
    const observable: Observable<Job[]> = this.JobsService.getAllJobs();

    observable.subscribe(
      (jobs) => {
        this.jobList = jobs;
      },
      (serverErrorResponse) => {
        alert(
          'Error! status: ' +
            serverErrorResponse.status +
            ', Message: ' +
            serverErrorResponse
        );
      }
    );
  }
  private initSoldiers(): void {
    const observableAllSoldier: Observable<Soldier[]> =
      this.SoldiersService.getAllSoldiers();

    observableAllSoldier.subscribe(
      (soldiers) => {
        this.freeSoldiers = soldiers;
      },
      (serverErrorResponse) => {
        alert(
          'Error! status: ' +
            serverErrorResponse.status +
            ', Message: ' +
            serverErrorResponse
        );
      }
    );
  }
  private initFreeSoldierForJob(jobId: number): void {
    const observableFreeSoldier: Observable<Job[]> =
      this.SoldiersService.getFreeSoldiersForTheJob(jobId);

    observableFreeSoldier.subscribe(
      (soldiers) => {
        this.freeSoldiers = soldiers;
      },
      (serverErrorResponse) => {
        alert(
          'Error! status: ' +
            serverErrorResponse.status +
            ', Message: ' +
            serverErrorResponse
        );
      }
    );
  }

  private initSoldiersOnTheJob(jobId: number): void {
    const observableSoldierOnTheJob: Observable<Job[]> =
      this.SoldiersService.getSoldiersOnTheJob(jobId);

      observableSoldierOnTheJob.subscribe(
      (soldiers) => {
        this.soldiersList = soldiers;
      },
      (serverErrorResponse) => {
        alert(
          'Error! status: ' +
            serverErrorResponse.status +
            ', Message: ' +
            serverErrorResponse
        );
      }
    );
  }

  onSoldierSelected(event: any): void {
    this.selectedSoldierFromDrop = +event.target.value;
    
    console.log('Selected Soldier = ' + this.selectedSoldierFromDrop);
    
    this.initSoldiersOnTheJob(this.jobSelectedId);
    this.initFreeSoldierForJob(this.jobSelectedId);
  }
  onAddSoldier(): void {
     let newSoldierToJobData  = {
      jobId: +this.jobSelectedId,
      soldierId: +this.selectedSoldierFromDrop,
    };
    
    this.addSoldierForJob(newSoldierToJobData);
    //alert(`Soldier was added to the job in MySql `);
    this.initSoldiersOnTheJob(this.jobSelectedId);
    this.initFreeSoldierForJob(this.jobSelectedId);
    newSoldierToJobData  = {
      jobId: null,
      soldierId: null,
    };  
  }

addSoldierForJob(newSoldier: JobToSoldier): void {
  const observableAddSoldier: Observable<any> =
    this.SoldiersService.addSoldiersToTheJob(newSoldier);

  observableAddSoldier.subscribe(
    () => {
      console.log('Soldier Was Added ' );  
    },
    (serverErrorResponse) => {
      alert(
        'Error! status: ' +
          serverErrorResponse.status +
          ', Message: ' +
          serverErrorResponse
      );
    }
  );
}
}