import "./Style.css";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Box, Card, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import TableChartIcon from "@material-ui/icons/TableChart";
import {
  points_table_api,
  league_clubs_api,
  match_fixtures_api,
  league_details_api,
} from "./../apis";
import FootballInfoCard from "./clubpage";
import { MatchList } from "./fixtures";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setClubName } from "../redux/storeclubname";
import MaterialTableCustom from "./materialTable";

export const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const Dashboard = () => {
  const [table, setTable] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [details, setDetails] = useState({});
  const clubContainerRef = useRef(null);
  const animationRef = useRef(null);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async (api, setState) => {
      try {
        const res = await api();
        if (res.status === 200) {
          if (api === league_details_api) {
            setState(res.data[0]);
          } else {
            setState(res.data);
          }
        } else {
          alert("An error occurred while fetching data!!!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred!");
      }
    };
    const fetchAllData = async () => {
      await fetchData(points_table_api, setTable);
      await fetchData(league_clubs_api, setClubs);
      await fetchData(match_fixtures_api, setFixtures);
      await fetchData(league_details_api, setDetails);
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    if (!clubs.length || !clubContainerRef.current) return;
    const container = clubContainerRef.current;
    const totalWidth = container.scrollWidth / 2;
    gsap.set(container, { x: 0 });
    animationRef.current = gsap.to(container, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [clubs]);

  const handleMouseEnter = () => {
    animationRef.current.pause();
  };

  const handleMouseLeave = () => {
    animationRef.current.resume();
  };

  const handleClick = (e, name) => {
    e.preventDefault();
    dispatch(setClubName(name));
    navigate("/teamhome");
  };

  return (
    <div className="page-container">
      <Grid
        container
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Grid item xs={11} md={4}>
          <FootballInfoCard
            name={details?.name}
            league_or_club={details?.league_or_club}
            short_introduction={details?.short_introduction}
            founded={details?.founded}
            headquarters={details?.headquarters}
            current_champions={details?.current_champions}
            international_cups={details?.international_cups}
            logo_url={details?.logo_url}
            dashboard={true}
          />
        </Grid>
        <Grid item xs={11} md={7}>
          <div>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab icon={<EventIcon />} label="Fixtures" />
              <Tab icon={<TableChartIcon />} label="Table" />
            </Tabs>
          </div>

          <TabPanel value={value} index={0}>
            <MatchList matches={fixtures} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Card
              fullWidth
              style={{
                height: "73vh",
                padding: 16,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(3px)",
                borderRadius: 16,
              }}
            >
              <MaterialTableCustom
                table={table}
                clubs={clubs}
                handleClick={handleClick}
              />
            </Card>
          </TabPanel>
        </Grid>
      </Grid>
      <Grid item xs={12} className="clubs_footer">
        <div
          className="marquee-track"
          ref={clubContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {[...clubs, ...clubs].map((item, index) => (
            <div
              className="club-item"
              key={`${item.team}-${index}`}
              onClick={(e) => handleClick(e, item.team)}
            >
              <img src={item.image} alt={item.team} className="club-pic" />
              <h3>{item.team}</h3>
            </div>
          ))}
        </div>
      </Grid>
    </div>
  );
};
