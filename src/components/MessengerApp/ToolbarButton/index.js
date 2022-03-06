import React from 'react';
import { loadImageMessenger } from '../Compose';
import './ToolbarButton.css';

export default function ToolbarButton(props) {
  const { icon } = props;

  return (
    // <i className={`toolbar-button ${icon}`} />
    <label><span className="nav-link"><i className={`bi ${icon} input-elements`}></i><input type="file" className="load-photo-input" id="upload" name="input-name" onChange={loadImageMessenger} /></span></label>
  );
}