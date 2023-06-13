// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return new Promise((resolve, reject) => {
      if (
        context.method == "update" ||
        context.method == "patch" ||
        context.method == "create"
      ) {
        if (context.method != "create") { }
        else {
          context.data.admin = {
            name: context.params.user.fullname,
            email: context.params.user.email,
            id : context.params.user._id,
          }
        }

      }
    });
  };
};
