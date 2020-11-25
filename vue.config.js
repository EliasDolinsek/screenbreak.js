module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "screenbreakjs",
        appId: "com.dolinsek.elias.screenbreakjs",
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications"
            },
            {
              x: 130,
              y: 150,
              type: "file"
            }
          ]
        },
        directories: {
          output: "build"
        },
        mac: {
          icon: "build/icon.png"
        },
        win: {
          icon: "build/icon.ico"
        },
        linux: {
          icon: "build/icon.png"
        }
      }
    }
  }
}
