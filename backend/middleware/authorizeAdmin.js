// middleware/authorize.js
// const authorizeRole = (role) => {
//     return (req, res, next) => {
//       if (req.user.role !== role) {
//         return res.status(403).json({ message: 'Access denied.' });
//       }
//       next();
//     };
//   };
  
//   module.exports = authorizeRole;
  

module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};