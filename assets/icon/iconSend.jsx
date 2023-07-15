import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={682.667}
    height={682.667}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M113.1 97.1c-11.4 2.1-19.5 12-19.4 23.9 0 6 1.7 11.3 22 66.5l22.1 60 140.6.3c82.8.1 140.6-.2 140.6-.7 0-.5-1.5-2.2-3.3-3.7C411 239.3 125.3 97.2 121 96.7c-1.9-.2-5.5 0-7.9.4zM137.5 265.2c-23.7 64.4-43.7 120-44.1 122.8-.9 5.5 2 14.3 6.2 19 5 5.5 11.1 8.2 18.7 8.2h6.2l143.9-71.8c79.2-39.6 145.4-73.2 147.3-74.8 1.8-1.5 3.3-3.2 3.3-3.7s-58.3-.9-140.5-.9c-111.5 0-140.7.3-141 1.2z" />
  </Svg>
)
export default SvgComponent
