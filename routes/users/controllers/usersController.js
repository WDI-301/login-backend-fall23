

module.exports = {
    login: async (req, res) => {
        if (req.body.password === 'abc') {
            res.send("Login Success");
        } else {
            res.send("Bad Password")
        }
    },
    register: () => {}
}