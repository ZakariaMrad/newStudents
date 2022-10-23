import express, { json } from 'express';
import HttpError from 'http-errors';
import { connection } from '../libs/database.js';
import { checkmissing } from "../tools.js";
const router = express.Router();

const msgError = " does not exist, all possible values are {firstName, lastName, age, phoneNumber, email, city, nbLanguage, couple, schoolName, year, sn_ts, chimie, physique, favoriteGame, numHours}"

class studentsStatsRoutes {
    constructor() {
        connection
        router.get('/', this.Test); //
        router.get('/:col', this.getCol); //
    }

    Test(req, res, next) {
        res.status(200).json("yes");
    }

    async getCol(req, res, next) {
        try {
            if (req.params.col == "favoriteGame")
                await connection.query(`SELECT SUM(numHours) as numHours, favoriteGame  FROM InformationsPerso GROUP BY favoriteGame`, function (error, results, fields) {
                    if (error) {
                        res.json(req.params.col + msgError)
                        next(422);
                    }
                    else
                        res.status(200).json(results);
                });
            else
                await connection.query(`SELECT COUNT(*) as Length, ${req.params.col}  FROM InformationsPerso GROUP BY ${req.params.col}`, function (error, results, fields) {
                    if (error) {
                        res.json(req.params.col + msgError)
                        next(422);
                    }
                    else
                        res.status(200).json(results);
                });
        } catch (error) {
            next(error)
        }
    }
}

new studentsStatsRoutes();
export default router;
