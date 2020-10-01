const requirePermission = (permissionRequired) =>  (req,res,next) => {
  const user = req.user;
  for(let role of user.roles) {
    for(let permission of role.permissions) {
      if(permission.code === permissionRequired) {
        return next()
      }
    }
  }
  res.status(401).json({reason: 'Not allowed'})
}

module.exports = requirePermission;
