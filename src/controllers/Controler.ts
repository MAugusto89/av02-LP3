import { Request, Response } from "express";
import ContactDAO from "../dao/ContactDAO";
import { validateTrabalhosInputs } from "../ContactModel";
import { Trabalho } from "../entity/Trabalho";
import { Autor } from "../entity/Autor";

export default class UserController {
  private contactDAO: ContactDAO;

  constructor() {
    this.contactDAO = new ContactDAO();
  }

  async save(req: Request, res: Response) {
    const errorMessages = validateTrabalhosInputs(req.body);

    if (errorMessages.length === 0) {
      const { titulo, area } = req.body;

      const trabalho = new Trabalho({
        titulo,
        area,
        autor,
      });

      try {
        const savedTrabalho = await this.contactDAO.save(trabalho);
        return res.status(201).json({ trabalho: savedTrabalho });
      } catch (error) {
        return res.status(500).json({ error: "Erro ao salvar trabalho" });
      }
    }

    return res.status(400).json({ errorMessages });
  }

  async findByName(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const contatos = await this.contactDAO.findByName(name);
      return res.status(200).json({ contatos });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar contatos" });
    }
  }
}
