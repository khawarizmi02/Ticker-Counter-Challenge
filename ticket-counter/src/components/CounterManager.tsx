import { useState, useEffect } from "react";
import axios from "axios";
import data from "../data.json";

const CounterManager = ({
  counterData,
  queueData,
}: {
  counterData: any;
  queueData: any;
}) => {
  const [queueList, setQueueList] = useState(queueData);
  const [currentQueue, setCurrentQueue] = useState({});
  const [waitingQueue, setWaitingQueue] = useState([]);

  useEffect(() => {
    setCurrentQueue(
      queueList.find((item: any) => item._id === counterData.queue)
    );
    setWaitingQueue(queueList.filter((item: any) => item.status === "waiting"));
  }, [queueList, counterData.queue]);

  console.log(waitingQueue);
  console.log(currentQueue);

  const fetchData = () => {
    const link = data.API_URI + "queues";
    axios.get(link).then((response) => {
      setQueueList(response.data);
    });
  };

  const deleteQueueNum = (id: string) => {
    const queueLink = data.API_URI + "queues/" + id;

    axios.delete(queueLink).then((response) => {
      console.log(response);
      fetchData();
    });
  };

  const addQueueNum = () => {
    const queueId = waitingQueue.length > 0 ? (waitingQueue[0] as any)._id : "";
    const link = data.API_URI + "counters/" + counterData._id;
    console.log(link);
    console.log(queueId);
    axios.patch(link, { queueId: queueId }).then((response) => {
      console.log(response);
      fetchData();
    });
  };

  console.log(waitingQueue);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="font-medium text-6 flex border-2 border-black  
					flex-col items-center p-2 m-2 relative"
      >
        <div>
          <div
            className={`absolute top-0 right-0 
												rounded-full border-2
					 						border-black w-3 h-3 m-1
											${counterData.queue ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
        <div className="font-bold text-10">
          {" "}
          Counter {counterData.counterNumber}{" "}
        </div>
        <div className="text-center">
          {" "}
          Now Serving: {currentQueue ? currentQueue.queueNumber : ""}{" "}
        </div>
        {counterData.queue ? (
          <div>
            <button
              onClick={() => {
                deleteQueueNum(counterData.queue);
              }}
              className="bg-green-500"
            >
              Finish
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                addQueueNum();
              }}
              className="bg-yellow-300"
            >
              Add Number
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterManager;
