import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../store/actions/index";

function Logout({ logout }) {
  const history = useHistory();
  useEffect(() => {
    logout();
  }, [logout]);
  history.push("/signin");
  return null;
}
const mapDispatchToProps = {
  logout: actions.SignOut,
};
export default connect(null, mapDispatchToProps)(Logout);
