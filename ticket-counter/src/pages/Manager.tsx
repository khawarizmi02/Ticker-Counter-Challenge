// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import data from "../data.json";
import { CounterManager } from "../components";

const Manager = () => {
  const [queueList, setQueueList] = useState([]);
  const [counterList, setCounterList] = useState([]);

  useEffect(() => {
    const counterlink = data.API_URI + "counters";
    const queuelink = data.API_URI + "queues";
    axios.get(counterlink).then((response) => {
      setCounterList(response.data);
    });
    axios.get(queuelink).then((response) => {
      setQueueList(response.data);
    });
  }, []);

  console.log(queueList);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-bold text-10"> Manager View </div>
      <div>
        {counterList.map((item: any) => (
          <CounterManager counterData={item} queueData={queueList} />
        ))}
      </div>
    </div>
  );
};

export default Manager;
