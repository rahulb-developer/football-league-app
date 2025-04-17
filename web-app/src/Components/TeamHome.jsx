import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  club_details_api,
  club_fixtures_api,
  league_clubs_api,
  points_table_api,
  team_profile_api,
} from "../apis";
import "./Style.css";
import { Card, Grid, Typography } from "@material-ui/core";
import FootballInfoCard from "./clubpage";
import { MatchListScroll } from "./fixtures";
import MaterialTableCustom from "./materialTable";

export const TeamHome = () => {
  const [table, setTable] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [details, setDetails] = useState({});
  const [profile, setProfile] = useState({});
  const clubname = useSelector((state) => state.clubname.value);

  useEffect(() => {
    const fetchData = async (api, setState, method, body) => {
      try {
        let res;
        if (method === "post") {
          res = await api(body);
        } else {
          res = await api();
        }
        if (res?.status === 200) {
          if (api === club_details_api || api === team_profile_api) {
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
      await fetchData(points_table_api, setTable, "get");
      await fetchData(league_clubs_api, setClubs, "get");
      await fetchData(club_fixtures_api, setFixtures, "post", {
        club_name: clubname,
      });
      await fetchData(club_details_api, setDetails, "post", {
        club_name: clubname,
      });
      await fetchData(team_profile_api, setProfile, "post", {
        club_name: clubname,
      });
    };
    fetchAllData();
  }, []);

  return (
    <>
      <img
        src={profile?.photo_url}
        alt={profile?.name}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Grid
        container
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Grid item xs={12} md={4}>
          <FootballInfoCard
            name={details?.name}
            league_or_club={details?.league_or_club}
            short_introduction={details?.short_introduction}
            founded={details?.founded}
            headquarters={details?.headquarters}
            current_champions={details?.current_champions}
            international_cups={details?.international_cups}
            logo_url={details?.logo_url}
            children={
              <div>
                <Typography variant="h6">
                  Current Standings (2024/25)
                </Typography>
                <MaterialTableCustom
                  selectedclubname={clubname}
                  table={table.filter((ele) => ele.club_name === clubname)}
                  clubs={clubs}
                  position={profile.id}
                />
              </div>
            }
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Card
            fullWidth
            style={{
              height: "57vh",
              margin: "40px auto",
              padding: 16,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(3px)",
              borderRadius: 16,
            }}
          >
            <Typography variant="h6" style={{ marginLeft: 15 }}>
              Match Fixtures
            </Typography>
            <MatchListScroll
              matches={fixtures.sort(
                (a, b) => new Date(a?.match_date) - new Date(b?.match_date)
              )}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
