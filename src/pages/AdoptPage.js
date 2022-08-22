import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

function AdoptPage({ adopt, data, loading, error, match }) {
  useEffect(() => {
    const calladopt = async () => {
      await adopt();
    };
    calladopt();
  }, []);

  const AdoptData = ({ pet, index }) => {
    if (parseInt(match.params.id) === index) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-12 col-lg-6 image__container">
              <img src={pet.images[0]} alt={pet.name} />
            </div>
            <div className="about col-sm-12 col-md-6 px-5 ">
              <p className="about__name">{pet.name}</p>
              {/* <p className="about__category">{pet.category}</p> */}
              <p className="about__breed">{pet.breed}</p>
              <p className="about__about">About: {pet.about}</p>
              <p className="about__contact">Contact: <a href={`tel:${pet.number}`}>{pet.number}</a></p>
            </div>
          </div>
          <div className="row my-5">
            {pet.images.map((image, index) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 small__images"
                key={index}
              >
                <img src={image} alt={pet.name} />
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className="ma-2 adopt__container__single">
          {data
            ? data.map((pet, index) => (
                <AdoptData key={index} index={index} pet={pet} />
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
export default connect(mapStateToProps, mapDispatchToProps)(AdoptPage);
