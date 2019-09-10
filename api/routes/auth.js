module.exports = (router) => {
    router.post('/register', (req, res) => {
        res.send('registration');
    });
    
    router.post('/login', (req, res) => {
        res.send('login');
    });
    
    router.post('/logout', (req, res) => {
        res.send('logout');
    });
}
