module.exports = {
    hello: () => {
      return 'Hello world!';
    },

    boy: () => {
      return {hobby: "time-wasting", id: "1"};
    },

    user: (iden) => {
      return {
        id: iden,
        password: "shutup",
      };
    },
 }