import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../config/context";
import useAuth from "../../hooks/useAuth";

import Loader from "../Loader";
import CharacterSheet from "./CharacterSheet";

const Character = ({ location, history }) => {
  const [user] = useAuth();
  const firebase = useContext(FirebaseContext);
  const characterID = location.pathname.split("/")[2];
  const [character, setCharacter] = useState(null);
  useEffect(() => {
    const datafetch = firebase
      .character(characterID)
      .get()
      .then(snapshot => {
        const charData = snapshot.data();
        if (!charData) {
          history.push("/none");
        } else {
          setCharacter(charData);
        }
      });
    return () => datafetch;
  }, []);
  const loaded = (
    <section className="content-gap">
      <div className="container">
        <div className="columns is-centered">
          <div
            className="column is-three-fifths box"
            style={{ padding: "3rem" }}
          >
            <CharacterSheet
              char={[character, setCharacter]}
              firebase={firebase}
              current={user}
              charID={characterID}
              location={location}
            />
          </div>
        </div>
      </div>
    </section>
  );
  return character ? loaded : <Loader />;
};

export default Character;
