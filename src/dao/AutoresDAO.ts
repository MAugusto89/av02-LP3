import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Autor } from "../entity/Autor";

export class AutoresDAO{
    autorRepo: Repository<Autor>;

    constructor(){
        this.autorRepo = AppDataSource.getRepository.(Autor);
    }

    async salvar(autor:Partial<Autor>){
        const autorSalvo = await this.autorRepo.save(autor);
        return autorSalvo
    }
}