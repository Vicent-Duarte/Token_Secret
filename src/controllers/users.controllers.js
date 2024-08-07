const catchError = require('../utils/catchError');
const User = require('../models/users');
const bcrypt = require('bcrypt');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { password } = req.body
    console.log(password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const result = await User.create({...req.body, password: hashedPassword});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { password, email, firstName, lastName, ...updateData } = req.body;
    const [updatedCount, [updatedUser]] = await User.update(updateData, {
        where: { id },
        returning: true
    });
    if (updatedCount === 0) {
        return res.sendStatus(404);
    }
    return res.json(updatedUser);
});

const login = catchError(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: {email} })
    if(!user) return res.status(401).json({"message": "Las credenciales ingresadas son incorrectas"})
        const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({"message": "Las credenciales ingresadas son incorrectas"})
    return res.status(200).json(user);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}