import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Account from "./Account";
import Card from "./Card";

import "./Profile.css";

import { TransactionContext } from "../context/TransactionContext";
import { CollectionContext } from "../context/CollectionContext";

const Profile = () => {
  const { handleConnect, currentAccount } = useContext(TransactionContext);
  const { getLegacyHoldings } = useContext(CollectionContext);
  const [tokenURI, setTokenURI] = useState({});
  const [datas, setDatas] = useState();
  const [select, setSelect] = useState([]);

  useEffect(async () => {
    let res = await getLegacyHoldings(
      "0xD1b1a726169ABb13a8638CE5A1A800424778B430"
    );

    setTokenURI(res);
  }, []);

  useEffect(async () => {
    let dataList = [];

    for (let id in tokenURI) {
      console.log(tokenURI[id]);
      let r = await axios.get(tokenURI[id]);
      let data = r.data;
      dataList.push(data);
    }
    setDatas(dataList);
  }, [tokenURI]);

  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <div className="profile">
      {/* 지갑 정보 */}
      <Account />
      <div className="profile__card">
        <Card data={datas} select={select} setSelect={setSelect} />
      </div>
      {/* 결합하기 */}
      {select.length != 0 ? (
        <button className="button profile__button">결합하기</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
