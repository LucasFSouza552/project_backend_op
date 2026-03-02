import { z } from "zod";

export const addAgentToTeamSchema = z.object({
    agent: z.string("Id do agente é obrigatório"),
    team: z.string("Id da equipe é obrigatório"),
}).strict();