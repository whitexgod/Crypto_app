import "./descPopup.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import loading_svg from "../assets/loading.svg";
import close_img from "../assets/close.png";

const DescriptionPopup = ({ coin_id, changeCoinId }) => {
    const [fetchedData, setfetchedData] = useState({});
    const [isDescLoading, setIsDescLoading] = useState(true);

    const handlePopupDataChange = () => {
        changeCoinId("");
    };

    const getCoinDetails = () => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${coin_id}?localization=false`
            )
            .then((res) => {
                setfetchedData(res.data);
                setIsDescLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(
        getCoinDetails,

        // keep quite eslint......
        // eslint-disable-next-line
        []
    );

    return (
        <div className="popup">
            {isDescLoading && (
                <div className="loadder">
                    <img src={loading_svg} alt="" />
                </div>
            )}
            {!isDescLoading && (
                <>
                    <button
                        className="close-btn"
                        onClick={handlePopupDataChange}
                    >
                        <img src={close_img} alt="" />
                    </button>
                    <div className="details-box">
                        <p>
                            {fetchedData.description.en.replace(
                                /(<([^>]+)>)/gi,
                                " "
                            )}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default DescriptionPopup;
