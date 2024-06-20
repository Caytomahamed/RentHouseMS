// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import MenuHeader from '../../components/Header/MenuHeader';
import InboxItem from '../../components/Inbox/InboxItem';
import CustomButton from '../../components/Custom/CustomButton';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import SentInboxModal from '../../components/modols/SentInboxModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInbox,
  getMyInbox,
  selectInboxes,
} from '../../store/slices/inboxSlice';
import { toast } from 'react-toastify';
import { appSelectUsers } from '../../store/slices/auth';
import Loading from '../../components/Custom/Loading';

const YourInbox = () => {
  const [isSent, setIsSent] = useState(false);
  const dispatch = useDispatch();

  const { createLoad } = useSelector(selectInboxes);
  const { currentUser } = useSelector(appSelectUsers);

  useEffect(() => {
    dispatch(getMyInbox(currentUser.id));
  }, [dispatch, createLoad, currentUser.id]);

  const sendInbox = (inbox) => {
    if (!inbox && !Object.keys(inbox).length) {
      return toast.error('Please enter a inbox');
    }
    dispatch(
      createInbox({
        senderId: 3,
        receiverId: inbox.receiverId,
        FromOrTo: inbox.FromOrTo,
        subject: inbox.subject,
        message: inbox.message,
      })
    );
    toast.success('Inbox sent successfully');
    console.log('inbox', inbox, currentUser);
  };

  const { myInbox, isLoading } = useSelector(selectInboxes);

  // l need to filter the type of inbox to display
  const [inboxType, setInboxType] = useState('received');
  const title = inboxType === 'received' ? 'Received Inbox' : 'Sent Inbox';

  const filteredInboxes = myInbox?.filter((inbox) => {
    if (inboxType === 'received') {
      return inbox.receiverId === currentUser.id;
    } else {
      return inbox.senderId === currentUser.id;
    }
  });

  // filter the inbox type and give me the length of the inbox
  const inboxLength = myInbox?.reduce(
    (acc, inbox) => {
      if (inbox.receiverId === currentUser.id) {
        acc.receiverLen += 1;
      } else if (inbox.senderId === currentUser.id) {
        acc.senderLen += 1;
      }
      return acc;
    },
    { receiverLen: 0, senderLen: 0 }
  );

  const onFilterInbox = (type) => {
    setInboxType(type);
  };

  // onPen and close inbox
  const onOpenInbox = () => {
    setIsSent(true);
  };

  const onCloseInbox = () => {
    setIsSent(false);
  };

  const onModalRef = useOutsideClick(() => onCloseInbox());


  return (
    <div>
      <MenuHeader />
      <SentInboxModal
        isSent={isSent}
        onClose={onCloseInbox}
        onCloseSentModal={onCloseInbox}
        onModalRef={onModalRef}
        onSent={sendInbox}
      />

      <div style={{ display: 'flex', height: '70vh', gap: '5rem' }}>
        <div
          style={{
            width: '20rem',
            padding: '2rem ',
            borderRight: '1px solid #E47675dd',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
          }}
        >
          <h1 style={{ fontSize: '2.5rem' }}>Your Inbox</h1>

          <div style={{ flex: '1' }}>
            <CustomButton
              label="Received "
              style={{ marginTop: '3rem', width: '15rem' }}
              onClick={() => onFilterInbox('received')}
            />

            <CustomButton
              label="Sented Inbox"
              style={{ marginTop: '3rem', width: '15rem' }}
              color={'#E47675'}
              onClick={() => onFilterInbox('sended')}
            />
          </div>

          <h1>
            Total your inbox{' '}
            <span style={{ fontWeight: 'bold' }}>[{myInbox?.length}</span>]{' '}
          </h1>
          <h1 style={{ marginTop: '1rem' }}>
            Total received
            <span style={{ fontWeight: 'bold' }}>
              {' '}
              [{inboxLength?.receiverLen}
            </span>
            ]{' '}
          </h1>
          <h1 style={{ marginTop: '1rem' }}>
            Total send{' '}
            <span style={{ fontWeight: 'bold' }}>
              [{inboxLength?.senderLen}
            </span>
            ]{' '}
          </h1>
        </div>
        <div style={{ flex: '1', overflow: 'scroll' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '4rem',
            }}
          >
            <h1
              style={{
                fontSize: '2.4rem',
                fontWeight: 'bold',
              }}
            >
              {title}
            </h1>

            <div
              style={{
                justifySelf: 'center',
                display: 'flex',
                justifyContent: 'center',
                marginRight: '5rem',
                gap: '1.5rem',
              }}
            >
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem',
                }}
              >
                <span
                  style={{
                    width: '1.5rem',
                    height: '1.4rem',
                    display: 'inline-block',
                    border: `2px solid red`,
                  }}
                ></span>
                {inboxType === 'received' ? 'From' : 'To'}: Admin
              </p>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem',
                }}
              >
                <span
                  style={{
                    width: '1.5rem',
                    height: '1.4rem',
                    display: 'inline-block',
                    border: `2px solid blue`,
                  }}
                ></span>
                {inboxType === 'received' ? 'From' : 'To'}: Owner
              </p>
            </div>

            {inboxType === 'received' && (
              <div
                style={{
                  marginRight: '5rem',
                  fontWeight: 'bold',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '50%',
                  backgroundColor: 'trasparent',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              ></div>
            )}

            {inboxType === 'sended' && (
              <div
                style={{
                  marginRight: '5rem',
                  fontWeight: 'bold',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '50%',
                  backgroundColor: '#E47675',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={onOpenInbox}
              >
                <div
                  style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      backgroundColor: '#E47675',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="testimonial__container">
            {isLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '50vh',
                  width: '100%',
                }}
              >
                {' '}
                <Loading />
              </div>
            )}
            {filteredInboxes.length > 0
              ? filteredInboxes.map((box) => (
                  <InboxItem inbox={box} key={box.id} />
                ))
              : !isLoading &&
                [{}].map((box) => <InboxItem inbox={box} key={box.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInbox;
