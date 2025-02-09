import { TailSpin } from "react-loader-spinner"

const UILayerSpinner = () => {
  return (
    <div className="loading-layer">
      <TailSpin width={40} height={40} color={"#ffffff"} />
    </div>
  )
}

export default UILayerSpinner