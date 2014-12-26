

enum Job {
  WHM, SCH, WAR, PLD, BLM, SMN, BRD, MNK, DRG, NIN
}


function getJobRange(job: Job): number {
  switch (job) {
    case Job.WHM:
    case Job.SCH:
    case Job.BLM:
    case Job.SMN:
    case Job.BRD:
      return 500;
    default:
      return 50;
  }
}

function getJobColor(job: Job): string {
  switch (job) {
    case Job.WHM:
    case Job.SCH:
      return "green";
    case Job.PLD:
    case Job.WAR:
      return "blue";
    default:
      return "red";
  }
}