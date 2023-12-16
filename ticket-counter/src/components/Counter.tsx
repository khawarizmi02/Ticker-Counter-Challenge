const Counter = ({ data, queueData }: { data: any; queueData: any }) => {
  const currentQueue = queueData.find((item: any) => item._id === data.queue);

  // console.log(data.queue);
  // console.log(currentQueue);
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="font-medium text-6 flex border-2 border-black  
					flex-col items-center p-2 m-2 relative h-[92px]"
      >
        <div>
          <div
            className={`absolute top-0 right-0 
												rounded-full border-2
					 						border-black w-3 h-3 m-1
											${data.queue ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
        <div className="font-bold text-10"> Counter {data.counterNumber} </div>
        <div className="text-center">
          {" "}
          Now Serving: {currentQueue ? currentQueue.queueNumber : ""}{" "}
        </div>
      </div>
    </div>
  );
};

export default Counter;
