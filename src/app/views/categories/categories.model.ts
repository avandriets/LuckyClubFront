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

export class CategoriesCollection{

  categories: Category[] = [];

  constructor(categories?: Category[]) {
    if(categories){
      this.categories = categories;
    }
  }

  getChildrenCategories(parentCategory: Category):Category[]{
    return this.categories.filter(
      (category: Category) =>{
        return category.parent_id == parentCategory.id;
      }
    );
  }

  getParentCategories(currentCategory?: Category):Category[]{
    return this.categories.filter(
      (category: Category) =>{
        if(currentCategory){
          return category.parent_id == null && category.id != currentCategory.id;
        }else{
          return category.parent_id == null;
        }
      }
    );
  }
}
