import axios from "axios";
import {
  points_table,
  league_clubs,
  match_fixtures,
  league_details,
  club_details,
  club_fixtures,
  team_profile,
} from "./urls";

export const points_table_api = async () => {
  try {
    const res = await axios.get(points_table);
    return res;
  } catch (err) {
    return console.log(err);
  }
};

export const league_clubs_api = async () => {
  try {
    const res = await axios.get(league_clubs);
    return res;
  } catch (err) {
    return console.log(err);
  }
};

export const match_fixtures_api = async () => {
  try {
    const res = await axios.get(match_fixtures);
    return res;
  } catch (err) {
    return console.log(err);
  }
};

export const club_fixtures_api = async (body) => {
  try {
    const res = await axios.post(club_fixtures, body);
    return res;
  } catch (err) {
    return console.log(err);
  }
};

export const league_details_api = async () => {
  try {
    const res = await axios.get(league_details);
    return res;
  } catch (err) {
    return console.log(err);
  }
};

export const club_details_api = async (body) => {
  try {
    const res = await axios.post(club_details, body);
    return res;
  } catch (err) {
    return console.log(err);
  }
};

export const team_profile_api = async (body) => {
  try {
    const res = await axios.post(team_profile, body);
    return res;
  } catch (err) {
    return console.log(err);
  }
};
