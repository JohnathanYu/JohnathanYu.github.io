import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snail-mail',
  templateUrl: './snail-mail.component.html',
  styleUrls: ['./snail-mail.component.css']
})
export class SnailMailComponent implements OnInit {
  DEBUGMODE: boolean = true;

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
  setInterval(this.secondTick, 1000);
  // setInterval(fiveSecondTick, 5000);
  }
  
  //Wild snail generation
  secondTick(): void {
    if(this.wildSnails < this.wildSnailsMax) {
      this.wildSnailsDelta = this.wildSnailsBaseGrowth * this.wildSnails * ((this.wildSnailsMax - this.wildSnails) / this.wildSnailsMax)
      // document.getElementById("snailsDeltaDisplay").innerHTML = "Delta: " + wildSnailsDelta;
      if (this.wildSnailsDelta > 1) {
        this.wildSnails += this.wildSnailsDelta;
      } else {
        this.wildSnails++;
      }
      if (this.wildSnails > this.wildSnailsMax) {
        this.wildSnails = this.wildSnailsMax;
      }
      this.wildSnailsDisplay = Math.floor(this.wildSnails);
    }
  }
  
  // function fiveSecondTick() {
  //   //Shell production
  //   shellDelta = Math.floor(Math.sqrt(farmSnails));
  //   if(isNaN(shellDelta)) {
  //     shellDelta = 0;
  //   }
  //   shells += shellDelta;
  //   updateShellsText();
  //   if(!firstShellFlag && shells >= 1) {
  //     firstShellFlag = true;
  //     document.getElementById("dialogDisplay").innerHTML = "Hmm, that's strange. The snails in the farm aren't making new snails�all you find are shells.";
  //     document.getElementById('shellsDisplay').style.display='block';
  //   } else if(!hundredthShellFlag && shells >= 100) {
  //     hundredthShellFlag = true;
  //     document.getElementById("dialogDisplay").innerHTML = "Maybe you can study the shells to understand what's going on. And maybe learn more about snails in general.";
  //   }
  // }
  
  
  // huntSnail(): void {
  //   if(wildSnails >= 1) {
  //     wildSnails--;
  //     updateWildSnailsText();
  //     gainSnails(1);
  //   } else if(displayWildSnailsFlag == false){
  //      document.getElementById("dialogDisplay").innerHTML = "Looks like there aren't any snails today. Maybe the snails need a while to reproduce.";
  //      document.getElementById('wildSnailsDisplay').style.display='inline'
  //      displayWildSnailsFlag = true;
  //   }
  // }
  
  // function buildFarm() {
  //   if(snails >= 1) {
  //     loseSnails(1);
  //     farmBuildProgress++;
  //     updateFarmBuildProgressText();
  //     if(farmBuildProgress >= farmBuildProgressMax) {
  //       document.getElementById("dialogDisplay").innerHTML = "Somehow, your crude pile of live snails has become sturdy enough to house other live snails.";
  //       document.getElementById('buildFarmButton').style.display='none';
  //       document.getElementById('farmBuildProgressDisplay').style.display='none';
  //       document.getElementById('farmBuildLineBreak').style.display='none';
        
  //       document.getElementById('plantSnailButton').style.display='inline';
  //       document.getElementById('farmSnailsDisplay').style.display='inline';
  //       document.getElementById('farmSnailsLineBreak').style.display='inline';
  //       farmFullyBuiltFlag = true;
  //     }
  //   }
  // }
  
  // function plantSnail() {
  // if(snails >= 1 && farmSnails < farmSnailsMax) {
  //   loseSnails(1);
  //   farmSnails++;
  //   updateFarmSnailText();
  //   if(!showFarmLimitFlag && farmSnails >= farmSnailsMax) {
  //     document.getElementById("dialogDisplay").innerHTML = "The farm is filled to the brim! Seems that you can't stuff any more snails in your snail farm.";
  //     showFarmLimitFlag = true;
  //     updateFarmSnailText();
  //   }
  // }
  // }
  
  // function gainSnails(snailsToGain) {
  //   snails += snailsToGain;
  //   totalAquiredSnails += snailsToGain;
  //   updateCurrentSnailsText();
    
  //   //Consider flags, given the total aquired snails
  //   if (suggestBuildingFarmFlag == false && totalAquiredSnails >= 150) {
  //     document.getElementById("dialogDisplay").innerHTML = "Perhaps you could build a snail farm to collect snails more efficiently.";
  //     document.getElementById('buildFarmButton').style.display='inline';
  //     document.getElementById('farmBuildProgressDisplay').style.display='inline';
  //     document.getElementById('farmBuildLineBreak').style.display='inline';
  //     suggestBuildingFarmFlag = true;
  //   }
  // }
  
  // function loseSnails(snailsToLose) {
  //   snails -= snailsToLose;
  //   updateCurrentSnailsText();
  // }
  
  
  
  // REMOVE
  // updateWildSnailsText(): void {
  //   document.getElementById("wildSnailsDisplay").innerHTML = "Snails in the wild: " 
  //     + Math.floor(wildSnails) + "/" + wildSnailsMax;
  // }
  
  // function updateCurrentSnailsText() {
  //   document.getElementById("snailsDisplay").innerHTML = "Snails: " + snails;
  // }
  
  // function updateFarmBuildProgressText() {
  //   document.getElementById("farmBuildProgressDisplay").innerHTML = "Snails needed to build farm: " + farmBuildProgress + "/" + farmBuildProgressMax;
  // }
  
  // function updateFarmSnailText() {
  //   if(showFarmLimitFlag) {
  //     document.getElementById("farmSnailsDisplay").innerHTML = "Snails in the farm: " + farmSnails + "/" + farmSnailsMax;
  //   } else {
  //     document.getElementById("farmSnailsDisplay").innerHTML = "Snails in the farm: " + farmSnails;
  //   } 
  // }
  
  // function updateShellsText() {
  //   document.getElementById("shellsDisplay").innerHTML = "Shells: " + shells;
  // }
  
  
  // function activateTestButton() {
  //   if(snails < 149) {
  //     gainSnails(49);
  //   }
  // }

}
