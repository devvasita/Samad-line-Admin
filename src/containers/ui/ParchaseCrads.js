/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import userData from 'data/userData';
import ParchaseCrad from 'components/cards/ParchaseCard';

const ParchaseCrads = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <Row className="icon-cards-row mb-2">
          {userData.map((item) => {
            return (
              <Colxx xxs="6" sm="6" md="4" lg="3" key={`icon_card_${item.id}`}>
                <ParchaseCrad {...item} className="mb-4" />
              </Colxx>
            );
          })}
        </Row>
      </Colxx>
    </Row>
  );
};

export default ParchaseCrads;
