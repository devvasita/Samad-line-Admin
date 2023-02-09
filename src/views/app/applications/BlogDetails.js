import React from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Row, Card, CardBody, CardTitle, Button } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
// import LinesEllipsis from 'react-lines-ellipsis';
// import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import SingleLightbox from 'components/pages/SingleLightbox';
// import IntlMessages from 'helpers/IntlMessages';
// import VideoPlayer from 'components/common/VideoPlayer';
// import { blogData } from 'data/blog';
// import IntlMessages from 'helpers/IntlMessages';

// const recentPosts = blogData.slice(0, 4);
// const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  cancel: {
    border: '1px solid #6c757d',
    background: 'none',
    color: '#6c757d',
    padding: '0.5rem 1.25rem 0.5rem 1.25rem',
    borderRadius: '50px',
    marginLeft: '10px',
    '&:hover': {
      background: '#6c757d',
      border: '1px solid #6c757d',
    },
  },
});

function BlogDetails() {
  const classes = useStyles();

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Blog Detail</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12" md="12" xl="8" className="col-right">
          {' '}
          <CardTitle>
            <h2>Game Changing Features :-</h2>
            {/* <IntlMessages id="Game Changing Features :-" /> */}
          </CardTitle>
          <Card className="mb-4">
            <SingleLightbox
              thumb="/assets/img/details/5.jpg"
              large="/assets/img/details/5.jpg"
              className="responsive border-0 card-img-top mb-3"
            />
            <CardBody>
              <div className="mb-5">
                <h5 className="card-title">Game Changing Features</h5>
                <p>
                  Blended value human-centered social innovation resist scale
                  and impact issueoutcomesbandwidth efficient. A; social return
                  on investment, change-makers, support a,co-createcommitment
                  because sustainable. Rubric when vibrant black lives matter
                  benefitcorporation human-centered. Save the world,
                  problem-solvers support silo massincarceration. Accessibility
                  empower communities changemaker, low-hanging
                  fruitaccessibility, thought partnership impact investing
                  program areas invest.Contextualizeoptimism unprecedented
                  challenge, empower inclusive. Living a fully ethical life
                  theresistance segmentation social intrapreneurship efficient
                  inspire external partners.Systems thinking correlation, social
                  impact; when revolutionary bandwidth. Engaging,revolutionary
                  engaging; empower communities policymaker shared unit of
                  analysistechnology inspiring social entrepreneurship.
                </p>
                <p>
                  Mass incarceration, preliminary thinking systems thinking
                  vibrant thought leadershipcorporate social responsibility.
                  Green space global, policymaker; shared
                  valuedisruptsegmentation social capital. Thought partnership,
                  optimism citizen-centeredcommitment,relief scale and impact
                  the empower communities circular. Contextualize boots on
                  theground; uplift big data, co-creation co-create segmentation
                  youth inspire. Innovateinnovate overcome injustice.
                </p>
              </div>
              <div className="mb-5">
                <h5 className="card-title">Unprecedented Challenge</h5>
                <ul className="list-unstyled">
                  <li>Preliminary thinking systems</li>
                  <li>Bandwidth efficient</li>
                  <li>Green space</li>
                  <li>Social impact</li>
                  <li>Thought partnership</li>
                  <li>Fully ethical life</li>
                </ul>
              </div>
              <div>
                <h5 className="card-title">Revolutionary Bandwidth</h5>
                <p>
                  Blended value human-centered social innovation resist scale
                  and impact issueoutcomes bandwidth efficient. A; social return
                  on investment, change-makers, supporta, co-create commitment
                  because sustainable. Rubric when vibrant black lives
                  matterbenefit corporation human-centered. Save the world,
                  problem-solvers support silomass incarceration. Accessibility
                  empower communities changemaker, low-hanging
                  fruitaccessibility, thought partnership impact investing
                  program areas invest.Contextualize optimism unprecedented
                  challenge, empower inclusive. Living a fullyethical life the
                  resistance segmentation social intrapreneurship efficient
                  inspireexternal partners. Systems thinking correlation, social
                  impact; when revolutionarybandwidth. Engaging, revolutionary
                  engaging; empower communities policymaker sharedunit of
                  analysis technology inspiring social entrepreneurship.Mass
                  incarceration,preliminary thinking systems thinking vibrant
                  thought leadership corporate socialresponsibility. Green space
                  global, policymaker; shared value disrupt segmentationsocial
                  capital. Thought partnership, optimism citizen-centered
                  commitment, reliefscale and impact the empower communities
                  circular. Contextualize boots on theground; uplift big data,
                  co-creation co-create segmentation youth inspire.
                  Innovateinnovate overcome injustice.
                </p>
                <p>
                  Systems thinking correlation, social impact; when
                  revolutionary bandwidth. Engaging,revolutionary engaging;
                  empower communities policymaker shared unit of
                  analysistechnology inspiring social entrepreneurship. Thought
                  partnership, optimismcitizen-centeredcommitment,relief scale
                  and impact the empower communities circular. Contextualize
                  boots on theground; uplift big data, co-creation co-create
                  segmentation youth inspire. Innovateinnovate overcome
                  injustice.
                </p>
              </div>
            </CardBody>

            <div
              style={{
                textAlign: 'end',
                padding: '0 1.75rem 1.75rem 1.75rem',
              }}
            >
              <NavLink to="./blog">
                <Button
                  outline
                  className={classes.cancel}
                  // style={{ background: '#6c757d', border: 'none' }}
                >
                  Cancel
                </Button>
              </NavLink>
            </div>
          </Card>
        </Colxx>
      </Row>
    </>
  );
}

export default BlogDetails;
