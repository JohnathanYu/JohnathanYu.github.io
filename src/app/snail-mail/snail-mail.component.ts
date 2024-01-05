import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'snail-mail',
  templateUrl: './snail-mail.component.html',
  styleUrls: ['./snail-mail.component.css']
})
export class SnailMailComponent implements OnInit {
  DEBUGMODE: boolean = false;

  snails: number = 0;
  totalAquiredSnails: number = 0;
  
  wildSnails: number = 100;
  //remove this once we figure out decimalpipe, or other html-side formatting to round down
  wildSnailsDisplay: number = 100;
  wildSnailsMax: number = 100;
  wildSnailsDelta: number = 0;
  wildSnailsBaseGrowth: number = .1;
  
  farmBuildProgress: number = 0;
  farmBuildProgressMax: number = 150;
  
  farmSnails: number = 0;
  farmSnailsMax: number = 50;
  
  shells = 0;
  
  // flags
  displayWildSnailsFlag: boolean = false;
  suggestBuildingFarmFlag: boolean = false;
  farmFullyBuiltFlag: boolean = false;
  showFarmLimitFlag: boolean = false;
  firstShellFlag: boolean = false;
  hundredthShellFlag: boolean = false;

  ngOnInit(): void {
    interval(1000).subscribe(()=> {
      this.secondTick();
    })
    interval(5000).subscribe(()=> {
      this.fiveSecondTick();
    })
  }
  
  //Wild snail generation
  secondTick(): void {
    if(this.wildSnails < this.wildSnailsMax) {
      this.wildSnailsDelta = this.wildSnailsBaseGrowth * this.wildSnails * ((this.wildSnailsMax - this.wildSnails) / this.wildSnailsMax)
      if (this.wildSnailsDelta > 1) {
        this.wildSnails += this.wildSnailsDelta;
      } else {
        this.wildSnails++;
      }
      if (this.wildSnails > this.wildSnailsMax) {
        this.wildSnails = this.wildSnailsMax;
      }
      this.updateWildSnailsText();
    }
  }
  
  fiveSecondTick(): void {
    //Shell production
    let shellDelta = Math.floor(Math.sqrt(this.farmSnails));
    if(isNaN(shellDelta)) {
      shellDelta = 0;
    }
    this.shells += shellDelta;
    // updateShellsText();
    if(!this.firstShellFlag && this.shells >= 1) {
      this.firstShellFlag = true;
      // document.getElementById("dialogDisplay").innerHTML = "Hmm, that's strange. The snails in the farm aren't making new snails�all you find are shells.";
      // document.getElementById('shellsDisplay').style.display='block';
    } else if(!this.hundredthShellFlag && this.shells >= 100) {
      this.hundredthShellFlag = true;
      // document.getElementById("dialogDisplay").innerHTML = "Maybe you can study the shells to understand what's going on. And maybe learn more about snails in general.";
    }
  }
  
  
  huntSnail(): void {
    if(this.wildSnails >= 1) {
      this.wildSnails--;
      this.updateWildSnailsText();
      this.gainSnails(1);
    } else if(this.displayWildSnailsFlag == false){
      //  document.getElementById("dialogDisplay").innerHTML = "Looks like there aren't any snails today. Maybe the snails need a while to reproduce.";
      //  document.getElementById('wildSnailsDisplay').style.display='inline'
       this.displayWildSnailsFlag = true;
    }
  }
  
  buildFarm(): void {
    if(this.snails >= 1) {
      this.loseSnails(1);
      this.farmBuildProgress++;
      // updateFarmBuildProgressText();
      if(this.farmBuildProgress >= this.farmBuildProgressMax) {
        // document.getElementById("dialogDisplay").innerHTML = "Somehow, your crude pile of live snails has become sturdy enough to house other live snails.";
        // document.getElementById('buildFarmButton').style.display='none';
        // document.getElementById('farmBuildProgressDisplay').style.display='none';
        // document.getElementById('farmBuildLineBreak').style.display='none';
        
        // document.getElementById('plantSnailButton').style.display='inline';
        // document.getElementById('farmSnailsDisplay').style.display='inline';
        // document.getElementById('farmSnailsLineBreak').style.display='inline';
        this.farmFullyBuiltFlag = true;
      }
    }
  }
  
  plantSnail(): void {
  if(this.snails >= 1 && this.farmSnails < this.farmSnailsMax) {
    this.loseSnails(1);
    this.farmSnails++;
    // updateFarmSnailText();
    if(!this.showFarmLimitFlag && this.farmSnails >= this.farmSnailsMax) {
      // document.getElementById("dialogDisplay").innerHTML = "The farm is filled to the brim! Seems that you can't stuff any more snails in your snail farm.";
      this.showFarmLimitFlag = true;
      // updateFarmSnailText();
    }
  }
  }
  
  gainSnails(snailsToGain: number): void {
    this.snails += snailsToGain;
    this.totalAquiredSnails += snailsToGain;
    // updateCurrentSnailsText();
    
    //Consider flags, given the total aquired snails
    if (this.suggestBuildingFarmFlag == false && this.totalAquiredSnails >= 150) {
      // document.getElementById("dialogDisplay").innerHTML = "Perhaps you could build a snail farm to collect snails more efficiently.";
      // document.getElementById('buildFarmButton').style.display='inline';
      // document.getElementById('farmBuildProgressDisplay').style.display='inline';
      // document.getElementById('farmBuildLineBreak').style.display='inline';
      this.suggestBuildingFarmFlag = true;
    }
  }
  
  loseSnails(snailsToLose: number): void {
    this.snails -= snailsToLose;
    // updateCurrentSnailsText();
  }
  
  
  
  // REMOVE
  updateWildSnailsText(): void {
    this.wildSnailsDisplay = Math.floor(this.wildSnails);
  }
  
      // REMOVE
  // function updateCurrentSnailsText() {
  //   document.getElementById("snailsDisplay").innerHTML = "Snails: " + snails;
  // }
  
    // REMOVE
  // function updateFarmBuildProgressText() {
  //   document.getElementById("farmBuildProgressDisplay").innerHTML = "Snails needed to build farm: " + farmBuildProgress + "/" + farmBuildProgressMax;
  // }
  
      // REMOVE
  // function updateFarmSnailText() {
  //   if(showFarmLimitFlag) {
  //     document.getElementById("farmSnailsDisplay").innerHTML = "Snails in the farm: " + farmSnails + "/" + farmSnailsMax;
  //   } else {
  //     document.getElementById("farmSnailsDisplay").innerHTML = "Snails in the farm: " + farmSnails;
  //   } 
  // }
  
  // REMOVE
  // function updateShellsText() {
  //   document.getElementById("shellsDisplay").innerHTML = "Shells: " + shells;
  // }
  
  
  activateTestButton(): void {
    if(this.snails < 149) {
      this.gainSnails(49);
    }
  }

}
