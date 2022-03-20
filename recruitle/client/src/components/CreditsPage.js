import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import Table from 'react-bootstrap/Table';

export default function CreditsPage() {
  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>This table</td>
            <td>https://react-bootstrap.github.io/components/table/</td>
          </tr>
          <tr>
            <td>Signin background</td>
            <td>https://www.pexels.com/photo/rectangular-white-table-with-rolling-chairs-inside-room-260689/</td>
          </tr>
          <tr>
            <td>Signin template</td>
            <td>https://github.com/mui/material-ui/tree/v5.5.1/docs/data/material/getting-started/templates/sign-in</td>
          </tr>
          <tr>
            <td>Signup template</td>
            <td>https://github.com/mui/material-ui/tree/v5.5.1/docs/data/material/getting-started/templates/sign-up</td>
          </tr>
          <tr>
            <td>Signup toggle</td>
            <td>https://mui.com/components/toggle-button/#main-content</td>
          </tr>
          <tr>
            <td>Profile Page template</td>
            <td>https://github.com/mui/material-ui/tree/v5.5.1/docs/data/material/getting-started/templates/sign-up</td>
          </tr>
          <tr>
            <td>Profile page email icon</td>
            <td>https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Mail-512.pnghttps://github.com/mui/material-ui/tree/v5.5.1/docs/data/material/getting-started/templates/sign-up</td>
          </tr>
          <tr>
            <td>Profile page resume icon</td>
            <td>https://www.clipartmax.com/png/small/308-3085721_resume-png-clipart-my-resume-icon-png.png</td>
          </tr>
          <tr>
            <td>Profile page editable fields</td>
            <td>https://github.com/learnwithparam/logrocket-inline-edit-ui</td>
          </tr>
          <tr>
            <td>Profile page edit icon</td>
            <td>https://upload.wikimedia.org/wikipedia/en/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}