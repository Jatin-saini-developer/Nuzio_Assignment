export const getHealth = (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Nuzio API is running",
    timestamp: new Date().toISOString(),
  });
};
