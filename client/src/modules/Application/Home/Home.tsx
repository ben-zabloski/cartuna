import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState, useCallback } from "react";
import { animated, config, useSpring, useTransition } from "react-spring";

import CardList from "modules/CardList/CardList";
import LoadingCard from "modules/LoadingCard/LoadingCard";
import SeriesCard from "modules/SeriesCard/SeriesCard";
import Input from "modules/Input/Input";

import cartunaLogo from "./images/cartuna192.png";
import { GET_SERIES_BY_NAME } from "./HomeQueries";
import { Series } from "./HomeTypes";

import "./Home.css";

const INPUT_DEBOUNCE = 2000;
const DEFAULT_OPTIONS = { skip: true, variables: { name: "" } };

type DataObject = {
  getSeriesByName: [Series];
};

type DataMap = Record<string, DataObject>;

function Home(props: RouteComponentProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataMap, setDataMap] = useState<DataMap>();
  const [dataCards, setDataCards] = useState<Array<string>>();
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const { data } = useQuery(GET_SERIES_BY_NAME, options);

  const inputOnChangeHandler = useCallback((value) => setInput(value), []);

  useEffect(() => {
    if (options.variables.name === input) {
      return;
    }

    setOptions({ skip: false, variables: { name: input } });
    setLoading(true);
  }, [options.variables.name, input]);

  useEffect(() => {
    const newDataMap = {
      ...dataMap,
      [input]: data,
    };

    setDataMap(newDataMap);

    setDataCards([input]);

    setLoading(false);
  }, [data]);

  const loadingSpring = useSpring({ opacity: loading ? 1 : 0 });

  const transitions = useTransition(dataCards, null, {
    from: { opacity: 1, transform: "rotateX(-30deg)" },
    enter: { delay: 0, opacity: 1, transform: "rotateX(0deg)" },
    leave: { opacity: 0, transform: "rotateX(30deg)" },
    config: config.default,
  });

  return (
    <>
      <div className="ApplicationHeader">
        <img src={cartunaLogo} />
        <div className="ApplicationInput">
          <div className="ApplicationTitle">Cartuna</div>
          <div className="InputContainer">
            <div className="InputWrapper">
              <Input
                debounce={INPUT_DEBOUNCE}
                onChange={inputOnChangeHandler}
              />
            </div>
            <div className="spinnerContainer">
              <animated.div style={loadingSpring}>
                <div className="spinner" />
              </animated.div>
            </div>
          </div>
        </div>
      </div>
      <div className="HomeCardList">
        {transitions.reverse().map(({ item, key, props }) => (
          <animated.div key={item} className="CardListTest" style={props}>
            <CardList>
              {dataMap &&
                dataMap[item] &&
                dataMap[item] &&
                dataMap[item].getSeriesByName &&
                dataMap[item].getSeriesByName.map((series: Series) => (
                  <SeriesCard key={series.id} {...series} />
                ))}
            </CardList>
          </animated.div>
        ))}
      </div>
    </>
  );
}

export default Home;
