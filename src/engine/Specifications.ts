///// <reference path="vector2d.ts" />

//enum Target {
//  TARGET, NOT_TARGET, POS, RANDOM, RANDOM_JOB
//}

//interface IFight {
//  players: IPlayer[];
//  enemies: IEnemy[];
//  indicators: IIndicator[];
//}


////---------------------------------
//interface IPlayer {
//  id: string;
//  job: string;
//  role: string;
//}

//interface IEnemy {
//  id: string;
//  size: number;
//  speed: number;
//  range: number;
//  abilities: IAbility[];
//}

//interface IAbility {
//  id: string;
//}

////interface ISimpleAbility extends IAbility {
////  range: number;
////  target: ITarget;
////  actions: IAction[];
////}

////interface IAction {
////  delay: number;
////  damage: number;
////  indicator: IIndicator;
////  statusEffect: StatusEffect[];
////  next: IAction;
////}

////--------------------------------
//interface ITarget {
//  target: Target;
//}

//interface ISpecificJobs extends ITarget {
//  jobIds: string[];
//}

//interface IPosTarget extends ITarget {
//  pos: Vector2D;
//  radius: number;
//}


////------------------------------
//interface IIndicator {
//  id: string;
//  duration: number;
//  color: string;
//}

//interface IPosIndicator extends IIndicator {
//  pos: Vector2D;
//  radius: number;
//}

//interface ITargetIndicator extends IIndicator {
//  targetId: string;
//}

//interface ILinkIndicator extends IIndicator {
//  fromId: string;
//  toId; string;
//}


////-------------------------------
//interface IEvent {

//}

//interface IObjective {

//}
