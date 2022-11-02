import express, { json } from 'express';
import HttpError from 'http-errors';
import { connection } from '../libs/database.js';
import { checkmissing } from "../tools.js";
import chalk from 'chalk';

const router = express.Router();

class studentsRoutes {

  constructor() {
    connection
    router.get('/:StudentId', this.getOne); //
    router.get('/', this.getAll); //


    router.post('/', this.post); //
  }

  async getOne(req, res, next) {
    try {
      await connection.query(`SELECT * FROM InformationsPerso WHERE Id = ${req.params.StudentId}`, function (error, results, fields) {
        if (results.length < 1)
          next(404);
        else
          res.status(200).json(results[0]);
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      connection.query('SELECT * FROM InformationsPerso', function (error, results, fields) {
        console.log(chalk.green(`Envoie des informations des `) + chalk.blue(results.length) + chalk.green(" étudiants à ") + chalk.blue(req.socket.remoteAddress));
        res.status(200).json(results);
      });
    } catch (error) {
      next(error)
    }
  }

  async post(req, res, next) {
    try {
      if (checkmissing(req.body)) {
        console.log("not")
        next(422);
        return;
      }
      await connection.query(`Insert ignore into InformationsPerso 
            (firstName, lastName, age, phoneNumber, email, city, nbLanguage, 
              couple, schoolName, year, sn_ts, chimie, physique, favoriteGame, numHours)
          Values
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
        [req.body.firstName, req.body.lastName, req.body.age, req.body.phoneNumber, req.body.email,
        req.body.city, req.body.nbLanguage, req.body.couple, req.body.schoolName, req.body.year,
        req.body.sn_ts, req.body.chimie, req.body.physique, req.body.favoriteGame, req.body.numHours],
        function (error, results, fields) {
          if (error)
            next(error);
          console.log(chalk.green(`Création de l'étudiant `) + chalk.blue(req.body.firstName +" "+req.body.lastName) + chalk.green(" à provenance de ") + chalk.blue(req.socket.remoteAddress));
          res.status(200).json(results);
        });
    } catch (error) {
      next(error)
    }
  }

}

new studentsRoutes();
export default router;
