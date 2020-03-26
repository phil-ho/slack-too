import React from 'react';
import moment from 'moment';

import './Channel.css';

function Message({ user, message, createdAt, shouldShowUser=false }) {

  const timestamp = moment(createdAt);
  let userImg = user.userImage || (<svg className="channel-message-user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>)

  if (shouldShowUser) {
      return (
        <div className="channel-message">
          <div className="channel-message__gutter">
            <div className="channel-message__userImg">{userImg}</div>
          </div>
          <div className="channel-message__content">
            <div className="channel-message__header">
              <span className="channel-message__username">{user.username}</span>
              <span className="channel-message__timestamp">
                {timestamp.format('H:mm')}<span className="channel-message__ampm">&nbsp;{timestamp.format("A")}</span>
              </span>
            </div>
            <div className="channel-message__text">{message}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="channel-message channel-message--continued">
        <div className="channel-message__gutter">
          <span className="channel-message__timestamp channel-message__timestamp--onHover">{timestamp.format('H:mm')}</span>
        </div>
        <div className="channel-message__content">
          <div className="channel-message__text">{message}</div>
        </div>
      </div>
    );
}

function Channel({ channel }) {
  const { name, topic, messages } = channel;
  const memberCount = 1;
  let lastUser;
  let lastUserTime = 0;
  let shouldMessageShowUser = false;
  const sortedMessages = messages.sort((a,b) => a.createdAt - b.createdAt);

  const messagesElements = sortedMessages.map(({ user, message, createdAt}) => {
    shouldMessageShowUser = false;
    if (lastUser !== user.id) {
      lastUser = user.id;
      shouldMessageShowUser = true;
    } else if (createdAt - lastUserTime >= 300000) {
      shouldMessageShowUser = true;
    }

    const thisMoment = moment(createdAt);
    let dateDivider;

    console.log(`${moment(lastUserTime).date()} !== ${thisMoment.date()} :`, moment(lastUserTime).date() !== thisMoment.date());
    if (moment(lastUserTime).date() !== thisMoment.date()) {
      dateDivider = (
        <div className="channel-messages__date-divider">
          <div className="channel-messages__date-label">{thisMoment.format("dddd, MMMM Do")}</div>
        </div>
      );
    }

    lastUserTime = createdAt;

    return (
      <>
      <Message
        key={user.id + createdAt}
        user={user}
        message={message}
        createdAt={createdAt}
        shouldShowUser={shouldMessageShowUser}
      />
      {dateDivider}
      </>
    );
  });

  return (
    <div className="channel">
      <div className="channel-header">
        <div className="channel-header__info">
          <div className="channel-header__inner">
            <div className="channel-header__name">{name}</div>
            <button className="channel-header__button channel-header__button--star">
              <svg className="channel-header__icon channel-header__icon--star" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.65 9.04l-4.84-.42-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73 3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>
            </button>
          </div>
          <div className="channel-header__inner">
            <div className="channel-header__members">
              <svg className="channel-header__icon channel-header__icon--members" viewBox="0 0 24 24"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
              {memberCount}
            </div>
            <div className="channel-header__topic">
              <div className="channel-header__topic-inner">
                {topic}
              </div>
              <a href="#" className="channel-header__topic-edit">Edit</a>
            </div>
          </div>
        </div>
        <div className="channel-header__details">
          <svg className="channel-header__icon channel-header__icon--details" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
          Details
        </div>
      </div>
      <div className="channel-messages">
        {messagesElements.reverse()}
      </div>
      <div>INPUT COMPONENT</div>
    </div>
  );
}

export default Channel;