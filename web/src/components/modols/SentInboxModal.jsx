// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OverlayModal from '../OverlayModal';

import inboxImage from '../../assets/images/inbox.jpg';
import { toast } from 'react-toastify';
import CustomButton from '../Custom/CustomButton';
import CustomDropdown from '../Custom/CustomDropdown';

const SentInboxModal = ({
  onCloseSentModal,
  onModalRef,
  modalWidth,
  isSent,
  onSent,
  //   item
}) => {
  const [text, setText] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [ownerId, setOwnerId] = useState(null);

  const options = [
    { label: 'Sent who', value: '' },
    { label: 'Admin', value: 'admin' },
    { label: 'Owner', value: 'owner' },
  ];

  const initState = () => {
    setText('');
    setSubject('');
    setSelectedOption(null);
    setOwnerId(null);
    onCloseSentModal();
  };
  //   (item);
  const check = () => {
    if (text.length > 0 && selectedOption.value && subject) {
      onSent({
        subject,
        message: text,
        FromOrTo: selectedOption.value,
        receiverId: ownerId ? +ownerId : 1,
      });

      initState();
      return;
    }

    initState();
    toast.error('Please select a who sent and fill field message and subject');
  };

  const handleChange = (e) => {
    if (e.target.value.length > 300) return;
    setText(e.target.value);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      {isSent && (
        <OverlayModal
          close={initState}
          modalRef={onModalRef}
          width={modalWidth}
        >
          <div className="checkout__modal">
            <div className="checkout">
              <span className="checkout__close" onClick={initState}>
                &times;
              </span>
              <div
                className="checkout__icon"
                style={{
                  backgroundImage: `url(${inboxImage})`,
                }}
              >
                &nbsp;
              </div>
              <div className="checkout__form">
                <h1 className="checkout__title">Sent Inbox</h1>
                <div className="form">
                  <div
                    style={{
                      width: 'auto',
                      padding: '.5rem 1.3rem',
                      border: '1px solid black',
                      marginTop: '1.5rem',
                    }}
                  >
                    <CustomDropdown
                      options={options}
                      onSelect={handleSelect}
                      //   width={'18rem'}
                    />
                  </div>

                  <label>
                    <input
                      type="text"
                      name="amount"
                      value={subject}
                      placeholder="Enter subject"
                      onChange={(e) => setSubject(e.target.value)}
                      style={{ marginTop: '1.5rem' }}
                    />
                  </label>

                  {selectedOption?.value === 'Owner' && (
                    <label>
                      <input
                        type="number"
                        name="amount"
                        value={ownerId}
                        placeholder="Enter subject"
                        onChange={(e) => setOwnerId(e.target.value)}
                      />
                    </label>
                  )}

                  <textarea
                    name=""
                    id=""
                    style={{
                      width: '30rem',
                      padding: '1.2rem ',
                      border: '1px solid black',
                      height: '20rem',
                      //   marginTop: '1rem',
                      fontSize: '1.6rem',
                    }}
                    value={text}
                    onChange={handleChange}
                    placeholder="Sent message... "
                  ></textarea>
                  <span
                    style={{
                      fontSize: '1.4rem',
                      margin: '.9rem 0 ',
                      color: 'gray',
                    }}
                  >
                    {text.length}/300
                  </span>
                  <CustomButton
                    label="SENT NOW!"
                    color={'#E47675'}
                    style={{
                      padding: '1.5rem 2rem',
                      width: '100%',
                    }}
                    onClick={check}
                    disabled={
                      text.length === 0 ||
                      subject.length === 0 ||
                      !selectedOption
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </OverlayModal>
      )}
    </>
  );
};

SentInboxModal.propTypes = {
  onCloseSentModal: PropTypes.func,
  onModalRef: PropTypes.func,
  modalWidth: PropTypes.number,
  isSent: PropTypes.bool,
  item: PropTypes.object,
  onSent: PropTypes.func,
};
export default SentInboxModal;
