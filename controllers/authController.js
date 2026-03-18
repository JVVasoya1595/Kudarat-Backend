const login = (req, res) => {
    const { email, password } = req.body;
    
    // Hardcoded credentials requested by the user
    if (email === 'admin@kudaratwaterpark.com' && password === 'Admin@123') {
        return res.status(200).json({
            success: true,
            message: 'Login successful'
        });
    }
    
    return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please verify your email and password.'
    });
};

module.exports = { login };
