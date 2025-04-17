import React, { forwardRef, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";
import { format, isAfter, parseISO } from "date-fns";

const MatchCard = ({ match }) => {
  const theme = useTheme();
  const formattedDate = format(new Date(match.match_date), "EEE, dd MMM");
  const isFinished = match.result !== null;

  return (
    <Card
      elevation={6}
      style={{
        background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
        color: "white",
        borderRadius: 16,
        margin: theme.spacing(2),
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body2" style={{ color: "#94a3b8" }}>
                {formattedDate}
              </Typography>
              <Typography variant="h6" style={{ marginTop: 8 }}>
                {match.home_team}
              </Typography>
              <Typography variant="h6">{match.away_team}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography
                variant="body2"
                style={{ color: "#94a3b8", marginBottom: 4 }}
              >
                Score
              </Typography>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                {isFinished
                  ? `${match.home_score} - ${match.away_score}`
                  : "TBD"}
              </Typography>
              <Typography variant="body2" style={{ color: "#94a3b8" }}>
                {isFinished ? "FT" : "Upcoming"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const MatchList = ({ matches }) => {
  return (
    <Grid container spacing={2}>
      {matches.map((match, index) => (
        <Grid item xs={12} md={6} key={index}>
          <MatchCard match={match} />
        </Grid>
      ))}
    </Grid>
  );
};

const MatchCard1 = forwardRef(({ match }, ref) => {
  const theme = useTheme();
  const formattedDate = format(new Date(match.match_date), "EEE, dd MMM");
  const isFinished = match.result !== null;

  return (
    <Card
      ref={ref}
      elevation={6}
      style={{
        background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
        color: "white",
        borderRadius: 16,
        margin: theme.spacing(2),
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body2" style={{ color: "#94a3b8" }}>
                {formattedDate}
              </Typography>
              <Typography variant="h6" style={{ marginTop: 8 }}>
                {match.home_team}
              </Typography>
              <Typography variant="h6">{match.away_team}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography
                variant="body2"
                style={{ color: "#94a3b8", marginBottom: 4 }}
              >
                Score
              </Typography>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                {isFinished
                  ? `${match.home_score} - ${match.away_score}`
                  : "TBD"}
              </Typography>
              <Typography variant="body2" style={{ color: "#94a3b8" }}>
                {isFinished ? "FT" : "Upcoming"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});

export const MatchListScroll = ({ matches }) => {
  const today = new Date();
  const sortedMatches = [...matches].sort(
    (a, b) => new Date(a.match_date) - new Date(b.match_date)
  );
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  // Find the first match after today (or closest upcoming)
  const scrollToIndex = sortedMatches.findIndex((match) =>
    isAfter(parseISO(match.match_date), today)
  );

  useEffect(() => {
    if (
      scrollToIndex !== -1 &&
      cardRefs.current[scrollToIndex] &&
      scrollRef.current
    ) {
      cardRefs.current[scrollToIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [scrollToIndex]);

  return (
    <Box
      ref={scrollRef}
      style={{
        maxHeight: "50vh",
        overflowY: "auto",
        paddingRight: 8,
      }}
    >
      <Grid container spacing={2}>
        {sortedMatches.map((match, index) => (
          <Grid item xs={12} md={6} key={index}>
            <MatchCard1
              ref={(el) => (cardRefs.current[index] = el)}
              match={match}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
