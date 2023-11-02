/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import './category.css';
import 'rc-switch/assets/index.css';
import './order.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Switch from '@mui/material/Routes';
// import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  createSubCategory,
  deleteSubCategory,
  getCategoryDetails,
  updateSubCategory,
} from 'redux/brandAndCategory/actions';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Container = styled('div')(() => ({
  paddingTop: '1rem',
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0 } },
  },
}));

const NewTableRow = ({
  name,
  _id,
  parent_id,
  saveSubCategory,
  removeSubCategory,
}) => {
  const [edit, setEdit] = useState(false);
  const [subCategoryname, setSubCategoryName] = useState(name);

  const handleEdit = () => {
    setEdit((oldState) => !oldState);
  };

  const handleSave = () => {
    setEdit((oldState) => !oldState);
    saveSubCategory({ name: subCategoryname, parent_id, _id });
  };
  return (
    <TableRow>
      {edit ? (
        <TableCell>
          <Input
            value={subCategoryname}
            variant="outlined"
            onChange={(e) => setSubCategoryName(e.target.value)}
          />
        </TableCell>
      ) : (
        <TableCell>{name}</TableCell>
      )}
      <TableCell className="-webkit-center" style={{ textAlign: 'right' }}>
        {edit ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )}
        <Button
          outline
          className="secondary-new"
          onClick={() => removeSubCategory({ parent_id, _id })}
          style={{ marginLeft: '13px' }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

function CategoryDetails({
  selectedCategory,
  getCategory,
  saveSubCategory,
  removeSubCategory,
  createNewSubCategory,
}) {
  const { id } = useParams();
  const { subCategory } = selectedCategory;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalLong, setModalLong] = useState(false);
  const [subText, setSubText] = useState('');

  useEffect(() => {
    getCategory(id);
  }, [id]);

  const handeCreateSubCategory = () => {
    createNewSubCategory({ _id: id, name: subText });
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Modal
        centered
        backdrop="static"
        isOpen={modalLong}
        toggle={() => {
          setModalLong(!modalLong);
          setSubText('');
        }}
        style={{
          boxShadow: 'none',
        }}
      >
        <ModalBody>
          <ModalHeader style={{ padding: '5px 0px 5px 0px' }}>
            Add New Sub Category
          </ModalHeader>

          <Label className="mt-4">
            <IntlMessages id="Title :" />
          </Label>

          <Input
            type="text"
            defaultValue="kimi no"
            value={subText}
            onChange={(event) => {
              setSubText(event.target.value);
            }}
          />
        </ModalBody>
        <ModalFooter style={{ borderTop: 'none' }}>
          <Button
            outline
            className="primary-new"
            type="submit"
            onClick={() => {
              handeCreateSubCategory();
              setModalLong(false);
            }}
            press
          >
            Submit
          </Button>{' '}
          <Button
            outline
            className="secondary-new"
            onClick={() => {
              setModalLong(false);
              setSubText('');
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* <Modal isOpen={modalBasic} toggle={() => setModalBasic(!modalBasic)}>
        <ModalHeader>
          <IntlMessages id="modal.modal-title" />
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModalBasic(false)}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalBasic(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}
      <Colxx xxs="12">
        <div className="d-flex justify-content-sm-between">
          <h1>Category Details</h1>
          <Button
            size="sm"
            color="primary"
            outline
            onClick={() => {
              setModalLong(true);
              setSubText('');
            }}
            style={{ marginBottom: 13 }}
          >
            <IntlMessages id="+ Add Sub Category" />
          </Button>
        </div>
        <Separator className="mb-5" />
      </Colxx>

      <Box className="plan">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="end" />
            </TableRow>
          </TableHead>
          <TableBody style={{ padding: '10px' }}>
            {subCategory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ _id, name }) => (
                <NewTableRow
                  key={_id}
                  name={name}
                  _id={_id}
                  parent_id={id}
                  saveSubCategory={saveSubCategory}
                  removeSubCategory={removeSubCategory}
                />
              ))}
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          className="page"
          rowsPerPage={rowsPerPage}
          count={subCategory.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
      </Box>
    </Container>
  );
}

const mapStateToProps = ({ brandAndCategory }) => {
  const { selectedCategory } = brandAndCategory;
  return { selectedCategory };
};
const mapDispatchToProps = (dispatch) => ({
  getCategory: (_id) => dispatch(getCategoryDetails(_id)),
  saveSubCategory: (data) => dispatch(updateSubCategory(data)),
  removeSubCategory: (data) => dispatch(deleteSubCategory(data)),
  createNewSubCategory: (data) => dispatch(createSubCategory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
