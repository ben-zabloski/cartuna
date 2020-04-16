import { useApolloClient, useQuery } from "@apollo/react-hooks";
import {
  RouteComponentProps,
  useNavigate,
  useParams,
  useLocation,
} from "@reach/router";
import React, { useEffect, useState, useCallback } from "react";
import { animated, config, useTransition } from "react-spring";

import CardList from "./CardList/CardList";
import SeriesCard from "./SeriesCard/SeriesCard";
import Input from "./Input/Input";

import cartunaLogo from "./images/cartuna192.png";
import { GET_SERIES_BY_NAME } from "./HomeQueries";
import { SeriesSearch } from "./HomeTypes";
import Spinner from "../Spinner/Spinner";
import "./Home.css";

type DataObject = { getSeriesByName: [SeriesSearch] };
type DataMap = Record<string, DataObject>;

const INPUT_DEBOUNCE = 500;

const queryCache: DataMap = {};

function Home(props: RouteComponentProps) {
  const apolloClient = useApolloClient();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const term = params.term;

  const [input, setInput] = useState(term);
  const inputOnChangeHandler = useCallback((value) => setInput(value), []);

  const [cards, setCards] = useState<Array<string>>([]);

  const { data, loading, variables } = useQuery(GET_SERIES_BY_NAME, {
    variables: { name: term, skip: !term },
  });

  useEffect(() => {
    if (location.pathname === `/${input}`) return;

    navigate(`/${input}`);
  }, [input, location.pathname, navigate]);

  useEffect(() => {
    queryCache[variables.name] = data;

    setCards([term]);
  }, [data]);

  const transitions = useTransition(cards, null, {
    from: { opacity: 1, transform: "rotateX(-30deg)" },
    enter: { delay: 0, opacity: 1, transform: "rotateX(0deg)" },
    leave: { opacity: 0, transform: "rotateX(30deg)" },
    config: config.default,
  });

  return (
    <>
      <div className="ApplicationHeader">
        <img alt="Cartuna Logo" src={cartunaLogo} />
        <div className="ApplicationInput">
          <div className="ApplicationTitle">Cartuna</div>
          <div className="InputContainer">
            <div className="InputWrapper">
              <Input
                debounce={INPUT_DEBOUNCE}
                defaultValue={term}
                onChange={inputOnChangeHandler}
              />
            </div>
            <div className="spinnerContainer">
              <Spinner show={loading} />
            </div>
          </div>
        </div>
      </div>
      <div className="HomeCardList">
        {transitions.reverse().map(({ item, key, props }) => (
          <animated.div key={item} className="CardListTest" style={props}>
            <CardList>
              {queryCache &&
                queryCache[item] &&
                queryCache[item] &&
                queryCache[item].getSeriesByName &&
                queryCache[item].getSeriesByName.map((series: SeriesSearch) => (
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
