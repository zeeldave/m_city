import React from "react";
import Animate from "react-move/Animate";
import { easePolyInOut } from "d3-ease";
import PlayerCard from "../../Utils/playerCard";

import player1 from "../../../Resources/images/players/Otamendi.png";
import player2 from "../../../Resources/images/players/Raheem_Sterling.png";
import player3 from "../../../Resources/images/players/Vincent_Kompany.png";

let cards = [
  {
    bottom: 90,
    left: 300,
    player: player1,
    name:"Chirag",
    lastname:"Trivedi",
    number:4,
    delay:100
  },
  {
    bottom: 60,
    left: 200,
    player: player2,
    name:"Yash",
    lastname:"Dave",
    number:3,
    delay:200
  },
  {
    bottom: 30,
    left: 100,
    player: player3,
    name:"Dhruvi",
    lastname:"Dave",
    number:2,
    delay:300
  },
  {
    bottom: 0,
    left: 0,
    player: player1,
    name:"Chirag",
    lastname:"Trivedi",
    number:1,
    delay:400
  },
];

const HomeCards = (props) => {
  const showAnimateCard = () =>(
    cards.map((card, i) => (
      <Animate
        key={i}
        show={props.show}
        start={{
          left: 0,
          bottom: 0,
          opacity:0,
        }}
        enter={{
            opacity:[1],
          left: [card.left],
          bottom: [card.bottom],
          timing: {
              delay:[card.delay],
            duration: 500,
            ease: easePolyInOut
          }
        }}
      >
        {({left, bottom}) => (
          <div
            style={{
              position: "absolute",
              left,
              bottom,
            }}
          >
            <PlayerCard
              number={card.number}
              name={card.name}
              lastname={card.lastname}
              bck={card.player}
            />
          </div>
        )}
      </Animate>
    ))) 

  return <div>{showAnimateCard()}</div>;
};

export default HomeCards;
