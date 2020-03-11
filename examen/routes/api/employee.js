var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  router.get('/all', (req, res) => {
    empModel.getEmployees( (err, docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(docs);
    });
  });// all

  router.get('/byid/:id', (req, res)=>{
    var id = req.params.id;
    empModel.getEmployeesById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
  });

  router.get('/bycompany/:company', (req, res)=>{
    var company = req.params.company;
    empModel.getEmployeesByCompany(company, (err, doc)=>{
      if(err){
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
  });

  router.get('/byagerange/:min/:max', (req,res)=>{
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);
    empModel.getEmployeesByAgeRange(min, max, (err, doc)=>{
      if(err){
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
  });

  router.get('/bytag/:tag', (req, res)=>{
    var tag = req.params.tag;
    empModel.getEmployeesByTag(tag, (err, doc)=>{
      if(err){
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
  });

  router.post('/addtag/:id', (req, res)=>{
    var id = req.params.id;
    var tag = req.body.tag;
    empModel.addEmployeeATag(tag, id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
  });

  router.delete('/delete/:id', (req, res)=>{
    var id = req.params.id;
    empModel.removeEmployee(id, (err, doc)=>{
      if(err){
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
  });

  router.post('/makeolder', (req, res)=>{
    var ages = parseInt(req.body.age);
    empModel.increaseAgeToAll(ages, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc); 
    });
  });

  
  return router;
}

module.exports = initEmployee;
