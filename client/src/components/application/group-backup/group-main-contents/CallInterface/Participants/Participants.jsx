const Participants = ({ participants }) => {
  return (
    <div className="call__participants__interface">
      <div className="call__participants__wrapper">
        <div className="flex-1">
          {participants?.map(
            (participant, index) =>
              index <= 1 &&
              (!participant.video ? (
                <div className="user__box">
                  <div className="user__circle">
                    {participant.name.split("")[0]}
                  </div>
                </div>
              ) : (
                <span></span>
              ))
          )}
        </div>
        {participants?.length > 2 && (
          <div className="flex-1">
            {participants?.map(
              (participant, index) =>
                index > 1 &&
                index <= 3 &&
                (!participant.video ? (
                  <div className="user__box">
                    <div className="user__circle">
                      {participant.name.split("")[0]}
                    </div>
                  </div>
                ) : (
                  ""
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;
