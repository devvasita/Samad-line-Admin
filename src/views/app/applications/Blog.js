import React from 'react';
import {
  Row,
  Card,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  // ButtonGroup,
  Button,
} from 'reactstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useHistory } from 'react-router-dom';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import { blogData } from 'data/blog';
import IntlMessages from 'helpers/IntlMessages';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

function Blog() {
  const history = useHistory();

  const handleView = () => {
    history.push(`/app/applications/blogdetails`);
  };

  const handleAddBlog = () => {
    history.push(`/app/applications/addblog`);
  };

  const handleEdit = () => {
    history.push(`/app/applications/editBlog`);
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-flex justify-content-between mb-4">
            <h1>Blog List</h1>
            <Button size="sm" color="primary" outline onClick={handleAddBlog}>
              <IntlMessages id="+ Add Blog" />
            </Button>
          </div>
          <Separator className="mb-4" />
        </Colxx>
        {blogData.map((blogItem) => {
          return (
            <Colxx
              xxs="12"
              lg="6"
              className="mb-5"
              key={`blogItem_${blogItem.id}`}
            >
              <Card
                className="flex-row listing-card-container"
                style={{ borderRadius: '0.75rem' }}
              >
                <div className="w-40 position-relative">
                  <img
                    style={{ borderRadius: '0.75rem 0 0 0.75rem' }}
                    className="card-img-left"
                    src={blogItem.thumb}
                    alt="Card cap"
                  />
                </div>
                <div className="w-60 d-flex align-items-center">
                  <CardBody>
                    <ResponsiveEllipsis
                      className="mb-3 listing-heading"
                      text={blogItem.title}
                      maxLine="2"
                      trimRight
                      basedOn="words"
                      component="h5"
                    />

                    <ResponsiveEllipsis
                      className="listing-desc text-muted"
                      text={blogItem.description}
                      maxLine="3"
                      trimRight
                      basedOn="words"
                      component="p"
                    />
                    <div>
                      <div className="mb-2 d-flex justify-content-center align-items-center flex-wrap">
                        <Button
                          color="primary"
                          outline
                          className="m-1"
                          onClick={handleEdit}
                        >
                          <IntlMessages id="Edit" />
                        </Button>
                        <Button
                          color="primary"
                          outline
                          className="m-1"
                          onClick={() => handleView(blogItem.id)}
                        >
                          <IntlMessages id="View" />
                        </Button>
                        <Button color="primary" className="m-1" outline>
                          <IntlMessages id="Delete" />
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
          );
        })}
      </Row>
      <Row>
        <Colxx xxs="12">
          <Pagination listClassName="justify-content-center">
            <PaginationItem>
              <PaginationLink className="prev" href="#">
                <i className="simple-icon-arrow-left" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="next" href="#">
                <i className="simple-icon-arrow-right" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Colxx>
      </Row>
    </>
  );
}

export default Blog;
