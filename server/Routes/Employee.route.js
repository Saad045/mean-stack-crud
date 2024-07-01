const express = require('express');

const app = express();
const employeeRoute = express.Router();

let employeeModel = require('./../Model/Employee');

// To Get List Of Employees
employeeRoute.route('/').get( async (req, res) => {
    try {
        const employees = await employeeModel.find();    
        return res.status(200).json(employees);
    } catch (err) {
        return res.status(500).json('Something went wrong' + err);
    }
});

// To Add New Employee
employeeRoute.route('/addEmployee').post((req, res) => {
    let employee = new employeeModel(req.body);
    employee.save() //game
        .then(emp => {
            res.status(200).json({ 'employee': 'Employee Added Successfully.' });
        })
        .catch(err => {
            res.status(400).send("Something Went Wrong.");
        });
});

// To Get Employee Details By Employee ID
employeeRoute.route('/editEmployee/:id').get( async (req, res) => {
    let id = req.params.id;
    try {
        const employee = await employeeModel.findById(id);
        if (!employee) return res.status(404).json('Employee not found.');
        return res.status(200).json(employee);
    } catch (err) {
        return res.status(500).json('Something went wrong.');
    }
});

// To Update The Employee Details
employeeRoute.route('/updateEmployee/:id').post( async (req, res) => {
    try {
        const employee = await employeeModel.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        }, { new: true });
        if (!employee) return res.status(404).send('Employee not found');
        return res.status(200).send({ 'message': 'Employee Updated Successfully.' });
    } catch (err) {
        return res.status(400).send(err.message); //Unable To Update Employee.
    }
});

// To Delete The Employee
employeeRoute.route('/deleteEmployee/:id').get( async (req, res) => {
    try {
        const employee = await  employeeModel.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json('Employee not found');
        return res.status(204).json('Employee Deleted Successfully.');
    } catch (err) {
        return res.status(500).send('Something went wrong');
    }
});

module.exports = employeeRoute;