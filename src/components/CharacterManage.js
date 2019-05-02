import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { FirebaseContext } from "../config/context";
import ClassImg from "./ClassImg";

const CharacterManage = () => {
  const [user] = useAuth();
  const firebase = useContext(FirebaseContext);
  return (
    user && (
      <section className="content-gap">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-three-fifths box content-box">
              <h1 className="is-size-3">Characters</h1>
              <hr />
              <Link to="/characters/new-character">
                <button className="button is-fullwidth is-danger mb2">
                  New Character
                </button>
              </Link>
              <CharacterList firebase={firebase} profileUID={user.uid} />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

const CharacterList = ({ firebase, profileUID }) => {
  const [characters, setCharacters] = useState([]);
  const handleDelete = id => {
    const newCharList = characters.filter(character => character.id !== id);
    setCharacters(newCharList);
    firebase.character(id).delete();
  };
  useEffect(() => {
    const fetchCharacters = firebase
      .userCharacters(profileUID)
      .orderBy("lastUpdatedDate", "desc")
      .get()
      .then(snapshot => {
        const retrievedChars = [];
        snapshot.forEach(doc => {
          const characterDoc = doc.data();
          retrievedChars.push({ profile: characterDoc, id: doc.id });
        });
        setCharacters(retrievedChars);
      });
    return () => fetchCharacters;
  }, []);
  return characters.length > 0 ? (
    characters.map((character, index) => {
      return (
        <div className="card mb1" key={index}>
          <div className="card-content">
            <div className="columns">
              <div className="column is-one-fifth is-hidden-mobile">
                <ClassImg charClass={character.profile.charClass} size={64} />
              </div>
              <div className="column is-three-fifths">
                <h2 className="is-size-3">{character.profile.name}</h2>
                <h3 className="is-size-4">
                  Level {character.profile.level} {character.profile.charClass}
                </h3>
              </div>
              <div className="column is-one-fifth has-text-right">
                <button
                  className="button is-danger"
                  onClick={() => {
                    if (
                      window.confirm("Do you wish to delete this character?")
                    ) {
                      handleDelete(character.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="card-footer-item">
              <Link to={`/characters/${character.id}`}>Manage Character</Link>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p>You do not have any characters.</p>
  );
};

export default CharacterManage;
