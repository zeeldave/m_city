import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/adminLayout";
import { Link } from "react-router-dom";

import { playerCollection } from "../../../firebase";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";

import { showToastError } from "../../Utils/tools";

const AdminPlayers = () => {
  const [players, setPlayers] = useState(null);

  const [lastVisible, setLastVisible] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!players) {
      setLoading(true);

      playerCollection
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];

          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setPlayers(players);
        })
        .catch((error) => {
          showToastError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);

  const loadMorePlayers = () => {
    if (lastVisible) {
      setLoading(true);
      playerCollection
        .startAfter(lastVisible)
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const newPlayers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setLastVisible(lastVisible);
          setPlayers([...players, ...newPlayers]);
        })
        .catch((error) => {
          showToastError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToastError("No data to Load...");
    }
  };

  return (
    <AdminLayout title="The Players">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outlined"
          to={"/admin_players/add_players"}
          component={Link}
        >
          ADD PLAYER
        </Button>
      </div>

      <Paper className="mb-5">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {players
              ? players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.name}
                      </Link>
                    </TableCell>

                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </TableCell>

                    <TableCell>{player.number}</TableCell>

                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>

      <Button
      variant="contained"
      color="primary"
      disabled={loading}

      onClick={() => loadMorePlayers()}>Load More</Button>

<div className="admin_progress">
{loading ?

<CircularProgress
thickness={7}
style={{
    color:'#98c5e9'
}}
/>
:

null}
</div>


    </AdminLayout>
  );
};

export default AdminPlayers;
