import { Box } from "@material-ui/core";
import MaterialTable from "material-table";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from "@material-ui/icons/Remove";

const MaterialTableCustom = ({
  table,
  clubs,
  handleClick,
  selectedclubname = "",
  position = 1,
}) => {
  const options = {
    sorting: false,
    search: false,
    paging: false,
    filtering: false,
    draggable: false,
    showTitle: false,
    toolbar: false,
    exportButton: false,
    actionsColumnIndex: -1,
    selection: false,
    showSelectAllCheckbox: false,
    showTextRowsSelected: false,
    padding: "dense",
  };
  options["headerStyle"] =
    selectedclubname.length === 0
      ? {
          fontSize: "12px",
          padding: "1px 6px",
          background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
          color: "white",
          fontWeight: "bold",
        }
      : {
          fontSize: "12px",
          padding: "4px 8px",
          background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
          color: "white",
          fontWeight: "bold",
        };
  options["cellStyle"] =
    selectedclubname.length === 0
      ? {
          fontSize: "12px",
          padding: "1px 6px",
        }
      : {
          fontSize: "12px",
          padding: "4px 8px",
        };
  options["rowStyle"] =
    selectedclubname.length === 0
      ? {
          height: 10,
        }
      : {
          height: 30,
        };

  const columns = [
    {
      title: "#",
      render: (rowData) => {
        const style = {
          display: "flex",
          alignItems: "center",
          paddingLeft: "8px",
        };

        if (rowData?.group_stage != null) {
          style.borderLeft =
            rowData.group_stage === "UEFA Champions League group stage"
              ? "4px solid blue"
              : rowData.group_stage === "Europa League group stage"
              ? "4px solid orange"
              : rowData.group_stage === "Relegation"
              ? "4px solid darkred"
              : "4px solid transparent";
        } else {
          style.borderLeft = "4px solid white";
        }
        return <div style={style}>{position}</div>;
      },
      width: "auto",
      editable: "never",
      align: "center",
    },
    {
      title: "Team",
      field: "club_name",
      render: (rowData) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={
              clubs.filter((ele) => rowData.club_name.includes(ele.team))[0]
                ?.image
            }
            alt={
              clubs.filter((ele) => rowData.club_name.includes(ele.team))[0]
                ?.team
            }
            style={{ height: "18px", width: "18px", paddingRight: "8px" }}
          />
          {rowData.club_name}
        </div>
      ),
    },
    { title: "MP", field: "match_played" },
    { title: "W", field: "won" },
    { title: "D", field: "draw" },
    { title: "L", field: "lost" },
    { title: "GF", field: "goals_for" },
    { title: "GA", field: "goals_against" },
    { title: "GD", field: "goal_difference" },
    { title: "Pts", field: "points" },
    {
      title: "Last 5",
      field: "last_5",
      render: (rowData) => renderMatchResults(rowData.last_5),
      align: "center",
    },
  ];

  const renderMatchResults = (resultStr) => {
    const results = resultStr.match(/Win|Loss|Draw/g) || [];

    return (
      <Box display="flex" gap={1}>
        {results.map((r, index) => {
          if (r === "Win") {
            return <CheckIcon key={index} style={{ color: "green" }} />;
          } else if (r === "Loss") {
            return <CloseIcon key={index} style={{ color: "red" }} />;
          } else {
            return <RemoveIcon key={index} style={{ color: "gray" }} />;
          }
        })}
      </Box>
    );
  };

  return (
    <MaterialTable
      style={{
        border: "1px solid grey",
        background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
        color: "white",
      }}
      title="League Table"
      columns={columns}
      data={table}
      onRowClick={(event, rowData) =>
        selectedclubname.length === 0
          ? handleClick(event, rowData.club_name)
          : ""
      }
      options={options}
    />
  );
};

export default MaterialTableCustom;
