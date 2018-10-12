/**
 * water-service 接口配置
 * config water-service database
 * https://confluence.tendcloud.com/display/VD/water-service
 * base end database
 * schema
 * table
 * api
 */
export const DATABASE = {
  baseUrl: "http://5990367be1e4470011c46fa8.mockapi.io",
  // baseUrl: "",
  database: {
    //module | table
    soaUser: {
      users: {
        prefix: "/meng/user",
        method: "get"
      },
      user: {
        prefix: "/meng/user/:id",
        method: "get"
      },
      userAdd: {
        prefix: "/meng/user",
        method: "post"
      },
      userDel: {
        prefix: "/meng/user/:id",
        method: "delete"
      },
      userMod: {
        prefix: "/meng/user/:id",
        method: "put"
      }
    },
    //next...
    schema2: {
      api1: {
        prefix: "/smart",
        method: "get"
      },
      api2: {
        prefix: "/smart",
        method: "post"
      }
    }
    //...
  }
};
