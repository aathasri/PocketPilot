
tailwind.config = {
    theme: {
      extend: {
        colors: {
          lightBlue: '#DEEBFC',
          red: {
            "800":"#71192F",
            "500":'#FC6C69',
            "100": "#FCE8DB"
          },
          salmon: "#EBA8A2",
          pink: "#FF539F",
          blue:"#5C9AF1",
          white: "#fff",
          yellow: "#FED693",
          gray: {
            "500":"#667085",
            "100":"#E3E3E3"
          },
          green: "#268750"
        },
        height: {
          '90vh': '90vh',
          '80vh': '80vh',
          "screen": "100vh"
        },  
      },
      fontFamily: {
        head: ["Roboto", "sans-serif"],
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
      }
    }
}