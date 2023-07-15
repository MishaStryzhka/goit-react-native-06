import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      fill="#BDBDBD"
      d="M99.2 142.2 0 241.5 99.5 341l99.5 99.5v-58.3c0-45.9.3-58.2 1.3-58.2 11.6.1 49.6 2.4 60.2 3.5 75.5 8.4 134.6 31.2 185.6 71.6 13.6 10.8 42.2 39.6 52.9 53.3 14.4 18.4 13.3 18.3 9.5 1.6-9-39.6-21.2-73.5-38.5-108-18.5-36.6-39.4-65.6-67-93.1-49.7-49.3-113.4-80.7-191-94.3l-12.5-2.2-.5-56.7-.5-56.7-99.3 99.2z"
    />
  </Svg>
)
export default SvgComponent
