import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Avatar,
} from "@material-ui/core";
import trailer from "../../src/assets/trailer.webm";

const FootballInfoCard = ({
  name,
  league_or_club,
  short_introduction,
  founded,
  headquarters,
  current_champions,
  international_cups,
  manager,
  stadium,
  logo_url,
  children,
  dashboard = false,
}) => {
  const itemRef = useRef(null);
  const [itemWidth, setWidth] = useState(0);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Card
      id="dashboarditemwidth"
      ref={itemRef}
      style={{
        maxWidth: 600,
        height: dashboard ? "77vh" : "57vh",
        maxHeight: dashboard ? "73vh" : "57vh",
        margin: "40px auto",
        padding: 16,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(3px)",
        borderRadius: 16,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {logo_url && (
            <Avatar
              alt={`${name} Logo`}
              src={logo_url}
              style={
                league_or_club === "League"
                  ? { width: 270, height: 110 }
                  : { width: 64, height: 64 }
              }
              variant="square"
            />
          )}
          <Box>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {league_or_club}
            </Typography>
          </Box>
        </Box>

        {short_introduction && (
          <Typography variant="body1" paragraph>
            {short_introduction}
          </Typography>
        )}

        <Divider style={{ margin: "16px 0" }} />

        <Box>
          {founded && (
            <Typography>
              <strong>Founded:</strong> {founded}
            </Typography>
          )}
          {headquarters && (
            <Typography>
              <strong>Headquarters:</strong> {headquarters}
            </Typography>
          )}
          {current_champions && (
            <Typography>
              <strong>Current Champions:</strong> {current_champions}
            </Typography>
          )}
          {international_cups && (
            <Typography>
              <strong>International Cups:</strong> {international_cups}
            </Typography>
          )}
          {manager && (
            <Typography>
              <strong>Manager:</strong> {manager}
            </Typography>
          )}
          {stadium && (
            <Typography>
              <strong>Stadium:</strong> {stadium}
            </Typography>
          )}
        </Box>

        <Divider style={{ margin: "16px 0" }} />

        {children && <Box mt={2}>{children}</Box>}

        {dashboard && (
          <>
            <video
              src={trailer}
              autoPlay
              loop
              muted
              style={{
                MaxWidth: "537px",
                width: `${itemWidth - 30}px`,
                height: "100%",
              }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FootballInfoCard;
