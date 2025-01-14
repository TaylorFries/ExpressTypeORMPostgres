import constants from './constants';
import app from './express';
import AppDataSource from './data-source';
import { Company } from './typeorm/entity/Company';
import { Series } from './typeorm/entity/Series';
import { City } from './typeorm/entity/Cities';
import { Character } from './typeorm/entity/Character';
import { DataSource } from 'typeorm';

//import seed from "./typeorm/migrations/seed/seed.json"

const { API_PORT } = constants;

AppDataSource.initialize()
    .then(async () => {
        // //clear out tables
        
        // await AppDataSource
        //     .createQueryBuilder()
        //     .delete()
        //     .from(Series)
        //     .execute();
        // await AppDataSource
        //     .createQueryBuilder()
        //     .delete()
        //     .from(Character)
        //     .execute();

        // await AppDataSource
        //     .createQueryBuilder()
        //     .delete()
        //     .from(City)
        //     .execute();  
        

        // await AppDataSource
        //     .createQueryBuilder()
        //     .delete()
        //     .from(Company)
        //     .execute();
        

    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err)
    })


app.listen(API_PORT, (err?: Error) => {
  if (err) console.log(err);
  console.info(`Server started on port ${API_PORT}.`);
});
