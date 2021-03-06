
import { Request, Response } from "express";
import { NodemailerMailAdapter } from "../adapters/NodeMailer/NodemailerMailAdapter";
import { PrismaFeedbacksRepository } from "../repositories/prisma/PrismaFeedbackRepository";
import { SubmitFeedbackUseCase } from "../useCases/SubmitFeedbackUseCase";

class FeedbackController
{
  async create(request: Request, response: Response)
  {
    const {type, comment, screenshot} = request.body;

    try {
      const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
      const nodemailerMailAdapter     = new NodemailerMailAdapter()
      const submitFeedbackUseCase     = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter)
  
      await submitFeedbackUseCase.execute({ type, comment, screenshot })
  
      return response.status(201).send()
    } catch {
      return response.status(500).send()
    }
    
  }
}

export { FeedbackController }