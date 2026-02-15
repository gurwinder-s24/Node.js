

const methodNotAllowed = (message = 'Method not allowed for this route') => {
  return (req, res) => {
    res.status(405).json({ error: `${req.method} ${message}` });
  };
};

export default methodNotAllowed;
