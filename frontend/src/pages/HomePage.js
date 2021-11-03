import React, { useState, useEffect } from "react";
import { loginUser } from "../store/modules/user";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import LandingImage from "../assets/images/background.jpg";
import { useHistory } from "react-router-dom";
import { register } from "../api/userApi";

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    height: "100%",
  },
  gridContainerStyle: {
    height: "100%",
  },
  imageBoxStyle: {
    backgroundImage: `url(${LandingImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "45% 50%",
    height: "100%",
  },
  formContainer: {
    height: "100%",
    padding: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  buttonStyle: {
    marginTop: "20px",
    height: "48px",
    color: "white",
  },
}));

function HomePage(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { data: user } = useSelector((state) => state.users);
  const history = useHistory();
  useEffect(() => {
    if (user) history.push("/task");
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const respose = await register({
        username: username,
        password: password,
      });
      console.log(respose);
      dispatch(loginUser({ username: username, password: password }));
    } catch (err) {
      console.log(err.response);
      if (
        err.response.status === 400 &&
        err.response.data.username[0] ===
          "app user with this username already exists."
      )
        alert(err.response.data.username[0]);
    }
  };
  return (
    <Container
      className={classes.containerStyle}
      maxWidth={false}
      disableGutters
    >
      <Grid container spacing={0} className={classes.gridContainerStyle}>
        <Grid item xs={7}>
          <Box className={classes.imageBoxStyle}></Box>
        </Grid>
        <Grid item xs={5}>
          <div className={classes.formContainer}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h2" align="left" gutterBottom>
                    Welcome to Do it
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="left"
                    gutterBottom
                    style={{ marginBottom: "20px", color: "gray" }}
                  >
                    This app makes managing your tasks easier
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" align="left" gutterBottom>
                    Simply enter a username and a password to get started
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="username"
                    label="Username"
                    fullWidth
                    variant="outlined"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    required
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? (
                              <VisibilityOutlined />
                            ) : (
                              <VisibilityOffOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.buttonStyle}
                    type="submit"
                  >
                    Join
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
