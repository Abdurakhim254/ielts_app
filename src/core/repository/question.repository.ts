import { Repository } from "typeorm";
import {  Question } from "../entity";


export type QuestionRepository=Repository<Question>