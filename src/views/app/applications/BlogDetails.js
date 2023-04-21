import React, { useEffect } from 'react';
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
import { NavLink, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { getBlogById } from 'redux/auth/actions';
import { connect } from 'react-redux';

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

function BlogDetails({ selectedBlog, getBlogDetails }) {
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    getBlogDetails(id);
  }, [getBlogDetails]);

  console.log({ selectedBlog });
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
            {/* <IntlMessages id="Game Changing Features :-" /> */}
          </CardTitle>
          <Card className="mb-4">
            <SingleLightbox
              thumb={selectedBlog.image.url}
              large={selectedBlog.image.url}
              className="responsive border-0 card-img-top mb-3"
            />
            <CardBody>
              <div className="mb-5">
                <h5 className="card-title">{selectedBlog.title}</h5>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectedBlog.description,
                  }}
                />
              </div>
            </CardBody>

            <div
              style={{
                textAlign: 'end',
                padding: '0 1.75rem 1.75rem 1.75rem',
              }}
            >
              <NavLink to="/app/applications/blog">
                <Button
                  outline
                  className={classes.cancel}
                  // style={{ background: '#6c757d', border: 'none' }}
                >
                  Go back
                </Button>
              </NavLink>
            </div>
          </Card>
        </Colxx>
      </Row>
    </>
  );
}

const mapStateToProps = ({ authUser }) => {
  const { selectedBlog } = authUser;
  return { selectedBlog };
};
const mapDispatchToProps = (dispatch) => ({
  getBlogDetails: (_id) => dispatch(getBlogById(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails);
