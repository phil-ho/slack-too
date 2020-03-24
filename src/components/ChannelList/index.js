import React, { useState } from 'react';
import classNames from 'classnames';

import './ChannelList.css';

function ChannelList({ channels }) {

  const [collapse, setCollapse] = useState(false);
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(null);

  const toggleSelectedChannelIndex = (index) => {
    if (selectedChannelIndex === index) {
      setSelectedChannelIndex(null);
    } else {
      setSelectedChannelIndex(index);
    }
  };

  let channelsElements = channels.map((channel, index) => {
    let style = classNames(
      'channel',
      { 'channel--selected': selectedChannelIndex === index },
    );
    return (
      <li
        className={style}
        onClick={() => toggleSelectedChannelIndex(index)}
      >
        <span className="channel-name">{channel.name}</span>
      </li>
    );
  });

  let collapseButtonStyle = classNames(
    'sidebar-control-icon',
    'sidebar-control-icon--collapse',
    { 'sidebar-control-icon--rotate270': collapse }
  );

  let channelsListStyle = classNames(
    "channels-list",
    { "channels-list--collapsed": collapse },
  );

  return (
    <div className="sidebar-category sidebar-category--channels">
      <div className="sidebar-controls">
        <button
          className={collapseButtonStyle}
          onClick={() => setCollapse(!collapse)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"/></svg>
        </button>
        <button
          className='sidebar-title'
          onClick={() => setCollapse(!collapse)}
        >
          Channels
        </button>
        <div className='sidebar-control-icon sidebar-control-icon--plus'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
        </div>
      </div>
      <ul className={channelsListStyle}>
        {channelsElements}
      </ul>
    </div>
  )
}

export default ChannelList;