import React from 'react';
import filterpic from '../../../assets/filter.png';
import plus from '../../../assets/plus.png';
import export1 from '../../../assets/export.png';
import import1 from '../../../assets/import.png';
import { CSVLink } from 'react-csv';
import './style.css';

function FilterComponent({
  heading,
  buttonOne,
  buttonOneHandler,
  buttonTwo,
  buttonTwoHandler,
  buttonThree,
  buttonThreeHandler,
  filter,
  inventories,
  filterEnableButton = true,
  handleFilterSearch,
}) {
  return (
    <div className="filter__component">
      <div>
        <h2 className=" pb-2 fw-bold ticket-heading">{heading}</h2>
      </div>
      <div className="filters__view" style={{ display: 'flex' }}>
        <div className="left__filters">
          <div className="input__group__container">
            <i class="fa fa-search search"></i>
            <input
              className="input__group"
              type="search"
              placeholder="Search for tickets"
              onChange={(e) => {
                handleFilterSearch && handleFilterSearch(e.target.value);
              }}
            />
          </div>
          {filterEnableButton && (
            <button className="button__filter" onClick={filter}>
              <img src={filterpic} alt="add" /> Filter
              <span className="filter__caret"></span>
            </button>
          )}
        </div>
        <div className="right__filters">
          {buttonOne && (
            <button className="button__add" onClick={buttonOneHandler}>
              <img src={plus} alt="add" /> {buttonOne}
              <span class="hiddenHover"> {buttonOne}</span>
            </button>
          )}
          {buttonTwo && (
            <button className="button__import" onClick={buttonTwoHandler}>
              <img src={import1} alt="import" />
              {buttonTwo}
            </button>
          )}
          {buttonThree && (
            <>
              {inventories ? (
                <CSVLink
                  data={inventories}
                  filename={'Software-inventory-list.csv'}
                  className="button__export button"
                  target="_blank"
                >
                  <img
                    src={export1}
                    alt="export"
                    style={{ marginRight: '10px' }}
                  />
                  Export
                </CSVLink>
              ) : (
                <button className="button__export" onClick={buttonThreeHandler}>
                  <img src={export1} alt="export" />
                  {buttonThree}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
