// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

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
          console.log(context.data.name);
          let a = context.data.members.list.map((member) => {
            return member.member_id.toString();
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
              console.log(res.data)
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
                  a,
                  fil._id,
                  fil.fullname,
                  a.includes(fil._id.toString()),
                  a.includes(fil._id)
                );
                return a.includes(fil._id.toString());
              });
              if (context.method != "create") {
                context.service
                  .find({ _id: context.id })
                  .then((res) => {
                    let x = new Set(
                      context.data.members.list.map((member) => {
                        return member.member_id;
                      })
                    );
                    res.data[0].members.list.filter((d) => {
                      if (!x.has(d.member_id)) {
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
                          flt,
                          mem,
                          flt._id.toString() == mem.member_id.toString()
                        );
                        return flt._id.toString() == mem.member_id;
                      });
                      console.log("Right Here", z);
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
                    console.log(context.data);
                    reject(new Error("Wait here"));
                    resolve(context);
                  })
                  .catch(function (error) {
                    console.log("ERROR_3: " + error);
                    reject(new Error("ERROR_3: " + error.message));
                  });
              } else {
                // console.log(context);
                context.data.admin = {
                  name: context.params.user.fullname,
                  email: context.params.user.email,
                  id: context.params.user._id,
                };
                // let y = context.data.members.list.map((mem) => {
                //   let z = v.filter((flt) => {
                //     return flt._id.toString() == mem.member_id;
                //   });
                //   context.app
                //     .service("users")
                //     .patch(z[0]._id, { event_org_id: context.id })
                //     .then((res) => {
                //       // console.log(res.data);
                //     })
                //     .catch(function (error) {
                //       console.log("ERROR_2: " + error);
                //       reject(new Error("ERROR_2: " + error.message));
                //     });
                //   return {
                //     ...mem,
                //     name: z[0].fullname,
                //   };
                // });
                // context.data.members.list = y;
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
