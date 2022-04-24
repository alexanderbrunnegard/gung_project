//TODO: IMPORT MODELS
//import { User } from "../model/user.interface";
import { ICategoriesService } from "./ICategories.service";
//import { userModel } from "../../db/user.db";

export class CategoriesService implements ICategoriesService {
  constructor() {}

  testFunction(): Promise<void> {}
}

export const categoriesService: CategoriesService = new CategoriesService();
