export class Lot {
  id: number;
  name: string;
  description: string;
  picture_file: string;
  picture_url: string;
  parent_id: number;
  created_at: string;
  updated_at: string;

  constructor(parameter?: {id: number, name: string, description: string, picture_file: string, picture_url: string, parent_id: number, created_at: string, updated_at: string}) {
    Object.assign(this, parameter);
  }
}

export class LotsCollection{

  lots: Lot[] = [];

  constructor(lots?: Lot[]) {
    if(lots){
      this.lots = lots;
    }
  }


}
