import express from 'express';

function notFoundHandler(req, res, next) {
  res.status(404).json({ error: "Route not found" });
  next();
}

export default notFoundHandler;