export interface Player {
  name: string;
  handicap: number;
}

export interface Team {
  name: string;
  players: Player[];
}

export interface Course {
  name: string;
  holes: Hole[];
}

export interface Hole {
  number: number;
  par: number;
  handicap: number;
}
