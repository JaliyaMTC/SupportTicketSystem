const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/user/1",
      "/user/2",
      "/userValidate/**",
      "/ticket/3",
    ],
    target: "https://localhost:7239",
    secure: false,
    changeOrigin: true,
  }
]
module.exports = PROXY_CONFIG;
