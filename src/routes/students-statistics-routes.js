import express, { json } from 'express';
import HttpError from 'http-errors';
import { connection } from '../libs/database.js';
import { checkmissing } from "../tools.js";
const router = express.Router();

const msgError = " does not exist, all possible values are {firstName, lastName, age, phoneNumber, email, city, nbLanguage, couple, schoolName, year, sn_ts, chimie, physique, favoriteGame, numHours}"

class studentsStatsRoutes {
    constructor() {
       
        router.get('/', this.None); //
        router.get('/:col', this.getCol); //
    }
    None (req,res,next){
        res.json("no values were given").status(200);
    }
    async getCol(req, res, next) {
        try {
            if (req.params.col == "favoriteGame")
                await connection.query(`SELECT SUM(numHours) as data, favoriteGame as labels  FROM InformationsPerso GROUP BY favoriteGame ORDER BY data DESC`, function (error, results, fields) {
                    if (error)
                        res.status(422).json(req.params.col + msgError);
                    else {
                        let data = [];
                        let labels = [];
                        results.forEach(element => {
                            labels.push(element.labels);
                            data.push(element.data)
                        });
                        res.status(200).json({ labels, datasets:[{data}] });
                    }
                });
            else
                await connection.query(`SELECT COUNT(*) as data, ${req.params.col} as labels FROM InformationsPerso GROUP BY ${req.params.col} ORDER BY data DESC`, function (error, results, fields) {
                    if (error)
                        res.status(422).json(req.params.col + msgError);
                    else {
                        let data = [];
                        let labels = [];
                        results.forEach(element => {
                            labels.push(element.labels);
                            data.push(element.data)
                        });
                        res.status(200).json({ labels, datasets:[{data}] });
                    }
                });
        } catch (error) {
            next(error)
        }
    }
}

new studentsStatsRoutes();
export default router;
