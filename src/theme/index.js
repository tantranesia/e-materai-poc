import { extendTheme } from "@chakra-ui/react";

import Button from "./component/button"

const theme = {
    styles: {
        global: {},
      },
      fonts: {
        heading: "Archivo",
        body: "Inter",
      },
      color: {
          emt: {
              broken_white: '#F6F6F6',
              primary: '#2C8CCB',
              accent: '#37ACEE',
              orange: '#FAAD16',
              orange2: '#FFE58F',

          }
      },
      components: {
          Button
      }

} 

export default extendTheme(theme)