/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, CardTitle } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import AddressData from 'data/Address';
import AddressCard from 'components/cards/AddressCard';

const AddressCards = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <CardTitle className="mb-4">
          <IntlMessages id="cards.icon-card" />
        </CardTitle>
        <Row className="icon-cards-row mb-2">
          {AddressData.map((item) => {
            return (
              <Colxx xxs="6" sm="4" md="3" lg="2" key={`icon_card_${item.id}`}>
                <AddressCard {...item} className="mb-4" />
              </Colxx>
            );
          })}
        </Row>
      </Colxx>
    </Row>
  );
};

export default AddressCards;
