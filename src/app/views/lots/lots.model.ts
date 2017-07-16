export class Lot {
  id: number;
  name: string;
  description: string;
  category_id: number;
  published: boolean;
  finished: boolean;
  deleted: boolean;
  winner_id: number;
  count_participants: number;
  price:  number;
  owner_id: number;
  created_at: string;
  updated_at: string;
  pictures: string;
  owner_profile: number;

  constructor(parameter?: { id: number, name: string, description: string,  category_id: number, published: boolean, finished: boolean, deleted: boolean, winner_id: number, count_participants: number, price:  number,  owner_id: number, created_at: string, updated_at: string, pictures: string, owner_profile: number
}) {
    Object.assign(this, parameter);
  }
}
