export class Lot {
  id: number;
  name: string;
  description: string;
  full_description: string;
  category_id: number;
  published: boolean;
  finished: boolean;
  deleted: boolean;
  recommend: boolean;
  winner_id: number;
  count_participants: number;
  price: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
  pictures: Picture[];
  owner_profile: number;
  count_joined: number;

  getFirstPicture() {
    if (!this.pictures || this.pictures.length == 0 ) {
      return null;
    }
    return this.pictures[0];
  }

  getGallery() {
    if (this.pictures && this.pictures.length > 1) {
      return this.pictures.slice(1, this.pictures.length);
    }
    return null;
  }
  getPrice(){
    return Number(this.price);
  }

  getFinished_at(){
    return this.updated_at;
  }

  getDueDate(){
    let daysCount = 0;

    if(this.count_joined > 50 && this.count_joined <= 100) {
      daysCount = 1;
    } else if(this.count_joined > 100 && this.count_joined <= 200) {
      daysCount = 4;
    } else if(this.count_joined > 500) {
      daysCount = 7;
    }

    let new_date = new Date();
    new_date.setDate(new_date.getDate() + daysCount);
    return new_date;
  }

  getPercentage(){
    if (this.count_participants > 0) {
      return this.count_joined*100/this.count_participants;
    } else {
      return 0;
    }
  }

constructor(parameter?: Lot) {
    if (parameter) {
      this.id = parameter.id;
      this.name = parameter.name;
      this.description = parameter.description;
      this.full_description = parameter.full_description;
      this.category_id = parameter.category_id;
      this.published = parameter.published;
      this.finished = parameter.finished;
      this.deleted = parameter.deleted;
      this.recommend = parameter.recommend;
      this.winner_id = parameter.winner_id;
      this.count_participants = parameter.count_participants;
      this.owner_id = parameter.owner_id;
      this.created_at = parameter.created_at;
      this.updated_at = parameter.updated_at;
      this.owner_profile = parameter.owner_profile;
      this.count_joined = parameter.count_joined;

      this.price = Number(parameter.price);

      this.pictures = [];
      for(let i of parameter.pictures){
        this.pictures.push(new Picture(i));
      }

    }
  }
}

export class Picture {
  id: number;
  description: string;
  picture: string;
  picture_url: string;
  lot_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;

  constructor(parameter?: Picture) {
    if (parameter) {
      this.id = parameter.id;
      this.description = parameter.description;
      this.picture = parameter.picture;
      this.picture_url = parameter.picture_url;
      this.lot_id = parameter.lot_id;
      this.user_id = parameter.user_id;
      this.created_at = parameter.created_at;
      this.updated_at = parameter.updated_at;
    }
  }
}
