export default  {
    jwt: {
        secret: process.env.JWT_SECRET || 'rahasia-banget',
        adminExpires: '24h',
        userExpires: '72h'
    },
    bcryptSalt: 10
};