// const base_URL = process.env.REACT_APP_API_BASE_URL;
const base_URL = document.getElementById("baseUrl").innerText;

export const points_table = `${base_URL}/pointstable`;
export const league_clubs = `${base_URL}/clubs`;
export const match_fixtures = `${base_URL}/fixtures`;
export const club_fixtures = `${base_URL}/clubFixtures`;
export const league_details = `${base_URL}/leagueDetails`;
export const club_details = `${base_URL}/clubDetails`;
export const team_profile = `${base_URL}/teamProfile`;
