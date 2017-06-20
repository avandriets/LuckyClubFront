export class Category {
  id: number;
  name: string;
  description: string;
  picture_file: string;
  picture_url: string;
  parent_id: number;
  created_at: string;
  updated_at: string;

  private convertStringToDate(stringDate: string) {
    return new Date(stringDate);
  }

  constructor(parameter?: {id: number, name: string, description: string, picture_file: string, picture_url: string, parent_id: number, created_at: string, updated_at: string}) {
    Object.assign(this, parameter);
  }
}
