// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { ObjectId } = require('mongodb');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    return new Promise((resolve, reject) => {
      if (
        context.method == "update" ||
        context.method == "patch" ||
        context.method == "create"
      ) {
        
        if (context.data && context.data.members && context.data.members.list) {
          // console.log(context.data.name);
          let a = context.data.members.list.map((member) => {
            
            return ObjectId(member.member_id.toString());
          });
          context.app
            .service("users")
            .find({
              query: {
                _id: {
                  $in: a,
                },
              },
            })
            .then((res) => {
              let s = new Set();
              context.data.members.list = context.data.members.list.filter(
                (d) => {
                  if (!s.has(d.member_id)) {
                    s.add(d.member_id);
                    return d;
                  }
                }
              );
              let t = new Set();
              context.data.teams.list = context.data.teams.list.filter((d) => {
                if (!t.has(d.name.toLowerCase())) {
                  t.add(d.name.toLowerCase());
                  return d;
                }
              });
              let u = new Set();
              context.data.teams.roles = context.data.teams.roles.filter(
                (d) => {
                  if (!u.has(d.name.toLowerCase())) {
                    u.add(d.name.toLowerCase());
                    return d;
                  }
                }
              );
              let v = res.data.filter((fil) => {
                console.log(
                  fil.fullname,
                  a,
                  ObjectId(fil._id.toString()),
                  fil._id,
                  a.includes(ObjectId(fil._id.toString())),
                );
                return a.includes(ObjectId(fil._id.toString()));
              });
              if (context.method != "create") {
                context.service
                  .find({ _id: ObjectId(context.id) })
                  .then((res) => {
                    let x = new Set(a);
                    res.data[0].members.list.forEach((d) => {
                      if (d && !x.has(d.member_id)) {
                        console.log(d);
                        context.app
                          .service("users")
                          .patch(d.member_id, { event_org_id: null });
                      }
                    });
                    let y = context.data.members.list.map((mem) => {
                      // console.log(v);
                      let z = v.filter((flt) => {
                        console.log(
                          flt._id.toString() == mem.member_id.toString(),
                        );
                        return flt._id.toString() == mem.member_id;
                      });
                      if (z && z.length > 0) {
                        context.app
                          .service("users")
                          .patch(z[0]._id, { event_org_id: context.id })
                          .catch(function (error) {
                            console.log("ERROR_2: " + error);
                            reject(new Error("ERROR_2: " + error.message));
                          });
                        return {
                          ...mem,
                          name: z[0].fullname,
                        };
                      }
                    });
                    context.data.members.list = y;
                    resolve(context);
                  })
                  .catch(function (error) {
                    console.log("ERROR_3: " + error);
                    reject(new Error("ERROR_3: " + error.message));
                  });
              } else {
                context.data.admin = {
                  name: context.params.user.fullname,
                  email: context.params.user.email,
                  id: context.params.user._id,
                };
                resolve(context);
              }
            })
            .catch(function (error) {
              console.log("ERROR_1: " + error);
              reject(new Error("ERROR_1: " + error.message));
            });
        }
      } else {
        resolve(context);
      }
    });
  };
};
