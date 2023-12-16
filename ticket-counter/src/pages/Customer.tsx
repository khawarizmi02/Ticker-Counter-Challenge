// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import data from "../data.json";
import { Counter } from "../components";
import { useAuth } from "../Auth";

const Customer = () => {
  const { queueNum, status, updateQueue, updateStatus } = useAuth();
  const [queueList, setQueueList] = useState([]);
  const [counterList, setCounterList] = useState([]);

  const createNumber = (latestNumber: number) => {
    console.log(latestNumber);
    const link = data.API_URI + "queues";
    axios.post(link, { queueNumber: latestNumber }).then((response) => {
      console.log(response);
      updateQueue(latestNumber);
      updateStatus("waiting");
    });
  };

  useEffect(() => {
    const queuelink = data.API_URI + "queues";
    const counterlink = data.API_URI + "counters";

    // console.log(queuelink);
    // console.log(counterlink);

    axios.get(queuelink).then((response) => {
      setQueueList(response.data);
    });

    axios.get(counterlink).then((response) => {
      setCounterList(response.data);
    });
  }, []);

  // console.log(queueList);
  // console.log(counterList);
  // console.log(queueNum);
  // console.log(status);

  const NowServing = queueList.find((item: any) => item.status === "serving");

  // if (NowServing) {
  // console.log((NowServing as any)?.queueNumber);
  // }

  const latestTicket = queueList.sort(
    (a: { id: number }, b: { id: number }) => b.id - a.id
  )[0];

  const lastNumber = latestTicket ? (latestTicket as any).queueNumber : 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-bold text-10"> Customer View </div>
      <div
        className="font-medium text-6 flex border-2 border-black  
					flex-col items-center justify-center p-2 m-2"
      >
        <div>
          {" "}
          Now Serving:{" "}
          {NowServing
            ? (NowServing as any).queueNumber
            : "No one is being served"}{" "}
        </div>
        <div>
          {" "}
          Last Number:{" "}
          {latestTicket
            ? (latestTicket as any).queueNumber
            : "No tickets have been issued"}
        </div>

        {queueNum === 0 ? (
          <button
            onClick={() => {
              createNumber(lastNumber + 1);
            }}
            className="p-3 m-3 bg-blue-200"
          >
            {" "}
            Take a Number{" "}
          </button>
        ) : (
          <div className="p-3 m-3 bg-blue-200">
            {" "}
            Your Number is {queueNum} <br />
            Your Status is {status}{" "}
          </div>
        )}
      </div>
      <div className="flex flex-col p-3 m-3 justify-center items-center">
        <div className="font-bold text-10"> Counter List: </div>
        <div className="grid grid-cols-4 p-2 m-2">
          {counterList.map((counter) => (
            <div className="p-2 m-2">
              <Counter data={counter} queueData={queueList} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customer;
