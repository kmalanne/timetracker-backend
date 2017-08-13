const express = require('express');
const validate = require('express-validation');
const validations = require('./validations/projects');
const Project = require('../../db/models/project');
const asyncRequest = require('../utils/asyncRequest');

const router = express.Router();

const getProjects = async (req, res) => {
  const { user } = req;
  const result = await Project.getProjects(user.sub);
  res.status(200).json(result);
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  const result = await Project.getProjectById(id);
  res.status(200).json(result);
};

const createProject = async (req, res) => {
  const { body, user } = req;
  const id = await Project.createProject(body, user.sub);
  const result = await Project.getProjectById(id);
  res.status(200).json(result);
};

const updateProject = async (req, res) => {
  const { body, params, user } = req;
  const id = await Project.updateProject(params.id, body, user.sub);
  const result = await Project.getProjectById(id);
  res.status(200).json(result);
};

const deleteProject = async (req, res) => {
  const { params, user } = req;
  const result = await Project.deleteProject(params.id, user.sub);
  res.status(200).json(result);
};

router.get('/', asyncRequest.bind(null, getProjects));
router.get('/:id', validate(validations.get), asyncRequest.bind(null, getProjectById));
router.post('/', validate(validations.create), asyncRequest.bind(null, createProject));
router.put('/:id', validate(validations.update), asyncRequest.bind(null, updateProject));
router.delete('/:id', validate(validations.delete), asyncRequest.bind(null, deleteProject));

module.exports = router;
