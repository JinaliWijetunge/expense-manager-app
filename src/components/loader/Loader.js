import React from "react"
import { Spin } from 'antd';
import "../../assets/styles/loader.css";

const Loader = () => {
    return (
        <div className="loading"> <Spin size="large" className="spinner-color spinner-size" /> </div>
        // <div className="loader">
        //     <div className="loader-content">
        //         <div className="loader-image-main" >
        //             {/* <img src={require("../../assets/img/loader.png")} className="loader-image" /> */}
        //         </div>
        //     </div>
        // </div>
    )

}

export default Loader;