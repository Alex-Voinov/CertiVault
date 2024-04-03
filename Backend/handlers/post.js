const generateDCC = (req, res) => {
    const data = req.body;
    res.json({ message: 'Обработка запроса на /path1' });
}

module.exports = { generateDCC };