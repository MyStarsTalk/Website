let getIndexPage = async (req, res) => {
    return res.render("index.ejs",{
        user: req.user
    });
};

module.exports = {
    getIndexPage : getIndexPage,
};
