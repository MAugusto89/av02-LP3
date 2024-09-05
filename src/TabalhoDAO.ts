import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";

export class TrabalhoDAO{
    trabalhoRepo: Repository<Trabalho>;

    constructor(repo: Repository<Trabalho>){
        this.trabalhoRepo = AppDataSource.getRepository.(trabalho);
    }

    async salvar(trabalho.Partial<trabalho>){
        return await this.trabalhoRepo.findOne(id);
    }
}