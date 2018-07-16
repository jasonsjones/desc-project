export const getRootAPIRoute = (req, res) => {
    res.json({
        name: 'desc-simplify-api',
        version: '1.0.0'
    });
};

export const renderIndexPage = (req, res) => {
    res.render('index');
};
