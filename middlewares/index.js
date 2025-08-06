const chalk = require('chalk');
const jwt = require('jsonwebtoken');

module.exports.requestInfo = (req, res, next) => {
  console.log(chalk.bgGreen('METHOD:'), chalk.green(req.method));
  console.log(chalk.bgYellow('URL:'), chalk.yellow(req.url));
  console.log(chalk.cyan('BODY:'), req.body);
  next();
};

module.exports.checkToken = roles => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        return res.status(403).json({ message: 'You are not authorized' });
      }

      const token = bearerToken.split(' ')[1];
      console.log(chalk.bgBlueBright('Token:'), token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(chalk.magenta('Decoded JWT:'), decoded);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'You are not authorized' });
      }

      // Optionally attach user info to request
      req.user = decoded;
      next();
    } catch (e) {
      console.error(chalk.red('JWT Verification Failed'), e.message);
      return res.status(403).json({ message: 'You are not authorized' });
    }
  };
};
