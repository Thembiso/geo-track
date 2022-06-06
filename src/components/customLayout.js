import * as React from 'react';
import { Layout } from 'react-admin';
import CustomBar from './customAppBar';

const MyLayout = (props) => <Layout {...props} appBar={CustomBar} />;

export default MyLayout;