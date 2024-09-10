/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Autor } from "../entity/Autor";
import { Trabalho } from "../entity/Trabalho";

export default class TrabalhoController {
  async salvar(req: Request, res: Response) {
    const { titulo, area, codigo, autores } = req.body;

    /**
     * Faça as validações dos campos aqui!
     */
    if(!titulo || titulo == ' '){
      return res.status(400).json({ erroMessage:'Obrigatório, ao menos um caractere'});
    }else if(area != 'CET' || area != 'CAE' || area != 'CBS' || area != 'CHCSA' || area != 'MDIS'){
      return res.status(400).json({ erroMessage:'Obrigatório, um dentre os seguintes valores: CET, CAE, CBS, CHCSA, MDIS'});
    }

    if(autores.length >= 2 && autores.length <= 7){ 
      for (let autor of autores){
        if(!autor.nome || autor.nome == ' '){
          return res.status(400).json({ errorMessage:'Obrigatório, ao menos um caractere' })
        }else if(!autor.genero || autor.genero == ' '){
          return res.status(400).json({ errorMessage:'Obrigatório, um dentre os valores M e F' })
        }else if(!autor.cpf || autor.cpf == ' '){
          return res.status(400).json({ errorMessage:'Obrigatório, contendo exatamente 11 caracteres' })
        }
      }
    }else{
      return res.status(404).json({ errorMessage: "Não encontrado" })
    }
       
    // Se passou em todas as validações, salve todos os dados na transação
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const autoresSalvos: Autor[] = [];

      for (let i = 0; i < autores.length; i++) {
        const autor = new Autor();
        Object.assign(autor, autores[i]);
        const autorSalvo = await transactionalEntityManager.save(autor);
        autoresSalvos.push(autorSalvo);
      }

      const trabalho = new Trabalho();
      trabalho.area = area;
      trabalho.codigo = codigo;
      trabalho.titulo = titulo;
      trabalho.autores = autoresSalvos;

      const trabalhoSalvo = await transactionalEntityManager.save(trabalho);
      return res.status(201).json({ trabalho: trabalhoSalvo });
    });
  }

  async consultar(req: Request, res: Response) {
    const { codarea } = req.params;

    const trabalhosRepository = await AppDataSource.getRepository(Trabalho);
    const trabalhos = await trabalhosRepository.find({ where: {area:codarea} })
    res.json(trabalhos)

  }
}
