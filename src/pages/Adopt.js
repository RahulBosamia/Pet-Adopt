import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import "../css/adopt.css";

function Adopt({ adopt, data, loading, error }) {
  useEffect(() => {
    const calladopt = async () => {
      await adopt();
    };
    calladopt();
  }, []);

  const AdoptCard = ({ pet, index }) => {
    return (
      <div className="col-sm-12 col-lg-4 my-4">
        {pet.name ? (
          <Link to={`/adopt/${index}`}>
            <Card>
              <Card.Img variant="top" src={pet.images[0]} alt={pet.name} />
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>{pet.category}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ) : null}
      </div>
    );
  };
  
  return (
    <div className="container-fluid">
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className="row adopt__container">
          {data
            ? data.map((pet, index) => (
                <AdoptCard key={index} index={index} pet={pet} />
              ))
            : null}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ adopt }) => ({
  loading: adopt.loading,
  error: adopt.error,
  data: adopt.data,
});

const mapDispatchToProps = {
  adopt: actions.adopt,
};

export default connect(mapStateToProps, mapDispatchToProps)(Adopt);
