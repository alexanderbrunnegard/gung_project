import Express from "express";
import { CategoriesService } from "../service/categories.service";
import { ICategoriesService } from "../service/ICategories.service";

export function createCategoriesRouter(
  categorieService: ICategoriesService
): Express.Express {
  const categorieRouter: Express.Express = Express();

  categorieRouter.get(
    "/",
    async (req: Express.Request, res: Express.Response): Promise<void> => {
      try {
        const msg = categorieService.testFunction();
        res.status(200).send(msg);
      } catch (e: any) {
        res.status(500).send(e.message);
      }
    }
  );

  return categorieRouter;
}

export function createDefualtCategoriesRouter(): Express.Express {
  return createCategoriesRouter(new CategoriesService());
}
